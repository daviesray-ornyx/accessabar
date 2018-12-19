// TODO: Make a typings folder

declare namespace Accessabar {
    interface IState {
        abarHidden: boolean;

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

        ttsInitiated: boolean;
        ttsHoverSpeak: boolean;
        ttsHighlightSpeak: boolean;
        ttsPitch: number;
        ttsRate: number;
        ttsVolume: number;
        ttsLang: string;
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

        textOpsInnerMenuCurrent: string;

        fontActive: boolean;
        fontColourActive: boolean;
        fontCustomActive: boolean;
        fontLineSpacingActive: boolean;
        fontCharSpacingActive: boolean;

        fontCurrentKey: string;

        fontColourCurrent: string;
        fontColourCustomCurrent: string;

        fontSizingActive: boolean;

        selectFontListActive: boolean;
    }

    interface IActions extends
        IHideActions,
        IUtilActions,
        IFontActions,
        IResetActions,
        ICloseActions,
        IMenuActions,
        ITTSActions,
        ITextOptionsActions,
        ISelectActions,
        IColourActions {}

    interface IHideActions {
        abarHide(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
    }

    interface IUtilActions {
        abarResize(): (state: Accessabar.IState) => void;
    }

    interface IFontActions {
        incFontSize(): Accessabar.IState;
        decFontSize(): Accessabar.IState;
        resetFontSizing(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        fontFamilyEnable(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        fontFamilyReset(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        fontChangeFamilyAll(key?: string): (state: Accessabar.IState) => Accessabar.IState;
        fontColourChange(colour?: string): (state: Accessabar.IState) => Accessabar.IState;
        fontColourEnable(): (state: Accessabar.IState) => Accessabar.IState;
        fontColourReset(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        lineSpacingEnable(): (state: Accessabar.IState) => Accessabar.IState;
        charSpacingEnable(): (state: Accessabar.IState) => Accessabar.IState;
        fontReset(configKey: string): void;
    }

    interface IResetActions {
        resetAll(): Accessabar.IState;
    }

    interface ICloseActions {
        closeAccessabar(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
    }

    interface IMenuActions {
        addMenuListener(): (state: Accessabar.IState) => Accessabar.IState;
        removeMenuListener(): (state: Accessabar.IState) => Accessabar.IState;
        hideMenu(): Accessabar.IState;
        showMenu(): Accessabar.IState;
        toggleHide(): (state: Accessabar.IState) => Accessabar.IState;
        moveMenu(event: Event): (state: Accessabar.IState) => Accessabar.IState;
        updatePosition(el: HTMLElement): Accessabar.IState;
        updateMousePosition(event: MouseEvent): Accessabar.IState;
        startDrag(event: MouseEvent): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        stopDrag(): Accessabar.IState;
        handleMenu(name: string): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        openMenu(name: string): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        closeMenu(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
    }

    interface ITTSActions {
        toggleSpeakHover(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        toggleHighlightSpeak(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        ttsInit(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        ttsStop(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        ttsHoverStart(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        ttsHighlightStart(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        ttsStopCurrent(): (state: Accessabar.IState) => Accessabar.IState;
        ttsHandleHover(event: MouseEvent): (state: Accessabar.IState) => void;
        ttsHandleHighlight(): (state: Accessabar.IState) => void;
        ttsUpdateVoices(): Accessabar.IState;
        ttsSpeak(text: string): (state: Accessabar.IState) => void;
        ttsHandlePrompt(event: SpeechSynthesisEvent): (state: Accessabar.IState) => Accessabar.IState;
    }

    interface ITextOptionsActions {
        textOpsSwitchInner(current: string): (state: Accessabar.IState) => Accessabar.IState;
    }

    interface ISelectActions {
        selectToggleFontList(event: Event): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        selectToggleFontCurrent(key: string): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
    }

    interface IColourActions {
        colourChangeFont(colour: string): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        colourCustomChangeFont(colour: string): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
    }

    interface IConfigObject {
        conflicts: string[];
        attrNames: {
            [propName: string]: string;
        };
        editName: string;
        disableOnClick: boolean;
        menuOptions: {
            title: string;
            disableOnClose: boolean;
        };
    }

    interface IConfig {
        [propName: string]: IConfigObject;
    }

    interface IFontConfigObject {
        name: string;
        family: string;
    }

    interface IFontConfig {
        [propName: string]: IFontConfigObject;
    }
}

// Allow png and json5 files to be imported
declare module '*.png';
declare module '*.json5';
