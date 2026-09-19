import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Crosshair, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  X, 
  Zap, 
  Clock, 
  Target, 
  Sliders, 
  Sparkles,
  Activity,
  Monitor,
  BookOpen,
  Play
} from 'lucide-react';
import { CalibrationCorner, CalibrationData, Point2D } from '../types';
import { computeHomography } from '../services/calibration';
import { CalibrationQuickStart, QUICK_START_GUIDES } from './CalibrationQuickStart';
import { useLanguage } from '../context/LanguageContext';

interface CalibrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCalibration: (data: CalibrationData) => void;
  currentRawX: number;
  currentRawY: number;
  isTriggerPressed: boolean;
}

const CORNERS: { 
  id: CalibrationCorner; 
  name: string;
  label: string; 
  sub: string; 
  xPct: number; 
  yPct: number;
  expectedRawX: number;
  expectedRawY: number;
}[] = [
  { 
    id: 'TL', 
    name: 'Point 1 (Top-Left)',
    label: 'Punkt 1: Lewy Górny Róg (Top-Left)', 
    sub: 'Wyceluj w czerwony celownik w lewym górnym rogu', 
    xPct: 10, 
    yPct: 10,
    expectedRawX: 1000,
    expectedRawY: 1000
  },
  { 
    id: 'TR', 
    name: 'Point 2 (Top-Right)',
    label: 'Punkt 2: Prawy Górny Róg (Top-Right)', 
    sub: 'Wyceluj w prawy górny narożnik', 
    xPct: 90, 
    yPct: 10,
    expectedRawX: 9000,
    expectedRawY: 1000
  },
  { 
    id: 'BR', 
    name: 'Point 3 (Bottom-Right)',
    label: 'Punkt 3: Prawy Dolny Róg (Bottom-Right)', 
    sub: 'Wyceluj w prawy dolny narożnik', 
    xPct: 90, 
    yPct: 90,
    expectedRawX: 9000,
    expectedRawY: 9000
  },
  { 
    id: 'BL', 
    name: 'Point 4 (Bottom-Left)',
    label: 'Punkt 4: Lewy Dolny Róg (Bottom-Left)', 
    sub: 'Wyceluj w lewy dolny narożnik', 
    xPct: 10, 
    yPct: 90,
    expectedRawX: 1000,
    expectedRawY: 9000
  },
];

