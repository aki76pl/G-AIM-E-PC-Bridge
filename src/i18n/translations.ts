export type Language = 'pl' | 'en';

export interface Translations {
  // App Header / Navbar
  navTitle: string;
  navSubtitle: string;
  navPlayerP1: string;
  navPlayerP2: string;
  navUsbConnected: string;
  navConnectUsb: string;
  navWin11Exe: string;
  navCalibrate4Points: string;
  navCSharpCode: string;
  navDownloadZip: string;
  navPackagingZip: string;

  // FilterControls
  filterTitle: string;
  filterSubtitle: string;
  rejectedJumpsLabel: string;
  responsivenessLabel: string;
  stabilityLabel: string;
  ratioLabel: string;
  presetRaw: string;
  presetRecommended: string;
  presetPointBlank: string;
  presetUltraSmooth: string;
  spikeDetectorTitle: string;
  spikeDetectorDesc: string;
  spikeThresholdLabel: string;
  spikeThresholdVerySensitive: string;
  spikeThresholdRecommended: string;
  spikeThresholdFlicks: string;
  spikeThresholdExtreme: string;
  medianTitle: string;
  medianDesc: string;
  medianDisabled: string;
  median3Samples: string;
  median5Samples: string;
  lastDeltaLabel: string;
  injectSpikeBtn: string;
  injectSpikeTooltip: string;

  // Auto-Learn Filter (2s)
  autoLearnBtn: string;
  autoLearnBtnTitle: string;
  autoLearnModalTitle: string;
  autoLearnModalDesc: string;
  autoLearnHoldingPrompt: string;
  autoLearnTimeRemaining: string;
  autoLearnSamplesCollected: string;
  autoLearnCurrentJitter: string;
  autoLearnProgress: string;
  autoLearnAnalyzing: string;
  autoLearnSuccessTitle: string;
  autoLearnResultsDesc: string;
  autoLearnStdDev: string;
  autoLearnMaxJump: string;
  autoLearnAppliedWindow: string;
  autoLearnAppliedStability: string;
  autoLearnCloseBtn: string;
  autoLearnReRunBtn: string;
  autoLearnSimulatedNotice: string;

  // GunStatusCard
  hwStatusTitle: string;
  hwStatusSubtitle: string;
  targetDisplayLabel: string;
  rawCoordsLabel: string;
  filteredCoordsLabel: string;
  screenMappingLabel: string;
  packetRateLabel: string;
  triggerStatusLabel: string;
  inRangeLabel: string;
  pedalStatusLabel: string;
  btnPullTrigger: string;
  btnReleaseTrigger: string;
  btnPressPedal: string;
  btnReleasePedal: string;
  statusConnected: string;
  statusSimulated: string;

  // LiveAimCanvas
  canvasTitle: string;
  canvasSubtitle: string;
  clearTrailBtn: string;
  legendRaw: string;
  legendFiltered: string;
  canvasInstructions: string;

  // DualGunPedalCard
  dualGunTitle: string;
  dualGunSubtitle: string;
  player1Label: string;
  player2Label: string;
  activeStatus: string;
  standbyStatus: string;
  pedalBindingLabel: string;
  pedalBindingInfo: string;

  // EmulatorIntegrationsCard
  emulatorCardTitle: string;
  emulatorCardSubtitle: string;
  catAll: string;
  copyConfigBtn: string;
  downloadConfigBtn: string;
  copiedNotice: string;
  copyLaunchCmd: string;
  selectGameProfile: string;
  recommendedSettings: string;
  filterStabilityVal: string;
  deadzoneVal: string;
  sensitivityVal: string;
  applySensitivityPreset: string;
  buttonMappingsTitle: string;
  triggerKey: string;
  actionReloadKey: string;
  pedalKey: string;
  startKey: string;
  coinKey: string;
  notesTitle: string;

  // Common notifications
  notifProfileLoaded: string;
  notifCalibrated: string;
  notifSpikeInjected: string;
  notifAutoLearned: string;

