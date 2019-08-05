import { h } from 'hyperapp';

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
    magHeight: Accessabar.IState['magHeight'];
    magWidth: Accessabar.IState['magWidth'];
}

interface IMagActions {
    magStartDrag: Accessabar.IMagActions['magStartDrag'];
    magStopDrag: Accessabar.IMagActions['magStopDrag'];
    magUpdatePosition: Accessabar.IMagActions['magUpdatePosition'];
}

const mag = ({ magPageContent, magActive, magTranslateX, magTranslateY, magScale, menuHidden, magPosX, magPosY, magPageX, magPageY, magHeight, magWidth }: IMagState, { magStartDrag, magStopDrag, magUpdatePosition }: IMagActions) => {
    return h(
        'ab-mag-window',
        {
            'aria-label': 'Magnifier window. Move by holding down the left mouse button and dragging',
            class: `ab-magnifier-window ab-draggable ${magActive && !menuHidden ? '' : 'ab-hide' }`,
            id: 'ab-magnifier-window',
            style: {
                height: `${ magHeight }px`,
                left: `${ magPosX }px`,
                top: `${ magPosY }px`,
                width: `${ magWidth }px`,
            },
        },
        [
            h(
                'ab-mag-drag-circle',
                {
                    'aria-label': 'Move the magnifier by holding the left mouse button and dragging',
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
                    h('ab-icon', { 'aria-hidden': 'true', class: 'ab-icon ab-icon-move' }),
                ],
            ),
            h(
                'ab-mag-page-container',
                {
                    class: 'ab-magnifier-page-container',
                    id: 'ab-magnifier-page-container',
                },
                [
                    h(
                        'iframe',
                        {
                            'aria-hidden': 'true',
                            class: 'ab-magnifier-page',
                            id: 'ab-magnifier-page',
                            onload: () => {
                                magUpdatePosition();
                            },
                            srcdoc: magPageContent,
                            style: {
                                left: `${magPageX}px`,
                                top: `${magPageY}px`,
                                transform: `translate(${magTranslateX}px, ${magTranslateY}px) scale(${magScale})`,
                            },
                        },
                    ),
                ],
            ),
        ],
    );
};

export default mag;
export { mag };
