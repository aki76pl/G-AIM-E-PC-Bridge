import React, { useState } from 'react';
import {
  Crosshair,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Sparkles,
  Target,
  ShieldCheck,
  Zap,
  Info,
  X,
  Play
} from 'lucide-react';
import { CalibrationCorner, Point2D } from '../types';

export interface QuickStartCornerGuide {
  id: CalibrationCorner;
  num: number;
  namePl: string;
  nameEn: string;
  badgePl: string;
  badgeEn: string;
  titlePl: string;
  titleEn: string;
  descPl: string;
  descEn: string;
  tipPl: string;
  tipEn: string;
  xPct: number;
  yPct: number;
  expectedRaw: string;
  whyMattersPl: string;
  whyMattersEn: string;
}

export const QUICK_START_GUIDES: QuickStartCornerGuide[] = [
  {
    id: 'TL',
    num: 1,
    namePl: 'Punkt 1: Lewy Górny Róg (Top-Left)',
    nameEn: 'Point 1: Top-Left (TL)',
    badgePl: 'KROK 1 Z 4',
    badgeEn: 'STEP 1 OF 4',
    titlePl: 'Wyceluj w lewy górny narożnik monitora',
    titleEn: 'Aim at the top-left corner of the monitor',
    descPl: 'Odsuń się od ekranu na odległość 1.5 – 2.5 m (optymalny dystans dla ogniskowej kamery IR). Unieś pistolet na wysokość klatki piersiowej, zgraj muszkę z czerwonym celownikiem w lewym górnym rogu matrycy i pociągnij za spust.',
    descEn: 'Step back 1.5 – 2.5 meters from the screen (optimal focal distance for the IR camera). Raise the lightgun to chest level, align the front sight with the top-left crosshair, and pull the trigger.',
    tipPl: 'Wskazówka optyczna: Zadbaj o brak silnego światła słonecznego lub lamp halogenowych za monitorem, które mogłyby oślepić sensor podczerwieni.',
    tipEn: 'Optical tip: Ensure no bright direct sunlight or halogen lights behind the monitor reflect directly into the infrared sensor lens.',
    xPct: 10,
    yPct: 10,
    expectedRaw: 'RAW: X ~1000 | Y ~1000 (Margines 10%)',
    whyMattersPl: 'Definiuje początek układu odniesienia (0,0) oraz górną i lewą granicę pola widzenia.',
    whyMattersEn: 'Defines coordinate origin (0,0) as well as the upper and left field-of-view limits.'
  },
  {
    id: 'TR',
    num: 2,
    namePl: 'Punkt 2: Prawy Górny Róg (Top-Right)',
    nameEn: 'Point 2: Top-Right (TR)',
    badgePl: 'KROK 2 Z 4',
    badgeEn: 'STEP 2 OF 4',
    titlePl: 'Wyceluj w prawy górny narożnik monitora',
    titleEn: 'Aim at the top-right corner of the monitor',
    descPl: 'Przesuń lufę pistoletu w prawy górny narożnik ekranu. Zachowaj tę samą pozycję stóp i odległość od ekranu bez przechylania tułowia w bok.',
    descEn: 'Shift your gun barrel to the top-right corner of the screen. Keep your feet planted and maintain the exact same distance without tilting sideways.',
    tipPl: 'Wskazówka optyczna: Dystans pomiędzy punktem 1 a 2 wyznacza fizyczną rozpiętość matrycy oraz kąt obrotu pistoletu względem osi poziomej.',
    tipEn: 'Optical tip: The distance between point 1 and 2 establishes the horizontal sensor span and horizontal rotational skew.',
    xPct: 90,
    yPct: 10,
    expectedRaw: 'RAW: X ~9000 | Y ~1000 (Margines 10%)',
    whyMattersPl: 'Pozwala na wyliczenie szerokości roboczej ekranu w jednostkach RAW i nachylenia krawędzi.',
    whyMattersEn: 'Calculates the horizontal working span in RAW coordinate space and screen tilt.'
  },
  {
    id: 'BR',
    num: 3,
    namePl: 'Punkt 3: Prawy Dolny Róg (Bottom-Right)',
    nameEn: 'Point 3: Bottom-Right (BR)',
    badgePl: 'KROK 3 Z 4',
    badgeEn: 'STEP 3 OF 4',
    titlePl: 'Wyceluj w prawy dolny narożnik monitora',
    titleEn: 'Aim at the bottom-right corner of the monitor',
    descPl: 'Opuść celownik na prawy dolny narożnik monitora. Zwróć uwagę, czy lufa pistoletu ma bezpośrednią linię wzroku do diod referencyjnych IR.',
    descEn: 'Lower your aim to the bottom-right corner of the monitor. Ensure the lightgun muzzle maintains an unobstructed line-of-sight to the IR reference emitters.',
    tipPl: 'Wskazówka optyczna: Uważaj, aby dłoń podtrzymująca lufę ani pedał nożny nie przysłaniały dolnego paska z diodami LED.',
    tipEn: 'Optical tip: Make sure your forward supporting hand or foot pedal does not block the lower infrared emitter bar.',
    xPct: 90,
    yPct: 90,
    expectedRaw: 'RAW: X ~9000 | Y ~9000 (Margines 10%)',
    whyMattersPl: 'Wyznacza prawą dolną krawędź perspektywy i roboczą wysokość pionową matrycy.',
    whyMattersEn: 'Determines the bottom-right perspective boundary and active vertical height.'
  },
  {
    id: 'BL',
    num: 4,
    namePl: 'Punkt 4: Lewy Dolny Róg (Bottom-Left)',
    nameEn: 'Point 4: Bottom-Left (BL)',
    badgePl: 'KROK 4 Z 4',
    badgeEn: 'STEP 4 OF 4',
    titlePl: 'Wyceluj w lewy dolny narożnik monitora',
    titleEn: 'Aim at the bottom-left corner of the monitor',
    descPl: 'Skieruj pistolet w ostatni, lewy dolny celownik. To finałowy punkt kalibracji, który domyka czworokąt perspektywiczny (Homography 3×3).',
    descEn: 'Aim at the final bottom-left crosshair. This is the closing point that locks down the full 3×3 projective homography matrix.',
    tipPl: 'Wskazówka optyczna: Po zatwierdzeniu tego punktu algorytm automatycznie skompensuje trapez, zniekształcenia kątowe i wyznaczy optymalne zakresy wejściowe!',
    tipEn: 'Optical tip: Once confirmed, the mathematical solver instantly eliminates keystone distortion, angle skew, and sets optimal input boundaries!',
    xPct: 10,
    yPct: 90,
    expectedRaw: 'RAW: X ~1000 | Y ~9000 (Margines 10%)',
    whyMattersPl: 'Zamyka macierz homografii H dla idealnego odwzorowania 1:1 na całym ekranie.',
    whyMattersEn: 'Finalizes homography matrix H for pixel-perfect 1:1 screen mapping across all games.'
  },
];

