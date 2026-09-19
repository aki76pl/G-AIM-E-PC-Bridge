import React from 'react';
import { Users, Footprints } from 'lucide-react';
import { GunState } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DualGunPedalCardProps {
  gunStateP1: GunState;
  gunStateP2: GunState;
  activePlayer: 'P1' | 'P2';
  onTogglePlayer: (p: 'P1' | 'P2') => void;
  onPedalPress: () => void;
}

export const DualGunPedalCard: React.FC<DualGunPedalCardProps> = ({
  gunStateP1,
  gunStateP2,
  activePlayer,
  onTogglePlayer,
  onPedalPress,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 lg:p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-['Chakra_Petch'] font-bold text-sm tracking-wide text-neutral-200">
              {t.dualGunTitle}
            </h3>
            <p className="text-xs text-neutral-400">
              {t.dualGunSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Dual Gun Selector & Live Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* P1 Box */}
        <div
          onClick={() => onTogglePlayer('P1')}
          className={`cursor-pointer rounded-lg p-3 border transition-all ${
            activePlayer === 'P1'
              ? 'bg-cyan-950/30 border-cyan-500/60 shadow-sm shadow-cyan-500/10'
              : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              {t.player1Label}
            </span>
            <span className="text-[10px] font-mono text-neutral-500">Port USB #1</span>
          </div>
          <div className="text-xs space-y-1 text-neutral-300">
            <div className="flex justify-between">
              <span className="text-neutral-400">{language === 'pl' ? 'Pozycja:' : 'Position:'}</span>
              <span className="font-mono text-cyan-300 font-semibold">
                X: {gunStateP1.rawX} | Y: {gunStateP1.rawY}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">{language === 'pl' ? 'Wyjście:' : 'Output:'}</span>
              <span className="font-mono text-neutral-300">Windows Cursor (P1)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">{language === 'pl' ? 'Stan kalibracji:' : 'Calibration:'}</span>
              <span className="text-emerald-400 font-semibold">
                {language === 'pl' ? 'Skalibrowany' : 'Calibrated'}
              </span>
            </div>
          </div>
        </div>

        {/* P2 Box */}
        <div
          onClick={() => onTogglePlayer('P2')}
          className={`cursor-pointer rounded-lg p-3 border transition-all ${
            activePlayer === 'P2'
              ? 'bg-amber-950/30 border-amber-500/60 shadow-sm shadow-amber-500/10'
              : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {t.player2Label}
            </span>
            <span className="text-[10px] font-mono text-neutral-500">Port USB #2</span>
          </div>
          <div className="text-xs space-y-1 text-neutral-300">
            <div className="flex justify-between">
              <span className="text-neutral-400">{language === 'pl' ? 'Pozycja:' : 'Position:'}</span>
              <span className="font-mono text-amber-300 font-semibold">
                X: {gunStateP2.rawX} | Y: {gunStateP2.rawY}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">{language === 'pl' ? 'Wyjście:' : 'Output:'}</span>
              <span className="font-mono text-neutral-300">Virtual HID / vJoy (P2)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">{language === 'pl' ? 'Stan kalibracji:' : 'Calibration:'}</span>
              <span className="text-amber-400 font-semibold">
                {language === 'pl' ? 'Osobna macierz P2' : 'Independent P2 Matrix'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Gun Routing Technical Strategy */}
      <div className="bg-neutral-950 rounded-lg p-3.5 border border-neutral-800 text-xs space-y-2.5">
        <span className="font-semibold text-neutral-200 block">
          {language === 'pl'
            ? "Jak G'AIM'E Bridge rozwiązuje problem dwóch pistoletów w Windows / PCSX2 / RetroArch:"
            : "How G'AIM'E Bridge handles dual lightguns in Windows / PCSX2 / RetroArch:"}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-400">
          <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
            <strong className="text-cyan-300 block mb-1">
              {language === 'pl' ? 'Metoda A: Windows Cursor + vJoy / SDL2' : 'Method A: Windows Cursor + vJoy / SDL2'}
            </strong>
            {language === 'pl'
              ? 'P1 steruje bezpośrednio kursorem myszy, a P2 przekazuje absolutne współrzędne przez lekki wirtualny joystick (vJoy/ViGEm), który emulatory rozpoznają jako niezależny GunCon 2 lub mysz Portu 2!'
              : 'P1 directly controls the Windows mouse cursor, while P2 passes absolute coordinates through a virtual joystick (vJoy/ViGEm), which emulators recognize as an independent Port 2 gun!'}
          </div>
          <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
            <strong className="text-amber-300 block mb-1">
              {language === 'pl' ? 'Metoda B: Raw Input Separation' : 'Method B: Raw Input Separation'}
            </strong>
            {language === 'pl'
              ? 'Aplikacja czyta unikalne ścieżki urządzeń HID dla każdego pistoletu, dzięki czemu nawet dwa identyczne egzemplarze G\'AIM\'E zachowują niezależne kalibracje i bufory filtracji.'
              : 'The application reads unique HID device paths for each gun, ensuring independent calibration matrices and noise buffers even with identical hardware models.'}
          </div>
        </div>
      </div>

      {/* USB Foot Pedal Section */}
      <div className="border-t border-neutral-800 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Footprints className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-neutral-200">
              {language === 'pl'
                ? 'Pedał Nożny USB (Time Crisis / T2 Arcade / Reload)'
                : 'USB Foot Pedal (Time Crisis / T2 Arcade / Reload)'}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">
            {t.pedalBindingInfo}
          </p>
        </div>

        <button
          id="btn-pedal-interactive"
          type="button"
          onClick={onPedalPress}
          className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            gunStateP1.pedal
              ? 'bg-amber-500 border-amber-400 text-neutral-950 shadow-md shadow-amber-500/30 scale-95'
              : 'bg-neutral-950 border-neutral-700 text-neutral-200 hover:border-amber-400/50'
          }`}
        >
          <Footprints className="w-4 h-4" />
          <span>
            {gunStateP1.pedal
              ? (language === 'pl' ? 'PEDAŁ WCIŚNIĘTY (AKCJA)' : 'PEDAL ENGAGED (ACTION)')
              : (language === 'pl' ? 'NACIŚNIJ PEDAŁ (SPACJA)' : 'PRESS PEDAL (SPACEBAR)')}
          </span>
        </button>
      </div>
    </div>
  );
};
