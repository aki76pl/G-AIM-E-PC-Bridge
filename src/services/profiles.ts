import { GameProfile, MonitorProfile } from '../types';

export const MONITOR_PRESETS: MonitorProfile[] = [
  { id: '1080p', name: '1080p Full HD (1920 × 1080)', width: 1920, height: 1080, scaleFactor: 1.0 },
  { id: '1440p', name: '1440p 2K QHD (2560 × 1440)', width: 2560, height: 1440, scaleFactor: 1.0 },
  { id: '4k', name: '4K Ultra HD (3840 × 2160)', width: 3840, height: 2160, scaleFactor: 1.5 },
  { id: '720p', name: '720p HD (1280 × 720)', width: 1280, height: 720, scaleFactor: 1.0 },
  { id: 'crt_43', name: 'CRT Arcade 4:3 (1600 × 1200)', width: 1600, height: 1200, scaleFactor: 1.0 },
  { id: 'ultrawide', name: 'Ultrawide 21:9 (3440 × 1440)', width: 3440, height: 1440, scaleFactor: 1.0 },
];

export const GAME_PROFILES: GameProfile[] = [
  {
    id: 'tc3',
    name: 'Time Crisis 3',
    system: 'Sony PlayStation 2 (PCSX2)',
    description: 'Klasyczny celownik GunCon 2. Wymaga szybkiej responsywności i przypisania pedału USB do krycia się (Cover/Action).',
    pedalAction: 'DUCK',
    offscreenReload: true,
    recommendedFilterStability: 0.3,
    pcsx2ConfigSnippet: `[Pad1]
Type = GunCon2
GunCon2_Trigger = Mouse:Left
GunCon2_A = Mouse:Middle
GunCon2_B = Mouse:Right
GunCon2_Start = Keyboard:Return
GunCon2_Select = Keyboard:Space
GunCon2_DPadUp = Keyboard:Up
GunCon2_DPadDown = Keyboard:Down
GunCon2_DPadLeft = Keyboard:Left
GunCon2_DPadRight = Keyboard:Right
GunCon2_Pedal = Keyboard:Space # Pedał USB lub klawisz krycia
GunCon2_Pointer = Mouse:AbsolutePointer`,
  },
  {
    id: 'tc2',
    name: 'Time Crisis II',
    system: 'Sony PlayStation 2 (PCSX2)',
    description: 'Kooperacja 2 graczy (P1 i P2). Dedykowany pedał do chowania się i przeładowania magazynka.',
    pedalAction: 'DUCK',
    offscreenReload: true,
    recommendedFilterStability: 0.35,
    pcsx2ConfigSnippet: `[Pad1]
Type = GunCon2
GunCon2_Trigger = Mouse:Left
GunCon2_A = Mouse:Middle
GunCon2_B = Mouse:Right
GunCon2_Pedal = Keyboard:Space

[Pad2]
Type = GunCon2
GunCon2_Trigger = SDL-1:Button0 # Drugi pistolet P2 przez vJoy/Virtual HID
GunCon2_Pedal = Keyboard:LeftShift`,
  },
  {
    id: 'vampire_night',
    name: 'Vampire Night',
    system: 'Sony PlayStation 2 (PCSX2)',
    description: 'Współpraca Namco i Sega (AM2). Wymaga precyzyjnych trafień w czułe punkty wampirów.',
    pedalAction: 'CUSTOM',
    offscreenReload: true,
    recommendedFilterStability: 0.45,
    pcsx2ConfigSnippet: `[Pad1]
Type = GunCon2
GunCon2_Trigger = Mouse:Left
GunCon2_A = Mouse:Right
GunCon2_B = Keyboard:Space
GunCon2_Start = Keyboard:Return`,
  },
  {
    id: 'ninja_assault',
    name: 'Ninja Assault',
    system: 'Sony PlayStation 2 (PCSX2)',
    description: 'Dynamiczny lightgun shooter od Namco z potężnymi atakami Ninjutsu.',
    pedalAction: 'CUSTOM',
    offscreenReload: true,
    recommendedFilterStability: 0.35,
    pcsx2ConfigSnippet: `[Pad1]
Type = GunCon2
GunCon2_Trigger = Mouse:Left
GunCon2_A = Mouse:Right
GunCon2_B = Keyboard:E
GunCon2_Start = Keyboard:Return`,
  },
  {
    id: 'point_blank',
    name: 'Point Blank / Gunvari Collection',
    system: 'Sony PlayStation / PS2 (PCSX2)',
    description: 'Gry zręcznościowe o ekstremalnych wymaganiach precyzji (np. strzał w czubek ołówka). Zalecany wyższy filtr stabilności.',
    pedalAction: 'RELOAD',
    offscreenReload: false,
    recommendedFilterStability: 0.65,
    pcsx2ConfigSnippet: `[Pad1]
Type = GunCon2
GunCon2_Trigger = Mouse:Left
GunCon2_A = Mouse:Right
GunCon2_B = Mouse:Middle
GunCon2_Start = Keyboard:Return`,
  },
  {
    id: 'virtua_cop_rebirth',
    name: 'Virtua Cop Re-Birth',
    system: 'Sony PlayStation 2 (PCSX2)',
    description: 'Słynny klasyk Segi. Precyzyjne strzały Justice Shots.',
    pedalAction: 'RELOAD',
    offscreenReload: true,
    recommendedFilterStability: 0.4,
    pcsx2ConfigSnippet: `[Pad1]
Type = GunCon2
GunCon2_Trigger = Mouse:Left
GunCon2_A = Mouse:Right
GunCon2_B = Mouse:Middle`,
  },
];
