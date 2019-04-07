import { ActionsType } from 'hyperapp';
import BigNumber from 'bignumber.js';
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

    magScaleIncrease: () => ({ magScale, magScaleMax, magScaleStep }) => {
        const pScale = new BigNumber(magScale);

        if (pScale.plus(magScaleStep).gt(magScaleMax)) {
            return;
        }

        const pScaleAdd = pScale.plus(magScaleStep).toFixed(1);

        console.log(pScaleAdd);

        return {
            magScale: pScaleAdd,
        };
    },

    magScaleDecrease: () => ({ magScale, magScaleMin, magScaleStep }) => {
        const pScale = new BigNumber(magScale);

        if (pScale.minus(magScaleStep).lt(magScaleMin)) {
            return;
        }

        const pScaleSub = pScale.minus(magScaleStep).toFixed(1);

        console.log(pScaleSub);

        return {
            magScale: pScaleSub,
        };
    },

    magMove: (event: IDragEvent) => ({ magCanDrag, magPosX, magPosY, magMouseX, magMouseY, magScale, magBorder }, { magStopDrag }) => {
        const ev = event.touches ? event.touches[0] : event;

        const {
            clientX,
            clientY,
        } = ev;

        const mag = window.abar.mainElement.querySelector('#ab-magnifier-window');
        const magPage = window.abar.mainElement.querySelector('#ab-magnifier-page');

        if (!magCanDrag || !mag || !magPage || typeof magPosX === 'boolean' || typeof magPosY === 'boolean') {
            return;
        }

        if (!(magPage instanceof HTMLIFrameElement)) {
            return;
        }

        if (!magPage.contentDocument) {
            return;
        }

        if (magCanDrag) {
            event.preventDefault();
        }

        const rect = mag.getBoundingClientRect();
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

        // Anchor the position of the iframe to the top left corner of body
        const fixedX = -(x + magBorder);
        const fixedY = -(y + magBorder);

        // Get the distance between the middle point of the magnifier on the normal page and scaled page
        const pointX = x + (rect.width / 2);
        const scaledPointX = pointX * magScale;
        const distanceX = scaledPointX - pointX;

        const pointY = y + (rect.height / 2);
        const scaledPointY = pointY * magScale;
        const distanceY = scaledPointY - pointY;

        let pushMargin = false;

        if (pointY < (rect.height * 0.6)) {
            pushMargin = true;
            magPage.contentDocument.body.style.marginTop = `${rect.height / 4}px`;
        }

        if (pointX < (rect.width * 0.6)) {
            pushMargin = true;
            magPage.contentDocument.body.style.marginLeft = `${rect.width / 4}px`;
        }

        if (pointY > (windowHeight + (rect.height * 0.4))) {
            pushMargin = true;
            magPage.contentDocument.body.style.marginBottom = `${rect.height / 4}px`;
        }

        if (pointX > (windowWidth + (rect.width * 0.4))) {
            pushMargin = true;
            magPage.contentDocument.body.style.marginRight = `${rect.width / 4}px`;
        }

        if (!pushMargin) {
            magPage.contentDocument.body.style.marginTop = null;
            magPage.contentDocument.body.style.marginRight = null;
            magPage.contentDocument.body.style.marginBottom = null;
            magPage.contentDocument.body.style.marginLeft = null;
        }

        // console.table({
        //     pointX,
        //     scaledPointX,
        //     distanceX,
        //     pointY,
        //     scaledPointY,
        //     distanceY,
        // });

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

    magUpdatePosition: () => ({ magBorder }) => {
        return {
            magPageX: -magBorder,
            magPageY: -magBorder,
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