  // Calibration & Quick Start
  calibModalTitle: string;
  calibHomographyBadge: string;
  calibModalSubtitle: string;
  calibModeQuickStart: string;
  calibModeManual: string;
  calibModeAutoDetect: string;
  calibResetBtn: string;
  quickStartTitle: string;
  quickStartSubtitle: string;
  quickStartMonitorHeader: string;
  quickStartStartCalibrationBtn: string;
  quickStartBackToGuideBtn: string;
  quickStartInteractiveHint: string;
  quickStartStep1Title: string;
  quickStartStep1Desc: string;
  quickStartStep1Tip: string;
  quickStartStep2Title: string;
  quickStartStep2Desc: string;
  quickStartStep2Tip: string;
  quickStartStep3Title: string;
  quickStartStep3Desc: string;
  quickStartStep3Tip: string;
  quickStartStep4Title: string;
  quickStartStep4Desc: string;
  quickStartStep4Tip: string;
}

export const translations: Record<Language, Translations> = {
  pl: {
    // Navbar
    navTitle: "G'AIM'E",
    navSubtitle: "Mostek USB HID Lightgun dla Windows i pakiet homografii PCSX2 / RetroArch SNES",
    navPlayerP1: "Gracz P1 (Niebieski)",
    navPlayerP2: "Gracz P2 (Czerwony)",
    navUsbConnected: "USB Połączony",
    navConnectUsb: "Połącz USB G'AIM'E",
    navWin11Exe: "Windows 11 (.EXE)",
    navCalibrate4Points: "Kalibruj 4 Punkty",
    navCSharpCode: "Kod C# .NET 8",
    navDownloadZip: "Pobierz ZIP (VS 2022)",
    navPackagingZip: "Pakowanie...",

    // FilterControls
    filterTitle: "FILTR SKOKÓW I JITTERU (G'AIM'E)",
    filterSubtitle: "Eliminacja anomalii optycznych (>4000 jednostek) i wygładzanie drżenia",
    rejectedJumpsLabel: "Odrzucone skoki:",
    responsivenessLabel: "⚡ Responsywność (Zero-Lag)",
    stabilityLabel: "🎯 Stabilność (Gładkość)",
    ratioLabel: "Współczynnik:",
    presetRaw: "0% (Czysty RAW)",
    presetRecommended: "35% (Rekomendowany TC3 / T2)",
    presetPointBlank: "70% (Point Blank)",
    presetUltraSmooth: "100% (Ultra Gładki)",
    spikeDetectorTitle: "Detektor anomalii skoków",
    spikeDetectorDesc: "Odrzuca nagłe skoki > {threshold} jedn.",
    spikeThresholdLabel: "Próg skoku:",
    spikeThresholdVerySensitive: "1200 (Bardzo czuły)",
    spikeThresholdRecommended: "1800 (Zalecany dla G'AIM'E)",
    spikeThresholdFlicks: "2500 (Dla szybkich flicków)",
    spikeThresholdExtreme: "4000 (Tylko ekstremalne)",
    medianTitle: "Okno filtra medianowego",
    medianDesc: "Eliminuje pojedyncze szumy ramki przed wygładzeniem EMA",
    medianDisabled: "Wyłączony",
    median3Samples: "3 próbki",
    median5Samples: "5 próbek",
    lastDeltaLabel: "Ostatnia delta klatki: ",
    injectSpikeBtn: "Test: Wstrzyknij skok (+4500)",
    injectSpikeTooltip: "Symuluje anomalny skok celownika 4500 jednostek, typowy przy odbiciu światła",

    // Auto-Learn Filter
    autoLearnBtn: "⚡ Auto-uczenie filtra (2s)",
    autoLearnBtnTitle: "Przeprowadź 2-sekundową sesję pomiarową w bezruchu, aby automatycznie dobrać okno mediany i współczynnik stabilności",
    autoLearnModalTitle: "AUTOMATYCZNE STROJENIE FILTRA (AUTO-LEARN)",
    autoLearnModalDesc: "Wyznaczanie fizycznego poziomu szumu sensora optycznego i mikrodrżenia dłoni.",
    autoLearnHoldingPrompt: "Skieruj pistolet w środek ekranu i trzymaj go w całkowitym bezruchu przez 2 sekundy...",
    autoLearnTimeRemaining: "Pozostało:",
    autoLearnSamplesCollected: "Pobranych próbek:",
    autoLearnCurrentJitter: "Bieżące drżenie (RMS):",
    autoLearnProgress: "Trwa próbkowanie strumienia danych...",
    autoLearnAnalyzing: "Analiza próbek i dobór optymalnych parametrów...",
    autoLearnSuccessTitle: "STROJENIE ZAKOŃCZONE POMYŚLNIE!",
    autoLearnResultsDesc: "Na podstawie pomiaru szumu optycznego wyznaczono optymalne nastawy:",
    autoLearnStdDev: "Średnie drżenie szumu (RMS):",
    autoLearnMaxJump: "Maksymalny mikro-skok próbki:",
    autoLearnAppliedWindow: "Zastosowane okno medianowe:",
    autoLearnAppliedStability: "Współczynnik stabilności (EMA):",
    autoLearnCloseBtn: "Zatwierdź i zamknij",
    autoLearnReRunBtn: "Powtórz pomiar (2s)",
    autoLearnSimulatedNotice: "Tryb symulacji: Wygenerowano realistyczny model szumu optycznego sensora IR.",

    // GunStatusCard
    hwStatusTitle: "STATUS SPRZĘTU G'AIM'E",
    hwStatusSubtitle: "Strumień pakietów USB HID i współrzędne",
    targetDisplayLabel: "Ekran docelowy:",
    rawCoordsLabel: "Współrzędne surowe (RAW):",
    filteredCoordsLabel: "Współrzędne filtrowane:",
    screenMappingLabel: "Mapowanie ekranu:",
    packetRateLabel: "Częstotliwość:",
    triggerStatusLabel: "Spust (LMB):",
    inRangeLabel: "W zasięgu:",
    pedalStatusLabel: "Pedał USB:",
    btnPullTrigger: "Naciśnij spust",
    btnReleaseTrigger: "Zwolnij spust",
    btnPressPedal: "Wciśnij pedał",
    btnReleasePedal: "Zwolnij pedał",
    statusConnected: "FIZYCZNY USB",
    statusSimulated: "SYMULACJA",

    // LiveAimCanvas
    canvasTitle: "WIZUALIZATOR CELOWNIKA I TRAJEKTORII",
    canvasSubtitle: "Weryfikacja płynności ruchu w czasie rzeczywistym",
    clearTrailBtn: "Wyczyść ślad",
    legendRaw: "Żółty = RAW (surowy sygnał)",
    legendFiltered: "Turkusowy = Filtrowany (wygładzony)",
    canvasInstructions: "Kliknij i przeciągaj wewnątrz obszaru lub celuj podłączonym pistoletem G'AIM'E.",

    // DualGunPedalCard
    dualGunTitle: "ARCHITEKTURA 2 GRACZY & PEDAŁ NOŻNY",
    dualGunSubtitle: "Niezależna telemetria pistoletów P1 / P2 oraz obsługa pedału USB",
    player1Label: "Gracz 1 (P1)",
    player2Label: "Gracz 2 (P2)",
    activeStatus: "AKTYWNY",
    standbyStatus: "GOTOWY",
    pedalBindingLabel: "Mapowanie pedału:",
    pedalBindingInfo: "Domyślnie mapowany pod Klawisz Spacja (Chowanie się w Time Crisis lub zrzut rakiet w T2)",

    // EmulatorIntegrationsCard
    emulatorCardTitle: "PROFILE GIER & EMULATORY",
    emulatorCardSubtitle: "Gotowe konfiguracje dla RetroArch SNES, PCSX2, DemulShooter, MAME, Model 2 i TeknoParrot",
    catAll: "Wszystkie",
    copyConfigBtn: "Kopiuj plik",
    downloadConfigBtn: "Pobierz plik",
    copiedNotice: "Skopiowano do schowka!",
    copyLaunchCmd: "Kopiuj polecenie startowe",
    selectGameProfile: "Wybierz profil gry:",
    recommendedSettings: "Rekomendowane nastawy filtra:",
    filterStabilityVal: "Stabilność filtra:",
    deadzoneVal: "Martwa strefa:",
    sensitivityVal: "Mnożnik czułości:",
    applySensitivityPreset: "Zastosuj rekomendowaną czułość",
    buttonMappingsTitle: "Mapowanie przycisków:",
    triggerKey: "Spust główny:",
    actionReloadKey: "Przeładowanie / Broń specjalna:",
    pedalKey: "Pedał nożny:",
    startKey: "Przycisk Start:",
    coinKey: "Wrzut monety / Kredyt:",
    notesTitle: "Wskazówki i uwagi:",

    // Notifications
    notifProfileLoaded: "Załadowano profil gry:",
    notifCalibrated: "Kalibracja zakończona sukcesem!",
    notifSpikeInjected: "Wstrzyknięto anomalny skok testowy (+4500 jednostek)",
    notifAutoLearned: "Automatycznie dostrojono filtr: okno mediany {window}, stabilność {stability}%",

    // Calibration & Quick Start
    calibModalTitle: "KALIBRACJA 4 PUNKTÓW G'AIM'E",
    calibHomographyBadge: "Homography 3×3",
    calibModalSubtitle: "Koryguje zniekształcenia perspektywiczne i wyznacza optymalne zakresy wejściowe matrycy",
    calibModeQuickStart: "🚀 Szybki Start (Przewodnik)",
    calibModeManual: "🎯 Tryb Strzału",
    calibModeAutoDetect: "✨ Auto-Wykrywanie Czułości",
    calibResetBtn: "Resetuj",
    quickStartTitle: "SZYBKI START: PRZEWODNIK KALIBRACJI 4 NAROŻNIKÓW",
    quickStartSubtitle: "Wizualny przewodnik krok po kroku po procedurze celowania w cztery narożniki monitora",
    quickStartMonitorHeader: "SCHEMAT POZYCJONOWANIA MATRYCY I SEKWENCJI CELOWANIA",
    quickStartStartCalibrationBtn: "Rozpocznij Kalibrację Teraz",
    quickStartBackToGuideBtn: "📖 Pokaż Przewodnik Szybki Start",
    quickStartInteractiveHint: "Kliknij dowolny narożnik na monitorze, aby podejrzeć szczegółowe wytyczne celowania",
    quickStartStep1Title: "KROK 1: Lewy Górny Róg (Point 1 - TL)",
    quickStartStep1Desc: "Odsuń się na odległość 1.5 – 2.5 m od ekranu. Unieś pistolet na wysokość klatki piersiowej i wyceluj dokładnie w celownik w lewym górnym rogu matrycy.",
    quickStartStep1Tip: "💡 Wskazówka: Unikaj bezpośredniego padania światła słonecznego lub mocnych żarówek za monitorem, które mogłyby zakłócić kamerę IR.",
    quickStartStep2Title: "KROK 2: Prawy Górny Róg (Point 2 - TR)",
    quickStartStep2Desc: "Przesuń celownik w prawy górny narożnik monitora. Utrzymuj tę samą pozycję stojącą lub siedzącą bez przesuwania się na boki.",
    quickStartStep2Tip: "💡 Wskazówka: Dystans pomiędzy punktem 1 a 2 pozwala algorytmowi obliczyć rzeczywistą poziomą rozpiętość matrycy oraz kąt nachylenia poziomego.",
    quickStartStep3Title: "KROK 3: Prawy Dolny Róg (Point 3 - BR)",
    quickStartStep3Desc: "Skieruj lufę w prawy dolny róg ekranu. Sprawdź, czy celownik pistoletu ma swobodne pole widzenia do paska diod LED.",
    quickStartStep3Tip: "💡 Wskazówka: Uważaj, aby dłoń trzymająca pistolet ani pedał nożny nie zasłaniały dolnego paska podczerwieni.",
    quickStartStep4Title: "KROK 4: Lewy Dolny Róg (Point 4 - BL)",
    quickStartStep4Desc: "Wyceluj w ostatni celownik w lewym dolnym rogu. Ten punkt domyka pełny czworokąt perspektywiczny (Homography 3×3).",
    quickStartStep4Tip: "💡 Wskazówka: Po zatwierdzeniu tego punktu algorytm automatycznie zlikwiduje efekt trapezu, przesunięcia paralaksy i błędy montażu paska IR!",
  },
  en: {
    // Navbar
    navTitle: "G'AIM'E",
    navSubtitle: "Windows Lightgun HID Bridge & PCSX2 / RetroArch SNES Homography Suite",
    navPlayerP1: "Player P1 (Blue)",
    navPlayerP2: "Player P2 (Red)",
    navUsbConnected: "USB Connected",
    navConnectUsb: "Connect USB G'AIM'E",
    navWin11Exe: "Windows 11 (.EXE)",
    navCalibrate4Points: "Calibrate 4 Points",
    navCSharpCode: "C# .NET 8 Code",
    navDownloadZip: "Download ZIP (VS 2022)",
    navPackagingZip: "Packaging...",

    // FilterControls
    filterTitle: "G'AIM'E JITTER & SPIKE FILTER",
    filterSubtitle: "Eliminates optical anomalies (>4000 units) and smooths tremor",
    rejectedJumpsLabel: "Rejected spikes:",
    responsivenessLabel: "⚡ Responsiveness (Zero-Lag)",
    stabilityLabel: "🎯 Stability (Smoothness)",
    ratioLabel: "Factor:",
    presetRaw: "0% (Pure RAW)",
    presetRecommended: "35% (Recommended TC3 / T2)",
    presetPointBlank: "70% (Point Blank)",
    presetUltraSmooth: "100% (Ultra Smooth)",
    spikeDetectorTitle: "Spike Anomaly Detector",
    spikeDetectorDesc: "Rejects sudden coordinate jumps > {threshold} units",
    spikeThresholdLabel: "Spike threshold:",
    spikeThresholdVerySensitive: "1200 (Very sensitive)",
    spikeThresholdRecommended: "1800 (Recommended for G'AIM'E)",
    spikeThresholdFlicks: "2500 (For fast flick shots)",
    spikeThresholdExtreme: "4000 (Extreme only)",
    medianTitle: "Median Filter Window",
    medianDesc: "Removes single-frame optical glitches before EMA smoothing",
    medianDisabled: "Disabled",
    median3Samples: "3 samples",
    median5Samples: "5 samples",
    lastDeltaLabel: "Last frame delta: ",
    injectSpikeBtn: "Test: Inject Spike (+4500)",
    injectSpikeTooltip: "Simulates an anomalous crosshair spike of 4500 units typical of reflections",

    // Auto-Learn Filter
    autoLearnBtn: "⚡ Auto-Learn Filter (2s)",
    autoLearnBtnTitle: "Hold the lightgun still for 2 seconds to automatically tune median window and stability factor",
    autoLearnModalTitle: "AUTOMATIC JITTER FILTER TUNING (AUTO-LEARN)",
    autoLearnModalDesc: "Determines physical optical sensor noise floor and user hand tremor.",
    autoLearnHoldingPrompt: "Aim the lightgun at the screen and hold it completely still for 2 seconds...",
    autoLearnTimeRemaining: "Remaining:",
    autoLearnSamplesCollected: "Samples collected:",
    autoLearnCurrentJitter: "Current jitter (RMS):",
    autoLearnProgress: "Sampling continuous coordinate stream...",
    autoLearnAnalyzing: "Analyzing noise floor and computing optimal filter parameters...",
    autoLearnSuccessTitle: "FILTER TUNING COMPLETE!",
    autoLearnResultsDesc: "Optimal filter parameters computed from your real sensor noise floor:",
    autoLearnStdDev: "Noise standard deviation (RMS):",
    autoLearnMaxJump: "Peak sample micro-jump:",
    autoLearnAppliedWindow: "Applied median window:",
    autoLearnAppliedStability: "Stability factor (EMA):",
    autoLearnCloseBtn: "Apply & Close",
    autoLearnReRunBtn: "Re-run Calibration (2s)",
    autoLearnSimulatedNotice: "Simulation Mode: Generated realistic IR optical sensor noise model.",

    // GunStatusCard
    hwStatusTitle: "G'AIM'E HARDWARE STATUS",
    hwStatusSubtitle: "USB HID Packet Stream & Coordinates",
    targetDisplayLabel: "Target Display:",
    rawCoordsLabel: "Raw Coordinates (RAW):",
    filteredCoordsLabel: "Filtered Coordinates:",
    screenMappingLabel: "Screen Mapping:",
    packetRateLabel: "Report Rate:",
    triggerStatusLabel: "Trigger (LMB):",
    inRangeLabel: "In Range:",
    pedalStatusLabel: "USB Pedal:",
    btnPullTrigger: "Pull Trigger",
    btnReleaseTrigger: "Release Trigger",
    btnPressPedal: "Press Pedal",
    btnReleasePedal: "Release Pedal",
    statusConnected: "PHYSICAL USB",
    statusSimulated: "SIMULATION",

    // LiveAimCanvas
    canvasTitle: "AIM & TRAJECTORY VISUALIZER",
    canvasSubtitle: "Real-time movement and smoothness verification",
    clearTrailBtn: "Clear Trail",
    legendRaw: "Yellow = RAW (unfiltered)",
    legendFiltered: "Cyan = Filtered (smoothed)",
    canvasInstructions: "Click and drag inside the area or aim with your connected G'AIM'E lightgun.",

    // DualGunPedalCard
    dualGunTitle: "2-PLAYER ARCHITECTURE & FOOT PEDAL",
    dualGunSubtitle: "Independent P1/P2 lightgun telemetry & USB foot pedal support",
    player1Label: "Player 1 (P1)",
    player2Label: "Player 2 (P2)",
    activeStatus: "ACTIVE",
    standbyStatus: "READY",
    pedalBindingLabel: "Pedal Mapping:",
    pedalBindingInfo: "Defaults to Spacebar (Covering in Time Crisis or Missile barrage in T2)",

    // EmulatorIntegrationsCard
    emulatorCardTitle: "GAME PROFILES & EMULATORS",
    emulatorCardSubtitle: "Ready-to-use configurations for RetroArch SNES, PCSX2, DemulShooter, MAME, Model 2, and TeknoParrot",
    catAll: "All",
    copyConfigBtn: "Copy File",
    downloadConfigBtn: "Download File",
    copiedNotice: "Copied to clipboard!",
    copyLaunchCmd: "Copy Launch Command",
    selectGameProfile: "Select Game Profile:",
    recommendedSettings: "Recommended Filter Settings:",
    filterStabilityVal: "Filter Stability:",
    deadzoneVal: "Resting Deadzone:",
    sensitivityVal: "Sensitivity Multiplier:",
    applySensitivityPreset: "Apply Recommended Sensitivity",
    buttonMappingsTitle: "Button Mappings:",
    triggerKey: "Primary Trigger:",
    actionReloadKey: "Reload / Special Weapon:",
    pedalKey: "Foot Pedal:",
    startKey: "Start Button:",
    coinKey: "Insert Coin / Credit:",
    notesTitle: "Notes & Pro-Tips:",

    // Notifications
    notifProfileLoaded: "Loaded game profile:",
    notifCalibrated: "Calibration completed successfully!",
    notifSpikeInjected: "Injected test spike (+4500 units)",
    notifAutoLearned: "Auto-tuned filter: median window {window}, stability {stability}%",

    // Calibration & Quick Start
    calibModalTitle: "G'AIM'E 4-POINT CALIBRATION",
    calibHomographyBadge: "Homography 3×3",
    calibModalSubtitle: "Corrects perspective keystone distortions and identifies optimal sensor input boundaries",
    calibModeQuickStart: "🚀 Quick Start (Guide)",
    calibModeManual: "🎯 Shoot Mode",
    calibModeAutoDetect: "✨ Auto-Detect Sensitivity",
    calibResetBtn: "Reset",
    quickStartTitle: "QUICK START: 4-CORNER CALIBRATION GUIDE",
    quickStartSubtitle: "Visual step-by-step walkthrough guiding you through aiming at the four corners of your monitor",
    quickStartMonitorHeader: "MONITOR POSITIONING & AIMING SEQUENCE DIAGRAM",
    quickStartStartCalibrationBtn: "Start Calibration Now",
    quickStartBackToGuideBtn: "📖 Show Quick Start Guide",
    quickStartInteractiveHint: "Click any corner on the screen to preview detailed aiming instructions",
    quickStartStep1Title: "STEP 1: Top-Left Corner (Point 1 - TL)",
    quickStartStep1Desc: "Step back 1.5 – 2.5 meters from the screen. Raise the lightgun to chest level and align your sights directly with the top-left crosshair.",
    quickStartStep1Tip: "💡 Pro-Tip: Ensure no direct sunlight or bright halogen bulbs behind the monitor reflect into the IR camera sensor.",
    quickStartStep2Title: "STEP 2: Top-Right Corner (Point 2 - TR)",
    quickStartStep2Desc: "Shift your aim across to the top-right corner of the monitor. Maintain the same standing or seated position without leaning sideways.",
    quickStartStep2Tip: "💡 Pro-Tip: The distance between points 1 and 2 enables the homography solver to determine true horizontal screen span and tilt.",
    quickStartStep3Title: "STEP 3: Bottom-Right Corner (Point 3 - BR)",
    quickStartStep3Desc: "Lower your aim to the bottom-right corner of the screen. Verify the gun's IR camera has an unobstructed line of sight to the emitter bar.",
    quickStartStep3Tip: "💡 Pro-Tip: Ensure your forward shooting hand or foot pedal does not block the lower infrared emitter bar.",
    quickStartStep4Title: "STEP 4: Bottom-Left Corner (Point 4 - BL)",
    quickStartStep4Desc: "Aim at the final crosshair in the bottom-left corner. This point closes the perspective quadrangle (3×3 Homography Matrix).",
    quickStartStep4Tip: "💡 Pro-Tip: Confirming this point instantly eliminates keystone distortion, parallax offsets, and emitter mounting skew!",
  },
};
