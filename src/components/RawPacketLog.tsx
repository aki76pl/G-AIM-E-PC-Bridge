import React, { useState } from 'react';
import { Terminal, Pause, Play, Trash2, Binary } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PacketEntry {
  id: number;
  time: string;
  bytes: number[];
  rawX: number;
  rawY: number;
  trigger: boolean;
  inRange: boolean;
}

interface RawPacketLogProps {
  packets: PacketEntry[];
  onClear: () => void;
}

export const RawPacketLog: React.FC<RawPacketLogProps> = ({ packets, onClear }) => {
  const { t } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  const displayedPackets = isPaused ? packets : packets.slice(-20);

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 lg:p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-['Chakra_Petch'] font-bold text-sm tracking-wide text-neutral-200">
              {t.rawLogTitle}
            </h3>
            <p className="text-xs text-neutral-400">
              {t.rawLogSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1 text-xs text-neutral-300 hover:text-white px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isPaused ? t.rawLogResume : t.rawLogPause}</span>
          </button>
          <button
            type="button"
            onClick={onClear}
            className="p-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
            title={t.rawLogClear}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Protocol Structure Explainer */}
      <div className="bg-neutral-950 rounded p-2.5 border border-neutral-800 font-mono text-[11px] text-neutral-300 flex flex-wrap gap-2 items-center">
        <span className="text-neutral-500 font-semibold">{t.rawLogStructure}</span>
        <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
          [01] ID
        </span>
        <span className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/40 text-purple-300">
          [FLAGS] Spust+Range
        </span>
        <span className="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300">
          [Xlo][Xhi] X (16-bit)
        </span>
        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
          [Ylo][Yhi] Y (16-bit)
        </span>
      </div>

      {/* Hex Stream Container */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 font-mono text-xs overflow-x-auto max-h-48 divide-y divide-neutral-900">
        {displayedPackets.length === 0 ? (
          <div className="text-neutral-600 text-center py-4">{t.rawLogWaiting}</div>
        ) : (
          displayedPackets.map((pkt) => {
            const b = pkt.bytes;
            const hex = b.map((x) => x.toString(16).toUpperCase().padStart(2, '0')).join(' ');
            return (
              <div key={pkt.id} className="py-1 flex items-center justify-between gap-4 hover:bg-neutral-900/50">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-neutral-500">{pkt.time}</span>
                  <span className="text-cyan-400 font-bold tracking-wider">{hex}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-neutral-300">
                    X:<strong className="text-amber-300">{pkt.rawX}</strong> Y:<strong className="text-amber-300">{pkt.rawY}</strong>
                  </span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${pkt.trigger ? 'bg-rose-500 text-white font-bold' : 'text-neutral-500'}`}>
                    {pkt.trigger ? t.rawLogTrigger : t.rawLogIdle}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
