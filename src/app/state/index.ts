const state: Accessabar.IState = {
    // Whether Accessabar has been hidden or not.
    abarHidden: false,

    menuActive: false,
    // If it's possible to drag the menu (mouse button has been pressed).
    menuCanDrag: false,
    menuCurrent: '',
    menuEvent: false,
    menuHidden: true,
    menuMouseX: 0,
    menuMouseY: 0,
    menuPosX: false,
    menuPosY: false,
    menuTitle: '',

    ttsHighlightSpeak: false,
    ttsHighlightTimeout: false,
    ttsHoverSpeak: false,
    ttsHoverTimeout: false,
    ttsLang: 'en',
    ttsPitch: 1,
    ttsRate: 1,
    ttsVoices: [],
    ttsVolume: 1,
};

export default state;
