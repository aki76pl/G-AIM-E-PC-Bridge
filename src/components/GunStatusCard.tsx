import React from 'react';
import { Monitor, Cpu, Activity, Zap, Radio, Footprints } from 'lucide-react';
import { GunState, MonitorProfile } from '../types';

interface GunStatusCardProps {
  gunState: GunState;
  monitors: MonitorProfile[];
  selectedMonitor: MonitorProfile;
  onSelectMonitor: (m: MonitorProfile) => void;
  onTogglePedal: () => void;
  onTriggerPull: () => void;
}

export const GunStatusCard: React.FC<GunStatusCardProps> = ({
  gunState,
  monitors,
  selectedMonitor,
  onSelectMonitor,
  onTogglePedal,
  onTriggerPull,
}) => {
  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 lg:p-5 flex flex-col gap-4">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-cyan-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Chakra_Petch'] font-bold text-sm tracking-wide text-neutral-200">
                G'AIM'E LIGHTGUN ({gunState.id})
              </h3>
              <span className={`w-2 h-2 rounded-full ${gunState.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            </div>
            <p className="text-xs text-neutral-400">
              {gunState.isSimulated ? 'Tryb Symulacji / Gotowy do podłączenia USB' : 'Prawdziwe urządzenie WebHID aktywne'}
            </p>
          </div>
        </div>

        {/* Polling Rate Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono text-cyan-300">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>{gunState.reportsPerSecond > 0 ? `${gunState.reportsPerSecond} Hz` : '125 Hz (szac.)'}</span>
        </div>
      </div>

      {/* Aiming Telemetry: Raw vs Corrected */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-neutral-950 rounded-lg p-3 border border-neutral-800/80">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
            Pozycja Raw (0-10000)
          </span>
          <div className="font-mono text-sm sm:text-base font-bold text-amber-300">
            X: {gunState.rawX.toString().padStart(4, '0')}
            <span className="text-neutral-500 mx-1.5">|</span>
            Y: {gunState.rawY.toString().padStart(4, '0')}
          </div>
          <span className="text-[10px] text-neutral-400 mt-1 block">
            Praktyczny zakres: 99–9900
          </span>
        </div>

        <div className="bg-neutral-950 rounded-lg p-3 border border-neutral-800/80">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
            Skorygowane (Pulpit)
          </span>
          <div className="font-mono text-sm sm:text-base font-bold text-cyan-300">
            X: {Math.round(gunState.screenX).toString().padStart(4, ' ')}
            <span className="text-neutral-500 mx-1.5">|</span>
            Y: {Math.round(gunState.screenY).toString().padStart(4, ' ')}
          </div>
          <span className="text-[10px] text-neutral-400 mt-1 block">
            {selectedMonitor.width} × {selectedMonitor.height} px
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-neutral-950 rounded-lg p-3 border border-neutral-800/80">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
            Znormalizowane (0.0 - 1.0)
          </span>
          <div className="font-mono text-sm sm:text-base font-bold text-neutral-300">
            U: {gunState.normalizedX.toFixed(3)}
            <span className="text-neutral-500 mx-1.5">|</span>
            V: {gunState.normalizedY.toFixed(3)}
          </div>
          <span className="text-[10px] text-neutral-400 mt-1 block">
            Homografia perspektywiczna
          </span>
        </div>
      </div>

      {/* Target Monitor Selection */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1">
        <label htmlFor="monitor-select" className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
          <Monitor className="w-3.5 h-3.5 text-neutral-400" />
          Docelowy monitor (rozdzielczość gry / PCSX2):
        </label>
        <select
          id="monitor-select"
          value={selectedMonitor.id}
          onChange={(e) => {
            const found = monitors.find((m) => m.id === e.target.value);
            if (found) onSelectMonitor(found);
          }}
          className="bg-neutral-950 border border-neutral-700 text-xs text-neutral-200 rounded-lg px-3 py-1.5 focus:border-cyan-500 outline-none w-full sm:w-auto"
        >
          {monitors.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Hardware Buttons & State Indicators */}
      <div className="border-t border-neutral-800 pt-3">
        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
          Stany przycisków i sygnałów HID
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {/* Trigger */}
          <button
            id="btn-test-trigger"
            type="button"
            onClick={onTriggerPull}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${
              gunState.trigger
                ? 'bg-rose-600 border-rose-500 text-white shadow-sm shadow-rose-500/30 scale-95'
                : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${gunState.trigger ? 'text-white' : 'text-rose-400'}`} />
            <span>Spust (Tip Switch)</span>
            <span className={`w-1.5 h-1.5 rounded-full ${gunState.trigger ? 'bg-white' : 'bg-neutral-600'}`} />
          </button>

          {/* In Range */}
          <div
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 ${
              gunState.inRange
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-neutral-950 border-neutral-800 text-neutral-500'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>W Zasięgu Ekranu</span>
            <span className={`w-1.5 h-1.5 rounded-full ${gunState.inRange ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-700'}`} />
          </div>

          {/* GunCon Buttons */}
          <div className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-1.5">
            <span className="font-semibold text-neutral-400">Gun A:</span>
            <span className="text-cyan-400 font-bold">{gunState.btnA ? 'ON' : 'OFF'}</span>
          </div>

          <div className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-1.5">
            <span className="font-semibold text-neutral-400">Gun B:</span>
            <span className="text-cyan-400 font-bold">{gunState.btnB ? 'ON' : 'OFF'}</span>
          </div>

          {/* USB Foot Pedal */}
          <button
            id="btn-test-pedal"
            type="button"
            onClick={onTogglePedal}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 ${
              gunState.pedal
                ? 'bg-amber-500 border-amber-400 text-neutral-950 shadow-sm shadow-amber-500/20'
                : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
            }`}
            title="Naciśnij spację na klawiaturze lub kliknij, aby wcisnąć pedał"
          >
            <Footprints className="w-3.5 h-3.5 text-amber-400" />
            <span>Pedał USB (Krycie/Przeładowanie)</span>
            <span className={`w-1.5 h-1.5 rounded-full ${gunState.pedal ? 'bg-neutral-950' : 'bg-neutral-600'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
