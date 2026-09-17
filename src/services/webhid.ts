import { GunState } from '../types';

export class WebHidLightgunService {
  private device: any | null = null;
  private isSimulated = true;
  private onStateChange: ((state: Partial<GunState>) => void) | null = null;
  private onRawPacket: ((packet: number[]) => void) | null = null;
  private reportCounter = 0;
  private lastReportTime = performance.now();
  private reportsThisSecond = 0;
  private rps = 0;

  constructor() {
    // Measure reports per second
    setInterval(() => {
      this.rps = this.reportsThisSecond;
      this.reportsThisSecond = 0;
      if (this.onStateChange) {
        this.onStateChange({ reportsPerSecond: this.rps });
      }
    }, 1000);
  }

  public setCallbacks(
    onState: (state: Partial<GunState>) => void,
    onPacket?: (packet: number[]) => void
  ) {
    this.onStateChange = onState;
    this.onRawPacket = onPacket || null;
  }

  public isWebHidSupported(): boolean {
    return typeof navigator !== 'undefined' && 'hid' in navigator;
  }

  public async connectRealDevice(): Promise<boolean> {
    if (!this.isWebHidSupported()) {
      throw new Error('Przeglądarka nie wspiera WebHID API (wymagany Chrome, Edge lub Opera).');
    }

    try {
      const navHid = (navigator as any).hid;
      const devices = await navHid.requestDevice({
        filters: [
          { vendorId: 0x2e2c, productId: 0x0631 }, // G'AIM'E VID & PID
          {}, // Allow user to select other lightguns or USB devices if re-flashed
        ],
      });

      if (!devices || devices.length === 0) return false;

      this.device = devices[0];
      await this.device.open();

      this.isSimulated = false;
      this.device.addEventListener('inputreport', this.handleInputReport);

      if (this.onStateChange) {
        this.onStateChange({
          connected: true,
          isSimulated: false,
          vid: this.device.vendorId.toString(16).toUpperCase().padStart(4, '0'),
          pid: this.device.productId.toString(16).toUpperCase().padStart(4, '0'),
        });
      }

      return true;
    } catch (err: any) {
      console.error('Błąd połączenia WebHID:', err);
      throw err;
    }
  }

  public disconnect() {
    if (this.device) {
      try {
        this.device.removeEventListener('inputreport', this.handleInputReport);
        this.device.close();
      } catch (e) {
        console.warn(e);
      }
      this.device = null;
    }
    this.isSimulated = true;
    if (this.onStateChange) {
      this.onStateChange({ connected: false, isSimulated: true });
    }
  }

  private handleInputReport = (event: any) => {
    const data: DataView = event.data;
    const reportId = event.reportId;
    this.reportCounter++;
    this.reportsThisSecond++;

    // Convert to byte array
    const bytes: number[] = [reportId];
    for (let i = 0; i < data.byteLength; i++) {
      bytes.push(data.getUint8(i));
    }

    if (this.onRawPacket) {
      this.onRawPacket(bytes);
    }

    // G'AIM'E Report 0x01: [01 FLAGS Xlo Xhi Ylo Yhi]
    // In WebHID event, if reportId is 0x01, data starts at index 0
    let flags = 0;
    let rawX = 5000;
    let rawY = 5000;

    if (data.byteLength >= 5) {
      flags = data.getUint8(0);
      const xlo = data.getUint8(1);
      const xhi = data.getUint8(2);
      const ylo = data.getUint8(3);
      const yhi = data.getUint8(4);

      rawX = xlo | (xhi << 8);
      rawY = ylo | (yhi << 8);
    }

    const trigger = (flags & 0x01) !== 0; // Tip Switch
    const inRange = (flags & 0x02) !== 0; // In Range

    if (this.onStateChange) {
      this.onStateChange({
        rawX,
        rawY,
        trigger,
        inRange,
        reportCount: this.reportCounter,
        lastRawPacket: bytes,
      });
    }
  };

  /**
   * Dispatches a simulated hardware packet from the UI canvas
   */
  public dispatchSimulatedReport(rawX: number, rawY: number, trigger: boolean, inRange = true) {
    this.reportCounter++;
    this.reportsThisSecond++;

    // Clamp to hardware boundaries
    const clampedX = Math.round(Math.max(0, Math.min(10000, rawX)));
    const clampedY = Math.round(Math.max(0, Math.min(10000, rawY)));

    const xlo = clampedX & 0xff;
    const xhi = (clampedX >> 8) & 0xff;
    const ylo = clampedY & 0xff;
    const yhi = (clampedY >> 8) & 0xff;

    let flags = 0;
    if (trigger) flags |= 0x01;
    if (inRange) flags |= 0x02;

    const packet = [0x01, flags, xlo, xhi, ylo, yhi];

    if (this.onRawPacket) {
      this.onRawPacket(packet);
    }

    if (this.onStateChange) {
      this.onStateChange({
        rawX: clampedX,
        rawY: clampedY,
        trigger,
        inRange,
        reportCount: this.reportCounter,
        lastRawPacket: packet,
      });
    }
  }
}
