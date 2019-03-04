import {
    div,
    i,
} from '@hyperapp/html';

const mag = () => {
    return div({ id: 'ab-magnifier', class: 'ab-magnifier ab-draggable' }, [
        div({ class: 'ab-drag-circle' }, [
            i({ class: 'ab-icon ab-icon-move' }),
        ]),
    ]);
};

export default mag;
export { mag };
