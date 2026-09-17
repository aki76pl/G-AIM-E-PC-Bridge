import React, { useRef, useEffect, useState } from 'react';
import { Crosshair, Zap, RotateCcw, Eye, ShieldCheck } from 'lucide-react';
import { GunState, MonitorProfile, Point2D } from '../types';

interface LiveAimCanvasProps {
  gunState: GunState;
  selectedMonitor: MonitorProfile;
  onSimulatedMove: (rawX: number, rawY: number) => void;
  onSimulatedTrigger: (pressed: boolean) => void;
  onResetTrajectory: () => void;
}

export const LiveAimCanvas: React.FC<LiveAimCanvasProps> = ({
  gunState,
  selectedMonitor,
  onSimulatedMove,
  onSimulatedTrigger,
  onResetTrajectory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<Point2D[]>([]);
  const [shotMarks, setShotMarks] = useState<Point2D[]>([]);
  const [isFiringFlash, setIsFiringFlash] = useState(false);

  // Update trail
  useEffect(() => {
    setTrail((prev) => {
      const next = [...prev, { x: gunState.normalizedX, y: gunState.normalizedY }];
      if (next.length > 20) next.shift();
      return next;
    });
  }, [gunState.normalizedX, gunState.normalizedY]);

  // Trigger flash effect
  useEffect(() => {
    if (gunState.trigger) {
      setIsFiringFlash(true);
      setShotMarks((prev) => [
        ...prev.slice(-12),
        { x: gunState.normalizedX, y: gunState.normalizedY },
      ]);
      const timer = setTimeout(() => setIsFiringFlash(false), 120);
      return () => clearTimeout(timer);
    }
  }, [gunState.trigger, gunState.normalizedX, gunState.normalizedY]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Convert to raw lightgun coordinate space (nominal 100 - 9900)
    const rawX = Math.round(100 + x * 9800);
    const rawY = Math.round(100 + y * 9800);
    onSimulatedMove(rawX, rawY);
  };

  const handlePointerDown = () => {
    onSimulatedTrigger(true);
  };

  const handlePointerUp = () => {
    onSimulatedTrigger(false);
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 lg:p-5 flex flex-col gap-3">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-cyan-400">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-['Chakra_Petch'] font-bold text-sm tracking-wide text-neutral-200">
              WIRTUALNY EKRAN I CELOWNIK LIVE
            </h3>
            <p className="text-xs text-neutral-400">
              Podgląd współrzędnych ekranowych po filtracji i kalibracji perspektywicznej
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setShotMarks([]);
              setTrail([]);
              onResetTrajectory();
            }}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200 px-2 py-1 rounded bg-neutral-950 border border-neutral-800"
            title="Wyczyść ślady strzałów"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Wyczyść</span>
          </button>
        </div>
      </div>

      {/* Interactive Aim Screen */}
      <div
        ref={containerRef}
        id="live-aim-monitor"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className={`relative w-full aspect-video bg-neutral-950 rounded-lg border-2 overflow-hidden cursor-crosshair select-none transition-colors ${
          isFiringFlash ? 'border-amber-400 bg-amber-500/10' : 'border-neutral-800 hover:border-cyan-500/40'
        }`}
      >
        {/* Subtle grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-r border-b border-cyan-500/40" />
          ))}
        </div>

        {/* Center Cross Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-30 flex items-center justify-center">
          <div className="w-full h-[1px] bg-cyan-400" />
          <div className="h-full w-[1px] bg-cyan-400 absolute" />
        </div>

        {/* Guncon Offscreen Reload Border Cue */}
        <div className="absolute inset-0 border border-dashed border-neutral-800 pointer-events-none m-2 rounded" />

        {/* Trajectory Trail */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {trail.length > 1 && (
            <polyline
              points={trail.map((p) => `${p.x * 100}%,${p.y * 100}%`).join(' ')}
              fill="none"
              stroke="rgba(6, 182, 212, 0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>

        {/* Shot marks (bullet holes) */}
        {shotMarks.map((mark, idx) => (
          <div
            key={idx}
            style={{ left: `${mark.x * 100}%`, top: `${mark.y * 100}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-amber-400/80 bg-amber-500/30 flex items-center justify-center pointer-events-none animate-ping"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
          </div>
        ))}

        {/* Raw Position Ghost Dot (Amber) */}
        <div
          style={{
            left: `${Math.min(100, Math.max(0, (gunState.rawX / 10000) * 100))}%`,
            top: `${Math.min(100, Math.max(0, (gunState.rawY / 10000) * 100))}%`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75"
        >
          <div className="w-3 h-3 rounded-full border border-amber-400/60 bg-amber-500/20" />
          <span className="text-[9px] font-mono text-amber-400/70 absolute -top-4 -left-4 whitespace-nowrap">
            RAW
          </span>
        </div>

        {/* Filtered & Calibrated Reticle (Cyan) */}
        <div
          style={{
            left: `${Math.min(100, Math.max(0, gunState.normalizedX * 100))}%`,
            top: `${Math.min(100, Math.max(0, gunState.normalizedY * 100))}%`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75"
        >
          <div className="relative flex items-center justify-center">
            {/* Outer Ring */}
            <div
              className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                gunState.trigger
                  ? 'border-rose-400 bg-rose-500/30 scale-125'
                  : 'border-cyan-400 bg-cyan-500/10'
              }`}
            >
              {/* Inner Dot */}
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  gunState.trigger ? 'bg-white' : 'bg-cyan-300'
                }`}
              />
            </div>

            {/* Reticle Sight Bars */}
            <div className="absolute w-14 h-[1px] bg-cyan-400/80 pointer-events-none" />
            <div className="absolute h-14 w-[1px] bg-cyan-400/80 pointer-events-none" />

            {/* Dynamic Coordinates Label */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-neutral-900/90 border border-neutral-800 text-[10px] font-mono text-cyan-300 whitespace-nowrap">
              {Math.round(gunState.screenX)}, {Math.round(gunState.screenY)}
            </div>
          </div>
        </div>

        {/* Recoil Flash overlay */}
        {isFiringFlash && (
          <div className="absolute inset-0 bg-white/15 pointer-events-none transition-opacity" />
        )}

        {/* Watermark/Instruction */}
        <div className="absolute bottom-2 left-3 text-[10px] text-neutral-500 font-mono pointer-events-none">
          {gunState.isSimulated
            ? 'Poruszaj kursorem lub przeciągaj, aby celować pistoletem. Kliknij, aby pociągnąć za spust.'
            : 'Fizyczny pistolet G\'AIM\'E podłączony — celuj bezpośrednio w ekran!'}
        </div>
      </div>

      {/* Legend & Telemetry Summary */}
      <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 pt-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
            <span className="text-neutral-300 font-medium">Skalibrowany celownik (PCSX2)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="text-neutral-400">Surowy punkt RAW sensora</span>
          </div>
        </div>

        <div className="font-mono text-neutral-500">
          Format: 6 bajtów HID digitizera (0x01 FLAGS Xlo Xhi Ylo Yhi)
        </div>
      </div>
    </div>
  );
};
