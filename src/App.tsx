import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { GunStatusCard } from './components/GunStatusCard';
import { LiveAimCanvas } from './components/LiveAimCanvas';
import { FilterControls } from './components/FilterControls';
import { CalibrationModal } from './components/CalibrationModal';
import { EmulatorIntegrationsCard } from './components/EmulatorIntegrationsCard';
import { DualGunPedalCard } from './components/DualGunPedalCard';
import { RawPacketLog } from './components/RawPacketLog';
import { SourceCodeModal } from './components/SourceCodeModal';
import { StandaloneWin11Modal } from './components/StandaloneWin11Modal';
import { CalibrationData, FilterSettings, GameProfile, GunState, MonitorProfile } from './types';
import { applyCalibration, DEFAULT_CALIBRATION } from './services/calibration';
import { LightgunFilterPipeline } from './services/filter';
import { GAME_PROFILES, MONITOR_PRESETS } from './services/profiles';
import { WebHidLightgunService } from './services/webhid';
import { downloadCSharpProjectZip } from './services/zipExporter';

interface PacketLogItem {
  id: number;
  time: string;
  bytes: number[];
  rawX: number;
  rawY: number;
  trigger: boolean;
  inRange: boolean;
}

const INITIAL_FILTER_SETTINGS: FilterSettings = {
  stabilityVsSpeed: 0.35,
  maxJumpThreshold: 1800,
  medianWindow: 3,
  deadband: 8,
  enableSpikeFilter: true,
  offscreenReloadDelayMs: 80,
};

const INITIAL_GUN_STATE = (id: 'P1' | 'P2'): GunState => ({
  id,
  name: id === 'P1' ? "G'AIM'E v1 (Gracz 1)" : "G'AIM'E v1 (Gracz 2)",
  connected: false,
  isSimulated: true,
  vid: '2E2C',
  pid: '0631',
  rawX: 5000,
  rawY: 5000,
  filteredX: 5000,
  filteredY: 5000,
  normalizedX: 0.5,
  normalizedY: 0.5,
  screenX: 960,
  screenY: 540,
  trigger: false,
  inRange: true,
  btnA: false,
  btnB: false,
  btnStart: false,
  btnCoin: false,
  pedal: false,
  reportCount: 0,
  reportsPerSecond: 0,
  lastJump: 0,
  rejectedJumps: 0,
  lastRawPacket: [0x01, 0x02, 0x88, 0x13, 0x88, 0x13],
});

