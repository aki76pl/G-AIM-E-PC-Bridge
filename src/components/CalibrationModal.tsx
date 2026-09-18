import React, { useState, useEffect } from 'react';
import { Crosshair, CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-react';
import { CalibrationCorner, CalibrationData, Point2D } from '../types';
import { computeHomography, DEFAULT_CALIBRATION } from '../services/calibration';

interface CalibrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCalibration: (data: CalibrationData) => void;
  currentRawX: number;
  currentRawY: number;
  isTriggerPressed: boolean;
}

const CORNERS: { id: CalibrationCorner; label: string; sub: string; xPct: number; yPct: number }[] = [
  { id: 'TL', label: '1/4: Lewy Górny Róg (Top-Left)', sub: 'Wyceluj w czerwony celownik i naciśnij spust', xPct: 10, yPct: 10 },
  { id: 'TR', label: '2/4: Prawy Górny Róg (Top-Right)', sub: 'Wyceluj w prawy górny narożnik i strzel', xPct: 90, yPct: 10 },
  { id: 'BR', label: '3/4: Prawy Dolny Róg (Bottom-Right)', sub: 'Wyceluj w prawy dolny narożnik i strzel', xPct: 90, yPct: 90 },
  { id: 'BL', label: '4/4: Lewy Dolny Róg (Bottom-Left)', sub: 'Wyceluj w lewy dolny narożnik i strzel', xPct: 10, yPct: 90 },
];

