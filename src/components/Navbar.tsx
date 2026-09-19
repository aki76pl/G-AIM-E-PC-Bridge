import React from 'react';
import { Crosshair, Download, Code2, Usb, Laptop, CheckCircle2, Globe } from 'lucide-react';
import { GunState } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  gunState: GunState;
  activePlayer: 'P1' | 'P2';
  onSelectPlayer: (p: 'P1' | 'P2') => void;
  onOpenCalibration: () => void;
  onOpenCodeModal: () => void;
  onOpenWin11Standalone: () => void;
  onDownloadZip: () => void;
  onConnectWebHid: () => void;
  onDisconnectWebHid: () => void;
  isDownloadingZip: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  gunState,
  activePlayer,
  onSelectPlayer,
  onOpenCalibration,
  onOpenCodeModal,
  onOpenWin11Standalone,
  onDownloadZip,
  onConnectWebHid,
  onDisconnectWebHid,
  isDownloadingZip,
}) => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur sticky top-0 z-40 px-4 lg:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Hardware Identifier */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-500/10">
              <Crosshair className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Chakra_Petch'] font-bold text-lg tracking-wider text-slate-100">
                  {t.navTitle} <span className="text-cyan-400">PC BRIDGE</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                  v1.0 MVP
                </span>
              </div>
              <p className="text-xs text-neutral-400 hidden sm:block">
                {t.navSubtitle}
              </p>
            </div>
          </div>

          {/* Hardware Chip Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono">
            <Usb className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-neutral-400">VID:</span>
            <span className="text-cyan-300 font-semibold">{gunState.vid}</span>
            <span className="text-neutral-500">/</span>
            <span className="text-neutral-400">PID:</span>
            <span className="text-cyan-300 font-semibold">{gunState.pid}</span>
          </div>
        </div>

        {/* Player P1 / P2 Switcher & Status */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-neutral-900 p-1 border border-neutral-800">
            <button
              id="player-tab-p1"
              type="button"
              onClick={() => onSelectPlayer('P1')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activePlayer === 'P1'
                  ? 'bg-cyan-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {t.navPlayerP1}
            </button>
            <button
              id="player-tab-p2"
              type="button"
              onClick={() => onSelectPlayer('P2')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activePlayer === 'P2'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {t.navPlayerP2}
            </button>
          </div>

          {/* Device Connection Button */}
          {gunState.connected && !gunState.isSimulated ? (
            <button
              id="btn-disconnect-webhid"
              type="button"
              onClick={onDisconnectWebHid}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.navUsbConnected}</span>
            </button>
          ) : (
            <button
              id="btn-connect-webhid"
              type="button"
              onClick={onConnectWebHid}
              title={language === 'pl' ? "Połącz fizyczny pistolet G'AIM'E przez WebHID w Chrome/Edge" : "Connect physical G'AIM'E lightgun via WebHID in Chrome/Edge"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-cyan-500/50 text-neutral-300 hover:text-cyan-300 text-xs font-medium transition-colors cursor-pointer"
            >
              <Usb className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.navConnectUsb}</span>
            </button>
          )}
        </div>

        {/* Action Buttons: Language Switcher, Win11 EXE, Calibrate, View Code, Download ZIP */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* Prominent Language Selector Segmented Control */}
          <div className="flex items-center rounded-lg bg-neutral-900 p-0.5 border border-neutral-700 shadow-sm" title="Wybór języka / Language selection">
            <button
              id="nav-btn-lang-pl"
              type="button"
              onClick={() => setLanguage('pl')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                language === 'pl'
                  ? 'bg-cyan-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Język polski"
            >
              <span>🇵🇱</span>
              <span>PL</span>
            </button>
            <button
              id="nav-btn-lang-en"
              type="button"
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-cyan-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="English language"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          <button
            id="nav-btn-win11"
            type="button"
            onClick={onOpenWin11Standalone}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/50 hover:bg-cyan-900/60 text-cyan-300 font-semibold text-xs shadow-sm transition-all cursor-pointer"
          >
            <Laptop className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.navWin11Exe}</span>
          </button>

          <button
            id="nav-btn-calibrate"
            type="button"
            onClick={onOpenCalibration}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>{t.navCalibrate4Points}</span>
          </button>

          <button
            id="nav-btn-code"
            type="button"
            onClick={onOpenCodeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.navCSharpCode}</span>
          </button>

          <button
            id="nav-btn-download-zip"
            type="button"
            onClick={onDownloadZip}
            disabled={isDownloadingZip}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-neutral-950 font-bold text-xs shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloadingZip ? t.navPackagingZip : t.navDownloadZip}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
