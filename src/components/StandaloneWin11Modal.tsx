import React, { useState } from 'react';
import { Monitor, Download, Copy, Check, Terminal, Play, Cpu, ShieldCheck, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StandaloneWin11ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadZip: () => void;
  isDownloadingZip: boolean;
}

export const StandaloneWin11Modal: React.FC<StandaloneWin11ModalProps> = ({
  isOpen,
  onClose,
  onDownloadZip,
  isDownloadingZip,
}) => {
  const { t } = useLanguage();
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const publishCmd = `dotnet publish GaimePcBridge\\GaimePcBridge.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -p:EnableCompressionInSingleFile=true -o .\\Publish_Win11`;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(publishCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Chakra_Petch'] font-bold text-lg text-white">
                  {t.win11ModalTitle}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Self-Contained Single-File
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {t.win11ModalDesc}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Hero Banner with Download */}
          <div className="bg-gradient-to-r from-cyan-950/40 via-neutral-900 to-neutral-950 border border-cyan-500/30 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {t.win11ReadyNotice}
              </span>
              <h3 className="text-base font-bold text-white">
                {t.win11DownloadZipCard}
              </h3>
              <p className="text-xs text-neutral-300 max-w-xl">
                {t.win11ZipIncludes}
              </p>
            </div>

            <button
              type="button"
              onClick={onDownloadZip}
              disabled={isDownloadingZip}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 shrink-0 transition-transform active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloadingZip ? t.packagingBtn : t.downloadZipBtn}</span>
            </button>
          </div>

          {/* 3 Steps to Run */}
          <div className="space-y-3">
            <h4 className="font-['Chakra_Petch'] text-sm font-bold uppercase tracking-wider text-neutral-200 flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-400" />
              {t.win11HowToRun}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Step 1 */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col gap-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
                  01
                </div>
                <h5 className="font-bold text-xs text-white">{t.win11Step1Title}</h5>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {t.win11Step1Desc}
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col gap-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
                  02
                </div>
                <h5 className="font-bold text-xs text-white">{t.win11Step2Title}</h5>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {t.win11Step2Body}
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col gap-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-bold text-xs text-emerald-400">
                  03
                </div>
                <h5 className="font-bold text-xs text-white">{t.win11Step3Title}</h5>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {t.win11Step3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Manual CLI Command */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                {t.win11CliTitle}
              </span>
              <button
                type="button"
                onClick={handleCopyCmd}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd ? t.copiedBtn : t.win11CopyCmd}</span>
              </button>
            </div>

            <pre className="bg-black/80 text-cyan-300 font-mono text-[11px] p-3 rounded-lg border border-neutral-850 overflow-x-auto leading-relaxed">
              {publishCmd}
            </pre>
          </div>

          {/* Technical Specs of the Standalone Build */}
          <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 space-y-3">
            <span className="text-xs font-semibold text-neutral-200 block">
              {t.win11SpecsTitle}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-neutral-900/80 border border-neutral-800">
                <span className="text-neutral-400">{t.win11TargetArch}</span>
                <span className="font-mono text-cyan-300 font-bold">win-x64 (Windows 11 / 10 64-bit)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-neutral-900/80 border border-neutral-800">
                <span className="text-neutral-400">{t.win11DeployMode}</span>
                <span className="font-mono text-cyan-300 font-bold">{t.win11SelfContained}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-neutral-900/80 border border-neutral-800">
                <span className="text-neutral-400">{t.win11OutputFormat}</span>
                <span className="font-mono text-emerald-300 font-bold">{t.win11SingleFile}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-neutral-900/80 border border-neutral-800">
                <span className="text-neutral-400">{t.win11Permissions}</span>
                <span className="font-mono text-amber-350 font-bold">{t.win11DriverNone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 px-6 py-3 bg-neutral-950 flex items-center justify-between text-xs text-neutral-400">
          <span>G'AIM'E PC Bridge — Windows 11 Standalone Engine</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
          >
            {t.win11CloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
