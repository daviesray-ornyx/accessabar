import {
    div,
} from '@hyperapp/html';

const mag = () => {
    return div({ id: 'ab-magnifier', class: 'ab-magnifier ab-draggable ab-hide' });
};

export default mag;
export { mag };
