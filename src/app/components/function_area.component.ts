import {
    div,
} from '@hyperapp/html';
import mag from './mag.component';
import mask from './mask.component';
import rulerReadingBar from './ruler.component';

const funcArea = (state, actions) => {
    return div({ class: 'ab-func-area' }, [
        mag(state, actions),
        mask(state),
        rulerReadingBar(state),
    ]);
};

export default funcArea;
export { funcArea };
