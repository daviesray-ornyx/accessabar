declare namespace Ace {
  interface StateToolbar {
    aceHidden: boolean;
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
    textOpsInnerMenuCurrent: string;
    selectFontListActive: boolean;
  }

  interface StateMag {
    magActive: boolean;
    magBorder: number;
    magPageContent: string;
    magCanDrag: boolean;
    magMouseX: number;
    magMouseY: number;
    magPosX: number;
    magPosY: number;
    magPageX: number;
    magPageY: number;
    magPageOffsetX: number;
    magPageOffsetY: number;
    magTranslateX: number;
    magTranslateY: number;
    magMoveEvent: boolean;
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
    menuCanDrag: boolean;
    menuCurrent: string;
    menuPosX: number | boolean;
    menuPosY: number | boolean;
    menuMouseX: number;
    menuMouseY: number;
    menuEvent: boolean;
    menuHidden: boolean;
    menuTitle: string;
  }

  interface StateRuler {
    rulerOpsInnerMenuCurrent: string;
    rulerReadingActive: boolean;
    rulerReadingOffset: number;
    rulerReadingOpacity: string;
    rulerReadingOpacityMin: number;
    rulerReadingOpacityMax: number;
    rulerReadingOpacityStep: number;
    rulerEventActive: boolean;
    rulerMouseX: number;
    rulerMouseY: number;
    rulerPinholeActive: boolean;
    rulerPinholeOpacity: string;
    rulerPinholeOpacityMin: number;
    rulerPinholeOpacityMax: number;
    rulerPinholeOpacityStep: number;
    rulerPinholeCentreHeight: number;
    rulerPinholeCentreHeightMax: number;
    rulerPinholeCentreHeightMin: number;
    rulerPinholeCentreHeightStep: number;
    rulerPinholeColourCurrent: string;
    rulerPinholeColourCustomCurrent: string;
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
  }

  interface StateTranslation {
    languageActive: boolean;
    languageCurrentKey: string;
    selectLanguageListActive: boolean;
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
      StateMask,
      StateMenu,
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
    enableButton?: string;
    bindTo?: string;
    position?: string;
    moveBody?: boolean;
  }

  interface ListItem {
    name: string;
    key: string | number;
    action(key: ListItem['key']): unknown;
  }
}

// Allow png and json5 files to be imported
declare module '*.png';
declare module '*.json5';
