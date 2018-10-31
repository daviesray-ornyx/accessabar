declare namespace Accessabar {
    interface IState {
        abarHidden: boolean;
    }

    interface IActions {
        abarHide(): (state: Accessabar.IState) => Accessabar.IState;
        abarHideResize(): (state: Accessabar.IState) => unknown;
    }
}

// Allow png files to be imported
declare module '*.png'
