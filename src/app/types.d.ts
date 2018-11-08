declare namespace Accessabar {
    interface IState {
        abarHidden: boolean;
    }

    interface IActions extends IHideActions, IUtilActions, IFontActions, IResetActions {

    }

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

// Allow png files to be imported
declare module '*.png'
declare module '*.json5'
