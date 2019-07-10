import { h } from 'hyperapp';
import mag from './mag.component';
import mask from './mask.component';
import { rulerReadingBar, rulerPinhole } from './ruler.component';

const funcArea = (state, actions) => {
    return h('ab-func-area', { class: 'ab-func-area' }, [
        mag(state, actions),
        mask(state),
        rulerReadingBar(state),
        rulerPinhole(state),
    ]);
};

export default funcArea;
export { funcArea };
