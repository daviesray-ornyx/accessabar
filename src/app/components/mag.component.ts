import {
    div,
    i,
    iframe,
} from '@hyperapp/html';

interface IMagState {
    magActive: Accessabar.IState['magActive'];
    magPageContent: Accessabar.IState['magPageContent'];
    magStartDrag: Accessabar.IMagActions['magStartDrag'];
    magStopDrag: Accessabar.IMagActions['magStopDrag'];
    magTranslateX: Accessabar.IState['magTranslateX'];
    magTranslateY: Accessabar.IState['magTranslateY'];
    magScale: Accessabar.IState['magScale'];
    menuHidden: Accessabar.IState['menuHidden'];
    magPosX: Accessabar.IState['magPosX'];
    magPosY: Accessabar.IState['magPosY'];
    magPageX: Accessabar.IState['magPageX'];
    magPageY: Accessabar.IState['magPageY'];
}

interface IMagActions {
    magStartDrag: Accessabar.IMagActions['magStartDrag'];
    magStopDrag: Accessabar.IMagActions['magStopDrag'];
    magUpdatePosition: Accessabar.IMagActions['magUpdatePosition'];
}

const mag = ({ magPageContent, magActive, magTranslateX, magTranslateY, magScale, menuHidden, magPosX, magPosY, magPageX, magPageY }: IMagState, { magStartDrag, magStopDrag, magUpdatePosition }: IMagActions) => {
    return div(
        {
            class: `ab-magnifier-window ab-draggable ${magActive && !menuHidden ? '' : 'ab-hide' }`,
            id: 'ab-magnifier-window',
            style: {
                left: `${ magPosX }px`,
                top: `${ magPosY }px`,
            },
        },
        [
            div(
                {
                    class: 'ab-drag-circle',
                    onmousedown: (event) => {
                        magStartDrag(event);
                    },
                    onmouseup: () => {
                        magStopDrag();
                    },
                    ontouchcancel: () => {
                        magStopDrag();
                    },
                    ontouchend: () => {
                        magStopDrag();
                    },
                    ontouchstart: (event) => {
                        magStartDrag(event);
                    },
                },
                [
                    i({ class: 'ab-icon ab-icon-move' }),
                ],
            ),
            div({ id: 'ab-magnifier-page-container', class: 'ab-magnifier-page-container' }, [
                iframe(
                    {
                        class: 'ab-magnifier-page',
                        id: 'ab-magnifier-page',
                        onload: () => {
                            const magEl = document.getElementById('ab-magnifier-window');
                            const magPageEl = document.getElementById('ab-magnifier-page');

                            if (!magEl || !magPageEl) {
                                return;
                            }

                            if (!(magPageEl instanceof HTMLIFrameElement)) {
                                return;
                            }

                            magUpdatePosition();

                            if (magPageEl.contentDocument) {
                                magPageEl.contentDocument.body.style.marginTop = null;
                            }
                        },
                        srcdoc: magPageContent,
                        style: {
                            left: `${magPageX}px`,
                            top: `${magPageY}px`,
                            transform: `translate(${magTranslateX}px, ${magTranslateY}px) scale(${magScale})`,
                        },
                    },
                ),
            ]),
        ],
    );
};

export default mag;
export { mag };
