import React, { useState, useMemo } from 'react';
import {
  Gamepad2,
  Copy,
  Check,
  Download,
  Terminal,
  Sliders,
  Sparkles,
  Layers,
  FileCode,
  ShieldCheck,
  Crosshair,
  ExternalLink,
  Info,
} from 'lucide-react';
import { CalibrationData, GameProfile, MonitorProfile, EmulatorTarget } from '../types';
import { GAME_PROFILES } from '../services/profiles';
import {
  ConfigFormat,
  generateConfigForFormat,
  downloadConfigFile,
} from '../services/configGenerator';

interface EmulatorIntegrationsCardProps {
  selectedProfile: GameProfile;
  onSelectProfile: (p: GameProfile) => void;
  calibrationP1: CalibrationData;
  calibrationP2: CalibrationData;
  selectedMonitor: MonitorProfile;
  onApplyPresetSensitivity?: (stability: number) => void;
}

const EMULATOR_CATEGORIES: { id: 'ALL' | EmulatorTarget; label: string }[] = [
  { id: 'ALL', label: 'Wszystkie' },
  { id: 'RetroArch', label: 'RetroArch (Snes9x)' },
  { id: 'DemulShooter', label: 'DemulShooter' },
  { id: 'MAME', label: 'MAME' },
  { id: 'Model2', label: 'Model 2' },
  { id: 'TeknoParrot', label: 'TeknoParrot' },
  { id: 'PCSX2', label: 'PCSX2' },
];

