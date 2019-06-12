import {
    div,
} from '@hyperapp/html';
import BigNumber from 'bignumber.js';

interface IRulerReadingState {
    rulerReadingActive: Accessabar.IState['rulerReadingActive'];
    rulerMouseY: Accessabar.IState['rulerMouseY'];
    rulerReadingOffset: Accessabar.IState['rulerReadingOffset'];
    rulerReadingOpacity: Accessabar.IState['rulerReadingOpacity'];
}

const rulerReadingBar = ({ rulerReadingActive, rulerMouseY, rulerReadingOffset, rulerReadingOpacity }: IRulerReadingState) => {
    return div({
        class: `ab-reading-ruler ${rulerReadingActive ? '' : 'ab-hide'}`,
        style: {
            opacity: rulerReadingOpacity,
            top: `${new BigNumber(rulerMouseY).plus(rulerReadingOffset).toString()}px`,
        },
    });
};

export default rulerReadingBar;
export { rulerReadingBar };
