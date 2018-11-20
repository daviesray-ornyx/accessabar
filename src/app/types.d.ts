// TODO: Make a typings folder

declare namespace Accessabar {
    interface IState {
        abarHidden: boolean;
        menuCanDrag: boolean;
        menuCurrent: string;
        menuPosX: number | boolean;
        menuPosY: number | boolean;
        menuMouseX: number;
        menuMouseY: number;
        menuEvent: boolean;
        menuHidden: boolean;
    }

    interface IActions extends
        IHideActions,
        IUtilActions,
        IFontActions,
        IResetActions,
        ICloseActions,
        IMenuActions
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

    interface IMenuActions {
        addMenuListener(): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        hideMenu(): Accessabar.IState;
        showMenu(): Accessabar.IState;
        toggleHide(): (state: Accessabar.IState) => Accessabar.IState;
        moveMenu(event: Event): (state: Accessabar.IState) => Accessabar.IState;
        updatePosition(el: HTMLElement): Accessabar.IState;
        updateMousePosition(event: MouseEvent): Accessabar.IState;
        startDrag(event: MouseEvent): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
        stopDrag(): Accessabar.IState;
        toggleMenu(name: string): (state: Accessabar.IState, actions: Accessabar.IActions) => Accessabar.IState;
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
