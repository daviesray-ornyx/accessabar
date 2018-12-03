import { ActionsType } from 'hyperapp';
import funcConfig from '../../config/functions.config.json5';

interface IDragEvent extends MouseEvent, TouchEvent {}

function menuPassthrough(event) {
    // console.log(event);
    window.abar.appActions.moveMenu(event);
}

const menuActions: ActionsType<Accessabar.IState, Accessabar.IMenuActions> = {
    addMenuListener: () => ({ menuEvent }) => {
        if (!menuEvent) {
            document.addEventListener('mousemove', menuPassthrough);

            document.addEventListener('touchmove', menuPassthrough);

            return { menuEvent: true };
        }
    },

    removeMenuListener: () => ({ menuEvent }) => {
        if (menuEvent) {
            document.removeEventListener('mousemove', menuPassthrough);

            document.removeEventListener('touchmove', menuPassthrough);

            return { menuEvent: false };
        }
    },

    moveMenu: (event: IDragEvent) => ({ menuCanDrag, menuPosX, menuPosY, menuMouseX, menuMouseY }, { stopDrag }) => {
        const ev = event.touches ? event.touches[0] : event;

        const {
            target,
            clientX,
            clientY,
        } = ev;

        const menu = window.abar.mainElement.querySelector('#menu');

        if (!menuCanDrag || !target || !menu || typeof menuPosX === 'boolean' || typeof menuPosY === 'boolean') {
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

        if (x < 0) {
            x = 0;
            stopDrag();
        }

        if (x > windowWidth) {
            x = windowWidth;
            stopDrag();
        }

        if (y < 0) {
            y = 0;
            stopDrag();
        }

        if (y > windowHeight) {
            y = windowHeight;
            stopDrag();
        }

        // console.log(menuMouseX, menuMouseY, clientX, clientY, x, y, windowHeight, windowWidth, rect);

        return {
            menuMouseX: clientX,
            menuMouseY: clientY,
            menuPosX: x,
            menuPosY: y,
        };
    },

    toggleHide: () => ({ menuHidden }) => {
        return {
            menuHidden: !menuHidden,
        };
    },

    hideMenu: () => {
        return {
            menuHidden: true,
        };
    },

    showMenu: () => {
        const bar = window.abar.mainElement.querySelector('.bar');

        if (!bar) {
            return;
        }

        return {
            menuHidden: false,
            menuPosX: 50,
            menuPosY: bar.getBoundingClientRect().height,
        };
    },

    updatePosition: (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();

        return {
            menuPosX: rect.left,
            menuPosY: rect.top,
        };
    },

    updateMousePosition: (event: IDragEvent) => {
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

    startDrag: (event: IDragEvent) => (state, { updateMousePosition }) => {
        event.preventDefault();

        updateMousePosition(event);

        return { menuCanDrag: true };
    },

    stopDrag: () => ({ menuCanDrag: false }),

    openMenu: (name: string) => ({ menuCurrent }, { showMenu, addMenuListener }) => {
        const config: Accessabar.IConfigObject = funcConfig[name];

        if (!config) {
            return;
        }

        const menuOptions = config.menuOptions;
        const { title } = menuOptions;

        if (name === menuCurrent) {
            return;
        }

        addMenuListener();
        showMenu();

        return {
            menuActive: true,
            menuCurrent: name,
            menuTitle: title,
        };
    },

    closeMenu: (name: string) => ({ menuCurrent }, { hideMenu, removeMenuListener }) => {
        if (name === menuCurrent) {

            removeMenuListener();
            hideMenu();

            return {
                menuActive: false,
                menuCurrent: '',
            };
        }
    },
};

export default menuActions;
export { menuActions };
