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
    magUpdateSize: Accessabar.IMagActions['magUpdateSize'];
    //magUpdateSize
}

const mag = ({magPageContent, magActive, magTranslateX, magTranslateY, magScale, menuHidden, magPosX, magPosY, magPageX, magPageY, magHeight, magWidth }: IMagState, {magStartDrag, magStopDrag, magUpdatePosition, magUpdateSize }: IMagActions) => {
    return h(
        'ab-mag-window',
        {
            'aria-label': 'Magnifier window. Move by holding down the left mouse button and dragging',
            class: `ab-magnifier-window ab-draggable ${magActive && !menuHidden ? '' : 'ab-hide' }`,
            id: 'ab-magnifier-window',  
            onmouseup: (event) => {
                magUpdateSize(event);
            },
            ontouchcancel: (event) => {
                magUpdateSize(event);
            },
            ontouchend: (event) => {
                magUpdateSize(event);                
            },      
            style: {
                height: `${ magHeight }px`,
                left: `${ magPosX }px`,
                top: `${ magPosY }px`,
                width: `${ magWidth }px`,
                hover: ``,
                overflow: 'hidden',
                resize: 'both',
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
                    style: {
                        height: `100%`,
                        width: `100%`,
                    },
                },
                [
                    h(
                        'iframe',
                        {
                            'aria-hidden': 'true',
                            'scrolling': 'no',
                            'scroll': 'no',
                            class: 'ab-magnifier-page',
                            id: 'ab-magnifier-page',
                            onload: () => {
                                magUpdatePosition();
                            },
                            srcdoc: magPageContent,
                            style: {
                                // overflow: 'hidden',
                                left: `${magPageX}px`,
                                top: `${magPageY}px`,
                                transform: `translate(${magTranslateX}px, ${magTranslateY}px) scale(${magScale})`,
                            },
                        },
                    ),
                ],
            ),
            // h(
            //     'ab-mag-resize-icon',
            //     {
            //         'aria-label': 'Resize the magnifier by holding the left mouse button and dragging',
            //         class: 'ab-resize-square',
            //         onmousedown: (event) => {                     
            //             magStartDrag(event);
            //         },
            //         onmouseup: () => {
            //             magStopDrag();
            //         },
            //         ontouchcancel: () => {
            //             magStopDrag();
            //         },
            //         ontouchend: () => {
            //             magStopDrag();
            //         },
            //         ontouchstart: (event) => {
            //             magStartDrag(event);
            //         },
            //     },
            //     [
            //         h('ab-icon', { 'aria-hidden': 'true', class: 'ab-icon ab-icon-resize' }),
            //     ],
            // ),
        ],
    );
};

export default mag;
export { mag };
