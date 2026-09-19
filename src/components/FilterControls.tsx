import React, { useState, useEffect, useRef } from 'react';
import {
  Sliders,
  ShieldAlert,
  Sparkles,
  Gauge,
  ZapOff,
  Crosshair,
  CheckCircle2,
  RefreshCw,
  X,
  Activity,
} from 'lucide-react';
import { FilterSettings } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FilterControlsProps {
  filterSettings: FilterSettings;
  onUpdateSettings: (newSettings: FilterSettings) => void;
  lastJumpMagnitude: number;
  totalRejectedJumps: number;
  onInjectTestSpike: () => void;
  currentRawX?: number;
  currentRawY?: number;
  isGunConnected?: boolean;
}

interface AutoLearnResult {
  stdDev: number;
  maxDelta: number;
  sampleCount: number;
  recommendedMedian: number;
  recommendedStability: number;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filterSettings,
  onUpdateSettings,
  lastJumpMagnitude,
  totalRejectedJumps,
  onInjectTestSpike,
  currentRawX = 5000,
  currentRawY = 5000,
  isGunConnected = false,
}) => {
  const { t, language } = useLanguage();

  // Auto-learning state
  const [isAutoLearning, setIsAutoLearning] = useState(false);
  const [learningCountdown, setLearningCountdown] = useState<number>(2.0);
  const [learningResult, setLearningResult] = useState<AutoLearnResult | null>(null);
  const [liveJitterValue, setLiveJitterValue] = useState<number>(0);
  const [collectedSampleCount, setCollectedSampleCount] = useState<number>(0);

  const samplesRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const latestCoordRef = useRef<{ x: number; y: number }>({ x: currentRawX, y: currentRawY });

  useEffect(() => {
    latestCoordRef.current = { x: currentRawX, y: currentRawY };
  }, [currentRawX, currentRawY]);

  // Start the 2-second auto-learning session
  const startAutoLearning = () => {
    setIsAutoLearning(true);
    setLearningCountdown(2.0);
    setLearningResult(null);
    setLiveJitterValue(0);
    setCollectedSampleCount(0);
    samplesRef.current = [];

    const startTime = performance.now();
    const durationMs = 2000;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, (durationMs - elapsed) / 1000);
      setLearningCountdown(parseFloat(remaining.toFixed(1)));

      // Collect sample
      let x = latestCoordRef.current.x;
      let y = latestCoordRef.current.y;

      // If simulated / not physical gun, simulate realistic optical sensor IR micro-jitter around aim point
      if (!isGunConnected) {
        const noiseAmplitude = 3.5; // typical lightgun IR sensor noise ~2-6 units
        const randAngle = Math.random() * Math.PI * 2;
        const randR = (Math.random() - 0.5) * noiseAmplitude;
        x += Math.cos(randAngle) * randR;
        y += Math.sin(randAngle) * randR;
      }

      samplesRef.current.push({ x, y, time: performance.now() });
      setCollectedSampleCount(samplesRef.current.length);

      // Compute rolling jitter
      if (samplesRef.current.length > 5) {
        const lastFew = samplesRef.current.slice(-15);
        const avgX = lastFew.reduce((acc, s) => acc + s.x, 0) / lastFew.length;
        const avgY = lastFew.reduce((acc, s) => acc + s.y, 0) / lastFew.length;
        const variance =
          lastFew.reduce(
            (acc, s) => acc + Math.pow(s.x - avgX, 2) + Math.pow(s.y - avgY, 2),
            0
          ) / lastFew.length;
        setLiveJitterValue(parseFloat(Math.sqrt(variance).toFixed(2)));
      }

      // Finish session
      if (elapsed >= durationMs) {
        clearInterval(interval);
        finishAutoLearning();
      }
    }, 40); // 25 Hz sampling
  };

  const finishAutoLearning = () => {
    const samples = samplesRef.current;
    if (samples.length < 5) {
      setIsAutoLearning(false);
      return;
    }

    // Compute standard deviation (RMS jitter)
    const n = samples.length;
    const meanX = samples.reduce((acc, s) => acc + s.x, 0) / n;
    const meanY = samples.reduce((acc, s) => acc + s.y, 0) / n;

    let sumSqDist = 0;
    let maxDelta = 0;

    for (let i = 0; i < n; i++) {
      const distFromMean = Math.pow(samples[i].x - meanX, 2) + Math.pow(samples[i].y - meanY, 2);
      sumSqDist += distFromMean;

      if (i > 0) {
        const delta = Math.sqrt(
          Math.pow(samples[i].x - samples[i - 1].x, 2) +
            Math.pow(samples[i].y - samples[i - 1].y, 2)
        );
        if (delta > maxDelta) maxDelta = delta;
      }
    }

    const stdDev = Math.sqrt(sumSqDist / n);

    // Auto-tune logic based on measured physical jitter
    let recMedian = 3;
    let recStability = 0.35;

    if (stdDev < 2.0 && maxDelta < 25) {
      // Extremely clean signal (no median delay needed, ultra-fast)
      recMedian = 1;
      recStability = 0.20;
    } else if (stdDev <= 5.5) {
      // Standard lightgun optical noise (balanced 3-sample median)
      recMedian = 3;
      recStability = 0.35;
    } else if (stdDev <= 12.0) {
      // Elevated noise / room reflection (slight extra smoothing)
      recMedian = 3;
      recStability = 0.52;
    } else {
      // High optical noise / fluorescent light flicker
      recMedian = 5;
      recStability = 0.68;
    }

    const result: AutoLearnResult = {
      stdDev: parseFloat(stdDev.toFixed(2)),
      maxDelta: parseFloat(maxDelta.toFixed(1)),
      sampleCount: n,
      recommendedMedian: recMedian,
      recommendedStability: recStability,
    };

    setLearningResult(result);

    // Auto-apply optimal settings immediately
    onUpdateSettings({
      ...filterSettings,
      medianWindow: recMedian,
      stabilityVsSpeed: recStability,
      enableSpikeFilter: true,
    });
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 lg:p-5 flex flex-col gap-4">
      {/* Title & Auto-Learn Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-3 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-['Chakra_Petch'] font-bold text-sm tracking-wide text-neutral-200">
              {t.filterTitle}
            </h3>
            <p className="text-xs text-neutral-400">{t.filterSubtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Total rejected badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-neutral-400">{t.rejectedJumpsLabel}</span>
            <span className="text-amber-400 font-bold">{totalRejectedJumps}</span>
          </div>

          {/* Auto-Learn Button */}
          <button
            id="btn-auto-learn-filter"
            type="button"
            onClick={startAutoLearning}
            disabled={isAutoLearning && !learningResult}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all active:scale-95 shadow-sm shadow-cyan-500/10 cursor-pointer"
            title={t.autoLearnBtnTitle}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>{t.autoLearnBtn}</span>
          </button>
        </div>
      </div>

      {/* Auto-Learning Interactive Modal / Box */}
      {isAutoLearning && (
        <div className="bg-neutral-950 border border-cyan-500/40 rounded-xl p-4 flex flex-col gap-3 relative animate-fadeIn shadow-lg shadow-cyan-950/40">
          <button
            type="button"
            onClick={() => setIsAutoLearning(false)}
            className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-200 p-1 rounded-md"
            title={language === 'pl' ? 'Zamknij' : 'Close'}
          >
            <X className="w-4 h-4" />
          </button>

          {!learningResult ? (
            // Phase 1: 2-Second Hold Still & Sampling
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                <Crosshair className="w-4 h-4 animate-pulse text-cyan-400" />
                <span>{t.autoLearnModalTitle}</span>
              </div>

              <div className="bg-neutral-900/90 rounded-lg p-3 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2.5">
                <Activity className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <p className="font-semibold text-amber-300">{t.autoLearnHoldingPrompt}</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {isGunConnected
                      ? (language === 'pl'
                          ? "Pomiar fizycznego sygnału sensora optycznego G'AIM'E USB."
                          : "Measuring real physical G'AIM'E USB optical sensor signal.")
                      : t.autoLearnSimulatedNotice}
                  </p>
                </div>
              </div>

              {/* Progress bar and countdown */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">{t.autoLearnTimeRemaining}</span>
                  <span className="text-cyan-400 font-bold text-sm">{learningCountdown} s</span>
                </div>
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-75"
                    style={{ width: `${((2.0 - learningCountdown) / 2.0) * 100}%` }}
                  />
                </div>
              </div>

              {/* Real-time telemetry during sampling */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-400 bg-neutral-900/50 p-2 rounded border border-neutral-800/80">
                <div>
                  {t.autoLearnSamplesCollected}{' '}
                  <span className="text-cyan-300 font-bold">{collectedSampleCount}</span>
                </div>
                <div>
                  {t.autoLearnCurrentJitter}{' '}
                  <span className="text-amber-300 font-bold">{liveJitterValue} px</span>
                </div>
              </div>
            </div>
          ) : (
            // Phase 2: Learning Complete & Results Displayed
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.autoLearnSuccessTitle}</span>
              </div>

              <p className="text-xs text-neutral-300">{t.autoLearnResultsDesc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-neutral-900/70 p-3 rounded-lg border border-neutral-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">{t.autoLearnStdDev}</span>
                  <span className="font-mono text-amber-300 font-semibold">
                    {learningResult.stdDev} {language === 'pl' ? 'jedn.' : 'units'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">{t.autoLearnMaxJump}</span>
                  <span className="font-mono text-neutral-300 font-semibold">
                    {learningResult.maxDelta} {language === 'pl' ? 'jedn.' : 'units'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-800/80 pt-2">
                  <span className="text-cyan-400 font-medium">{t.autoLearnAppliedWindow}</span>
                  <span className="font-mono text-cyan-300 font-bold">
                    {learningResult.recommendedMedian === 1
                      ? t.medianDisabled
                      : `${learningResult.recommendedMedian} ${language === 'pl' ? 'próbki' : 'samples'}`}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-800/80 pt-2">
                  <span className="text-cyan-400 font-medium">{t.autoLearnAppliedStability}</span>
                  <span className="font-mono text-cyan-300 font-bold">
                    {Math.round(learningResult.recommendedStability * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={startAutoLearning}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.autoLearnReRunBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAutoLearning(false)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-bold transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.autoLearnCloseBtn}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stability vs Responsiveness Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-cyan-400 font-semibold flex items-center gap-1">
            {t.responsivenessLabel}
          </span>
          <span className="text-neutral-400 font-mono">
            {t.ratioLabel} {Math.round(filterSettings.stabilityVsSpeed * 100)}%
          </span>
          <span className="text-amber-400 font-semibold flex items-center gap-1">
            {t.stabilityLabel}
          </span>
        </div>

        <input
          id="filter-slider"
          type="range"
          min="0"
          max="1"
          step="0.02"
          value={filterSettings.stabilityVsSpeed}
          onChange={(e) =>
            onUpdateSettings({
              ...filterSettings,
              stabilityVsSpeed: parseFloat(e.target.value),
            })
          }
          className="w-full h-2 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
          <span>{t.presetRaw}</span>
          <span>{t.presetRecommended}</span>
          <span>{t.presetPointBlank}</span>
          <span>{t.presetUltraSmooth}</span>
        </div>
      </div>

      {/* Jump Detector & Median Window Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Spike Filter Toggle */}
        <div className="bg-neutral-950 rounded-lg p-3 border border-neutral-800/80 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-xs font-bold text-neutral-200 block">
                {t.spikeDetectorTitle}
              </span>
              <span className="text-[11px] text-neutral-400">
                {t.spikeDetectorDesc.replace('{threshold}', String(filterSettings.maxJumpThreshold))}
              </span>
            </div>
            <input
              id="spike-filter-checkbox"
              type="checkbox"
              checked={filterSettings.enableSpikeFilter}
              onChange={(e) =>
                onUpdateSettings({
                  ...filterSettings,
                  enableSpikeFilter: e.target.checked,
                })
              }
              className="w-4 h-4 rounded text-cyan-500 bg-neutral-900 border-neutral-700 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-400">{t.spikeThresholdLabel}</span>
            <select
              value={filterSettings.maxJumpThreshold}
              onChange={(e) =>
                onUpdateSettings({
                  ...filterSettings,
                  maxJumpThreshold: parseInt(e.target.value, 10),
                })
              }
              className="bg-neutral-900 border border-neutral-700 text-[11px] text-neutral-300 rounded px-2 py-0.5"
            >
              <option value="1200">{t.spikeThresholdVerySensitive}</option>
              <option value="1800">{t.spikeThresholdRecommended}</option>
              <option value="2500">{t.spikeThresholdFlicks}</option>
              <option value="4000">{t.spikeThresholdExtreme}</option>
            </select>
          </div>
        </div>

        {/* Median Filter Window */}
        <div className="bg-neutral-950 rounded-lg p-3 border border-neutral-800/80 flex flex-col justify-between">
          <div className="mb-2">
            <span className="text-xs font-bold text-neutral-200 block">
              {t.medianTitle}
            </span>
            <span className="text-[11px] text-neutral-400">
              {t.medianDesc}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {[1, 3, 5].map((win) => (
              <button
                key={win}
                type="button"
                onClick={() =>
                  onUpdateSettings({
                    ...filterSettings,
                    medianWindow: win,
                  })
                }
                className={`flex-1 py-1 text-[11px] font-semibold rounded border transition-colors ${
                  filterSettings.medianWindow === win
                    ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-300'
                }`}
              >
                {win === 1
                  ? t.medianDisabled
                  : `${win} ${language === 'pl' ? (win === 3 ? 'próbki' : 'próbek') : 'samples'}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Spike Injection Tester */}
      <div className="border-t border-neutral-800 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-neutral-400" />
          <div className="text-xs">
            <span className="text-neutral-400">{t.lastDeltaLabel}</span>
            <span
              className={`font-mono font-bold ${
                lastJumpMagnitude > 1800 ? 'text-rose-400 animate-pulse' : 'text-cyan-300'
              }`}
            >
              {lastJumpMagnitude} {language === 'pl' ? 'jedn.' : 'units'}
            </span>
          </div>
        </div>

        <button
          id="btn-inject-spike"
          type="button"
          onClick={onInjectTestSpike}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
          title={t.injectSpikeTooltip}
        >
          <ZapOff className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.injectSpikeBtn}</span>
        </button>
      </div>
    </div>
  );
};
