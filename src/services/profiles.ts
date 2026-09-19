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
  // --- THE HOUSE OF THE DEAD 1 - 4 ---
  {
    id: 'hotd1',
    name: 'The House of the Dead 1',
    system: 'Sega Model 2 / Arcade (DemulShooter)',
    emulator: 'Model2',
    romName: 'hotd',
    description: 'Klasyk arcade Segi z 1996 r. Wymaga szybkiego celowania w głowy zombie i natychmiastowego przeładowania poza ekranem.',
    pedalAction: 'RELOAD',
    offscreenReload: true,
    recommendedFilterStability: 0.28,
    deadzone: 6,
    sensitivityMultiplier: 1.1,
    buttonMapping: {
      trigger: 'Mouse Left',
      actionOrReload: 'Mouse Right / Off-screen',
      pedal: 'Key Space (Przeładowanie)',
      start: 'Key 1',
      coin: 'Key 5',
    },
    demulShooterTarget: '-target=model2 -rom=hotd',
    pcsx2ConfigSnippet: `; Model 2 Emulator / DemulShooter Target
; Launch: DemulShooter.exe -target=model2 -rom=hotd
[Model2_Input]
P1_Gun_X = MOUSE1_X
P1_Gun_Y = MOUSE1_Y
P1_Trigger = MOUSE1_BUTTON1
P1_Reload = MOUSE1_BUTTON2`,
    notes: 'DemulShooter eliminuje błąd dryfu wskaźnika w Model 2 Emulator.',
  },
  {
    id: 'hotd2',
    name: 'The House of the Dead 2',
    system: 'Sega NAOMI / Demul / Flycast Arcade',
    emulator: 'DemulShooter',
    romName: 'hotd2',
    description: 'Kultowa odsłona na Sega NAOMI. Dynamiczne potyczki z bossami (Judgment, Hierophant) i rozgałęzione ścieżki fabularne.',
    pedalAction: 'RELOAD',
    offscreenReload: true,
    recommendedFilterStability: 0.32,
    deadzone: 8,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left',
      actionOrReload: 'Mouse Right',
      pedal: 'Key Space',
      start: 'Key 1',
      coin: 'Key 5',
    },
    demulShooterTarget: '-target=demul07a -rom=hotd2',
    pcsx2ConfigSnippet: `; Demul / Flycast NAOMI Hook
; Launch: DemulShooter.exe -target=demul07a -rom=hotd2
[Demul_NAOMI]
P1_Trigger = RawMouse1_Btn1
P1_Reload = RawMouse1_Btn2
P2_Trigger = RawMouse2_Btn1`,
    notes: 'Flycast Arcade oraz Demul 0.7a wspierają dwuosobowy tryb kooperacyjny z DemulShooter.',
  },
  {
    id: 'hotd3',
    name: 'The House of the Dead III',
    system: 'Sega Chihiro / PC / TeknoParrot',
    emulator: 'TeknoParrot',
    romName: 'hotd3',
    description: 'Strzelba automatyczna (Shotgun) jako broń główna. Szerokie pole rażenia z funkcją Guard Attack podczas ataków bossów.',
    pedalAction: 'RELOAD',
    offscreenReload: true,
    recommendedFilterStability: 0.35,
    deadzone: 8,
    sensitivityMultiplier: 1.05,
    buttonMapping: {
      trigger: 'Mouse Left (Pump Shot)',
      actionOrReload: 'Mouse Right (Przeładowanie pompką)',
      pedal: 'Key Space',
      start: 'Key 1',
      coin: 'Key 5',
    },
    demulShooterTarget: '-target=chihiro -rom=hotd3',
    pcsx2ConfigSnippet: `; TeknoParrot Chihiro Config:
<GameProfile>
  <InputApi>RawInput</InputApi>
  <Trigger>RawMouseLeft</Trigger>
  <Reload>RawMouseRight</Reload>
</GameProfile>`,
    notes: 'Przeładowanie pompką shotguna można zamapować pod gest offscreen lub pedał USB.',
  },
  {
    id: 'hotd4',
    name: 'The House of the Dead 4',
    system: 'Sega Lindbergh / TeknoParrot (Arcade)',
    emulator: 'TeknoParrot',
    romName: 'hotd4',
    description: 'Pistolet maszynowy Uzi z potrząsaniem (Shake to reload / break free) i granatami. Wymaga maksymalnej częstotliwości próbkowania USB.',
    pedalAction: 'CUSTOM',
    offscreenReload: false,
    recommendedFilterStability: 0.25,
    deadzone: 5,
    sensitivityMultiplier: 1.15,
    buttonMapping: {
      trigger: 'Mouse Left (Ogień ciągły SMG)',
      actionOrReload: 'Mouse Right (Granat)',
      pedal: 'Key Space (Shake Reload / Uwolnienie)',
      start: 'Key 1',
      coin: 'Key 5',
      extra: 'Przycisk B (Granat)',
    },
    demulShooterTarget: '-target=lindbergh -rom=hotd4',
    pcsx2ConfigSnippet: `; Sega Lindbergh TeknoParrot Hook:
; Launch: DemulShooter.exe -target=lindbergh -rom=hotd4
[Lindbergh_HOTD4]
P1_Trigger = MouseLeft
P1_Grenade = MouseRight
P1_Shake = KeySpace`,
    notes: 'Pedał USB idealnie sprawdza się jako przycisk "Shake" do błyskawicznego przeładowania magazynka SMG.',
  },

  // --- TIME CRISIS SERIA ---
  {
    id: 'tc1_mame',
    name: 'Time Crisis 1 (Original)',
    system: 'Namco System 22 / Arcade (MAME)',
    emulator: 'MAME',
    romName: 'timecris',
    description: 'Rewolucyjny automat z 1995 roku wprowadzający pedał krycia (Duck/Cover) i limit czasu. Wymaga pedału pod nogą dla pełnego klimatu arcade.',
    pedalAction: 'DUCK',
    offscreenReload: false,
    recommendedFilterStability: 0.35,
    deadzone: 6,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left (Strzał)',
      actionOrReload: 'Key Space (Pedał krycia)',
      pedal: 'Key Space (Pedał Namco)',
      start: 'Key 1',
      coin: 'Key 5',
    },
    demulShooterTarget: '-target=mame -rom=timecris',
    pcsx2ConfigSnippet: `; MAME cfg snippet:
<port tag=":P1_LIGHTGUN_X" type="P1_LIGHTGUN_X"><newseq type="standard">GUNCODE_1_X</newseq></port>
<port tag=":P1_LIGHTGUN_Y" type="P1_LIGHTGUN_Y"><newseq type="standard">GUNCODE_1_Y</newseq></port>
<port tag=":P1_BUTTON1" type="P1_BUTTON1"><newseq type="standard">GUNCODE_1_BUTTON1</newseq></port>
<port tag=":P1_BUTTON2" type="P1_BUTTON2"><newseq type="standard">KEYCODE_SPACE</newseq></port>`,
    notes: 'W MAME upewnij się, że opcja "lightgun 1" i "pedal_device keyboard" są aktywne w mame.ini.',
  },
  {
    id: 'tc2',
    name: 'Time Crisis II',
    system: 'Sony PlayStation 2 (PCSX2) / Namco System 23',
    emulator: 'PCSX2',
    romName: 'tc2',
    description: 'Kooperacja 2 graczy na podzielonym lub połączonym ekranie (iLink). Niezależne pedały dla P1 i P2.',
    pedalAction: 'DUCK',
    offscreenReload: true,
    recommendedFilterStability: 0.35,
    deadzone: 8,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left',
      actionOrReload: 'Mouse Right / Pedal',
      pedal: 'Key Space (P1) / Key LShift (P2)',
      start: 'Key Return',
      coin: 'Key Space',
    },
    demulShooterTarget: '-target=pcsx2 -rom=tc2',
    pcsx2ConfigSnippet: `[Pad1]
Type = GunCon2
GunCon2_Trigger = Mouse:Left
GunCon2_A = Mouse:Middle
GunCon2_B = Mouse:Right
GunCon2_Pedal = Keyboard:Space

[Pad2]
Type = GunCon2
GunCon2_Trigger = SDL-1:Button0 # Drugi pistolet P2 przez vJoy/HID
GunCon2_Pedal = Keyboard:LeftShift`,
    notes: 'PCSX2 w wersji 1.7+ obsługuje bezpośrednie mapowanie dwóch wskaźników GunCon2.',
  },
  {
    id: 'tc3',
    name: 'Time Crisis 3',
    system: 'Sony PlayStation 2 (PCSX2) / Namco System 246',
    emulator: 'PCSX2',
    romName: 'tc3',
    description: 'System Weapon Select (Pistolet, Shotgun, Karabin maszynowy, Granatnik) przełączany w ukryciu pedałem.',
    pedalAction: 'DUCK',
    offscreenReload: true,
    recommendedFilterStability: 0.3,
    deadzone: 7,
    sensitivityMultiplier: 1.05,
    buttonMapping: {
      trigger: 'Mouse Left',
      actionOrReload: 'Mouse Right',
      pedal: 'Key Space (Krycie + Wybór broni)',
      start: 'Key Return',
      coin: 'Key Space',
    },
    demulShooterTarget: '-target=pcsx2 -rom=tc3',
    pcsx2ConfigSnippet: `[Pad1]
Type = GunCon2
GunCon2_Trigger = Mouse:Left
GunCon2_A = Mouse:Middle
GunCon2_B = Mouse:Right
GunCon2_Start = Keyboard:Return
GunCon2_Select = Keyboard:Space
GunCon2_Pedal = Keyboard:Space # Pedał USB
GunCon2_Pointer = Mouse:AbsolutePointer`,
    notes: 'Podczas wciśniętego pedału pociągnięcie spustu zmienia broń.',
  },

  // --- VIRTUA COP SERIA ---
  {
    id: 'vcop_model2',
    name: 'Virtua Cop 1 & 2',
    system: 'Sega Model 2 Emulator / Arcade (DemulShooter)',
    emulator: 'Model2',
    romName: 'vcop',
    description: 'Pionier strzelanin 3D. Precyzyjne strzały w broń (Justice Shots) oraz strefy trafień wrogów. Wymaga idealnej kalibracji narożników.',
    pedalAction: 'RELOAD',
    offscreenReload: true,
    recommendedFilterStability: 0.38,
    deadzone: 6,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left',
      actionOrReload: 'Mouse Right / Off-screen',
      pedal: 'Key Space',
      start: 'Key 1',
      coin: 'Key 5',
    },
    demulShooterTarget: '-target=model2 -rom=vcop',
    pcsx2ConfigSnippet: `; Model 2 EMULATOR.INI
[Input]
RawInput = 1
CrossHair = 0
P1_Gun_X = MOUSE1_X
P1_Gun_Y = MOUSE1_Y
P1_Trigger = MOUSE1_BUTTON1
P1_Reload = MOUSE1_BUTTON2`,
    notes: 'DemulShooter umożliwia grę na 2 niezależne pistolety w Virtua Cop 2 bez konfliktu kursora myszy Windows.',
  },

  // --- POINT BLANK SERIA ---
  {
    id: 'point_blank',
    name: 'Point Blank (Gunbullet)',
    system: 'Namco System NB-1 / MAME Arcade',
    emulator: 'MAME',
    romName: 'ptblank',
    description: 'Szalone minigry zręcznościowe Dr. Dona i Dr. Dana. Ekstremalne wymagania precyzji: strzał w czubek ołówka, lecący liść, szkielet zegara.',
    pedalAction: 'RELOAD',
    offscreenReload: false,
    recommendedFilterStability: 0.65,
    deadzone: 10,
    sensitivityMultiplier: 0.95,
    buttonMapping: {
      trigger: 'Mouse Left',
      actionOrReload: 'Automatyczne przeładowanie',
      pedal: 'Key Space',
      start: 'Key 1',
      coin: 'Key 5',
    },
    demulShooterTarget: '-target=mame -rom=ptblank',
    pcsx2ConfigSnippet: `; MAME Config for ptblank:
<system name="ptblank">
  <port tag=":P1_LIGHTGUN_X"><newseq type="standard">GUNCODE_1_X</newseq></port>
  <port tag=":P1_LIGHTGUN_Y"><newseq type="standard">GUNCODE_1_Y</newseq></port>
  <port tag=":P1_BUTTON1"><newseq type="standard">GUNCODE_1_BUTTON1</newseq></port>
</system>`,
    notes: 'W Point Blank zaleca się podbicie stabilności filtra do 65-70%, aby zniwelować mikrodrżenia ręki przy celowaniu w miniaturowe obiekty.',
  },

  // --- TEKNOPARROT MODERN ARCADE ---
  {
    id: 'transformers',
    name: 'Transformers: Human Alliance',
    system: 'Sega RingWide / TeknoParrot Arcade',
    emulator: 'TeknoParrot',
    romName: 'tha',
    description: 'Nowoczesny blockbuster arcade z ogromnymi Decepticonami, celowaniem zespołowym (Team Shot) i rakietami.',
    pedalAction: 'CUSTOM',
    offscreenReload: false,
    recommendedFilterStability: 0.3,
    deadzone: 6,
    sensitivityMultiplier: 1.1,
    buttonMapping: {
      trigger: 'Mouse Left (Energon Blaster)',
      actionOrReload: 'Mouse Right (Missile Launcher)',
      pedal: 'Key Space (Team Attack)',
      start: 'Key 1',
      coin: 'Key 5',
    },
    demulShooterTarget: '-target=ringwide -rom=tha',
    pcsx2ConfigSnippet: `; TeknoParrot Profile tha.xml:
<GameProfile>
  <InputApi>RawInput</InputApi>
  <Trigger>RawMouseLeft</Trigger>
  <SecondaryFire>RawMouseRight</SecondaryFire>
</GameProfile>`,
    notes: 'Wymaga uruchomienia DemulShooter z parametrem -target=ringwide -rom=tha przed startem TeknoParrot.',
  },

  // --- INNE KLASYKI ---
  {
    id: 'vampire_night',
    name: 'Vampire Night',
    system: 'Sony PlayStation 2 (PCSX2)',
    emulator: 'PCSX2',
    romName: 'vampiren',
    description: 'Mroczny shooter od Namco i Sega AM2. Celowanie w pulsujące pasożyty wampirów dla odzyskania ludzkich dusz.',
    pedalAction: 'CUSTOM',
    offscreenReload: true,
    recommendedFilterStability: 0.45,
    deadzone: 7,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left',
      actionOrReload: 'Mouse Right',
      pedal: 'Key Space',
      start: 'Key Return',
      coin: 'Key Space',
    },
    demulShooterTarget: '-target=pcsx2 -rom=vampiren',
    pcsx2ConfigSnippet: `[Pad1]
Type = GunCon2
GunCon2_Trigger = Mouse:Left
GunCon2_A = Mouse:Right
GunCon2_B = Keyboard:Space
GunCon2_Start = Keyboard:Return`,
    notes: 'Precyzyjne trafienia w czułe punkty wampirów wymagają zrównoważonego filtra stabilności (~45%).',
  },
  {
    id: 'ninja_assault',
    name: 'Ninja Assault',
    system: 'Sony PlayStation 2 (PCSX2)',
    emulator: 'PCSX2',
    romName: 'ninjaass',
    description: 'Dynamiczny lightgun shooter z feudalnej Japonii od Namco z potężnymi atakami Ninjutsu.',
    pedalAction: 'CUSTOM',
    offscreenReload: true,
    recommendedFilterStability: 0.35,
    deadzone: 8,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left',
      actionOrReload: 'Mouse Right',
      pedal: 'Key E (Ninjutsu Magic)',
      start: 'Key Return',
      coin: 'Key Space',
    },
    demulShooterTarget: '-target=pcsx2 -rom=ninjaass',
    pcsx2ConfigSnippet: `[Pad1]
Type = GunCon2
GunCon2_Trigger = Mouse:Left
GunCon2_A = Mouse:Right
GunCon2_B = Keyboard:E
GunCon2_Start = Keyboard:Return`,
    notes: 'Pedał USB można przypisać jako wyzwolenie zwoju Ninjutsu.',
  },

  // --- RETROARCH - SNES9X 1.62.3 (SUPER SCOPE & JUSTIFIER) ---
  {
    id: 'battle_clash_snes',
    name: 'Battle Clash (Space Bazooka)',
    system: 'Super Nintendo (RetroArch - Snes9x 1.62.3)',
    emulator: 'RetroArch',
    romName: 'Battle Clash (USA)',
    description: 'Kultowy mech-shooter na Nintendo Super Scope. Precyzyjne niszczenie osłon, ramion i słabych punktów robotów Standing Tanks za pomocą ładunków energetycznych.',
    pedalAction: 'CUSTOM',
    offscreenReload: false,
    recommendedFilterStability: 0.35,
    deadzone: 4,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left (Fire / Super Scope Fire)',
      actionOrReload: 'Mouse Right (Cursor Shot / Off-screen)',
      pedal: 'Key Space (Turbo Toggle / Special Missile)',
      start: 'Key Enter (Super Scope Pause)',
      coin: 'Key F2 (RetroArch Menu)',
    },
    pcsx2ConfigSnippet: `; RetroArch Snes9x 1.62.3 Port 2 Super Scope
input_libretro_device_p2 = "260"
snes9x_lightgun_mode = "Lightgun"
snes9x_superscope_crosshair = "2"
snes9x_overscan = "disabled"`,
    retroarchConfigSnippet: `; RetroArch Core Options: snes9x.opt (Snes9x 1.62.3)
snes9x_lightgun_mode = "Lightgun"
snes9x_superscope_crosshair = "2"
snes9x_superscope_color = "0"
snes9x_overscan = "disabled"
snes9x_aspect_ratio = "4:3"
snes9x_layer_1 = "enabled"
snes9x_layer_2 = "enabled"
snes9x_layer_3 = "enabled"
snes9x_layer_4 = "enabled"
snes9x_sprites = "enabled"

; RetroArch Remap: Snes9x.rmp (Port 2 = Super Scope ID 260)
input_libretro_device_p2 = "260"
input_player2_mouse_index = "0"
input_player2_gun_trigger = "mouse:1"
input_player2_gun_offscreen_shot = "mouse:2"
input_player2_gun_aux_a = "mouse:3"`,
    notes: 'W RetroArch Snes9x 1.62.3 celownik Super Scope musi być podłączony pod Port 2 (Device Type: SuperScope / 260). Overscan musi być wyłączony (disabled), aby zachować rozdzielczość 256x224 w skali 1:1 bez przesunięcia pikseli.',
  },
  {
    id: 'metal_combat_snes',
    name: "Metal Combat: Falcon's Revenge",
    system: 'Super Nintendo (RetroArch - Snes9x 1.62.3)',
    emulator: 'RetroArch',
    romName: "Metal Combat - Falcon's Revenge (USA)",
    description: 'Najlepszy shooter na Super Scope w historii SNES. Kontynuacja Battle Clash z mechem ST Falcon, dodatkowymi bombami, pociskami plazmowymi i dynamicznym trybem walki 2-graczy.',
    pedalAction: 'CUSTOM',
    offscreenReload: false,
    recommendedFilterStability: 0.30,
    deadzone: 4,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left (Fire Gun)',
      actionOrReload: 'Mouse Right (Sub-Weapon / Missile)',
      pedal: 'Key Space (Pedał: Bomba / Shield Deploy)',
      start: 'Key Enter (Pause)',
      coin: 'Key F2',
    },
    pcsx2ConfigSnippet: `; Snes9x 1.62.3 Super Scope
input_libretro_device_p2 = "260"
snes9x_lightgun_mode = "Lightgun"`,
    retroarchConfigSnippet: `; RetroArch Core Options: snes9x.opt
snes9x_lightgun_mode = "Lightgun"
snes9x_superscope_crosshair = "2"
snes9x_overscan = "disabled"
snes9x_aspect_ratio = "4:3"

; Remap Snes9x.rmp
input_libretro_device_p2 = "260"
input_player2_mouse_index = "0"
input_player2_gun_trigger = "mouse:1"
input_player2_gun_offscreen_shot = "mouse:2"`,
    notes: 'Wymaga szybkiej reakcji i strzelania w słabe punkty. Filtr stabilności zalecany na poziomie 30%, aby umożliwić błyskawiczne manewry po całym ekranie.',
  },
  {
    id: 'yoshis_safari_snes',
    name: "Yoshi's Safari",
    system: 'Super Nintendo (RetroArch - Snes9x 1.62.3)',
    emulator: 'RetroArch',
    romName: "Yoshi's Safari (USA)",
    description: 'Pierwszoosobowa przygoda Mario i Yoshi w krainie Jewelry Land z widokiem FPV Mode 7. Zestrzel Koopalingów i Bowsera, unikając przeszkód na trasie.',
    pedalAction: 'CUSTOM',
    offscreenReload: false,
    recommendedFilterStability: 0.38,
    deadzone: 5,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left (Shoot Super Scope)',
      actionOrReload: 'Mouse Right (Yoshi Jump / Dash)',
      pedal: 'Key Space (Pedał: Skok Yoshiego)',
      start: 'Key Enter (Pause)',
      coin: 'Key F2',
    },
    pcsx2ConfigSnippet: `; Snes9x 1.62.3 Super Scope
input_libretro_device_p2 = "260"
snes9x_lightgun_mode = "Lightgun"`,
    retroarchConfigSnippet: `; RetroArch Core Options: snes9x.opt
snes9x_lightgun_mode = "Lightgun"
snes9x_superscope_crosshair = "2"
snes9x_overscan = "disabled"
snes9x_aspect_ratio = "4:3"

; Remap
input_libretro_device_p2 = "260"
input_player2_mouse_index = "0"`,
    notes: 'Pedał USB jest idealny do przypisania skoku Yoshiego (Jump) — prawa ręka celuje pistoletem G\'AIM\'E, noga wyzwala skoki nad przepaściami.',
  },
  {
    id: 'super_scope_6_snes',
    name: 'Super Scope 6',
    system: 'Super Nintendo (RetroArch - Snes9x 1.62.3)',
    emulator: 'RetroArch',
    romName: 'Super Scope 6 (USA)',
    description: 'Oficjalny zestaw 6 gier premierowych Super Scope (Blastris A/B, Mole Patrol, LazerBlazer: Intercept, Engage, Confront). Wzorcowy tytuł do testowania kalibracji sprzętowej.',
    pedalAction: 'CUSTOM',
    offscreenReload: false,
    recommendedFilterStability: 0.32,
    deadzone: 4,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left (Fire)',
      actionOrReload: 'Mouse Right (Cursor / Mode)',
      pedal: 'Key Space (Turbo Fire)',
      start: 'Key Enter (Pause)',
      coin: 'Key F2',
    },
    pcsx2ConfigSnippet: `; Snes9x 1.62.3 Super Scope
input_libretro_device_p2 = "260"
snes9x_lightgun_mode = "Lightgun"`,
    retroarchConfigSnippet: `; RetroArch Core Options: snes9x.opt
snes9x_lightgun_mode = "Lightgun"
snes9x_superscope_crosshair = "2"
snes9x_overscan = "disabled"
snes9x_aspect_ratio = "4:3"

; Remap
input_libretro_device_p2 = "260"
input_player2_mouse_index = "0"`,
    notes: 'Zawiera wbudowaną procedurę kalibracji Nintendo (Calibration Target) — można sprawdzić idealną zgodność homografii G\'AIM\'E z wewnętrznym celownikiem SNES.',
  },
  {
    id: 'tin_star_snes',
    name: 'Tin Star',
    system: 'Super Nintendo (RetroArch - Snes9x 1.62.3)',
    emulator: 'RetroArch',
    romName: 'Tin Star (USA)',
    description: 'Westernowy shooter na Super Scope / Mysz SNES. Strzelaniny w saloonach, pojedynki w samo południe i ochrona dyliżansów przed bandytami Black Bart.',
    pedalAction: 'RELOAD',
    offscreenReload: true,
    recommendedFilterStability: 0.35,
    deadzone: 5,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left (Shoot)',
      actionOrReload: 'Mouse Right / Off-screen (Reload)',
      pedal: 'Key Space (Pedał: Przeładowanie)',
      start: 'Key Enter (Pause)',
      coin: 'Key F2',
    },
    pcsx2ConfigSnippet: `; Snes9x 1.62.3 Super Scope
input_libretro_device_p2 = "260"
snes9x_lightgun_mode = "Lightgun"`,
    retroarchConfigSnippet: `; RetroArch Core Options: snes9x.opt
snes9x_lightgun_mode = "Lightgun"
snes9x_superscope_crosshair = "2"
snes9x_overscan = "disabled"

; Remap
input_libretro_device_p2 = "260"
input_player2_mouse_index = "0"`,
    notes: 'Obsługuje przeładowanie rewolweru poza ekranem (Off-screen Reload) lub pedałem nożnym.',
  },
  {
    id: 'terminator2_snes',
    name: 'Terminator 2: The Arcade Game (SNES)',
    system: 'Super Nintendo (RetroArch - Snes9x 1.62.3)',
    emulator: 'RetroArch',
    romName: 'Terminator 2 - Judgment Day (USA)',
    description: 'Wierna adaptacja zręcznościowego hitu arcade na Super Nintendo z obsługą pistoletu Super Scope. Odpieraj hordy Endo-szkieletów i czołgów Hunter Killer.',
    pedalAction: 'CUSTOM',
    offscreenReload: false,
    recommendedFilterStability: 0.33,
    deadzone: 5,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left (Rapid Fire Gun)',
      actionOrReload: 'Mouse Right (Missile Launcher)',
      pedal: 'Key Space (Pedał: Wyrzutnia rakiet)',
      start: 'Key Enter (Pause)',
      coin: 'Key F2',
    },
    pcsx2ConfigSnippet: `; Snes9x 1.62.3 Super Scope
input_libretro_device_p2 = "260"
snes9x_lightgun_mode = "Lightgun"`,
    retroarchConfigSnippet: `; RetroArch Core Options: snes9x.opt
snes9x_lightgun_mode = "Lightgun"
snes9x_superscope_crosshair = "2"
snes9x_overscan = "disabled"

; Remap
input_libretro_device_p2 = "260"
input_player2_mouse_index = "0"`,
    notes: 'Drugi przycisk pistoletu lub pedał USB wyzwala rakietnicę niszczącą całe grupy robotów Skynetu.',
  },
  {
    id: 'lethal_enforcers_snes',
    name: 'Lethal Enforcers (SNES Justifier)',
    system: 'Super Nintendo (RetroArch - Snes9x 1.62.3)',
    emulator: 'RetroArch',
    romName: 'Lethal Enforcers (USA)',
    description: 'Hit od Konami z digitalizowanymi aktorami. W wersji SNES wykorzystuje pistolet Konami Justifier (niebieski rewolwer), podłączany pod Port 2.',
    pedalAction: 'RELOAD',
    offscreenReload: true,
    recommendedFilterStability: 0.36,
    deadzone: 6,
    sensitivityMultiplier: 1.0,
    buttonMapping: {
      trigger: 'Mouse Left (Shoot)',
      actionOrReload: 'Mouse Right / Off-screen (Reload)',
      pedal: 'Key Space (Pedał: Przeładuj magazynek)',
      start: 'Key Enter (Start)',
      coin: 'Key F2',
    },
    pcsx2ConfigSnippet: `; Snes9x 1.62.3 Konami Justifier (Port 2 Device Type 516)
input_libretro_device_p2 = "516"
snes9x_lightgun_mode = "Lightgun"
snes9x_justifier_crosshair = "2"`,
    retroarchConfigSnippet: `; RetroArch Core Options: snes9x.opt (Konami Justifier)
snes9x_lightgun_mode = "Lightgun"
snes9x_justifier_crosshair = "2"
snes9x_justifier1_color = "0"
snes9x_overscan = "disabled"

; Remap Snes9x.rmp (Port 2 = Justifier ID 516)
input_libretro_device_p2 = "516"
input_player2_mouse_index = "0"
input_player2_gun_trigger = "mouse:1"
input_player2_gun_offscreen_shot = "mouse:2"`,
    notes: 'Dla gry Lethal Enforcers emulator Snes9x wymaga typu urządzenia Konami Justifier (ID 516) zamiast Super Scope (ID 260). Przeładowanie odbywa się poza ekranem lub pedałem.',
  },
];

