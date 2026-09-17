import { Point2D, CalibrationData } from '../types';

/**
 * Computes 3x3 perspective homography matrix mapping 4 raw source points (TL, TR, BR, BL)
 * to normalized destination unit square [0,0], [1,0], [1,1], [0,1].
 */
export function computeHomography(
  srcTL: Point2D,
  srcTR: Point2D,
  srcBR: Point2D,
  srcBL: Point2D
): number[] | null {
  const src = [srcTL, srcTR, srcBR, srcBL];
  const dst = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
  ];

  // 8x8 linear system: A * h = b
  // where h = [h00, h01, h02, h10, h11, h12, h20, h21]^T and h22 = 1.
  const A: number[][] = [];
  const b: number[] = [];

  for (let i = 0; i < 4; i++) {
    const sx = src[i].x;
    const sy = src[i].y;
    const dx = dst[i].x;
    const dy = dst[i].y;

    A.push([sx, sy, 1, 0, 0, 0, -dx * sx, -dx * sy]);
    b.push(dx);

    A.push([0, 0, 0, sx, sy, 1, -dy * sx, -dy * sy]);
    b.push(dy);
  }

  // Solve 8x8 using Gaussian Elimination with partial pivoting
  const h = solveLinearSystem(A, b);
  if (!h) return null;

  return [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1.0];
}

function solveLinearSystem(A: number[][], b: number[]): number[] | null {
  const n = 8;
  const M: number[][] = [];
  for (let i = 0; i < n; i++) {
    M.push([...A[i], b[i]]);
  }

  for (let col = 0; col < n; col++) {
    // Find pivot
    let maxRow = col;
    let maxVal = Math.abs(M[col][col]);
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(M[row][col]) > maxVal) {
        maxVal = Math.abs(M[row][col]);
        maxRow = row;
      }
    }

    if (maxVal < 1e-12) {
      return null; // Singular matrix
    }

    // Swap
    if (maxRow !== col) {
      const temp = M[col];
      M[col] = M[maxRow];
      M[maxRow] = temp;
    }

    // Eliminate
    for (let row = col + 1; row < n; row++) {
      const factor = M[row][col] / M[col][col];
      for (let j = col; j <= n; j++) {
        M[row][j] -= factor * M[col][j];
      }
    }
  }

  // Back-substitution
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = M[i][n];
    for (let j = i + 1; j < n; j++) {
      sum -= M[i][j] * x[j];
    }
    x[i] = sum / M[i][i];
  }

  return x;
}

/**
 * Transforms a raw point (0-10000) to normalized screen coordinates [0, 1]
 */
export function applyCalibration(
  raw: Point2D,
  calib: CalibrationData
): { normX: number; normY: number } {
  if (!calib.isCalibrated) {
    // Default linear mapping from measured realistic bounds (99 - 9900)
    const minVal = 100;
    const maxVal = 9900;
    const normX = Math.min(Math.max((raw.x - minVal) / (maxVal - minVal), 0), 1);
    const normY = Math.min(Math.max((raw.y - minVal) / (maxVal - minVal), 0), 1);
    return { normX, normY };
  }

  if (calib.homographyMatrix && calib.homographyMatrix.length === 9) {
    const H = calib.homographyMatrix;
    const x = raw.x;
    const y = raw.y;

    const w = H[6] * x + H[7] * y + H[8];
    if (Math.abs(w) > 1e-6) {
      const nx = (H[0] * x + H[1] * y + H[2]) / w;
      const ny = (H[3] * x + H[4] * y + H[5]) / w;
      return {
        normX: Math.min(Math.max(nx, 0), 1),
        normY: Math.min(Math.max(ny, 0), 1),
      };
    }
  }

  // Bilinear interpolation fallback
  const widthTop = calib.tr.x - calib.tl.x || 1;
  const widthBottom = calib.br.x - calib.bl.x || 1;
  const heightLeft = calib.bl.y - calib.tl.y || 1;
  const heightRight = calib.br.y - calib.tr.y || 1;

  const uTop = (raw.x - calib.tl.x) / widthTop;
  const uBottom = (raw.x - calib.bl.x) / widthBottom;
  const vLeft = (raw.y - calib.tl.y) / heightLeft;
  const vRight = (raw.y - calib.tr.y) / heightRight;

  const u = (uTop + uBottom) / 2;
  const v = (vLeft + vRight) / 2;

  return {
    normX: Math.min(Math.max(u, 0), 1),
    normY: Math.min(Math.max(v, 0), 1),
  };
}

export const DEFAULT_CALIBRATION: CalibrationData = {
  tl: { x: 850, y: 850 },
  tr: { x: 9150, y: 850 },
  br: { x: 9150, y: 9150 },
  bl: { x: 850, y: 9150 },
  isCalibrated: false,
};