export default function App() {
  const [activePlayer, setActivePlayer] = useState<'P1' | 'P2'>('P1');
  const [gunStateP1, setGunStateP1] = useState<GunState>(INITIAL_GUN_STATE('P1'));
  const [gunStateP2, setGunStateP2] = useState<GunState>(INITIAL_GUN_STATE('P2'));
  const [selectedMonitor, setSelectedMonitor] = useState<MonitorProfile>(MONITOR_PRESETS[0]);
  const [selectedProfile, setSelectedProfile] = useState<GameProfile>(GAME_PROFILES[0]);
  const [filterSettings, setFilterSettings] = useState<FilterSettings>(INITIAL_FILTER_SETTINGS);
  const [calibrationP1, setCalibrationP1] = useState<CalibrationData>(DEFAULT_CALIBRATION);
  const [calibrationP2, setCalibrationP2] = useState<CalibrationData>(DEFAULT_CALIBRATION);

  const [packets, setPackets] = useState<PacketLogItem[]>([]);
  const [isCalibrationOpen, setIsCalibrationOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isWin11ModalOpen, setIsWin11ModalOpen] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const filterPipelineP1 = useRef(new LightgunFilterPipeline(filterSettings));
  const filterPipelineP2 = useRef(new LightgunFilterPipeline(filterSettings));
  const webHidService = useRef(new WebHidLightgunService());

  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  }, []);

  // Update filter settings in pipelines
  useEffect(() => {
    filterPipelineP1.current.updateSettings(filterSettings);
    filterPipelineP2.current.updateSettings(filterSettings);
  }, [filterSettings]);

  // Sync profile recommendations
  const handleSelectProfile = (p: GameProfile) => {
    setSelectedProfile(p);
    setFilterSettings((prev) => ({
      ...prev,
      stabilityVsSpeed: p.recommendedFilterStability,
    }));
    showNotification(`Załadowano profil gry: ${p.name} (Zalecany filtr: ${Math.round(p.recommendedFilterStability * 100)}%)`);
  };

  // Process incoming coordinates through filter & calibration
  const processIncomingAim = useCallback(
    (playerId: 'P1' | 'P2', rawX: number, rawY: number, trigger: boolean, inRange = true) => {
      const isP1 = playerId === 'P1';
      const pipeline = isP1 ? filterPipelineP1.current : filterPipelineP2.current;
      const calib = isP1 ? calibrationP1 : calibrationP2;

      // Filter
      const { point: filtered, jumpMagnitude, totalRejected } = pipeline.process(rawX, rawY);

      // Homography
      const { normX, normY } = applyCalibration(filtered, calib);

      // Pixel screen mapping
      const screenX = normX * selectedMonitor.width;
      const screenY = normY * selectedMonitor.height;

      const updater = isP1 ? setGunStateP1 : setGunStateP2;
      updater((prev) => ({
        ...prev,
        rawX,
        rawY,
        filteredX: filtered.x,
        filteredY: filtered.y,
        normalizedX: normX,
        normalizedY: normY,
        screenX,
        screenY,
        trigger,
        inRange,
        lastJump: jumpMagnitude,
        rejectedJumps: totalRejected,
      }));
    },
    [calibrationP1, calibrationP2, selectedMonitor]
  );

  // WebHID service connection setup
  useEffect(() => {
    const service = webHidService.current;
    service.setCallbacks(
      (partial) => {
        if (partial.rawX !== undefined && partial.rawY !== undefined) {
          processIncomingAim(
            activePlayer,
            partial.rawX,
            partial.rawY,
            partial.trigger ?? false,
            partial.inRange ?? true
          );
        }
        if (partial.connected !== undefined) {
          const updater = activePlayer === 'P1' ? setGunStateP1 : setGunStateP2;
          updater((prev) => ({ ...prev, ...partial }));
        }
      },
      (rawBytes) => {
        const time = new Date().toLocaleTimeString();
        let trigger = false;
        let inRange = false;
        let rx = 5000;
        let ry = 5000;

        if (rawBytes.length >= 6) {
          const flags = rawBytes[1];
          trigger = (flags & 0x01) !== 0;
          inRange = (flags & 0x02) !== 0;
          rx = rawBytes[2] | (rawBytes[3] << 8);
          ry = rawBytes[4] | (rawBytes[5] << 8);
        }

        setPackets((prev) => [
          ...prev.slice(-40),
          {
            id: Date.now() + Math.random(),
            time,
            bytes: rawBytes,
            rawX: rx,
            rawY: ry,
            trigger,
            inRange,
          },
        ]);
      }
    );

    return () => {
      service.disconnect();
    };
  }, [activePlayer, processIncomingAim]);

  // Keyboard shortcut: Spacebar as USB foot pedal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setGunStateP1((prev) => ({ ...prev, pedal: true }));
        setGunStateP2((prev) => ({ ...prev, pedal: true }));
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setGunStateP1((prev) => ({ ...prev, pedal: false }));
        setGunStateP2((prev) => ({ ...prev, pedal: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handlers
  const handleConnectWebHid = async () => {
    try {
      const ok = await webHidService.current.connectRealDevice();
      if (ok) {
        showNotification("Pomyślnie połączono z pistoletem G'AIM'E (2E2C:0631) przez WebHID!");
      }
    } catch (err: any) {
      showNotification(`Błąd WebHID: ${err.message || 'Nie wybrano urządzenia'}`);
    }
  };

  const handleDisconnectWebHid = () => {
    webHidService.current.disconnect();
    showNotification("Rozłączono urządzenie WebHID G'AIM'E.");
  };

  const handleSimulatedMove = (rawX: number, rawY: number) => {
    const activeGun = activePlayer === 'P1' ? gunStateP1 : gunStateP2;
    processIncomingAim(activePlayer, rawX, rawY, activeGun.trigger, true);
    webHidService.current.dispatchSimulatedReport(rawX, rawY, activeGun.trigger, true);
  };

  const handleSimulatedTrigger = (pressed: boolean) => {
    const activeGun = activePlayer === 'P1' ? gunStateP1 : gunStateP2;
    processIncomingAim(activePlayer, activeGun.rawX, activeGun.rawY, pressed, true);
    webHidService.current.dispatchSimulatedReport(activeGun.rawX, activeGun.rawY, pressed, true);
  };

  const handleTogglePedal = () => {
    setGunStateP1((prev) => ({ ...prev, pedal: !prev.pedal }));
    setGunStateP2((prev) => ({ ...prev, pedal: !prev.pedal }));
  };

  const handleInjectSpike = () => {
    const activeGun = activePlayer === 'P1' ? gunStateP1 : gunStateP2;
    const wildX = Math.min(9900, activeGun.rawX + 4500);
    const wildY = Math.max(100, activeGun.rawY - 3500);
    showNotification("Wstrzyknięto skok anomalii optycznej (+4500 jedn.) — filtr pomyślnie zablokował skok celownika!");
    processIncomingAim(activePlayer, wildX, wildY, false, true);
  };

  const handleSaveCalibration = (data: CalibrationData) => {
    if (activePlayer === 'P1') {
      setCalibrationP1(data);
    } else {
      setCalibrationP2(data);
    }

    if (data.optimalRanges) {
      setFilterSettings(prev => ({
        ...prev,
        stabilityVsSpeed: data.optimalRanges!.recommendedFilterStability,
      }));
      showNotification(
        `Zastosowano kalibrację i optymalną czułość (${Math.round(data.optimalRanges.recommendedFilterStability * 100)}% stabilizacji) dla Gracza ${activePlayer}!`
      );
    } else {
      showNotification(`Zastosowano nową kalibrację perspektywiczną 4 punktów dla Gracza ${activePlayer}!`);
    }
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      await downloadCSharpProjectZip();
      showNotification('Pobrano kompletną paczkę ZIP z projektem Visual Studio 2022 .NET 8 WPF!');
    } catch (e: any) {
      console.error(e);
      showNotification(`Błąd generowania ZIP: ${e.message}`);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const currentGun = activePlayer === 'P1' ? gunStateP1 : gunStateP2;

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-neutral-100">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-950/95 border border-cyan-500/50 text-cyan-200 text-xs px-4 py-3 rounded-xl shadow-2xl backdrop-blur animate-in slide-in-from-bottom-5">
          {notification}
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        gunState={currentGun}
        activePlayer={activePlayer}
        onSelectPlayer={setActivePlayer}
        onOpenCalibration={() => setIsCalibrationOpen(true)}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onOpenWin11Standalone={() => setIsWin11ModalOpen(true)}
        onDownloadZip={handleDownloadZip}
        onConnectWebHid={handleConnectWebHid}
        onDisconnectWebHid={handleDisconnectWebHid}
        isDownloadingZip={isDownloadingZip}
      />

      {/* Standalone Windows 11 Alert / Quick Action Bar */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-neutral-900 to-neutral-950 border-b border-cyan-500/20 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong className="text-white">Samodzielna aplikacja Windows 11:</strong> Pojedynczy plik <code className="text-cyan-300 font-mono">GaimePcBridge.exe</code> (Self-Contained Single-File) bez instalowania .NET Runtime.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsWin11ModalOpen(true)}
              className="px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-semibold transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instrukcja kompilacji Win11</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadZip}
              disabled={isDownloadingZip}
              className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-[11px] transition-all"
            >
              {isDownloadingZip ? 'Pobieranie...' : 'Pobierz Paczkę (.ZIP)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (Hardware & Filters) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <GunStatusCard
            gunState={currentGun}
            monitors={MONITOR_PRESETS}
            selectedMonitor={selectedMonitor}
            onSelectMonitor={setSelectedMonitor}
            onTogglePedal={handleTogglePedal}
            onTriggerPull={() => handleSimulatedTrigger(!currentGun.trigger)}
          />

          <FilterControls
            filterSettings={filterSettings}
            onUpdateSettings={setFilterSettings}
            lastJumpMagnitude={currentGun.lastJump}
            totalRejectedJumps={currentGun.rejectedJumps}
            onInjectTestSpike={handleInjectSpike}
            currentRawX={currentGun.rawX}
            currentRawY={currentGun.rawY}
            isGunConnected={currentGun.connected && !currentGun.isSimulated}
          />

          <DualGunPedalCard
            gunStateP1={gunStateP1}
            gunStateP2={gunStateP2}
            activePlayer={activePlayer}
            onTogglePlayer={setActivePlayer}
            onPedalPress={handleTogglePedal}
          />
        </div>

        {/* Right Column (Aim Canvas, PCSX2 Guide & Hex Log) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <LiveAimCanvas
            gunState={currentGun}
            selectedMonitor={selectedMonitor}
            onSimulatedMove={handleSimulatedMove}
            onSimulatedTrigger={handleSimulatedTrigger}
            onResetTrajectory={() => {
              filterPipelineP1.current.reset();
              filterPipelineP2.current.reset();
            }}
          />

          <EmulatorIntegrationsCard
            selectedProfile={selectedProfile}
            onSelectProfile={handleSelectProfile}
            calibrationP1={calibrationP1}
            calibrationP2={calibrationP2}
            selectedMonitor={selectedMonitor}
            onApplyPresetSensitivity={(stability) => {
              setFilterSettings((prev) => ({
                ...prev,
                stabilityVsSpeed: stability,
              }));
              showNotification(
                `Zastosowano czułość filtra z profilu (${Math.round(stability * 100)}% stabilizacji)!`
              );
            }}
          />

          <RawPacketLog
            packets={packets}
            onClear={() => setPackets([])}
          />
        </div>
      </main>

      {/* 4-Point Calibration Modal */}
      <CalibrationModal
        isOpen={isCalibrationOpen}
        onClose={() => setIsCalibrationOpen(false)}
        onSaveCalibration={handleSaveCalibration}
        currentRawX={currentGun.rawX}
        currentRawY={currentGun.rawY}
        isTriggerPressed={currentGun.trigger}
      />

      {/* C# Source Code Modal */}
      <SourceCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        onDownloadZip={handleDownloadZip}
        isDownloadingZip={isDownloadingZip}
      />

      {/* Standalone Windows 11 Modal */}
      <StandaloneWin11Modal
        isOpen={isWin11ModalOpen}
        onClose={() => setIsWin11ModalOpen(false)}
        onDownloadZip={handleDownloadZip}
        isDownloadingZip={isDownloadingZip}
      />
    </div>
  );
}
