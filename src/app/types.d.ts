// TODO: Make a typings folder

declare namespace Accessabar {
    interface IState {
        abarHidden: boolean;
    }

    interface IActions extends
        IHideActions,
        IUtilActions,
        IFontActions,
        IResetActions,
        ICloseActions
    {}

    interface IHideActions {
        abarHide(): (state: Accessabar.IState) => Accessabar.IState;
    }

    interface IUtilActions {
        abarResize(): (state: Accessabar.IState) => unknown;
    }

    interface IFontActions {
        incFontSize(): unknown;
        decFontSize(): unknown;
        resetFontSizing(): unknown;
    }

    interface IResetActions {
        resetAll(): unknown;
    }

    interface ICloseActions {
        closeAccessabar(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
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
}

// Allow png and json5 files to be imported
declare module '*.png'
declare module '*.json5'
