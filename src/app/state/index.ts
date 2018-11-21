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
    ttsHoverSpeak: true,
};

export default state;
