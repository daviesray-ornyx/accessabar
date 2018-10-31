declare namespace Accessabar {
    interface IState {
        abarHidden: boolean;
    }

    interface IActions {
        abarHide(): Accessabar.IState;
    }
}

// Allow png files to be imported
declare module '*.png'
