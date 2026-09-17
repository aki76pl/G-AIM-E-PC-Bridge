import React, { useState } from 'react';
import { Gamepad2, Copy, Check, ExternalLink, HelpCircle, Layers } from 'lucide-react';
import { GameProfile } from '../types';
import { GAME_PROFILES } from '../services/profiles';

interface Pcsx2ConfigCardProps {
  selectedProfile: GameProfile;
  onSelectProfile: (p: GameProfile) => void;
}

export const Pcsx2ConfigCard: React.FC<Pcsx2ConfigCardProps> = ({
  selectedProfile,
  onSelectProfile,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedProfile.pcsx2ConfigSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 lg:p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-cyan-400">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-['Chakra_Petch'] font-bold text-sm tracking-wide text-neutral-200">
              INTEGRACJA Z PCSX2 (GUNCON 2)
            </h3>
            <p className="text-xs text-neutral-400">
              Profile mapowania przycisków i konfiguracja emulatora PlayStation 2
            </p>
          </div>
        </div>

        {/* Profile Selector */}
        <select
          value={selectedProfile.id}
          onChange={(e) => {
            const found = GAME_PROFILES.find((p) => p.id === e.target.value);
            if (found) onSelectProfile(found);
          }}
          className="bg-neutral-950 border border-neutral-700 text-xs text-neutral-200 rounded-lg px-3 py-1.5 focus:border-cyan-500 outline-none"
        >
          {GAME_PROFILES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description & Recommended Settings */}
      <div className="bg-neutral-950 rounded-lg p-3 border border-neutral-800/80 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-cyan-300">{selectedProfile.name}</span>
          <span className="text-[11px] text-neutral-500">{selectedProfile.system}</span>
        </div>
        <p className="text-neutral-400">{selectedProfile.description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 text-[11px]">
            Akcja pedału: <strong className="text-amber-300">{selectedProfile.pedalAction}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 text-[11px]">
            Przeładowanie poza ekranem: <strong className="text-emerald-300">{selectedProfile.offscreenReload ? 'TAK' : 'NIE'}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 text-[11px]">
            Rekomendowany filtr: <strong className="text-cyan-300">{Math.round(selectedProfile.recommendedFilterStability * 100)}%</strong>
          </span>
        </div>
      </div>

      {/* Button Mapping Matrix */}
      <div>
        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
          Zalecane Mapowanie Wejść
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">Trigger:</span>
            <span className="font-mono text-cyan-300 font-semibold">Mouse: Left</span>
          </div>
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">Przycisk A:</span>
            <span className="font-mono text-cyan-300 font-semibold">Mouse: Middle</span>
          </div>
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">Przycisk B:</span>
            <span className="font-mono text-cyan-300 font-semibold">Mouse: Right</span>
          </div>
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">Pedał USB:</span>
            <span className="font-mono text-amber-300 font-semibold">Key: Space</span>
          </div>
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">Start:</span>
            <span className="font-mono text-cyan-300 font-semibold">Key: Return</span>
          </div>
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">Celownik:</span>
            <span className="font-mono text-emerald-300 font-semibold">Absolute Pointer</span>
          </div>
        </div>
      </div>

      {/* PCSX2 INI Snippet & Copy Button */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-neutral-400">
            Wycinek konfiguracji PCSX2 (Controllers.ini):
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Skopiowano!' : 'Kopiuj INI'}</span>
          </button>
        </div>

        <pre className="bg-neutral-950 text-neutral-300 font-mono text-[11px] p-3 rounded-lg border border-neutral-800 overflow-x-auto max-h-36 leading-relaxed">
          {selectedProfile.pcsx2ConfigSnippet}
        </pre>
      </div>

      {/* Step by step quick guide */}
      <div className="border-t border-neutral-800 pt-3 text-xs text-neutral-400 space-y-1">
        <span className="font-semibold text-neutral-300 block">Szybka instrukcja w PCSX2:</span>
        <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-neutral-400">
          <li>W PCSX2 wejdź w <strong>Settings → Controllers → Controller Port 1</strong>.</li>
          <li>Wybierz typ urządzenia: <strong>GunCon 2</strong>.</li>
          <li>Upewnij się, że <strong>Pointer</strong> przypisany jest do wskaźnika myszy Windows.</li>
          <li>W grze po starcie wykonaj pojedynczy strzał kalibracyjny w środek ekranu.</li>
        </ol>
      </div>
    </div>
  );
};
