import { ActionsType } from 'hyperapp';
import funcConfig from '../../config/functions.config.json5';

interface IDragEvent extends MouseEvent, TouchEvent {}

const menuActions: ActionsType<Accessabar.IState, Accessabar.IMenuActions> = {
    addMenuListener: () => ({ menuEvent }, { moveMenu }) => {
        if (!menuEvent) {
            document.addEventListener('mousemove', (event) => {
                event.preventDefault();
                moveMenu(event);
            });

            document.addEventListener('touchmove', (event) => {
                event.preventDefault();
                moveMenu(event);
            });

            return { menuEvent: true };
        }
    },

    moveMenu: (event: IDragEvent) => ({ menuCanDrag, menuPosX, menuPosY, menuMouseX, menuMouseY }, { stopDrag }) => {
        const ev = event.touches ? event.touches[0] : event;

        const {
            target,
            clientX,
            clientY,
        } = ev;

        const menu = document.querySelector('#accessabar #menu');

        if (!menuCanDrag || !target || !menu || typeof menuPosX === 'boolean' || typeof menuPosY === 'boolean') {
            return;
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
        return {
            menuHidden: false,
            menuPosX: 50,
            menuPosY: window.abar.mainElement.getBoundingClientRect().height,
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

    toggleMenu: (name: string) => ({ menuCurrent }, { hideMenu, showMenu }) => {
        const config: Accessabar.IConfigObject = funcConfig[name];

        if (!config) {
            return;
        }

        const menuOptions = config.menuOptions;
        const title = menuOptions.title;

        if (name === menuCurrent) {
            hideMenu();
            return {
                menuCurrent: '',
            };
        }

        showMenu();

        return {
            menuCurrent: name,
            menuTitle: title,
        };
    },
};

export default menuActions;
export { menuActions };