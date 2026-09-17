import React, { useState } from 'react';
import { Monitor, Download, Copy, Check, Terminal, Play, Cpu, ShieldCheck, X, Sparkles } from 'lucide-react';

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
                  SAMODZIELNA APLIKACJA DLA WINDOWS 11 (.EXE)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Self-Contained Single-File
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Pojedynczy plik wykonywalny <code className="text-cyan-300">GaimePcBridge.exe</code> działający na każdym PC z Windows 11 bez zewnętrznych zależności
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
                Paczka gotowa do pobrania
              </span>
              <h3 className="text-base font-bold text-white">
                Pobierz kompletną paczkę z generatorem .EXE dla Windows 11
              </h3>
              <p className="text-xs text-neutral-300 max-w-xl">
                Archiwum ZIP zawiera projekt .NET 8, profil publikacji Single-File oraz automatyczny skrypt <strong className="text-cyan-300">Publish_Standalone_Win11.bat</strong>.
              </p>
            </div>

            <button
              type="button"
              onClick={onDownloadZip}
              disabled={isDownloadingZip}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 shrink-0 transition-transform active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloadingZip ? 'Pakowanie...' : 'Pobierz Paczkę ZIP'}</span>
            </button>
          </div>

          {/* 3 Steps to Run */}
          <div className="space-y-3">
            <h4 className="font-['Chakra_Petch'] text-sm font-bold uppercase tracking-wider text-neutral-200 flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-400" />
              Jak uruchomić aplikację w Windows 11 w 3 krokach
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Step 1 */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col gap-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
                  01
                </div>
                <h5 className="font-bold text-xs text-white">Wypakuj archiwum ZIP</h5>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Pobierz paczkę ZIP i wypakuj ją w dowolnym folderze na dysku (np. <code>C:\GAMES\GaimePcBridge</code>).
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col gap-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
                  02
                </div>
                <h5 className="font-bold text-xs text-white">Dwuklik w skrypt .BAT</h5>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Kliknij dwukrotnie plik <code>Publish_Standalone_Win11.bat</code>. W kilka sekund wygeneruje gotowy plik <code>GaimePcBridge.exe</code>.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col gap-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-bold text-xs text-emerald-400">
                  03
                </div>
                <h5 className="font-bold text-xs text-white">Uruchom GaimePcBridge.exe</h5>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  W folderze <code>Publish_Win11</code> pojawi się plik <code>GaimePcBridge.exe</code>. Działa samodzielnie na każdym Windows 11!
                </p>
              </div>
            </div>
          </div>

          {/* Manual CLI Command */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Dla programistów / Wiersz poleceń (PowerShell & CMD):
              </span>
              <button
                type="button"
                onClick={handleCopyCmd}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd ? 'Skopiowano!' : 'Kopiuj polecenie'}</span>
              </button>
            </div>

            <pre className="bg-black/80 text-cyan-300 font-mono text-[11px] p-3 rounded-lg border border-neutral-850 overflow-x-auto leading-relaxed">
              {publishCmd}
            </pre>
          </div>

          {/* Core Isolation / Memory Integrity Badge & Explainer */}
          <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-4.5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-['Chakra_Petch'] font-bold text-sm text-emerald-300">
                  PEŁNA ZGODNOŚĆ Z IZOLACJĄ RDZENIA (CORE ISOLATION & MEMORY INTEGRITY)
                </h4>
                <p className="text-[11px] text-neutral-300">
                  Aplikacja została specjalnie zaprojektowana, aby <strong>nie była blokowana</strong> przez funkcje bezpieczeństwa Windows 11.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-neutral-300">
              <div className="p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800 space-y-1">
                <span className="font-bold text-emerald-400 block text-[11px]">
                  1. Zero Sterowników Jądra (100% User-Mode)
                </span>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Inne programy (stare wersje vJoy, vMulti, WinRing0) instalują sterowniki <code>.sys</code>, które trafiają na czarną listę Microsoftu (Vulnerable Driver Blocklist). Nasz bridge komunikuje się bezpośrednio przez oficjalny podsystem <code>hid.dll</code> i <code>user32.dll</code> bez dotykania jądra.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800 space-y-1">
                <span className="font-bold text-emerald-400 block text-[11px]">
                  2. Sprzętowa Ochrona Stosu (CET / Shadow Stacks)
                </span>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Projekt kompilowany jest z flagą <code>CETCompat=true</code> oraz <code>HighEntropyVA=true</code> (64-bit ASLR), co gwarantuje pełną akceptację przez mechanizm Integralności Pamięci (HVCI).
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800 space-y-1">
                <span className="font-bold text-emerald-400 block text-[11px]">
                  3. Bezpieczny Manifest (app.manifest)
                </span>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Zawiera deklarację <code>level="asInvoker"</code> oraz zaawansowaną stertę pamięci <code>SegmentHeap</code>, eliminując heurystyczne ostrzeżenia Windows Defender Exploit Guard.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800 space-y-1">
                <span className="font-bold text-emerald-400 block text-[11px]">
                  4. Automatyczny Podpis Authenticode SHA-256
                </span>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Skrypt <code>Publish_Standalone_Win11.bat</code> oraz <code>Podpisz_Certyfikatem_Lokalnym.ps1</code> sam tworzy zaufany podpis cyfrowy i zdejmuje blokadę pobrania (Zone.Identifier).
                </p>
              </div>
            </div>
          </div>

          {/* Technical Specs of the Standalone Build */}
          <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 space-y-3">
            <span className="text-xs font-semibold text-neutral-200 block">
              Specyfikacja Samodzielnej Aplikacji Windows 11 (Self-Contained):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-neutral-900/80 border border-neutral-800">
                <span className="text-neutral-400">Architektura docelowa:</span>
                <span className="font-mono text-cyan-300 font-bold">win-x64 (Windows 11 / 10 64-bit)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-neutral-900/80 border border-neutral-800">
                <span className="text-neutral-400">Tryb wdrożenia:</span>
                <span className="font-mono text-cyan-300 font-bold">Self-Contained (Środowisko wbudowane)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-neutral-900/80 border border-neutral-800">
                <span className="text-neutral-400">Format wyjściowy:</span>
                <span className="font-mono text-emerald-300 font-bold">Pojedynczy plik .EXE (Single-File)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-neutral-900/80 border border-neutral-800">
                <span className="text-neutral-400">Uprawnienia:</span>
                <span className="font-mono text-amber-350 font-bold">Standardowe (Brak sterowników jądra)</span>
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
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