interface CalibrationQuickStartProps {
  language: 'pl' | 'en';
  activeMode: 'manual' | 'auto-detect';
  onSelectMode: (mode: 'manual' | 'auto-detect') => void;
  onStartCalibration: (startCornerIndex?: number) => void;
  onClose: () => void;
  collectedPoints?: {
    TL?: Point2D;
    TR?: Point2D;
    BR?: Point2D;
    BL?: Point2D;
  };
}

export const CalibrationQuickStart: React.FC<CalibrationQuickStartProps> = ({
  language,
  activeMode,
  onSelectMode,
  onStartCalibration,
  onClose,
  collectedPoints = {},
}) => {
  const [selectedCornerIdx, setSelectedCornerIdx] = useState<number>(0);
  const isPl = language === 'pl';
  const currentGuide = QUICK_START_GUIDES[selectedCornerIdx];

  const handleNextCorner = () => {
    setSelectedCornerIdx((prev) => (prev + 1) % QUICK_START_GUIDES.length);
  };

  const handlePrevCorner = () => {
    setSelectedCornerIdx((prev) => (prev - 1 + QUICK_START_GUIDES.length) % QUICK_START_GUIDES.length);
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-y-auto space-y-4 py-1 animate-in fade-in duration-200">
      {/* Top Banner Notice */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 md:p-4 backdrop-blur shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/10">
            <Monitor className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm md:text-base font-bold text-white font-['Chakra_Petch']">
                {isPl ? 'PRZEWODNIK SZYBKIEGO STARTU: KALIBRACJA 4 NAROŻNIKÓW' : 'QUICK START GUIDE: 4-CORNER CALIBRATION'}
              </h3>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                Homography 3×3 Solver
              </span>
            </div>
            <p className="text-xs text-neutral-300 mt-0.5 max-w-3xl">
              {isPl
                ? 'Kalibracja 4 punktów koryguje perspektywę i kąt pistoletu G\'AIM\'E. Zapoznaj się z sekwencją strzałów (1: TL → 2: TR → 3: BR → 4: BL) poniżej.'
                : 'The 4-point calibration corrects perspective and aiming angle for the G\'AIM\'E lightgun. Review the corner shooting sequence (1: TL → 2: TR → 3: BR → 4: BL) below.'}
            </p>
          </div>
        </div>

        {/* Shoot vs Auto Mode Selector inside Quick Start */}
        <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-lg border border-neutral-800 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={() => onSelectMode('manual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeMode === 'manual'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>{isPl ? 'Tryb Strzału' : 'Shoot Mode'}</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectMode('auto-detect')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeMode === 'auto-detect'
                ? 'bg-cyan-500 text-neutral-950 font-bold shadow'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPl ? 'Auto-Wykrywanie (3s)' : 'Auto-Detect (3s)'}</span>
          </button>
        </div>
      </div>

      {/* Center Layout: Interactive Monitor Mockup + Point Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left / Main Section: Visual Monitor Mockup */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-950/80 border border-neutral-800/90 rounded-xl p-4 relative overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider">
                {isPl ? 'Wizualny Schemat Monitora i Sekwencja Celowania' : 'Visual Monitor & Aiming Sequence Layout'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">
              {isPl ? 'Kliknij narożnik, aby wyświetlić instrukcje' : 'Click a corner to inspect guidelines'}
            </span>
          </div>

          {/* Monitor Frame Simulation */}
          <div className="relative w-full aspect-video bg-neutral-900/90 rounded-lg border-4 border-neutral-700/80 p-3 shadow-inner flex flex-col justify-between">
            {/* Top IR Sensor Bar simulation */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 h-2.5 w-44 bg-neutral-800 rounded-full border border-neutral-600 flex items-center justify-around px-3 z-20 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shadow-red-500 animate-pulse" />
              <span className="text-[8px] font-mono uppercase text-neutral-400 font-bold tracking-widest">
                SENSOR BAR IR
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shadow-red-500 animate-pulse" />
            </div>

            {/* Tactical Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:28px_28px]" />

            {/* Center screen crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full border border-dashed border-neutral-600/60 flex items-center justify-center">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-tighter">
                  {isPl ? 'Środek (50%)' : 'Center (50%)'}
                </span>
              </div>
            </div>

            {/* SVG Connecting Sequence Path (1 -> 2 -> 3 -> 4) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <marker
                  id="arrow-cyan"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#06B6D4" />
                </marker>
              </defs>

              {/* 1 (TL) to 2 (TR) */}
              <line
                x1="12%"
                y1="12%"
                x2="88%"
                y2="12%"
                stroke="#06B6D4"
                strokeWidth="2"
                strokeDasharray="6 4"
                markerEnd="url(#arrow-cyan)"
                className="opacity-70 animate-pulse"
              />

              {/* 2 (TR) to 3 (BR) */}
              <line
                x1="88%"
                y1="14%"
                x2="88%"
                y2="86%"
                stroke="#06B6D4"
                strokeWidth="2"
                strokeDasharray="6 4"
                markerEnd="url(#arrow-cyan)"
                className="opacity-70 animate-pulse"
              />

              {/* 3 (BR) to 4 (BL) */}
              <line
                x1="88%"
                y1="88%"
                x2="14%"
                y2="88%"
                stroke="#06B6D4"
                strokeWidth="2"
                strokeDasharray="6 4"
                markerEnd="url(#arrow-cyan)"
                className="opacity-70 animate-pulse"
              />

              {/* 4 (BL) to 1 (TL) closing quadrangle */}
              <line
                x1="12%"
                y1="86%"
                x2="12%"
                y2="16%"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                className="opacity-40"
              />
            </svg>

            {/* 4 Corner Nodes on Monitor */}
            {QUICK_START_GUIDES.map((guide, idx) => {
              const isSelected = selectedCornerIdx === idx;
              const isCaptured = Boolean(collectedPoints[guide.id]);

              return (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => setSelectedCornerIdx(idx)}
                  style={{ left: `${guide.xPct}%`, top: `${guide.yPct}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center group cursor-pointer transition-all duration-200 ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  {/* Outer pulsating ring if selected */}
                  {isSelected && (
                    <div className="absolute -inset-2 rounded-full border-2 border-cyan-400 animate-ping opacity-60 pointer-events-none" />
                  )}

                  {/* Corner Target Badge */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-all ${
                      isCaptured
                        ? 'bg-emerald-500 text-neutral-950 border-2 border-emerald-300 ring-2 ring-emerald-500/40'
                        : isSelected
                        ? 'bg-cyan-500 text-neutral-950 border-2 border-white ring-4 ring-cyan-500/40 shadow-cyan-500/50'
                        : 'bg-neutral-800 text-neutral-300 border-2 border-neutral-600 hover:border-cyan-400'
                    }`}
                  >
                    {isCaptured ? <CheckCircle2 className="w-5 h-5 text-neutral-950" /> : guide.num}
                  </div>

                  {/* Label pill */}
                  <div
                    className={`mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap shadow-md transition-all ${
                      isSelected
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500'
                        : 'bg-black/80 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    {guide.id} ({guide.xPct}%, {guide.yPct}%)
                  </div>
                </button>
              );
            })}

            {/* Bottom Bezel Footer simulation */}
            <div className="mt-auto text-center pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                G'AIM'E LIGHTGUN CALIBRATION MATRIX
              </span>
            </div>
          </div>

          {/* Sequence summary footer */}
          <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <div className="flex items-center gap-1.5 text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isPl ? 'Rekomendowany dystans:' : 'Recommended distance:'} 1.5m – 2.5m</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <span>{isPl ? 'Kolejność:' : 'Sequence:'} 1 (TL) &rarr; 2 (TR) &rarr; 3 (BR) &rarr; 4 (BL)</span>
            </div>
          </div>
        </div>

        {/* Right Section: Point Detail Card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 backdrop-blur shadow-xl">
          <div className="space-y-3.5">
            {/* Corner Badge & Navigation Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold tracking-wide">
                  {isPl ? currentGuide.badgePl : currentGuide.badgeEn}
                </span>
                <span className="text-xs font-bold text-neutral-200">
                  {currentGuide.id}
                </span>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevCorner}
                  className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                  title={isPl ? 'Poprzedni punkt' : 'Previous point'}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-neutral-400 px-1">
                  {selectedCornerIdx + 1} / 4
                </span>
                <button
                  type="button"
                  onClick={handleNextCorner}
                  className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                  title={isPl ? 'Następny punkt' : 'Next point'}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title and Position */}
            <div>
              <h4 className="text-base font-bold text-white leading-tight">
                {isPl ? currentGuide.namePl : currentGuide.nameEn}
              </h4>
              <div className="mt-1 flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>{currentGuide.expectedRaw}</span>
              </div>
            </div>

            {/* Instruction description */}
            <div className="bg-neutral-950/90 rounded-lg p-3 border border-neutral-800 space-y-2">
              <div className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isPl ? 'Instrukcja celowania:' : 'Aiming instruction:'}</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {isPl ? currentGuide.descPl : currentGuide.descEn}
              </p>
            </div>

            {/* Optical tip */}
            <div className="bg-cyan-950/30 rounded-lg p-3 border border-cyan-500/30 space-y-1.5">
              <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{isPl ? 'Zalecenie optyczne (Anti-Glare):' : 'Optical guideline (Anti-Glare):'}</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                {isPl ? currentGuide.tipPl : currentGuide.tipEn}
              </p>
            </div>

            {/* Mathematical significance */}
            <div className="bg-neutral-950/60 rounded-lg p-2.5 border border-neutral-800">
              <span className="text-[10px] uppercase font-mono text-neutral-500 font-bold block mb-0.5">
                {isPl ? 'Rola w macierzy Homografii 3×3:' : 'Role in 3×3 Homography:'}
              </span>
              <p className="text-xs text-emerald-400 font-medium">
                {isPl ? currentGuide.whyMattersPl : currentGuide.whyMattersEn}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-neutral-800 space-y-2">
            <button
              type="button"
              onClick={() => onStartCalibration(selectedCornerIdx)}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>
                {isPl
                  ? `Rozpocznij Kalibrację (${currentGuide.namePl.split('(')[0].trim()})`
                  : `Start Calibration (${currentGuide.nameEn.split('(')[0].trim()})`}
              </span>
            </button>
            <p className="text-[11px] text-neutral-400 text-center font-mono">
              {isPl
                ? 'Naciśnij SPACJĘ, aby rozpocząć lub strzel w celownik po otwarciu'
                : 'Press SPACE to start or shoot the crosshair after entering'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom 4-Card Sequence Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
        {QUICK_START_GUIDES.map((guide, idx) => {
          const isSelected = selectedCornerIdx === idx;
          const isCaptured = Boolean(collectedPoints[guide.id]);

          return (
            <div
              key={guide.id}
              onClick={() => setSelectedCornerIdx(idx)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-500/40 text-cyan-200 shadow-md shadow-cyan-500/10'
                  : isCaptured
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-neutral-900/60 border-neutral-800/80 text-neutral-400 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-mono flex items-center gap-1.5">
                  {isCaptured ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-neutral-800 border border-neutral-600 text-[10px] flex items-center justify-center font-bold">
                      {guide.num}
                    </span>
                  )}
                  {guide.id} ({guide.xPct}%, {guide.yPct}%)
                </span>
                <span
                  className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                    isSelected
                      ? 'bg-cyan-500 text-neutral-950'
                      : isCaptured
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}
                >
                  {isSelected ? (isPl ? 'Wybrany' : 'Active') : isCaptured ? (isPl ? 'Zapisany' : 'Captured') : (isPl ? 'Oczekuje' : 'Waiting')}
                </span>
              </div>
              <p className="text-[11px] text-neutral-300 line-clamp-2">
                {isPl ? guide.titlePl : guide.titleEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
