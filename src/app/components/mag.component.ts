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
}

interface IMagActions {
    magStartDrag: Accessabar.IMagActions['magStartDrag'];
    magStopDrag: Accessabar.IMagActions['magStopDrag'];
}

const mag = ({ magPageContent, magActive, magTranslateX, magTranslateY }: IMagState, { magStartDrag, magStopDrag }: IMagActions) => {
    return div({ id: 'ab-magnifier-window', class: `ab-magnifier-window ab-draggable ${magActive ? '' : 'ab-hide' }` }, [
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
        div({ class: 'ab-magnifier-page-container' }, [
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

                        if (magEl.offsetTop > 0) {
                            magPageEl.style.top = `-${magEl.offsetTop + 4}px`;
                            magPageEl.style.left = `-${magEl.offsetLeft + 4}px`;
                        }
                    },
                    srcdoc: magPageContent,
                    style: {
                        transform: `translate(${magTranslateX}px, ${magTranslateY}px)`,
                    },
                },
            ),
        ]),
    ]);
};

export default mag;
export { mag };