export const EmulatorIntegrationsCard: React.FC<EmulatorIntegrationsCardProps> = ({
  selectedProfile,
  onSelectProfile,
  calibrationP1,
  calibrationP2,
  selectedMonitor,
  onApplyPresetSensitivity,
}) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | EmulatorTarget>('ALL');
  const [configFormat, setConfigFormat] = useState<ConfigFormat>('demulshooter');
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Interactive fine-tuning overrides
  const [customDeadzone, setCustomDeadzone] = useState<number>(selectedProfile.deadzone ?? 8);
  const [customSensitivity, setCustomSensitivity] = useState<number>(
    selectedProfile.sensitivityMultiplier ?? 1.0
  );

  // Filter profiles based on category
  const filteredProfiles = useMemo(() => {
    if (activeCategory === 'ALL') return GAME_PROFILES;
    return GAME_PROFILES.filter((p) => p.emulator === activeCategory);
  }, [activeCategory]);

  // When selectedProfile changes, keep deadzone & sensitivity updated
  const handleSelect = (profile: GameProfile) => {
    onSelectProfile(profile);
    setCustomDeadzone(profile.deadzone ?? 8);
    setCustomSensitivity(profile.sensitivityMultiplier ?? 1.0);

    // Auto-select most appropriate config format for the game's emulator
    if (profile.emulator === 'RetroArch') setConfigFormat('retroarch_snes9x_opt');
    else if (profile.emulator === 'MAME') setConfigFormat('mame_game_cfg');
    else if (profile.emulator === 'Model2') setConfigFormat('model2');
    else if (profile.emulator === 'TeknoParrot') setConfigFormat('teknoparrot');
    else if (profile.emulator === 'PCSX2') setConfigFormat('pcsx2');
    else setConfigFormat('demulshooter');
  };

  // Generate current config file content
  const generatedConfig = useMemo(() => {
    return generateConfigForFormat(
      configFormat,
      selectedProfile,
      calibrationP1,
      calibrationP2,
      selectedMonitor,
      customDeadzone,
      customSensitivity
    );
  }, [
    configFormat,
    selectedProfile,
    calibrationP1,
    calibrationP2,
    selectedMonitor,
    customDeadzone,
    customSensitivity,
  ]);

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(generatedConfig.content);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const handleCopyCmd = () => {
    if (selectedProfile.demulShooterTarget) {
      const fullCmd = `DemulShooter.exe ${selectedProfile.demulShooterTarget}`;
      navigator.clipboard.writeText(fullCmd);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadConfigFile(generatedConfig.fileName, generatedConfig.content);
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 lg:p-5 flex flex-col gap-4 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Chakra_Petch'] font-bold text-sm tracking-wide text-neutral-100 uppercase">
                INTEGRACJA Z EMULATORAMI & ARCADE
              </h3>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                DemulShooter / MAME / vJoy
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Profile gier arcade, presety czułości, martwych stref i generator plików konfiguracyjnych .ini / .cfg
            </p>
          </div>
        </div>

        {/* Game Selector */}
        <div className="flex items-center gap-2">
          <select
            id="arcade-profile-select"
            value={selectedProfile.id}
            onChange={(e) => {
              const found = GAME_PROFILES.find((p) => p.id === e.target.value);
              if (found) handleSelect(found);
            }}
            className="bg-neutral-950 border border-neutral-700 text-xs text-neutral-100 font-semibold rounded-lg px-3 py-2 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none cursor-pointer w-full sm:w-auto"
          >
            {GAME_PROFILES.map((p) => (
              <option key={p.id} value={p.id} className="bg-neutral-900 text-neutral-100 py-1">
                {p.name} [{p.emulator}]
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Emulator Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {EMULATOR_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-cyan-500 text-neutral-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Game Quick Cards Horizontal Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredProfiles.slice(0, 8).map((p) => {
          const isSelected = p.id === selectedProfile.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelect(p)}
              className={`text-left p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-sm shadow-cyan-500/20'
                  : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-950'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-cyan-500 text-neutral-950' : 'bg-neutral-800 text-neutral-300'
                }`}>
                  {p.emulator}
                </span>
                <span className="font-mono text-[10px] text-neutral-500">{p.romName}</span>
              </div>
              <span className={`text-xs font-semibold line-clamp-1 ${isSelected ? 'text-cyan-300' : 'text-neutral-200'}`}>
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Game Profile Details & Tuning */}
      <div className="bg-neutral-950 rounded-xl p-3.5 border border-neutral-800/90 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/70 pb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-cyan-300">{selectedProfile.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-900 border border-neutral-700 text-neutral-400">
                ROM: {selectedProfile.romName}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-sky-950 border border-sky-800 text-sky-300 font-medium">
                {selectedProfile.system}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{selectedProfile.description}</p>
          </div>

          {/* DemulShooter Launch Command Pill */}
          {selectedProfile.demulShooterTarget && (
            <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 self-start sm:self-auto shrink-0">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-[11px] text-neutral-300 select-all">
                DemulShooter.exe {selectedProfile.demulShooterTarget}
              </span>
              <button
                type="button"
                onClick={handleCopyCmd}
                title="Kopiuj komendę uruchomieniową DemulShooter"
                className="text-neutral-400 hover:text-cyan-300 ml-1"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* Tuning Sliders: Deadzone & Sensitivity Multiplier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
          {/* Deadzone */}
          <div className="bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-800 flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-neutral-400 font-medium">Martwa strefa (Deadzone):</span>
              <span className="font-mono text-cyan-400 font-bold">{customDeadzone} RAW</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={customDeadzone}
              onChange={(e) => setCustomDeadzone(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-neutral-800 rounded cursor-pointer"
            />
            <span className="text-[10px] text-neutral-500">Tłumi mikro-drgania matrycy w spoczynku</span>
          </div>

          {/* Sensitivity Multiplier */}
          <div className="bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-800 flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-neutral-400 font-medium">Mnożnik czułości (Speed):</span>
              <span className="font-mono text-cyan-400 font-bold">{customSensitivity.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.50"
              step="0.05"
              value={customSensitivity}
              onChange={(e) => setCustomSensitivity(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-neutral-800 rounded cursor-pointer"
            />
            <span className="text-[10px] text-neutral-500">Szybkość ruchu celownika po ekranie</span>
          </div>

          {/* Recommended Filter & Action */}
          <div className="bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-800 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-neutral-400">Rekomendowany filtr:</span>
              <span className="font-mono text-emerald-400 font-bold">
                {Math.round(selectedProfile.recommendedFilterStability * 100)}%
              </span>
            </div>
            {onApplyPresetSensitivity && (
              <button
                type="button"
                onClick={() => onApplyPresetSensitivity(selectedProfile.recommendedFilterStability)}
                className="mt-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 rounded py-1 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Zastosuj do potoku</span>
              </button>
            )}
          </div>

          {/* Pedal & Reload Features */}
          <div className="bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-800 flex flex-col justify-between text-[11px]">
            <div className="flex justify-between">
              <span className="text-neutral-400">Akcja pedału:</span>
              <strong className="text-amber-300 font-semibold">{selectedProfile.pedalAction}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Offscreen reload:</span>
              <strong className={selectedProfile.offscreenReload ? 'text-emerald-400' : 'text-neutral-500'}>
                {selectedProfile.offscreenReload ? 'TAK' : 'NIE'}
              </strong>
            </div>
          </div>
        </div>

        {/* Button Mapping Matrix */}
        {selectedProfile.buttonMapping && (
          <div>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">
              Zmapowane wejścia pistoletu i pedału:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                <span className="text-neutral-400">Spust (Trigger):</span>
                <span className="font-mono text-cyan-300 font-bold">{selectedProfile.buttonMapping.trigger}</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                <span className="text-neutral-400">Przeład./Akcja:</span>
                <span className="font-mono text-cyan-300 font-bold">{selectedProfile.buttonMapping.actionOrReload}</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                <span className="text-neutral-400">Pedał USB:</span>
                <span className="font-mono text-amber-300 font-bold">{selectedProfile.buttonMapping.pedal}</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                <span className="text-neutral-400">Start / 1P:</span>
                <span className="font-mono text-neutral-200 font-semibold">{selectedProfile.buttonMapping.start}</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                <span className="text-neutral-400">Coin / Kredyt:</span>
                <span className="font-mono text-neutral-200 font-semibold">{selectedProfile.buttonMapping.coin}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CONFIG FILE GENERATOR SECTION */}
      <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <div>
              <h4 className="font-bold text-xs text-neutral-200 uppercase tracking-wide">
                GENERATOR PLIKÓW KONFIGURACYJNYCH (.INI / .CFG / .XML)
              </h4>
              <p className="text-[11px] text-neutral-400">
                Wartości kalibracji obu graczy (P1 i P2) są automatycznie wstrzykiwane do wygenerowanego pliku
              </p>
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyConfig}
              className="flex items-center gap-1.5 text-xs text-neutral-200 hover:text-cyan-300 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-cyan-500 transition-all cursor-pointer"
            >
              {copiedConfig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedConfig ? 'Skopiowano!' : 'Kopiuj treść'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 px-3 py-1.5 rounded-lg transition-all shadow-md shadow-cyan-400/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Pobierz {generatedConfig.fileName}</span>
            </button>
          </div>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
          {selectedProfile.emulator === 'RetroArch' && (
            <>
              <button
                type="button"
                onClick={() => setConfigFormat('retroarch_snes9x_opt')}
                className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                  configFormat === 'retroarch_snes9x_opt'
                    ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                    : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Snes9x 1.62.3: snes9x.opt
              </button>
              <button
                type="button"
                onClick={() => setConfigFormat('retroarch_game_rmp')}
                className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                  configFormat === 'retroarch_game_rmp'
                    ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                    : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Remap: Snes9x.rmp (Super Scope)
              </button>
              <button
                type="button"
                onClick={() => setConfigFormat('retroarch_cfg_snippet')}
                className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                  configFormat === 'retroarch_cfg_snippet'
                    ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                    : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                retroarch.cfg (Lightgun)
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setConfigFormat('demulshooter')}
            className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
              configFormat === 'demulshooter'
                ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            DemulShooter.ini
          </button>
          <button
            type="button"
            onClick={() => setConfigFormat('mame_game_cfg')}
            className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
              configFormat === 'mame_game_cfg'
                ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            MAME: {selectedProfile.romName}.cfg
          </button>
          <button
            type="button"
            onClick={() => setConfigFormat('mame_ctrlr_ini')}
            className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
              configFormat === 'mame_ctrlr_ini'
                ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            MAME: gaime_lightgun.ini
          </button>
          <button
            type="button"
            onClick={() => setConfigFormat('pcsx2')}
            className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
              configFormat === 'pcsx2'
                ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            PCSX2: Controllers.ini
          </button>
          <button
            type="button"
            onClick={() => setConfigFormat('model2')}
            className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
              configFormat === 'model2'
                ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Model 2: EMULATOR.INI
          </button>
          <button
            type="button"
            onClick={() => setConfigFormat('teknoparrot')}
            className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
              configFormat === 'teknoparrot'
                ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            TeknoParrot: {selectedProfile.romName}.xml
          </button>
          {selectedProfile.emulator !== 'RetroArch' && (
            <>
              <button
                type="button"
                onClick={() => setConfigFormat('retroarch_snes9x_opt')}
                className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                  configFormat === 'retroarch_snes9x_opt'
                    ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                    : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                RetroArch: snes9x.opt
              </button>
              <button
                type="button"
                onClick={() => setConfigFormat('retroarch_game_rmp')}
                className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                  configFormat === 'retroarch_game_rmp'
                    ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                    : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                RetroArch: Snes9x.rmp
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setConfigFormat('vjoy')}
            className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
              configFormat === 'vjoy'
                ? 'bg-neutral-800 text-cyan-300 font-bold border border-cyan-500/50'
                : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            vJoy: vJoy_Gaime.ini
          </button>
        </div>

        {/* Live Config Preview Window */}
        <div className="relative">
          <pre
            id="emulator-config-preview"
            className="bg-neutral-900 text-neutral-300 font-mono text-[11px] p-3.5 rounded-lg border border-neutral-800 overflow-x-auto max-h-52 leading-relaxed selection:bg-cyan-500 selection:text-neutral-950"
          >
            {generatedConfig.content}
          </pre>
        </div>

        {/* Destination Path & Live Calibration Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-neutral-300">
              Docelowa lokalizacja: <strong className="text-cyan-300">{generatedConfig.installLocation}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1 text-neutral-400">
              P1 Calib:
              <strong className={calibrationP1.isCalibrated ? 'text-emerald-400' : 'text-amber-400'}>
                {calibrationP1.isCalibrated ? 'Aktywna (Własna)' : 'Domyślna (Standard)'}
              </strong>
            </span>
            <span className="flex items-center gap-1 text-neutral-400">
              P2 Calib:
              <strong className={calibrationP2.isCalibrated ? 'text-emerald-400' : 'text-neutral-500'}>
                {calibrationP2.isCalibrated ? 'Aktywna' : 'Domyślna'}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
