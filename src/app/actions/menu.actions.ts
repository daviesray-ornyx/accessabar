import { ActionsType } from 'hyperapp';

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

    moveMenu: (event: IDragEvent) => ({ menuCanDrag, menuPosX, menuPosY, menuMouseX, menuMouseY }) => {
        const ev = event.touches ? event.touches[0] : event;

        const {
            target,
            clientX,
            clientY,
        } = ev;

        if (!menuCanDrag || !target || typeof menuPosX === 'boolean' || typeof menuPosY === 'boolean') {
            return;
        }

        const x = menuPosX + (clientX - menuMouseX);
        const y = menuPosY + (clientY - menuMouseY);

        // console.log(menuMouseX, menuMouseY, clientX, clientY, x, y);

        return {
            menuMouseX: clientX,
            menuMouseY: clientY,
            menuPosX: x,
            menuPosY: y,
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
};

export default menuActions;
export { menuActions };
