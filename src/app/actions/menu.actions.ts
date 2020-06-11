import { ActionsType } from 'hyperapp';
import menuConfig from '../../config/menu.config.json5';
import AccessabarUtil from '../util';

interface IDragEvent extends MouseEvent, TouchEvent {}

function menuPassthrough(event) {
    window.abar.appActions.menuMove(event);
}

function menuDragPassthrough() {
    window.abar.appActions.menuStopDrag();
}

const menuActions: ActionsType<Accessabar.IState, Accessabar.IMenuActions> = {
    menuAddListener: () => ({ menuEvent }) => {
        if (!menuEvent) {
            document.addEventListener('mousemove', menuPassthrough);
            document.addEventListener('touchmove', menuPassthrough);

            document.addEventListener('mouseup', menuDragPassthrough);
            document.addEventListener('touchcancel', menuDragPassthrough);
            document.addEventListener('touchend', menuDragPassthrough);

            return { menuEvent: true };
        }
    },

    menuRemoveListener: () => ({ menuEvent }) => {
        if (menuEvent) {
            document.removeEventListener('mousemove', menuPassthrough);
            document.removeEventListener('touchmove', menuPassthrough);

            document.removeEventListener('mouseup', menuDragPassthrough);
            document.removeEventListener('touchcancel', menuDragPassthrough);
            document.removeEventListener('touchend', menuDragPassthrough);

            return { menuEvent: false };
        }
    },

    menuMove: (event: IDragEvent) => ({ menuCanDrag, menuPosX, menuPosY, menuMouseX, menuMouseY }, { menuStopDrag }) => {
        const ev = event.touches ? event.touches[0] : event;

        const {
            clientX,
            clientY,
        } = ev;

        const menu = window.abar.mainElement.querySelector('#ab-menu');

        if (!menuCanDrag || !menu || typeof menuPosX === 'boolean' || typeof menuPosY === 'boolean') {
            return;
        }

        if (menuCanDrag) {
            event.preventDefault();
        }

        const rect = menu.getBoundingClientRect();
        const windowWidth = window.innerWidth - rect.width;
        const windowHeight = window.innerHeight - rect.height;
        let x = menuPosX + (clientX - menuMouseX);
        let y = menuPosY + (clientY - menuMouseY);

        let menuMoveXAllowed = true;
        let menuMoveYAllowed = true;

        if (x < 0) {
            x = 0;
            menuMoveXAllowed = false;
        }

        if (x > windowWidth) {
            x = windowWidth;
            menuMoveXAllowed = false;
        }

        if (y < 0) {
            y = 0;
            menuMoveYAllowed = false;
        }

        if (y > windowHeight) {
            y = windowHeight;
            menuMoveYAllowed = false;
        }

        if (!menuMoveYAllowed && !menuMoveXAllowed) {
            return {
                menuPosX: x,
                menuPosY: y,
            };
        }

        if (!menuMoveXAllowed) {
            return {
                menuMouseY: clientY,
                menuPosX: x,
                menuPosY: y,
            };
        }

        if (!menuMoveYAllowed) {
            return {
                menuMouseX: clientX,
                menuPosX: x,
                menuPosY: y,
            };
        }

        return {
            menuMouseX: clientX,
            menuMouseY: clientY,
            menuPosX: x,
            menuPosY: y,
        };
    },

    menuToggleHide: () => ({ menuHidden }) => {
        return {
            menuHidden: !menuHidden,
        };
    },

    menuHide: () => {
        return {
            menuHidden: true,
        };
    },

    menuShow: () => {
        const bar = window.abar.mainElement.querySelector('.ab-bar');

        if (!bar) {
            return;
        }

        return {
            menuHidden: false,
            menuPosX: 50,
            menuPosY: bar.getBoundingClientRect().height,
        };
    },

    menuUpdatePosition: (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();

        return {
            menuPosX: rect.left,
            menuPosY: rect.top,
        };
    },

    menuUpdateMousePosition: (event: IDragEvent) => {
        const ev = event.touches ? event.touches[0] : event;

        const {
            clientX,
            clientY,
        } = ev;

        return {
            menuMouseX: clientX,
            menuMouseY: clientY,
        };
    },

    menuStartDrag: (event: IDragEvent) => (state, { menuUpdateMousePosition }) => {
        event.preventDefault();

        menuUpdateMousePosition(event);

        return { menuCanDrag: true };
    },

    menuStopDrag: () => ({ menuCanDrag: false }),

    menuHandle: (name: string) => ({ menuCurrent, menuActive }, { menuOpen, menuClose }) => {
        if (!menuCurrent && !menuActive) {
            menuOpen(name);
            return;
        }

        if (menuActive && menuCurrent !== name) {
            menuClose();
            menuOpen(name);
            return;
        }

        if (menuActive && menuCurrent === name) {
            menuClose();
            return;
        }
    },

    menuOpen: (name: string) => ({ menuCurrent, menuActive }, { menuClose, menuShow, menuAddListener }) => {
        const config: Accessabar.IMenuConfig = menuConfig[name];

        if (!config) {
            return;
        }

        const { title } = config;

        if (name === menuCurrent) {
            return;
        }

        if (menuActive && menuCurrent) {
            menuClose();
        }

        menuAddListener();
        menuShow();

        return {
            menuActive: true,
            menuCurrent: name,
            menuTitle: title,
        };
    },

    menuClose: () => ({ menuCurrent }, { menuHide, menuRemoveListener }) => {
        const config: Accessabar.IMenuConfigObject = menuConfig[menuCurrent];
        const {
            disableOnClose,
            disableFunctions,
        } = config;

        if (disableOnClose && disableFunctions && disableFunctions.length > 0) {
            for (const func of disableFunctions) {
                AccessabarUtil.stopFunction(func);
            }
        }

        menuRemoveListener();
        menuHide();

        return {
            menuActive: false,
            menuCurrent: '',
        };
    },

    menuTextOpsSwitchInner: (current: string) => () => {
        return {
            textOpsInnerMenuCurrent: current,
        };
    },

    menuRulerOpsSwitchInner: (current: string) => () => {
        return {
            rulerOpsInnerMenuCurrent: current,
        };
    },
};

export default menuActions;
export { menuActions };
