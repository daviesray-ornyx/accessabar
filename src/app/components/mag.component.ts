import {
    div,
} from '@hyperapp/html';

const mag = () => {
    return div({ id: 'ab-magnifier', class: 'ab-magnifier draggable hide' });
};

export default mag;
export { mag };
