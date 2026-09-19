import React, { useState } from 'react';
import { Gamepad2, Copy, Check, ExternalLink, HelpCircle, Layers } from 'lucide-react';
import { GameProfile } from '../types';
import { GAME_PROFILES } from '../services/profiles';
import { useLanguage } from '../context/LanguageContext';

interface Pcsx2ConfigCardProps {
  selectedProfile: GameProfile;
  onSelectProfile: (p: GameProfile) => void;
}

export const Pcsx2ConfigCard: React.FC<Pcsx2ConfigCardProps> = ({
  selectedProfile,
  onSelectProfile,
}) => {
  const { t } = useLanguage();
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
              {t.pcsx2CardTitle}
            </h3>
            <p className="text-xs text-neutral-400">
              {t.pcsx2CardSubtitle}
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
          className="bg-neutral-900 border border-neutral-700 text-xs text-neutral-100 font-medium rounded-lg px-3 py-1.5 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none cursor-pointer"
        >
          {GAME_PROFILES.map((p) => (
            <option key={p.id} value={p.id} className="bg-neutral-900 text-neutral-100 font-medium py-1">
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
            {t.pcsx2PedalAction} <strong className="text-amber-300">{selectedProfile.pedalAction}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 text-[11px]">
            {t.pcsx2OffscreenReload} <strong className="text-emerald-300">{selectedProfile.offscreenReload ? t.pcsx2Yes : t.pcsx2No}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 text-[11px]">
            {t.recommendedFilterLabel} <strong className="text-cyan-300">{Math.round(selectedProfile.recommendedFilterStability * 100)}%</strong>
          </span>
        </div>
      </div>

      {/* Button Mapping Matrix */}
      <div>
        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
          {t.pcsx2RecommendedMapping}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">Trigger:</span>
            <span className="font-mono text-cyan-300 font-semibold">Mouse: Left</span>
          </div>
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">{t.pcsx2ButtonA}</span>
            <span className="font-mono text-cyan-300 font-semibold">Mouse: Middle</span>
          </div>
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">{t.pcsx2ButtonB}</span>
            <span className="font-mono text-cyan-300 font-semibold">Mouse: Right</span>
          </div>
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">{t.usbPedalKey}</span>
            <span className="font-mono text-amber-300 font-semibold">Key: Space</span>
          </div>
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">Start:</span>
            <span className="font-mono text-cyan-300 font-semibold">Key: Return</span>
          </div>
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-400">{t.pcsx2Crosshair}</span>
            <span className="font-mono text-emerald-300 font-semibold">Absolute Pointer</span>
          </div>
        </div>
      </div>

      {/* PCSX2 INI Snippet & Copy Button */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-neutral-400">
            {t.pcsx2ConfigSnippetLabel}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t.copiedBtn : t.pcsx2CopyIni}</span>
          </button>
        </div>

        <pre className="bg-neutral-950 text-neutral-300 font-mono text-[11px] p-3 rounded-lg border border-neutral-800 overflow-x-auto max-h-36 leading-relaxed">
          {selectedProfile.pcsx2ConfigSnippet}
        </pre>
      </div>

      {/* Step by step quick guide */}
      <div className="border-t border-neutral-800 pt-3 text-xs text-neutral-400 space-y-1">
        <span className="font-semibold text-neutral-300 block">{t.pcsx2QuickGuideTitle}</span>
        <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-neutral-400">
          <li>{t.pcsx2Step1}</li>
          <li>{t.pcsx2Step2}</li>
          <li>{t.pcsx2Step3}</li>
          <li>{t.pcsx2Step4}</li>
        </ol>
      </div>
    </div>
  );
};
