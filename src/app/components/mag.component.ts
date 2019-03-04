import {
    div,
    i,
    iframe,
} from '@hyperapp/html';

interface IMagState {
    magActive: Accessabar.IState['magActive'];
    magPageContent: Accessabar.IState['magPageContent'];
}

const mag = ({ magPageContent, magActive }: IMagState) => {
    return div({ id: 'ab-magnifier', class: `ab-magnifier ab-draggable ${magActive ? '' : 'ab-hide' }` }, [
        div({ class: 'ab-drag-circle' }, [
            i({ class: 'ab-icon ab-icon-move' }),
        ]),
        div({ class: 'ab-magnifier-page-container' }, [
            iframe(
                {
                    class: 'ab-magnifier-page',
                    id: 'ab-magnifier-page',
                    srcdoc: magPageContent,
                },
            ),
        ]),
    ]);
};

export default mag;
export { mag };
