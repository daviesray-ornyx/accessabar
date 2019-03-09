import { ActionsType } from 'hyperapp';
// import fromEvent from 'rxjs';

interface IDragEvent extends MouseEvent, TouchEvent {}

function magPassthrough(event) {
    window.abar.appActions.magMove(event);
}

const magActions: ActionsType<Accessabar.IState, Accessabar.IMagActions> = {
    magAddListener: () => ({ magMoveEvent }) => {
        if (!magMoveEvent) {
            document.addEventListener('mousemove', magPassthrough);
            document.addEventListener('touchmove', magPassthrough);

            return { menuEvent: true };
        }
    },

    // finish function import
    magMove: (event: IDragEvent) => ({ magCanDrag, menuPosX, menuPosY, menuMouseX, menuMouseY }, { menuStopDrag }) => {
        const ev = event.touches ? event.touches[0] : event;

        const {
            target,
            clientX,
            clientY,
        } = ev;

        const menu = window.abar.mainElement.querySelector('#ab-menu');

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
            menuStopDrag();
        }

        if (x > windowWidth) {
            x = windowWidth;
            menuStopDrag();
        }

        if (y < 0) {
            y = 0;
            menuStopDrag();
        }

        if (y > windowHeight) {
            y = windowHeight;
            menuStopDrag();
        }

        // console.log(menuMouseX, menuMouseY, clientX, clientY, x, y, windowHeight, windowWidth, rect);

        return {
            menuMouseX: clientX,
            menuMouseY: clientY,
            menuPosX: x,
            menuPosY: y,
        };
    },

    magEnable: () => ({ magActive }) => {
        let pageContent = document.documentElement.outerHTML;
        const abarEl = /<accessabar-app.*<\/accessabar-app>/;
        const abarScripts = /<script.*src=.*accessabar.*<\/script>/;

        pageContent = pageContent.replace(abarEl, '');
        pageContent = pageContent.replace(abarScripts, '');

        return {
            magPageContent: pageContent,
        };
    },

    magStop: () => ({ magActive }) => {
        return {
            magPageContent: '',
        };
    },

    magUpdateMousePosition: (event: IDragEvent) => {
        const ev = event.touches ? event.touches[0] : event;

        const {
            clientX,
            clientY,
        } = ev;

        return {
            magMouseX: clientX,
            magMouseY: clientY,
        };
    },

    magStartDrag: (event: IDragEvent) => (state, { magUpdateMousePosition }) => {
        event.preventDefault();

        magUpdateMousePosition(event);

        return {
            magCanDrag: true,
        };
    },

    magStopDrag: () => ({ magCanDrag: false }),
};

export default magActions;
export {
    magActions,
};
