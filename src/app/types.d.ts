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

        selectFontListActive: boolean;

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
        magHeight: number;

        maskActive: boolean;
        maskCustomActive: boolean;
        maskOpacity: string;
        maskColourCurrent: string;
        maskColourCustomCurrent: string;
    }

    interface IActions extends
        IHideActions,
        IUtilActions,
        IFontActions,
        IResetActions,
        ICloseActions,
        IMenuActions,
        ITTSActions,
        ISelectActions,
        IColourActions,
        IMagActions,
        IMaskActions {}

    interface IHideActions {
        abarHide(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
    }

    interface IUtilActions {
        abarResize(): (state: Accessabar.IState) => void;
    }

    interface IFontActions {
        fontIncSize(): Accessabar.IState;
        fontDecSize(): Accessabar.IState;
        fontResetSizing(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        fontFamilyEnable(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        fontFamilyReset(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        fontChangeFamilyAll(key?: string): (state: Accessabar.IState) => Accessabar.IState;
        fontColourChange(colour?: string): (state: Accessabar.IState) => Accessabar.IState;
        fontColourEnable(): (state: Accessabar.IState) => Accessabar.IState;
        fontColourReset(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        fontLineSpacingEnable(): (state: Accessabar.IState) => Accessabar.IState;
        fontLineSpacingChange(count?: number): (state: Accessabar.IState) => Accessabar.IState;
        fontLineSpacingIncrement(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        fontLineSpacingDecrement(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        fontLineSpacingReset(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        fontLetterSpacingEnable(): (state: Accessabar.IState) => Accessabar.IState;
        fontLetterSpacingChange(count?: number): (state: Accessabar.IState) => Accessabar.IState;
        fontLetterSpacingIncrement(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        fontLetterSpacingDecrement(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        fontLetterSpacingReset(): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        fontReset(configKey: string): void;
    }

    interface IResetActions {
        resetAll(): Accessabar.IState;
    }

    interface ICloseActions {
        closeAccessabar(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
    }

    interface IMenuActions {
        menuAddListener(): (state: Accessabar.IState) => Accessabar.IState;
        menuRemoveListener(): (state: Accessabar.IState) => Accessabar.IState;
        menuHide(): Accessabar.IState;
        menuShow(): Accessabar.IState;
        menuToggleHide(): (state: Accessabar.IState) => Accessabar.IState;
        menuMove(event: MouseEvent): (state: Accessabar.IState) => Accessabar.IState;
        menuUpdatePosition(el: HTMLElement): Accessabar.IState;
        menuUpdateMousePosition(event: MouseEvent): Accessabar.IState;
        menuStartDrag(event: MouseEvent): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        menuStopDrag(): Accessabar.IState;
        menuHandle(name: string): (state: Accessabar.IState, actions: Accessabar.IActions) => void;
        menuOpen(name: string): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        menuClose(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        menuTextOpsSwitchInner(current: string): (state: Accessabar.IState) => Accessabar.IState;
    }

    interface ITTSActions {
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

    interface ISelectActions {
        selectToggleSpeakHover(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        selectToggleHighlightSpeak(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        selectToggleFontList(event: Event): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        selectToggleFontCurrent(key: string): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        selectToggleMagnifier(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        selectToggleMask(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
    }

    interface IColourActions {
        colourChangeFont(colour: string): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        colourCustomChangeFont(colour: string): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        colourChangeMask(colour: string): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        colourCustomChangeMask(colour: string): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
    }

    interface IMagActions {
        magEnable(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        magStop(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        magStartDrag(event: MouseEvent): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        magStopDrag(): Accessabar.IState;
        magUpdateMousePosition(event: MouseEvent): Accessabar.IState;
        magAddListener(): (state: Accessabar.IState) => Accessabar.IState;
        magRemoveListener(): (state: Accessabar.IState) => Accessabar.IState;
        magMove(event: MouseEvent): (state: Accessabar.IState) => Accessabar.IState;
        magUpdatePosition(): (state: Accessabar.IState) => Accessabar.IState;
        magScaleIncrease(): (state: Accessabar.IState) => Accessabar.IState;
        magScaleDecrease(): (state: Accessabar.IState) => Accessabar.IState;
    }

    interface IMaskActions {
        maskEnable(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        maskStop(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        maskColourChange(colour?: string): (state: Accessabar.IState) => Accessabar.IState;
    }

    interface IConfigObject {
        conflicts: string[];
        attrNames: {
            [propName: string]: string;
        };
        editName: string;
        disableOnClick: boolean;
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

    interface IMenuConfigObject {
        title: string;
        disableOnClose: boolean;
    }

    interface IMenuConfig {
        [propName: string]: IMenuConfigObject;
    }

    interface IMagMouseUpdate {
        clientX: number;
        clientY: number;
    }
}

// Allow png and json5 files to be imported
declare module '*.png';
declare module '*.json5';
