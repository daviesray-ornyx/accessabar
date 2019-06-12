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

interface IRulerPinholeState {
    rulerPinholeCentreHeight: Accessabar.IState['rulerPinholeCentreHeight'];
    rulerPinholeOpacity: Accessabar.IState['rulerPinholeOpacity'];
    rulerMouseY: Accessabar.IState['rulerMouseY'];
    rulerPinholeActive: Accessabar.IState['rulerPinholeActive'];
}

const rulerPinhole = ({ rulerPinholeCentreHeight, rulerMouseY, rulerPinholeOpacity, rulerPinholeActive }: IRulerPinholeState) => {
    const height = new BigNumber(window.innerHeight);
    const handleHeight1 = new BigNumber(rulerMouseY).minus(rulerPinholeCentreHeight / 2);
    const handleHeight2 = height.minus(rulerMouseY).minus(rulerPinholeCentreHeight / 2);

    return div({ class: `ab-pinhole-ruler-container ${rulerPinholeActive ? '' : 'ab-hide'}` }, [
        div({
            class: 'ab-pinhole-ruler-handle ab-top',
            style: {
                height: `${handleHeight1}px`,
            },
        }),
        div({
            class: 'ab-pinhole-ruler-centre',
            style: {
                height: `${rulerPinholeCentreHeight}px`,
                opacity: rulerPinholeOpacity,
                top: `${new BigNumber(rulerMouseY).plus(rulerPinholeCentreHeight / 2)}px`,
            },
        }),
        div({
            class: 'ab-pinhole-ruler-handle ab-bottom',
            style: {
                height: `${handleHeight2}px`,
            },
        }),
    ]);
};

export default rulerReadingBar;
export {
    rulerReadingBar,
    rulerPinhole,
};
