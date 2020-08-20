declare namespace Ace {
  interface StateToolbar {
    aceHidden: boolean;
    aceTooltips: string[];
    aceTooltipSpeakKeys: string[];
    aceOpenDefaults: boolean;
    aceSpeakTooltips: boolean;
    aceTheme: string;
  }

  interface StateFont {
    fontActive: boolean;
    fontColourActive: boolean;
    fontCustomActive: boolean;
    fontLineSpacingActive: boolean;
    fontLetterSpacingActive: boolean;
    fontCurrentKey: string;
    fontColourCurrent: string;
    fontColourCustomCurrent: string;
    fontLineSpacingCount: number;
    fontLineSpacingMax: number;
    fontLineSpacingStep: number;
    fontLetterSpacingCount: number;
    fontLetterSpacingMax: number;
    fontLetterSpacingStep: number;
    fontSizingActive: boolean;
    fontSizingRelative: number;
    textOpsInnerMenuCurrent: string;
    selectFontListActive: boolean;
  }

  interface StateMag {
    magActive: boolean;
    magBorder: number;
    magPageContent: string;
    magCanDrag: boolean;
    magPosX: number;
    magPosY: number;
    magInitialX: number;
    magInitialY: number;
    magOffsetX: number;
    magOffsetY: number;
    magPageX: number;
    magPageY: number;
    magPageOffsetX: number;
    magPageOffsetY: number;
    magTranslateX: number;
    magTranslateY: number;
    magScale: string;
    magScaleMax: number;
    magScaleMin: number;
    magScaleStep: number;
    magWidth: number;
    magWidthMin: number;
    magHeight: number;
    magHeightMin: number;
    magCanResize: boolean;
    magResizeStartX: number;
    magResizeStartY: number;
    magSizeChangeStep: number;
    magHeightOffset: number;
    magWidthOffset: number;
  }

  interface StateFeedback {
    feedbackProvided: boolean;
    feedbackActive: boolean;
    feedbackHeight: number;
    feedbackHeightMin: number;
    feedbackWidth: number;
    feedbackWidthMin: number;
    feedbackPosX: number;
    feedbackPosY: number;
  }

  interface StateMask {
    maskActive: boolean;
    maskCustomActive: boolean;
    maskOpacity: string;
    maskColourCurrent: string;
    maskColourCustomCurrent: string;
    maskOpacityStep: number;
    maskOpacityMin: number;
    maskOpacityMax: number;
  }

  interface StateMenu {
    menuActive: boolean;
    menuPosX: number;
    menuPosY: number;
    menuInitialX: number;
    menuInitialY: number;
    menuOffsetX: number;
    menuOffsetY: number;
    menuTitle: string;
    shortcutKeysAdded: boolean;
  }

  interface StateMenus {
    menusHidden: boolean;
    menusCanDrag: boolean;
    menusDragActive: string;
    menus: {[x: string]: StateMenu};
  }

  interface StateDrag {
    dragActive: boolean;
    dragMouseX: number;
    dragMouseY: number;
  }

  interface StateRuler {
    rulerOpsInnerMenuCurrent: string;
    rulerReadingActive: boolean;
    rulerReadingOffset: number;
    rulerReadingOpacity: string;
    rulerReadingOpacityMin: number;
    rulerReadingOpacityMax: number;
    rulerReadingOpacityStep: number;
    rulerReadingColourCurrent: string;
    rulerReadingCustomColourCurrent: string;
    rulerReadingCustomColourActive: boolean;
    rulerEventActive: boolean;
    rulerPosX: number;
    rulerPosY: number;
    rulerPinholeActive: boolean;
    rulerPinholeOpacity: string;
    rulerPinholeOpacityMin: number;
    rulerPinholeOpacityMax: number;
    rulerPinholeOpacityStep: number;
    rulerPinholeCentreHeight: number;
    rulerPinholeCentreHeightMax: number;
    rulerPinholeCentreHeightMin: number;
    rulerPinholeCentreHeightStep: number;
    rulerPinholeCustomActive: boolean;
    rulerPinholeMaskColourCurrent: string;
    rulerPinholeMaskColourCustomCurrent: string;
    rulerPinholeMaskCustomActive: boolean;
    rulerHeight: number;
    rulerHeightMax: number;
    rulerHeightMin: number;
    rulerHeightStep: number;
  }

  interface StateSettings {
    settingsHidden: boolean;
  }

  interface StateAbout {
    aboutHidden: boolean;
  }

  interface StateSR {
    srActive: boolean;
    srRuntime: SpeechRecognition | boolean;
    srLang: string;
    srLangName: string;
    srLangListActive: boolean;
    srLastDictation: string;
  }

  interface StateTranslation {
    ptActive: boolean;
    languageActive: boolean;
    languageCurrentKey: string;
    selectLanguageListActive: boolean;
    ptPageUrlCached: string;
  }

  interface StateTTS {
    ttsInitiated: boolean;
    ttsHoverSpeak: boolean;
    ttsHighlightSpeak: boolean;
    ttsPitch: string;
    ttsRate: string;
    ttsVolume: string;
    ttsLang: string;
    ttsVoice?: SpeechSynthesisVoice;
    ttsVoiceListActive: boolean;
    ttsCurrentVoiceName: string;
    ttsVoices: SpeechSynthesisVoice[];
    ttsHoverTimeout: NodeJS.Timeout | boolean;
    ttsHighlightTimeout: NodeJS.Timeout | boolean;
    ttsVoiceActive: boolean;
    ttsCurrentUtterText: string;
    ttsCurrentUtterWords: string[];
    ttsCurrentUtterSentences: string[][];
    ttsCurrentUtterSentenceIndex: number;
    ttsCurrentUtterSentenceWordIndex: number;
    ttsCurrentUtterWordIndex: number;
    ttsCurrentUtterCharIndex: number;
  }

  interface State
    extends StateToolbar,
      StateFont,
      StateMag,
      StateFeedback,
      StateMask,
      StateMenus,
      StateDrag,
      StateRuler,
      StateSettings,
      StateAbout,
      StateSR,
      StateTranslation,
      StateTTS {}

  interface FuncConfig {
    attrNames: {
      [propName: string]: string;
    };
    editName: string;
  }

  interface FontConfig {
    name: string;
    family: string;
  }

  interface LanguageConfig {
    name: string;
    code: string;
  }

  interface MenuConfig {
    title: string;
    disableOnClose: boolean;
    disableFunctions: string[];
  }

  interface MagMouseUpdate {
    clientX: number;
    clientY: number;
  }

  interface AceConfig {
    buttonFloatPosition?: string;
    enableButton?: string;
    bindTo?: string;
    position?: string;
    moveBody?: boolean;
  }

  interface ListItem {
    name: string;
    key: string | number;
    action(state: Ace.State, key: ListItem['key']): unknown;
  }

  interface SavedState {
    version: string;
    state: State;
  }

  interface DragEvent extends MouseEvent, TouchEvent {}
}

// Allow png and json5 files to be imported
declare module '*.png';
declare module '*.json5';
