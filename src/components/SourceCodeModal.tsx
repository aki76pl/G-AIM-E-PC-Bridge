import React, { useState } from 'react';
import { Code2, Download, Copy, Check, FileCode, Folder, X, ShieldCheck } from 'lucide-react';
import { CSHARP_PROJECT_FILES } from '../csharp-project/sources';
import { CSharpSourceFile } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SourceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadZip: () => void;
  isDownloadingZip: boolean;
}

export const SourceCodeModal: React.FC<SourceCodeModalProps> = ({
  isOpen,
  onClose,
  onDownloadZip,
  isDownloadingZip,
}) => {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<CSharpSourceFile>(CSHARP_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-['Chakra_Petch'] font-bold text-lg text-white">
                {t.sourceModalTitle}
              </h2>
              <p className="text-xs text-neutral-400">
                {t.sourceModalSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDownloadZip}
              disabled={isDownloadingZip}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloadingZip ? t.packagingBtn : t.downloadZipBtn}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* File Tree Sidebar */}
          <div className="w-full md:w-72 border-r border-neutral-800 bg-neutral-950/60 p-3 overflow-y-auto space-y-1">
            <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-2 py-1">
              {t.projectFilesTitle}
            </div>

            {CSHARP_PROJECT_FILES.map((file) => (
              <button
                key={file.path}
                type="button"
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                  selectedFile.path === file.path
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                  <span className="truncate">{file.name}</span>
                </div>
                <span className="text-[10px] uppercase font-sans px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-500 shrink-0">
                  {file.category}
                </span>
              </button>
            ))}
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col bg-neutral-950 overflow-hidden">
            <div className="flex items-center justify-between border-b border-neutral-800/80 px-4 py-2 bg-neutral-900/50">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                <span className="text-cyan-400">{selectedFile.path}</span>
                <span className="text-neutral-600">—</span>
                <span className="text-neutral-400 text-[11px]">{selectedFile.description}</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-neutral-300 hover:text-white px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.copiedBtn : t.copyBtn}</span>
              </button>
            </div>

            <div className="flex-1 p-4 overflow-auto">
              <pre className="font-mono text-xs text-neutral-300 leading-relaxed tab-4">
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