export const CalibrationModal: React.FC<CalibrationModalProps> = ({
  isOpen,
  onClose,
  onSaveCalibration,
  currentRawX,
  currentRawY,
  isTriggerPressed,
}) => {
  const [step, setStep] = useState<number>(0);
  const [collectedPoints, setCollectedPoints] = useState<{
    TL?: Point2D;
    TR?: Point2D;
    BR?: Point2D;
    BL?: Point2D;
  }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [computedResult, setComputedResult] = useState<CalibrationData | null>(null);
  const [flash, setFlash] = useState(false);
  const [lastTriggerState, setLastTriggerState] = useState(false);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setCollectedPoints({});
      setIsCompleted(false);
      setComputedResult(null);
      setFlash(false);
    }
  }, [isOpen]);

  // Handle trigger pull from physical or simulated lightgun (edge-triggered)
  useEffect(() => {
    if (!isOpen || isCompleted) return;
    if (isTriggerPressed && !lastTriggerState) {
      recordCorner(step, currentRawX, currentRawY);
    }
    setLastTriggerState(isTriggerPressed);
  }, [isTriggerPressed, isOpen, step, isCompleted, currentRawX, currentRawY, lastTriggerState]);

  // Keyboard support: Space / Enter to shoot current target, Esc to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      } else if ((e.code === 'Space' || e.code === 'Enter') && !isCompleted) {
        e.preventDefault();
        recordCorner(step, currentRawX, currentRawY);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isCompleted, step, currentRawX, currentRawY, onClose]);

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 180);
  };

  const recordCorner = (currentStep: number, rawX: number, rawY: number) => {
    const corner = CORNERS[currentStep];
    if (!corner) return;

    triggerFlash();

    const nextPoints = {
      ...collectedPoints,
      [corner.id]: { x: rawX || 5000, y: rawY || 5000 },
    };
    setCollectedPoints(nextPoints);

    if (currentStep < 3) {
      setStep(currentStep + 1);
    } else {
      // All 4 points collected! Compute Homography
      const tl = nextPoints.TL || { x: 850, y: 850 };
      const tr = nextPoints.TR || { x: 9150, y: 850 };
      const br = nextPoints.BR || { x: 9150, y: 9150 };
      const bl = nextPoints.BL || { x: 850, y: 9150 };

      const matrix = computeHomography(tl, tr, br, bl) || undefined;

      const result: CalibrationData = {
        tl,
        tr,
        br,
        bl,
        isCalibrated: true,
        calibratedAt: new Date().toLocaleTimeString(),
        homographyMatrix: matrix,
      };

      setComputedResult(result);
      setIsCompleted(true);
    }
  };

  const handleApply = () => {
    if (computedResult) {
      onSaveCalibration(computedResult);
      onClose();
    }
  };

  const handleReset = () => {
    setStep(0);
    setCollectedPoints({});
    setIsCompleted(false);
    setComputedResult(null);
  };

  if (!isOpen) return null;

  const currentCorner = CORNERS[step];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6 select-none animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <h2 className="font-['Chakra_Petch'] text-xl font-bold text-neutral-100 flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-amber-400" />
            KALIBRACJA 4 PUNKTÓW G'AIM'E
          </h2>
          <p className="text-xs text-neutral-400">
            Koryguje zniekształcenia perspektywiczne i kątowe kamery pistoletu
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resetuj</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Calibration Stage */}
      <div 
        onClick={() => {
          if (!isCompleted) {
            recordCorner(step, currentRawX, currentRawY);
          }
        }}
        className="relative flex-1 my-4 border border-neutral-800/80 rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center cursor-crosshair"
      >
        {/* White Shot Flash Effect */}
        <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-150 z-20 ${flash ? 'opacity-40' : 'opacity-0'}`} />

        {/* Previous Captured Markers */}
        {CORNERS.map((c, i) => {
          if (i >= step) return null;
          return (
            <div
              key={c.id}
              style={{ left: `${c.xPct}%`, top: `${c.yPct}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 font-bold text-xs shadow-lg shadow-emerald-500/30">
                ✓ {i + 1}
              </div>
            </div>
          );
        })}

        {/* Instruction overlay in center */}
        {!isCompleted ? (
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="text-center max-w-md bg-neutral-900/90 border border-neutral-800 p-5 rounded-xl backdrop-blur relative z-10 shadow-2xl"
          >
            <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest block mb-1">
              Krok {step + 1} z 4
            </span>
            <h3 className="text-lg font-bold text-white mb-1">{currentCorner.label}</h3>
            <p className="text-xs text-neutral-300 mb-3">{currentCorner.sub}</p>
            <div className="inline-block font-mono text-xs bg-neutral-950 px-3 py-1 rounded text-cyan-300 border border-neutral-800">
              Bieżące RAW: X={currentRawX} | Y={currentRawY}
            </div>
            <p className="text-[11px] text-neutral-400 mt-2 font-medium">
              💡 Naciśnij <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-cyan-300 font-mono text-[10px]">SPACJĘ</kbd>, kliknij myszą lub strzel pistoletem G'AIM'E
            </p>
          </div>
        ) : (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="text-center max-w-lg bg-neutral-900/90 border border-neutral-800 p-6 rounded-xl backdrop-blur space-y-4 relative z-10 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Kalibracja Zakończona Sukcesem!</h3>
              <p className="text-xs text-neutral-300">
                Wyliczono 3×3 macierz homografii perspektywicznej. Od tego momentu środek i narożniki ekranu odpowiadają rzeczywistemu celowaniu.
              </p>
            </div>

            {/* Matrix preview */}
            <div className="bg-neutral-950 rounded p-3 border border-neutral-800 font-mono text-[11px] text-neutral-300 text-left">
              <div className="text-neutral-500 text-[10px] mb-1 font-semibold">ZAREJESTROWANE WSPÓŁRZĘDNE RAW:</div>
              <div className="grid grid-cols-2 gap-1 text-cyan-300">
                <span>TL: ({collectedPoints.TL?.x}, {collectedPoints.TL?.y})</span>
                <span>TR: ({collectedPoints.TR?.x}, {collectedPoints.TR?.y})</span>
                <span>BL: ({collectedPoints.BL?.x}, {collectedPoints.BL?.y})</span>
                <span>BR: ({collectedPoints.BR?.x}, {collectedPoints.BR?.y})</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold"
              >
                Powtórz Kalibrację
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-bold shadow-lg shadow-cyan-500/20"
              >
                Zastosuj i Zapisz
              </button>
            </div>
          </div>
        )}

        {/* Active Target Reticle in current corner */}
        {!isCompleted && (
          <div
            style={{
              left: `${currentCorner.xPct}%`,
              top: `${currentCorner.yPct}%`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              recordCorner(step, currentRawX, currentRawY);
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
          >
            {/* Animated Concentric Rings */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-rose-500 animate-ping opacity-60" />
              <div className="absolute inset-1 rounded-full border-2 border-rose-500 bg-rose-500/20 group-hover:bg-rose-500/40 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50" />
              <div className="absolute w-24 h-[2px] bg-rose-500/80 pointer-events-none" />
              <div className="absolute h-24 w-[2px] bg-rose-500/80 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
        <span>G'AIM'E Projective Homography Engine</span>
        <span>Naciśnij ESC lub krzyżyk, aby wyjść</span>
      </div>
    </div>
  );
};