export const CalibrationModal: React.FC<CalibrationModalProps> = ({
  isOpen,
  onClose,
  onSaveCalibration,
  currentRawX,
  currentRawY,
  isTriggerPressed,
}) => {
  const { t, language } = useLanguage();
  const [isQuickStart, setIsQuickStart] = useState<boolean>(true);
  const [mode, setMode] = useState<'manual' | 'auto-detect'>('manual');
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

  // Auto-Detect Sensitivity states
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTimeMs, setHoverTimeMs] = useState(0);
  const [cornerSamples, setCornerSamples] = useState<{ x: number; y: number }[]>([]);
  const [cornerMetrics, setCornerMetrics] = useState<Record<string, { jitter: number; samplesCount: number }>>({});
  
  const stageRef = useRef<HTMLDivElement>(null);
  const HOVER_REQUIRED_MS = 3000;

  // Sound generator using Web Audio
  const playChirp = useCallback((freq = 880, duration = 0.12) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio context may be restricted in some browser states
    }
  }, []);

  // Reset when opened or mode changed
  const handleReset = useCallback(() => {
    setStep(0);
    setCollectedPoints({});
    setIsCompleted(false);
    setComputedResult(null);
    setFlash(false);
    setIsHovering(false);
    setHoverTimeMs(0);
    setCornerSamples([]);
    setCornerMetrics({});
  }, []);

  useEffect(() => {
    if (isOpen) {
      handleReset();
      setIsQuickStart(true);
    }
  }, [isOpen, handleReset]);

  const triggerFlash = useCallback(() => {
    setFlash(true);
    playChirp(750, 0.1);
    setTimeout(() => setFlash(false), 180);
  }, [playChirp]);

  // Finalize calibration logic
  const finalizeCalibration = useCallback((points: { TL?: Point2D; TR?: Point2D; BR?: Point2D; BL?: Point2D }, metrics: Record<string, { jitter: number; samplesCount: number }>) => {
    const tl = points.TL || { x: 850, y: 850 };
    const tr = points.TR || { x: 9150, y: 850 };
    const br = points.BR || { x: 9150, y: 9150 };
    const bl = points.BL || { x: 850, y: 9150 };

    const matrix = computeHomography(tl, tr, br, bl) || undefined;

    // Calculate optimal ranges
    const minX = Math.min(tl.x, bl.x);
    const maxX = Math.max(tr.x, br.x);
    const minY = Math.min(tl.y, tr.y);
    const maxY = Math.max(bl.y, br.y);
    const rangeX = Math.max(100, maxX - minX);
    const rangeY = Math.max(100, maxY - minY);
    const coveragePct = Math.min(100, Math.round(((rangeX * rangeY) / 100000000) * 100));

    // Jitter calculation
    const jitterValues = Object.values(metrics).map(m => m.jitter);
    const avgJitter = jitterValues.length > 0 
      ? Math.round(jitterValues.reduce((a, b) => a + b, 0) / jitterValues.length)
      : 14;

    const recommendedStability = avgJitter < 15 ? 0.65 : avgJitter < 40 ? 0.75 : 0.85;

    const result: CalibrationData = {
      tl,
      tr,
      br,
      bl,
      isCalibrated: true,
      calibratedAt: new Date().toLocaleTimeString(),
      homographyMatrix: matrix,
      mode,
      optimalRanges: {
        minX,
        maxX,
        minY,
        maxY,
        rangeX,
        rangeY,
        jitterVariance: avgJitter,
        recommendedFilterStability: recommendedStability,
        coveragePct,
      },
    };

    setComputedResult(result);
    setIsCompleted(true);
    playChirp(1200, 0.25);
  }, [mode, playChirp]);

  // Record a corner point
  const recordCorner = useCallback((
    currentStep: number, 
    rawX: number, 
    rawY: number, 
    samples?: { x: number; y: number }[]
  ) => {
    const corner = CORNERS[currentStep];
    if (!corner) return;

    triggerFlash();

    let finalX = rawX || corner.expectedRawX;
    let finalY = rawY || corner.expectedRawY;
    let jitter = 12;

    if (samples && samples.length > 5) {
      // Calculate mean without extreme 10% outliers
      const sortedX = [...samples.map(s => s.x)].sort((a, b) => a - b);
      const sortedY = [...samples.map(s => s.y)].sort((a, b) => a - b);
      const trimStart = Math.floor(samples.length * 0.1);
      const trimEnd = Math.ceil(samples.length * 0.9);
      const trimmedX = sortedX.slice(trimStart, trimEnd);
      const trimmedY = sortedY.slice(trimStart, trimEnd);

      const meanX = trimmedX.reduce((a, b) => a + b, 0) / trimmedX.length;
      const meanY = trimmedY.reduce((a, b) => a + b, 0) / trimmedY.length;

      // Standard deviation (jitter)
      const varianceX = trimmedX.reduce((sum, val) => sum + Math.pow(val - meanX, 2), 0) / trimmedX.length;
      const varianceY = trimmedY.reduce((sum, val) => sum + Math.pow(val - meanY, 2), 0) / trimmedY.length;
      jitter = Math.round(Math.sqrt(varianceX + varianceY));

      finalX = Math.round(meanX);
      finalY = Math.round(meanY);
    }

    const nextMetrics = {
      ...cornerMetrics,
      [corner.id]: { jitter, samplesCount: samples?.length || 1 },
    };
    setCornerMetrics(nextMetrics);

    const nextPoints = {
      ...collectedPoints,
      [corner.id]: { x: finalX, y: finalY },
    };
    setCollectedPoints(nextPoints);

    // Reset hover tracking for next step
    setHoverTimeMs(0);
    setCornerSamples([]);
    setIsHovering(false);

    if (currentStep < 3) {
      setStep(currentStep + 1);
    } else {
      finalizeCalibration(nextPoints, nextMetrics);
    }
  }, [collectedPoints, cornerMetrics, finalizeCalibration, triggerFlash]);

  // Handle trigger pull in manual mode
  useEffect(() => {
    if (!isOpen || isCompleted || mode !== 'manual') return;
    if (isTriggerPressed && !lastTriggerState) {
      if (isQuickStart) {
        setIsQuickStart(false);
      } else {
        recordCorner(step, currentRawX, currentRawY);
      }
    }
    setLastTriggerState(isTriggerPressed);
  }, [isTriggerPressed, isOpen, isQuickStart, step, isCompleted, mode, currentRawX, currentRawY, lastTriggerState, recordCorner]);

  // Auto-Detect Sensitivity: 3-Second Hover Sampling Engine
  useEffect(() => {
    if (!isOpen || isCompleted || isQuickStart || mode !== 'auto-detect') return;

    const corner = CORNERS[step];
    if (!corner) return;

    // Check if raw coordinates are pointing near current corner quadrant
    const isQuadrantMatch = (
      (corner.id === 'TL' && currentRawX < 4000 && currentRawY < 4000) ||
      (corner.id === 'TR' && currentRawX > 6000 && currentRawY < 4000) ||
      (corner.id === 'BR' && currentRawX > 6000 && currentRawY > 6000) ||
      (corner.id === 'BL' && currentRawX < 4000 && currentRawY > 6000)
    );

    const activeHover = isHovering || isQuadrantMatch;

    const interval = setInterval(() => {
      if (activeHover) {
        setHoverTimeMs(prev => {
          const next = prev + 50;
          if (next >= HOVER_REQUIRED_MS) {
            // Reached 3 seconds of hover!
            return HOVER_REQUIRED_MS;
          }
          return next;
        });

        setCornerSamples(prev => [
          ...prev, 
          { x: currentRawX || corner.expectedRawX, y: currentRawY || corner.expectedRawY }
        ]);
      } else {
        // Slow decay if aim momentarily slips away (preserves progress smoothly)
        setHoverTimeMs(prev => Math.max(0, prev - 25));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen, isCompleted, isQuickStart, mode, step, isHovering, currentRawX, currentRawY]);

  // When hover time reaches 3 seconds in auto-detect mode, automatically lock corner
  useEffect(() => {
    if (mode === 'auto-detect' && !isCompleted && !isQuickStart && hoverTimeMs >= HOVER_REQUIRED_MS) {
      recordCorner(step, currentRawX, currentRawY, cornerSamples);
    }
  }, [hoverTimeMs, mode, isCompleted, isQuickStart, step, currentRawX, currentRawY, cornerSamples, recordCorner]);

  // Keyboard navigation: Space / Enter to shoot/simulate, Escape to exit, Q for Quick Start guide
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      } else if (e.code === 'KeyQ') {
        setIsQuickStart(prev => !prev);
      } else if ((e.code === 'Space' || e.code === 'Enter') && !isCompleted) {
        e.preventDefault();
        if (isQuickStart) {
          setIsQuickStart(false);
          return;
        }
        if (mode === 'manual') {
          recordCorner(step, currentRawX, currentRawY);
        } else {
          // In auto mode, pressing space fills/advances sampling
          setIsHovering(true);
          setHoverTimeMs(prev => Math.min(HOVER_REQUIRED_MS, prev + 1000));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isCompleted, isQuickStart, step, mode, currentRawX, currentRawY, onClose, recordCorner]);

  // Detect mouse hover position over stage to trigger auto-detect radius
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== 'auto-detect' || isCompleted || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const corner = CORNERS[step];
    if (!corner) return;

    const cornerPixelX = (corner.xPct / 100) * rect.width;
    const cornerPixelY = (corner.yPct / 100) * rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dist = Math.hypot(mouseX - cornerPixelX, mouseY - cornerPixelY);
    // Radius of 130px counts as hovering over corner
    setIsHovering(dist <= 130);
  };

  const handleApply = () => {
    if (computedResult) {
      onSaveCalibration(computedResult);
      onClose();
    }
  };

  if (!isOpen) return null;

  const currentCorner = CORNERS[step];
  const hoverProgress = Math.min(1, hoverTimeMs / HOVER_REQUIRED_MS);
  const remainingSeconds = Math.max(0, ((HOVER_REQUIRED_MS - hoverTimeMs) / 1000)).toFixed(1);

  // SVG Circle calculation for 3-second gauge
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - hoverProgress);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 md:p-6 select-none animate-in fade-in duration-200">
      {/* Top Header & Mode Toggle Bar */}
      <div className="border-b border-neutral-800 pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-['Chakra_Petch'] text-lg md:text-xl font-bold text-neutral-100 flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-amber-400" />
                {t.calibModalTitle || "KALIBRACJA 4 PUNKTÓW G'AIM'E"}
              </h2>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-cyan-400">
                {t.calibHomographyBadge || "Homography 3×3"}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              {t.calibModalSubtitle || "Koryguje zniekształcenia perspektywiczne i wyznacza optymalne zakresy wejściowe matrycy"}
            </p>
          </div>

          {/* Mode Switcher & Actions */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Mode Toggle Pills */}
            <div className="flex items-center bg-neutral-900/90 border border-neutral-800 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setIsQuickStart(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  isQuickStart
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-neutral-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>{t.calibModeQuickStart || '🚀 Szybki Start (Przewodnik)'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsQuickStart(false);
                  setMode('manual');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  !isQuickStart && mode === 'manual'
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>{t.calibModeManual || 'Tryb Strzału'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsQuickStart(false);
                  setMode('auto-detect');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  !isQuickStart && mode === 'auto-detect'
                    ? 'bg-cyan-500 text-neutral-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.calibModeAutoDetect || 'Auto-Wykrywanie Czułości'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white cursor-pointer"
              title="Resetuj wszystkie punkty"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.calibResetBtn || 'Resetuj'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Points Status Strip (only shown during live calibration) */}
        {!isQuickStart && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 animate-in fade-in duration-150">
            {CORNERS.map((c, index) => {
              const isCaptured = Boolean(collectedPoints[c.id]);
              const isActive = step === index && !isCompleted;
              const isWaiting = step < index && !isCompleted;
              const pt = collectedPoints[c.id];

              return (
                <div
                  key={c.id}
                  className={`p-2.5 rounded-lg border transition-all relative overflow-hidden ${
                    isCaptured
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : isActive
                      ? 'bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-500/30 text-cyan-200 shadow-md shadow-cyan-500/10'
                      : 'bg-neutral-900/40 border-neutral-800/80 text-neutral-500'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <span className="text-xs font-bold font-mono tracking-tight flex items-center gap-1.5">
                      {isCaptured ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : isActive ? (
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                        </span>
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      )}
                      Point {index + 1}: {c.id}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                        isCaptured
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 animate-pulse'
                          : 'bg-neutral-800/60 text-neutral-500 border border-neutral-700/50'
                      }`}
                    >
                      {isCaptured
                        ? 'Captured'
                        : isActive
                        ? mode === 'auto-detect'
                          ? isHovering
                            ? `Hover ${remainingSeconds}s`
                            : 'Waiting'
                          : 'Active'
                        : 'Waiting'}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono truncate">
                    {isCaptured ? (
                      <span className="text-emerald-400 font-medium">
                        RAW: ({pt?.x}, {pt?.y})
                      </span>
                    ) : isActive ? (
                      <span className="text-cyan-300">
                        {mode === 'auto-detect'
                          ? isHovering
                            ? `Zbieranie (${cornerSamples.length} prób.)`
                            : 'Przetrzymaj 3s'
                          : 'Wyceluj i naciśnij spust'}
                      </span>
                    ) : (
                      <span className="text-neutral-500">Oczekuje w kolejce</span>
                    )}
                  </div>

                  {/* Progress bar inside active card if auto-detect mode */}
                  {isActive && mode === 'auto-detect' && (
                    <div className="mt-1.5 w-full bg-neutral-900 rounded-full h-1 overflow-hidden border border-neutral-800">
                      <div
                        className="bg-cyan-400 h-full transition-all duration-75 ease-linear"
                        style={{ width: `${Math.round(hoverProgress * 100)}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Content: Quick Start Guide vs Calibration Stage */}
      {isQuickStart ? (
        <CalibrationQuickStart
          language={language}
          activeMode={mode}
          onSelectMode={setMode}
          onStartCalibration={(startCornerIndex) => {
            if (typeof startCornerIndex === 'number') {
              setStep(startCornerIndex);
            }
            setIsQuickStart(false);
          }}
          onClose={onClose}
          collectedPoints={collectedPoints}
        />
      ) : (
        /* Main Calibration Stage */
        <div 
          ref={stageRef}
          onMouseMove={handleStageMouseMove}
          onClick={() => {
            if (!isCompleted && mode === 'manual') {
              recordCorner(step, currentRawX, currentRawY);
            }
          }}
          className="relative flex-1 my-3 border border-neutral-800/80 rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center cursor-crosshair"
        >
          {/* White Shot Flash Effect */}
          <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-150 z-20 ${flash ? 'opacity-40' : 'opacity-0'}`} />

          {/* Previous Captured Markers with Coordinates */}
          {CORNERS.map((c, i) => {
            const pt = collectedPoints[c.id];
            if (!pt) return null;
            return (
              <div
                key={c.id}
                style={{ left: `${c.xPct}%`, top: `${c.yPct}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-10 animate-in zoom-in-50 duration-200"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 font-bold text-xs shadow-lg shadow-emerald-500/30 backdrop-blur-sm">
                  ✓ {i + 1}
                </div>
                <div className="mt-1 px-2 py-0.5 rounded bg-black/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 whitespace-nowrap shadow">
                  ({pt.x}, {pt.y})
                </div>
              </div>
            );
          })}

          {/* Center Instructions Overlay */}
          {!isCompleted ? (
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="text-center max-w-lg bg-neutral-900/95 border border-neutral-800 p-5 rounded-xl backdrop-blur relative z-10 shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-center gap-2">
                <span className={`text-xs font-mono uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                  mode === 'auto-detect' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  KROK {step + 1} Z 4 &bull; {currentCorner.name}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-1">{currentCorner.label}</h3>
                <p className="text-xs text-neutral-300">{currentCorner.sub}</p>
              </div>

              {/* Quick Start Guidance Box for Active Corner */}
              <div className="bg-neutral-950/90 rounded-lg p-3 border border-cyan-500/30 text-left space-y-1.5 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>
                      {language === 'pl' ? QUICK_START_GUIDES[step]?.titlePl : QUICK_START_GUIDES[step]?.titleEn}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsQuickStart(true)}
                    className="shrink-0 px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-cyan-300 text-[10px] font-semibold border border-neutral-700 flex items-center gap-1 cursor-pointer"
                    title={language === 'pl' ? 'Otwórz pełny przewodnik' : 'Open full guide'}
                  >
                    <BookOpen className="w-3 h-3 text-cyan-400" />
                    <span>{language === 'pl' ? 'Przewodnik' : 'Guide'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  {language === 'pl' ? QUICK_START_GUIDES[step]?.descPl : QUICK_START_GUIDES[step]?.descEn}
                </p>
                <div className="text-[10px] text-amber-400/90 font-mono">
                  💡 {language === 'pl' ? QUICK_START_GUIDES[step]?.tipPl : QUICK_START_GUIDES[step]?.tipEn}
                </div>
              </div>

              {/* Auto-Detect Sensitivity instructions & progress */}
              {mode === 'auto-detect' ? (
                <div className="bg-neutral-950/90 border border-cyan-500/30 rounded-lg p-3 text-left space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Auto-Wykrywanie Czułości:
                    </span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {isHovering ? `Zbieranie: ${remainingSeconds}s` : 'Najedź na narożnik'}
                    </span>
                  </div>

                  <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden border border-neutral-800">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-75 ease-linear"
                      style={{ width: `${Math.round(hoverProgress * 100)}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-neutral-400">
                    {isHovering ? (
                      <span className="text-emerald-300 font-medium animate-pulse">
                        ● Trzymaj celownik stabilnie... Próbki: {cornerSamples.length}
                      </span>
                    ) : (
                      <span>💡 Przytrzymaj celownik w kółku przez 3 sekundy. Zostanie zebrana próbka szumu i wyznaczona czułość.</span>
                    )}
                  </p>
                </div>
              ) : (
                <div className="inline-block font-mono text-xs bg-neutral-950 px-3 py-1 rounded text-cyan-300 border border-neutral-800">
                  Bieżące RAW: X={currentRawX} | Y={currentRawY}
                </div>
              )}

              <div className="text-[11px] text-neutral-400 pt-1 flex items-center justify-center gap-2">
                <span>💡 Wciśnij</span>
                <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-cyan-300 font-mono text-[10px]">SPACJĘ</kbd>
                <span>lub strzel pistoletem G'AIM'E</span>
              </div>
            </div>
          ) : (
            /* Completion & Summary Report Card */
            <div 
              onClick={(e) => e.stopPropagation()}
              className="text-center max-w-xl bg-neutral-900/95 border border-neutral-800 p-6 rounded-xl backdrop-blur space-y-4 relative z-10 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Kalibracja Zakończona Sukcesem!</h3>
                <p className="text-xs text-neutral-300 mt-1">
                  Wszystkie 4 punkty narożne zostały pomyślnie przechwycone i skompensowane.
                </p>
              </div>

              {/* Optimal Ranges & Sensitivity breakdown if auto-detected */}
              {computedResult?.optimalRanges && (
                <div className="bg-neutral-950 rounded-lg p-4 border border-cyan-500/30 text-left space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      WYKRYTE ZAKRESY I PROFIL CZUŁOŚCI:
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Auto-Range Engine
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-neutral-300">
                    <div className="bg-neutral-900/80 p-2.5 rounded border border-neutral-800">
                      <div className="text-neutral-500 text-[10px] font-sans uppercase">Zakres Poziomy (Oś X)</div>
                      <div className="text-cyan-300 font-bold mt-0.5">
                        {computedResult.optimalRanges.minX} &rarr; {computedResult.optimalRanges.maxX}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        Rozpiętość: {computedResult.optimalRanges.rangeX} jedn. RAW
                      </div>
                    </div>

                    <div className="bg-neutral-900/80 p-2.5 rounded border border-neutral-800">
                      <div className="text-neutral-500 text-[10px] font-sans uppercase">Zakres Pionowy (Oś Y)</div>
                      <div className="text-cyan-300 font-bold mt-0.5">
                        {computedResult.optimalRanges.minY} &rarr; {computedResult.optimalRanges.maxY}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        Rozpiętość: {computedResult.optimalRanges.rangeY} jedn. RAW
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="bg-neutral-900/60 p-2 rounded border border-neutral-800">
                      <div className="text-[10px] text-neutral-500">POZIOM SZUMU</div>
                      <div className="text-emerald-400 font-bold text-xs mt-0.5">
                        &plusmn;{computedResult.optimalRanges.jitterVariance} RAW
                      </div>
                    </div>
                    <div className="bg-neutral-900/60 p-2 rounded border border-neutral-800">
                      <div className="text-[10px] text-neutral-500">POLE WIDZENIA</div>
                      <div className="text-cyan-300 font-bold text-xs mt-0.5">
                        {computedResult.optimalRanges.coveragePct}% matrycy
                      </div>
                    </div>
                    <div className="bg-neutral-900/60 p-2 rounded border border-neutral-800">
                      <div className="text-[10px] text-neutral-500">REK. FILTR</div>
                      <div className="text-amber-400 font-bold text-xs mt-0.5">
                        {(computedResult.optimalRanges.recommendedFilterStability * 100).toFixed(0)}% stab.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Corner Coordinates List */}
              <div className="bg-neutral-950 rounded p-3 border border-neutral-800 font-mono text-[11px] text-neutral-300 text-left">
                <div className="text-neutral-500 text-[10px] mb-1 font-semibold">SKALIBROWANE NAROŻNIKI RAW:</div>
                <div className="grid grid-cols-2 gap-1 text-emerald-400">
                  <span>Point 1 (TL): ({collectedPoints.TL?.x}, {collectedPoints.TL?.y})</span>
                  <span>Point 2 (TR): ({collectedPoints.TR?.x}, {collectedPoints.TR?.y})</span>
                  <span>Point 3 (BR): ({collectedPoints.BR?.x}, {collectedPoints.BR?.y})</span>
                  <span>Point 4 (BL): ({collectedPoints.BL?.x}, {collectedPoints.BL?.y})</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold cursor-pointer"
                >
                  Powtórz Kalibrację
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-bold shadow-lg shadow-cyan-500/20 cursor-pointer"
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
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={(e) => {
                e.stopPropagation();
                recordCorner(step, currentRawX, currentRawY, cornerSamples);
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            >
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Circular SVG 3-Second Hover Countdown Ring for Auto-Detect */}
                {mode === 'auto-detect' ? (
                  <svg className="absolute inset-0 w-28 h-28 -rotate-90 pointer-events-none">
                    {/* Background Track */}
                    <circle
                      cx="56"
                      cy="56"
                      r={radius}
                      className="stroke-neutral-800"
                      strokeWidth="4"
                      fill="transparent"
                    />
                    {/* Progress Fill */}
                    <circle
                      cx="56"
                      cy="56"
                      r={radius}
                      stroke={hoverProgress >= 1 ? '#10B981' : '#06B6D4'}
                      strokeWidth="4"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-75 ease-linear"
                    />
                  </svg>
                ) : (
                  <div className="absolute inset-2 rounded-full border-2 border-rose-500 animate-ping opacity-60" />
                )}

                {/* Concentric rings */}
                <div className={`absolute inset-4 rounded-full border-2 transition-all ${
                  mode === 'auto-detect' 
                    ? isHovering 
                      ? 'border-cyan-400 bg-cyan-500/20 scale-105' 
                      : 'border-cyan-500/70 bg-cyan-500/10'
                    : 'border-rose-500 bg-rose-500/20 group-hover:bg-rose-500/40'
                }`} />

                {/* Center point */}
                <div className={`w-3.5 h-3.5 rounded-full shadow-lg transition-all ${
                  mode === 'auto-detect'
                    ? isHovering ? 'bg-cyan-300 shadow-cyan-400/80 scale-125' : 'bg-white shadow-white/50'
                    : 'bg-white shadow-white/50'
                }`} />

                {/* Crosshair lines */}
                <div className={`absolute w-28 h-[2px] pointer-events-none ${
                  mode === 'auto-detect' ? 'bg-cyan-400/80' : 'bg-rose-500/80'
                }`} />
                <div className={`absolute h-28 w-[2px] pointer-events-none ${
                  mode === 'auto-detect' ? 'bg-cyan-400/80' : 'bg-rose-500/80'
                }`} />

                {/* Auto-Detect 3s Timer Badge or Manual Step Number */}
                <div className="absolute -bottom-7 px-2 py-0.5 rounded-full bg-neutral-900/90 border border-neutral-700 text-[11px] font-mono font-bold whitespace-nowrap shadow-lg flex items-center gap-1">
                  {mode === 'auto-detect' ? (
                    <>
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span className={isHovering ? 'text-cyan-300 font-bold' : 'text-neutral-400'}>
                        {isHovering ? `${remainingSeconds}s` : '3.0s'}
                      </span>
                    </>
                  ) : (
                    <span className="text-amber-400">Point {step + 1}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer info and keyboard shortcuts */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-mono gap-2 pt-1 border-t border-neutral-900">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-cyan-400">
            <Crosshair className="w-3.5 h-3.5" />
            {language === 'pl' ? 'Tryb' : 'Mode'}: {
              isQuickStart
                ? (language === 'pl' ? 'Przewodnik Szybki Start' : 'Quick Start Guide')
                : mode === 'auto-detect'
                ? (language === 'pl' ? 'Auto-Wykrywanie Czułości (3s Hover)' : 'Auto-Detect Sensitivity (3s Hover)')
                : (language === 'pl' ? 'Manualny Strzał (Spust/Klik)' : 'Manual Shoot (Trigger/Click)')
            }
          </span>
          <span className="hidden md:inline text-neutral-600">|</span>
          <span className="hidden md:inline text-neutral-400">
            {language === 'pl' ? 'Bieżący cel' : 'Current Target'}: <strong className="text-white">{currentCorner?.name}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3 text-neutral-500">
          <button
            type="button"
            onClick={() => setIsQuickStart(prev => !prev)}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-cyan-300 font-mono text-[10px]">Q</kbd>
            <span>{isQuickStart ? (language === 'pl' ? 'Zamknij Przewodnik' : 'Close Guide') : (language === 'pl' ? 'Przewodnik' : 'Guide')}</span>
          </button>
          <span>SPACJA / ENTER = {isQuickStart ? (language === 'pl' ? 'Rozpocznij' : 'Start') : (language === 'pl' ? 'Strzał / Próbkuj' : 'Shoot / Sample')}</span>
          <span>ESC = {language === 'pl' ? 'Anuluj' : 'Cancel'}</span>
        </div>
      </div>
    </div>
  );
};
