import React from 'react';
import { Sliders, ShieldAlert, Sparkles, Gauge, ZapOff } from 'lucide-react';
import { FilterSettings } from '../types';

interface FilterControlsProps {
  filterSettings: FilterSettings;
  onUpdateSettings: (newSettings: FilterSettings) => void;
  lastJumpMagnitude: number;
  totalRejectedJumps: number;
  onInjectTestSpike: () => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filterSettings,
  onUpdateSettings,
  lastJumpMagnitude,
  totalRejectedJumps,
  onInjectTestSpike,
}) => {
  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 lg:p-5 flex flex-col gap-4">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-['Chakra_Petch'] font-bold text-sm tracking-wide text-neutral-200">
              FILTR SKOKÓW I JITTERU (G'AIM'E)
            </h3>
            <p className="text-xs text-neutral-400">
              Eliminacja anomalii optycznych (&gt;4000 jednostek) i wygładzanie drżenia
            </p>
          </div>
        </div>

        {/* Total rejected badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-neutral-400">Odrzucone skoki:</span>
          <span className="text-amber-400 font-bold">{totalRejectedJumps}</span>
        </div>
      </div>

      {/* Stability vs Responsiveness Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-cyan-400 font-semibold flex items-center gap-1">
            ⚡ Responsywność (Zero-Lag)
          </span>
          <span className="text-neutral-400 font-mono">
            Współczynnik: {Math.round(filterSettings.stabilityVsSpeed * 100)}%
          </span>
          <span className="text-amber-400 font-semibold flex items-center gap-1">
            🎯 Stabilność (Gładkość)
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
          <span>0% (Czysty RAW)</span>
          <span>35% (Rekomendowany TC3)</span>
          <span>70% (Point Blank)</span>
          <span>100% (Ultra Gładki)</span>
        </div>
      </div>

      {/* Jump Detector & Median Window Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Spike Filter Toggle */}
        <div className="bg-neutral-950 rounded-lg p-3 border border-neutral-800/80 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-xs font-bold text-neutral-200 block">
                Detektor anomalii skoków
              </span>
              <span className="text-[11px] text-neutral-400">
                Odrzuca nagłe skoki &gt; {filterSettings.maxJumpThreshold} jedn.
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
            <span className="text-[10px] text-neutral-400">Próg skoku:</span>
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
              <option value="1200">1200 (Bardzo czuły)</option>
              <option value="1800">1800 (Zalecany dla G'AIM'E)</option>
              <option value="2500">2500 (Dla szybkich flicków)</option>
              <option value="4000">4000 (Tylko ekstremalne)</option>
            </select>
          </div>
        </div>

        {/* Median Filter Window */}
        <div className="bg-neutral-950 rounded-lg p-3 border border-neutral-800/80 flex flex-col justify-between">
          <div className="mb-2">
            <span className="text-xs font-bold text-neutral-200 block">
              Okno filtra medianowego
            </span>
            <span className="text-[11px] text-neutral-400">
              Eliminuje pojedyncze szumy ramki przed wygładzeniem EMA
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
                {win === 1 ? 'Wyłączony' : `${win} próbki`}
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
            <span className="text-neutral-400">Ostatnia delta klatki: </span>
            <span className={`font-mono font-bold ${lastJumpMagnitude > 1800 ? 'text-rose-400 animate-pulse' : 'text-cyan-300'}`}>
              {lastJumpMagnitude} jedn.
            </span>
          </div>
        </div>

        <button
          id="btn-inject-spike"
          type="button"
          onClick={onInjectTestSpike}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all active:scale-95"
          title="Symuluje anomalny skok celownika 4500 jednostek, typowy przy odbiciu światła"
        >
          <ZapOff className="w-3.5 h-3.5 text-amber-400" />
          <span>Test: Wstrzyknij skok (+4500)</span>
        </button>
      </div>
    </div>
  );
};
