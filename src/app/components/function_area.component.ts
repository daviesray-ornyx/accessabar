import {
    div,
} from '@hyperapp/html';
import mag from './mag.component';

const funcArea = (state, actions) => {
    return div({ class: 'ab-func-area' }, [
        mag(state, actions),
    ]);
};

export default funcArea;
export { funcArea };
