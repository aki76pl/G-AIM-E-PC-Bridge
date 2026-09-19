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
  copiedBtn: string;
  downloadConfigBtn: string;
  copiedNotice: string;
  copyLaunchCmd: string;
  selectGameProfile: string;
  recommendedSettings: string;
  recommendedFilterLabel: string;
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

  // Additional Calibration Modal Keys
  calibCornerTL_name: string;
  calibCornerTL_label: string;
  calibCornerTL_sub: string;
  calibCornerTR_name: string;
  calibCornerTR_label: string;
  calibCornerTR_sub: string;
  calibCornerBR_name: string;
  calibCornerBR_label: string;
  calibCornerBR_sub: string;
  calibCornerBL_name: string;
  calibCornerBL_label: string;
  calibCornerBL_sub: string;
  calibStepOf: string;
  calibPointLabel: string;
  calibStatusCaptured: string;
  calibStatusActive: string;
  calibStatusWaiting: string;
  calibAimAndShoot: string;
  calibHold3s: string;
  calibSamplingCount: string;
  calibHoverCorner: string;
  calibHoldSteady: string;
  calibAutoDetectHelp: string;
  calibCurrentRaw: string;
  calibPressSpacePrompt: string;
  calibSuccessTitle: string;
  calibSuccessDesc: string;
  calibDetectedRanges: string;
  calibHorizontalRange: string;
  calibVerticalRange: string;
  calibSpan: string;
  calibRawUnits: string;
  calibNoiseLevel: string;
  calibFieldOfView: string;
  calibOfSensor: string;
  calibRecFilter: string;
  calibStabilityAbbr: string;
  calibCalibratedCorners: string;
  calibRepeatBtn: string;
  calibApplySaveBtn: string;
  calibResetAllTitle: string;
  calibCurrentTarget: string;
  calibModeLabel: string;
  calibGuideClose: string;
  calibGuideOpen: string;
  calibStartLabel: string;
  calibShootSampleLabel: string;
  calibCancelLabel: string;

  // Additional Emulator & Card Keys
  applyToPipeline: string;
  copyLaunchTooltip: string;
  generatorTitle: string;
  generatorDesc: string;
  copyContent: string;
  pedalActionLabel: string;
  mappedInputsTitle: string;
  reloadActionKey: string;
  usbPedalKey: string;
  suppressRestingJitter: string;
  crosshairSpeed: string;
  activeCustom: string;
  defaultStandard: string;
  activeStatusSingle: string;
  defaultStatusSingle: string;
  destinationLocation: string;

  // Standalone Win11 Modal
  win11ModalTitle: string;
  win11ModalDesc: string;
  win11DownloadZipCard: string;
  win11HowToRun: string;
  win11Step1: string;
  win11Step1Desc: string;
  win11Step2: string;
  win11Step2Desc: string;
  win11Step3: string;
  win11Step3Desc: string;
  win11CliTitle: string;
  win11DeployMode: string;
  win11SelfContained: string;
  win11OutputFormat: string;
  win11SingleFile: string;
  win11DriverReq: string;
  win11DriverNone: string;
  win11SpecsTitle: string;
  win11TargetArch: string;
  win11Permissions: string;
  win11CloseBtn: string;
  win11ReadyNotice: string;
  win11ZipIncludes: string;
  win11Step1Title: string;
  win11Step2Title: string;
  win11Step2Body: string;
  win11Step3Title: string;
  win11CopyCmd: string;

  // Source Code Modal
  sourceModalTitle: string;
  sourceModalDesc: string;
  sourceModalSubtitle: string;
  projectFilesTitle: string;
  downloadZipBtn: string;
  packagingBtn: string;
  copyBtn: string;

  // PCSX2 Card
  pcsx2CardTitle: string;
  pcsx2CardSubtitle: string;
  pcsx2PedalAction: string;
  pcsx2OffscreenReload: string;
  pcsx2RecommendedMapping: string;
  pcsx2SetupStepsTitle: string;
  pcsx2Step1: string;
  pcsx2Step2: string;
  pcsx2Step3: string;
  pcsx2Step4: string;
  pcsx2Yes: string;
  pcsx2No: string;
  pcsx2ButtonA: string;
  pcsx2ButtonB: string;
  pcsx2Crosshair: string;
  pcsx2ConfigSnippetLabel: string;
  pcsx2CopyIni: string;
  pcsx2QuickGuideTitle: string;

  // Raw Packet Log
  rawLogTitle: string;
  rawLogSubtitle: string;
  rawLogResume: string;
  rawLogPause: string;
  rawLogClear: string;
  rawLogWaiting: string;
  rawLogStructure: string;
  rawLogTrigger: string;
  rawLogIdle: string;
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
    copiedBtn: "Skopiowano!",
    downloadConfigBtn: "Pobierz plik",
    copiedNotice: "Skopiowano do schowka!",
    copyLaunchCmd: "Kopiuj polecenie startowe",
    selectGameProfile: "Wybierz profil gry:",
    recommendedSettings: "Rekomendowane nastawy filtra:",
    recommendedFilterLabel: "Zalecany filtr:",
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

    // Additional Calibration Modal Keys
    calibCornerTL_name: "Punkt 1 (Góra-Lewo)",
    calibCornerTL_label: "Punkt 1: Lewy Górny Róg (Top-Left)",
    calibCornerTL_sub: "Wyceluj w czerwony celownik w lewym górnym rogu",
    calibCornerTR_name: "Punkt 2 (Góra-Prawo)",
    calibCornerTR_label: "Punkt 2: Prawy Górny Róg (Top-Right)",
    calibCornerTR_sub: "Wyceluj w prawy górny narożnik",
    calibCornerBR_name: "Punkt 3 (Dół-Prawo)",
    calibCornerBR_label: "Punkt 3: Prawy Dolny Róg (Bottom-Right)",
    calibCornerBR_sub: "Wyceluj w prawy dolny narożnik",
    calibCornerBL_name: "Punkt 4 (Dół-Lewo)",
    calibCornerBL_label: "Punkt 4: Lewy Dolny Róg (Bottom-Left)",
    calibCornerBL_sub: "Wyceluj w lewy dolny narożnik",
    calibStepOf: "KROK {step} Z 4",
    calibPointLabel: "Punkt",
    calibStatusCaptured: "Zapisany",
    calibStatusActive: "Aktywny",
    calibStatusWaiting: "Oczekuje w kolejce",
    calibAimAndShoot: "Wyceluj i naciśnij spust",
    calibHold3s: "Przetrzymaj 3s",
    calibSamplingCount: "Zbieranie ({count} prób.)",
    calibHoverCorner: "Najedź na narożnik",
    calibHoldSteady: "Trzymaj celownik stabilnie... Próbki: {count}",
    calibAutoDetectHelp: "Przytrzymaj celownik w kółku przez 3 sekundy. Zostanie zebrana próbka szumu i wyznaczona czułość.",
    calibCurrentRaw: "Bieżące RAW:",
    calibPressSpacePrompt: "Wciśnij SPACJĘ lub strzel pistoletem G'AIM'E",
    calibSuccessTitle: "Kalibracja Zakończona Sukcesem!",
    calibSuccessDesc: "Wszystkie 4 punkty narożne zostały pomyślnie przechwycone i skompensowane.",
    calibDetectedRanges: "WYKRYTE ZAKRESY I PROFIL CZUŁOŚCI:",
    calibHorizontalRange: "Zakres Poziomy (Oś X)",
    calibVerticalRange: "Zakres Pionowy (Oś Y)",
    calibSpan: "Rozpiętość:",
    calibRawUnits: "jedn. RAW",
    calibNoiseLevel: "POZIOM SZUMU",
    calibFieldOfView: "POLE WIDZENIA",
    calibOfSensor: "matrycy",
    calibRecFilter: "REK. FILTR",
    calibStabilityAbbr: "stab.",
    calibCalibratedCorners: "SKALIBROWANE NAROŻNIKI RAW:",
    calibRepeatBtn: "Powtórz Kalibrację",
    calibApplySaveBtn: "Zastosuj i Zapisz",
    calibResetAllTitle: "Resetuj wszystkie punkty",
    calibCurrentTarget: "Bieżący cel",
    calibModeLabel: "Tryb",
    calibGuideClose: "Zamknij Przewodnik",
    calibGuideOpen: "Przewodnik",
    calibStartLabel: "Rozpocznij",
    calibShootSampleLabel: "Strzał / Próbkuj",
    calibCancelLabel: "Anuluj",

    // Additional Emulator & Card Keys
    applyToPipeline: "Zastosuj do potoku",
    copyLaunchTooltip: "Kopiuj komendę uruchomieniową DemulShooter",
    generatorTitle: "GENERATOR PLIKÓW KONFIGURACYJNYCH (.INI / .CFG / .XML)",
    generatorDesc: "Wartości kalibracji obu graczy (P1 i P2) są automatycznie wstrzykiwane do wygenerowanego pliku",
    copyContent: "Kopiuj treść",
    pedalActionLabel: "Akcja pedału:",
    mappedInputsTitle: "Zmapowane wejścia pistoletu i pedału:",
    reloadActionKey: "Przeład./Akcja:",
    usbPedalKey: "Pedał USB:",
    suppressRestingJitter: "Tłumi mikro-drgania matrycy w spoczynku",
    crosshairSpeed: "Szybkość ruchu celownika po ekranie",
    activeCustom: "Aktywna (Własna)",
    defaultStandard: "Domyślna (Standard)",
    activeStatusSingle: "Aktywna",
    defaultStatusSingle: "Domyślna",
    destinationLocation: "Docelowa lokalizacja:",

    // Standalone Win11 Modal
    win11ModalTitle: "SAMODZIELNA APLIKACJA DLA WINDOWS 11 (.EXE)",
    win11ModalDesc: "Pojedynczy plik wykonywalny GaimePcBridge.exe działający na każdym PC z Windows 11 bez zewnętrznych zależności",
    win11DownloadZipCard: "Pobierz kompletną paczkę z generatorem .EXE dla Windows 11",
    win11HowToRun: "Jak uruchomić aplikację w Windows 11 w 3 krokach",
    win11Step1: "KROK 1: Rozpakuj archiwum",
    win11Step1Desc: "Pobierz paczkę ZIP i wypakuj ją w dowolnym folderze na dysku (np. C:\\GAMES\\GaimePcBridge).",
    win11Step2: "KROK 2: Uruchom skrypt budujący",
    win11Step2Desc: "Kliknij dwukrotnie plik Build_Standalone_Win11.bat lub uruchom Build_Standalone_Win11.ps1 w PowerShell.",
    win11Step3: "KROK 3: Gotowy plik .EXE",
    win11Step3Desc: "W folderze Publish_Win11 pojawi się plik GaimePcBridge.exe. Działa samodzielnie na każdym Windows 11!",
    win11CliTitle: "Dla programistów / Wiersz poleceń (PowerShell & CMD):",
    win11DeployMode: "Tryb wdrożenia:",
    win11SelfContained: "Self-Contained (Środowisko wbudowane)",
    win11OutputFormat: "Format wyjściowy:",
    win11SingleFile: "Pojedynczy plik wykonywalny (.exe)",
    win11DriverReq: "Wymagania sterowników:",
    win11DriverNone: "Standardowe (Brak sterowników jądra)",
    win11SpecsTitle: "Specyfikacja Samodzielnej Aplikacji Windows 11 (Self-Contained):",
    win11TargetArch: "Architektura docelowa:",
    win11Permissions: "Uprawnienia:",
    win11CloseBtn: "Zamknij",
    win11ReadyNotice: "Paczka gotowa do pobrania",
    win11ZipIncludes: "Archiwum ZIP zawiera projekt .NET 8, profil publikacji Single-File oraz automatyczny skrypt Publish_Standalone_Win11.bat.",
    win11Step1Title: "Wypakuj archiwum ZIP",
    win11Step2Title: "Dwuklik w skrypt .BAT",
    win11Step2Body: "Kliknij dwukrotnie plik Publish_Standalone_Win11.bat. W kilka sekund wygeneruje gotowy plik GaimePcBridge.exe.",
    win11Step3Title: "Uruchom GaimePcBridge.exe",
    win11CopyCmd: "Kopiuj polecenie",

    // Source Code Modal
    sourceModalTitle: "KOD ŹRÓDŁOWY C# / .NET 8 WPF (VISUAL STUDIO 2022)",
    sourceModalDesc: "Kompletny kod źródłowy silnika Windows dla pistoletu G'AIM'E: obsługa WebHID/RawInput, filtr jittera, homografia 3x3 oraz wirtualna mysz/joystick",
    sourceModalSubtitle: "Kompletny, kompilowalny projekt Windows gotowy do uruchomienia (F5) w Visual Studio",
    projectFilesTitle: "Pliki Projektu",
    downloadZipBtn: "Pobierz Paczkę ZIP",
    packagingBtn: "Pakowanie...",
    copyBtn: "Kopiuj",

    // PCSX2 Card
    pcsx2CardTitle: "INTEGRACJA Z PCSX2 (GUNCON 2)",
    pcsx2CardSubtitle: "Profile mapowania przycisków i konfiguracja emulatora PlayStation 2",
    pcsx2PedalAction: "Akcja pedału:",
    pcsx2OffscreenReload: "Przeładowanie poza ekranem:",
    pcsx2RecommendedMapping: "Zalecane Mapowanie Wejść",
    pcsx2SetupStepsTitle: "Szybka instrukcja w PCSX2:",
    pcsx2Step1: "W PCSX2 wejdź w Settings → Controllers → Controller Port 1.",
    pcsx2Step2: "Wybierz typ urządzenia: GunCon 2.",
    pcsx2Step3: "Upewnij się, że Pointer przypisany jest do wskaźnika myszy Windows.",
    pcsx2Step4: "W grze po starcie wykonaj pojedynczy strzał kalibracyjny w środek ekranu.",
    pcsx2Yes: "TAK",
    pcsx2No: "NIE",
    pcsx2ButtonA: "Przycisk A:",
    pcsx2ButtonB: "Przycisk B:",
    pcsx2Crosshair: "Celownik:",
    pcsx2ConfigSnippetLabel: "Wycinek konfiguracji PCSX2 (Controllers.ini):",
    pcsx2CopyIni: "Kopiuj INI",
    pcsx2QuickGuideTitle: "Szybka instrukcja w PCSX2:",

    // Raw Packet Log
    rawLogTitle: "DIAGNOSTYKA RAW HID (PAKIETY 6-BAJTOWE)",
    rawLogSubtitle: "Podgląd strumienia bajtów digitizera (mattkanwisher/gaime_mods findings)",
    rawLogResume: "Wznów",
    rawLogPause: "Wstrzymaj",
    rawLogClear: "Wyczyść logi",
    rawLogWaiting: "Oczekiwanie na raporty HID z urządzenia...",
    rawLogStructure: "Struktura:",
    rawLogTrigger: "TRIGGER",
    rawLogIdle: "IDLE",
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
    copiedBtn: "Copied!",
    downloadConfigBtn: "Download File",
    copiedNotice: "Copied to clipboard!",
    copyLaunchCmd: "Copy Launch Command",
    selectGameProfile: "Select Game Profile:",
    recommendedSettings: "Recommended Filter Settings:",
    recommendedFilterLabel: "Recommended Filter:",
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

    // Additional Calibration Modal Keys
    calibCornerTL_name: "Point 1 (Top-Left)",
    calibCornerTL_label: "Point 1: Top-Left Corner (TL)",
    calibCornerTL_sub: "Aim at the red crosshair in the top-left corner",
    calibCornerTR_name: "Point 2 (Top-Right)",
    calibCornerTR_label: "Point 2: Top-Right Corner (TR)",
    calibCornerTR_sub: "Aim at the top-right corner",
    calibCornerBR_name: "Point 3 (Bottom-Right)",
    calibCornerBR_label: "Point 3: Bottom-Right Corner (BR)",
    calibCornerBR_sub: "Aim at the bottom-right corner",
    calibCornerBL_name: "Point 4 (Bottom-Left)",
    calibCornerBL_label: "Point 4: Bottom-Left Corner (BL)",
    calibCornerBL_sub: "Aim at the bottom-left corner",
    calibStepOf: "STEP {step} OF 4",
    calibPointLabel: "Point",
    calibStatusCaptured: "Captured",
    calibStatusActive: "Active",
    calibStatusWaiting: "Waiting in queue",
    calibAimAndShoot: "Aim and pull the trigger",
    calibHold3s: "Hold for 3s",
    calibSamplingCount: "Sampling ({count} samples)",
    calibHoverCorner: "Hover over corner",
    calibHoldSteady: "Hold crosshair steady... Samples: {count}",
    calibAutoDetectHelp: "Hold crosshair inside the circle for 3 seconds. Noise will be sampled and sensitivity calculated.",
    calibCurrentRaw: "Current RAW:",
    calibPressSpacePrompt: "Press SPACEBAR or pull trigger on G'AIM'E lightgun",
    calibSuccessTitle: "Calibration Completed Successfully!",
    calibSuccessDesc: "All 4 corner points have been captured and perspective matrix calibrated.",
    calibDetectedRanges: "DETECTED RANGES & SENSITIVITY PROFILE:",
    calibHorizontalRange: "Horizontal Range (X-Axis)",
    calibVerticalRange: "Vertical Range (Y-Axis)",
    calibSpan: "Span:",
    calibRawUnits: "RAW units",
    calibNoiseLevel: "NOISE FLOOR",
    calibFieldOfView: "FIELD OF VIEW",
    calibOfSensor: "of sensor",
    calibRecFilter: "REC. FILTER",
    calibStabilityAbbr: "stab.",
    calibCalibratedCorners: "CALIBRATED RAW CORNERS:",
    calibRepeatBtn: "Repeat Calibration",
    calibApplySaveBtn: "Apply & Save",
    calibResetAllTitle: "Reset all points",
    calibCurrentTarget: "Current Target",
    calibModeLabel: "Mode",
    calibGuideClose: "Close Guide",
    calibGuideOpen: "Guide",
    calibStartLabel: "Start",
    calibShootSampleLabel: "Shoot / Sample",
    calibCancelLabel: "Cancel",

    // Additional Emulator & Card Keys
    applyToPipeline: "Apply to Pipeline",
    copyLaunchTooltip: "Copy DemulShooter launch command",
    generatorTitle: "CONFIGURATION FILE GENERATOR (.INI / .CFG / .XML)",
    generatorDesc: "Calibration values for both players (P1 and P2) are automatically injected into the generated file",
    copyContent: "Copy Content",
    pedalActionLabel: "Pedal Action:",
    mappedInputsTitle: "Mapped Lightgun & Pedal Inputs:",
    reloadActionKey: "Reload/Action:",
    usbPedalKey: "USB Pedal:",
    suppressRestingJitter: "Suppresses sensor micro-jitter at rest",
    crosshairSpeed: "Crosshair travel speed on screen",
    activeCustom: "Active (Custom)",
    defaultStandard: "Default (Standard)",
    activeStatusSingle: "Active",
    defaultStatusSingle: "Default",
    destinationLocation: "Target location:",

    // Standalone Win11 Modal
    win11ModalTitle: "WINDOWS 11 STANDALONE APPLICATION (.EXE)",
    win11ModalDesc: "Single executable GaimePcBridge.exe running on any Windows 11 PC without external dependencies",
    win11DownloadZipCard: "Download complete package with .EXE builder for Windows 11",
    win11HowToRun: "How to run the application on Windows 11 in 3 steps",
    win11Step1: "STEP 1: Extract the archive",
    win11Step1Desc: "Download the ZIP package and extract it to any folder on your drive (e.g., C:\\GAMES\\GaimePcBridge).",
    win11Step2: "STEP 2: Run the build script",
    win11Step2Desc: "Double-click Build_Standalone_Win11.bat or run Build_Standalone_Win11.ps1 in PowerShell.",
    win11Step3: "STEP 3: Ready .EXE executable",
    win11Step3Desc: "Inside the Publish_Win11 folder you will find GaimePcBridge.exe. Runs standalone on any Windows 11 PC!",
    win11CliTitle: "For developers / Command Line (PowerShell & CMD):",
    win11DeployMode: "Deployment mode:",
    win11SelfContained: "Self-Contained (Embedded Runtime)",
    win11OutputFormat: "Output format:",
    win11SingleFile: "Single executable file (.exe)",
    win11DriverReq: "Driver requirements:",
    win11DriverNone: "Standard (No kernel drivers required)",
    win11SpecsTitle: "Windows 11 Standalone Application Specification (Self-Contained):",
    win11TargetArch: "Target architecture:",
    win11Permissions: "Permissions:",
    win11CloseBtn: "Close",
    win11ReadyNotice: "Package ready to download",
    win11ZipIncludes: "The ZIP archive contains the .NET 8 project, Single-File publish profile, and automated script Publish_Standalone_Win11.bat.",
    win11Step1Title: "Extract ZIP archive",
    win11Step2Title: "Double-click .BAT script",
    win11Step2Body: "Double-click the Publish_Standalone_Win11.bat file. Within seconds it will generate the ready GaimePcBridge.exe.",
    win11Step3Title: "Run GaimePcBridge.exe",
    win11CopyCmd: "Copy command",

    // Source Code Modal
    sourceModalTitle: "C# / .NET 8 WPF SOURCE CODE (VISUAL STUDIO 2022)",
    sourceModalDesc: "Complete Windows engine source code for G'AIM'E lightgun: WebHID/RawInput handling, jitter filter, 3x3 homography, and virtual mouse/joystick",
    sourceModalSubtitle: "Complete, buildable Windows project ready to run (F5) in Visual Studio",
    projectFilesTitle: "Project Files",
    downloadZipBtn: "Download ZIP Package",
    packagingBtn: "Packaging...",
    copyBtn: "Copy",

    // PCSX2 Card
    pcsx2CardTitle: "PCSX2 & GUNCON 2 INTEGRATION",
    pcsx2CardSubtitle: "Button mapping profiles and PlayStation 2 emulator configuration",
    pcsx2PedalAction: "Pedal action:",
    pcsx2OffscreenReload: "Off-screen reload:",
    pcsx2RecommendedMapping: "Recommended Input Mapping",
    pcsx2SetupStepsTitle: "PCSX2 Quick Guide:",
    pcsx2Step1: "In PCSX2, open Settings → Controllers → Controller Port 1.",
    pcsx2Step2: "Select device type: GunCon 2.",
    pcsx2Step3: "Ensure Pointer is assigned to the Windows mouse cursor.",
    pcsx2Step4: "In-game after launch, perform a single calibration shot at the center of the screen.",
    pcsx2Yes: "YES",
    pcsx2No: "NO",
    pcsx2ButtonA: "Button A:",
    pcsx2ButtonB: "Button B:",
    pcsx2Crosshair: "Crosshair:",
    pcsx2ConfigSnippetLabel: "PCSX2 Configuration Snippet (Controllers.ini):",
    pcsx2CopyIni: "Copy INI",
    pcsx2QuickGuideTitle: "PCSX2 Quick Guide:",

    // Raw Packet Log
    rawLogTitle: "RAW HID DIAGNOSTICS (6-BYTE PACKETS)",
    rawLogSubtitle: "Digitizer byte stream monitor (mattkanwisher/gaime_mods findings)",
    rawLogResume: "Resume",
    rawLogPause: "Pause",
    rawLogClear: "Clear logs",
    rawLogWaiting: "Waiting for HID reports from device...",
    rawLogStructure: "Structure:",
    rawLogTrigger: "TRIGGER",
    rawLogIdle: "IDLE",
  },
};
