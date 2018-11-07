declare namespace Accessabar {
    interface IState {
        abarHidden: boolean;
    }

    interface IActions extends IHideActions, IUtilActions, IFontActions {

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
    }
}

// Allow png files to be imported
declare module '*.png'
