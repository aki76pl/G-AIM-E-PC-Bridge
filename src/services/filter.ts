import { FilterSettings, Point2D } from '../types';

export class LightgunFilterPipeline {
  private historyX: number[] = [];
  private historyY: number[] = [];
  private lastValidOutput: Point2D | null = null;
  private consecutiveOutliers = 0;
  private lastJumpMagnitude = 0;
  private rejectedCount = 0;

  constructor(private settings: FilterSettings) {}

  public updateSettings(newSettings: FilterSettings) {
    this.settings = { ...newSettings };
  }

  public process(rawX: number, rawY: number): {
    point: Point2D;
    isRejected: boolean;
    jumpMagnitude: number;
    totalRejected: number;
  } {
    // 1. Spike / Wild jump detection
    if (this.lastValidOutput && this.settings.enableSpikeFilter) {
      const dx = rawX - this.lastValidOutput.x;
      const dy = rawY - this.lastValidOutput.y;
      const jumpDist = Math.hypot(dx, dy);
      this.lastJumpMagnitude = Math.round(jumpDist);

      // If jump exceeds threshold and is a single erratic spike
      if (jumpDist > this.settings.maxJumpThreshold) {
        this.consecutiveOutliers++;
        // If it persists for more than 4 consecutive frames, assume user made a rapid real flick
        if (this.consecutiveOutliers <= 4) {
          this.rejectedCount++;
          return {
            point: { ...this.lastValidOutput },
            isRejected: true,
            jumpMagnitude: this.lastJumpMagnitude,
            totalRejected: this.rejectedCount,
          };
        }
      } else {
        this.consecutiveOutliers = 0;
      }
    } else {
      this.consecutiveOutliers = 0;
      this.lastJumpMagnitude = 0;
    }

    // 2. Median filter buffer
    const windowSize = Math.max(1, this.settings.medianWindow);
    this.historyX.push(rawX);
    this.historyY.push(rawY);
    if (this.historyX.length > windowSize) {
      this.historyX.shift();
      this.historyY.shift();
    }

    let medianX = rawX;
    let medianY = rawY;
    if (windowSize > 1 && this.historyX.length >= windowSize) {
      const sortedX = [...this.historyX].sort((a, b) => a - b);
      const sortedY = [...this.historyY].sort((a, b) => a - b);
      const mid = Math.floor(sortedX.length / 2);
      medianX = sortedX[mid];
      medianY = sortedY[mid];
    }

    // 3. Exponential Moving Average (EMA) smoothing
    // stabilityVsSpeed: 0.0 => alpha = 1.0 (pure raw speed, 0 lag)
    // stabilityVsSpeed: 1.0 => alpha = 0.12 (heavy smoothing, maximum rock-steady)
    const alpha = Math.max(0.12, 1.0 - this.settings.stabilityVsSpeed * 0.88);

    let outputX = medianX;
    let outputY = medianY;

    if (this.lastValidOutput) {
      outputX = this.lastValidOutput.x + alpha * (medianX - this.lastValidOutput.x);
      outputY = this.lastValidOutput.y + alpha * (medianY - this.lastValidOutput.y);

      // 4. Micro-jitter deadband
      const ddx = outputX - this.lastValidOutput.x;
      const ddy = outputY - this.lastValidOutput.y;
      if (Math.hypot(ddx, ddy) < this.settings.deadband) {
        outputX = this.lastValidOutput.x;
        outputY = this.lastValidOutput.y;
      }
    }

    const finalPoint: Point2D = {
      x: Math.round(outputX),
      y: Math.round(outputY),
    };

    this.lastValidOutput = finalPoint;

    return {
      point: finalPoint,
      isRejected: false,
      jumpMagnitude: this.lastJumpMagnitude,
      totalRejected: this.rejectedCount,
    };
  }

  public reset() {
    this.historyX = [];
    this.historyY = [];
    this.lastValidOutput = null;
    this.consecutiveOutliers = 0;
    this.lastJumpMagnitude = 0;
    this.rejectedCount = 0;
  }
}
