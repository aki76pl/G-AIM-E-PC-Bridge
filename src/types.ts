export interface Point2D {
  x: number;
  y: number;
}

export type CalibrationCorner = 'TL' | 'TR' | 'BR' | 'BL';

export interface CalibrationData {
  tl: Point2D; // Top-Left in raw coordinates (approx 1000, 1000)
  tr: Point2D; // Top-Right (approx 9000, 1000)
  br: Point2D; // Bottom-Right (approx 9000, 9000)
  bl: Point2D; // Bottom-Left (approx 1000, 9000)
  isCalibrated: boolean;
  calibratedAt?: string;
  homographyMatrix?: number[]; // 9 elements [h00, h01, h02, h10, h11, h12, h20, h21, h22]
}

export interface GunState {
  id: 'P1' | 'P2';
  name: string;
  connected: boolean;
  isSimulated: boolean;
  vid: string; // "2E2C"
  pid: string; // "0631"
  rawX: number; // 0 - 10000
  rawY: number; // 0 - 10000
  filteredX: number;
  filteredY: number;
  normalizedX: number; // 0.0 - 1.0 (after calibration)
  normalizedY: number; // 0.0 - 1.0
  screenX: number; // in pixels based on selected monitor
  screenY: number;
  trigger: boolean; // Tip Switch bit 0
  inRange: boolean; // In Range bit 1
  btnA: boolean;
  btnB: boolean;
  btnStart: boolean;
  btnCoin: boolean;
  pedal: boolean;
  reportCount: number;
  reportsPerSecond: number;
  lastJump: number;
  rejectedJumps: number;
  lastRawPacket: number[]; // 6 bytes: [0x01, FLAGS, Xlo, Xhi, Ylo, Yhi]
}

export interface FilterSettings {
  stabilityVsSpeed: number; // 0.0 (fastest response) to 1.0 (smoothest/anti-shake)
  maxJumpThreshold: number; // Raw delta threshold for spike rejection (e.g. 2000)
  medianWindow: number; // 1 (off), 3, 5
  deadband: number; // Sub-pixel resting deadband
  enableSpikeFilter: boolean;
  offscreenReloadDelayMs: number;
}

export interface MonitorProfile {
  id: string;
  name: string;
  width: number;
  height: number;
  scaleFactor: number;
}

export interface GameProfile {
  id: string;
  name: string;
  system: string;
  description: string;
  pedalAction: 'DUCK' | 'RELOAD' | 'CUSTOM';
  offscreenReload: boolean;
  recommendedFilterStability: number;
  pcsx2ConfigSnippet: string;
}

export interface CSharpSourceFile {
  path: string;
  name: string;
  category: 'Project' | 'Views' | 'Models' | 'Services' | 'Docs';
  description: string;
  content: string;
}
