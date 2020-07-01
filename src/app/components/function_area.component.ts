import { h } from 'hyperapp';
import mag from './mag.component';
import mask from './mask.component';
import feedback from './feedback.component';
import { rulerReadingBar, rulerPinhole } from './ruler.component';

const funcArea = (state, actions) => {
    return h('ab-func-area', { class: 'ab-func-area' }, [
        feedback(state, actions),
        mag(state, actions),
        mask(state),
        rulerReadingBar(state),
        rulerPinhole(state),
    ]);
};

export default funcArea;
export { funcArea };
