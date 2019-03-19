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

    magRemoveListener: () => ({ magMoveEvent }) => {
        if (magMoveEvent) {
            document.removeEventListener('mousemove', magPassthrough);

            document.removeEventListener('touchmove', magPassthrough);

            return { menuEvent: false };
        }
    },

    magMove: (event: IDragEvent) => ({ magCanDrag, magPosX, magPosY, magMouseX, magMouseY, magPageOffsetX, magPageOffsetY, magScale }, { magStopDrag }) => {
        const ev = event.touches ? event.touches[0] : event;

        const {
            target,
            clientX,
            clientY,
        } = ev;

        const mag = window.abar.mainElement.querySelector('#ab-magnifier-window');
        const magPage = window.abar.mainElement.querySelector('#ab-magnifier-page-container');

        if (!magCanDrag || !target || !mag || !magPage || typeof magPosX === 'boolean' || typeof magPosY === 'boolean') {
            return;
        }

        if (magCanDrag) {
            event.preventDefault();
        }

        const rect = mag.getBoundingClientRect();
        const pageRect = magPage.getBoundingClientRect();
        const windowWidth = window.innerWidth - rect.width;
        const windowHeight = window.innerHeight - rect.height;
        let x = magPosX + (clientX - magMouseX);
        let y = magPosY + (clientY - magMouseY);

        if (x < 0) {
            x = 0;
            magStopDrag();
        }

        if (x > windowWidth) {
            x = windowWidth;
            magStopDrag();
        }

        if (y < 0) {
            y = 0;
            magStopDrag();
        }

        if (y > windowHeight) {
            y = windowHeight;
            magStopDrag();
        }

        // Anchor the position of the iframe to the top left corner
        const fixedX = -x + magPageOffsetX;
        const fixedY = -y + magPageOffsetY;

        // Get the distance between the middle point of the magnifier on the normal page and scaled page
        const pointX = x + (pageRect.width / 2);
        const scaledPointX = pointX * magScale;
        const distanceX = scaledPointX - pointX;

        const pointY = y + (pageRect.height / 2);
        const scaledPointY = pointY * magScale;
        const distanceY = scaledPointY - pointY;

        console.log(distanceX);

        return {
            magMouseX: clientX,
            magMouseY: clientY,
            magPageX: fixedX,
            magPageY: fixedY,
            magPosX: x,
            magPosY: y,
            magTranslateX: -distanceX,
            magTranslateY: -distanceY,
        };
    },

    magUpdatePosition: (rect: ClientRect | DOMRect) => {
        if (!rect) {
            return;
        }

        const x = -rect.left;
        const y = -rect.top;

        return {
            magPageOffsetX: x,
            magPageOffsetY: y,
            magPageX: x,
            magPageY: y,
        };
    },

    magEnable: () => (state, { magAddListener }) => {
        let pageContent = document.documentElement.outerHTML;
        const abarEl = /<accessabar-app.*<\/accessabar-app>/;
        const abarScripts = /<script.*src=.*accessabar.*<\/script>/;

        pageContent = pageContent.replace(abarEl, '');
        pageContent = pageContent.replace(abarScripts, '');

        magAddListener();

        return {
            magActive: true,
            magPageContent: pageContent,
        };
    },

    magStop: () => (state, { magRemoveListener }) => {
        magRemoveListener();

        return {
            magActive: false,
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
