import { h } from 'hyperapp';
import BigNumber from 'bignumber.js';
import state from '../state';

interface IRulerReadingState {
    rulerReadingActive: Accessabar.IState['rulerReadingActive'];
    rulerMouseY: Accessabar.IState['rulerMouseY'];
    rulerReadingOffset: Accessabar.IState['rulerReadingOffset'];
    rulerReadingOpacity: Accessabar.IState['rulerReadingOpacity'];
    rulerHeight: Accessabar.IState['rulerHeight'];

}

const rulerReadingBar = ({ rulerReadingActive, rulerMouseY, rulerReadingOffset, rulerReadingOpacity, rulerHeight }: IRulerReadingState) => {
    return h('ab-reading-ruler', {
        'aria-hidden': 'true',
        class: `ab-reading-ruler ${rulerReadingActive ? '' : 'ab-hide'}`,
        style: {
            opacity: rulerReadingOpacity,
            top: `${new BigNumber(rulerMouseY).plus(rulerReadingOffset).toString()}px`,
            height: `${rulerHeight}px`,
        },
    });
};

interface IRulerPinholeState {
    rulerPinholeCentreHeight: Accessabar.IState['rulerPinholeCentreHeight'];
    rulerPinholeOpacity: Accessabar.IState['rulerPinholeOpacity'];
    rulerMouseY: Accessabar.IState['rulerMouseY'];
    rulerPinholeActive: Accessabar.IState['rulerPinholeActive'];

    rulerPinholeMaskColourCurrent: Accessabar.IState['rulerPinholeMaskColourCurrent'],
    rulerPinholeMaskColourCustomCurrent: Accessabar.IState['rulerPinholeMaskColourCustomCurrent'],
    rulerPinholeMaskCustomActive: Accessabar.IState['rulerPinholeMaskCustomActive'],
}

const rulerPinhole = ({ rulerPinholeCentreHeight, rulerMouseY, rulerPinholeOpacity,
    rulerPinholeActive, rulerPinholeMaskColourCurrent,}: IRulerPinholeState) => {
    const height = new BigNumber(window.innerHeight);
    const handleHeight1 = new BigNumber(rulerMouseY).minus(rulerPinholeCentreHeight / 2);
    const handleHeight2 = height.minus(rulerMouseY).minus(rulerPinholeCentreHeight / 2);

    return h('ab-pinhole-ruler-container', { 'aria-hidden': 'true', class: `ab-pinhole-ruler-container ${rulerPinholeActive ? '' : 'ab-hide'}` }, [
        h('ab-pinhole-ruler-handle', {
            'aria-hidden': 'true',
            class: 'ab-pinhole-ruler-handle ab-top',
            style: {
                background: 'black',
                // opacity: rulerPinholeOpacity,
                opacity: 0.65,
                height: `${handleHeight1}px`,
            },
        }),
        h('ab-pinhole-ruler-centre', {
            'aria-hidden': 'true',
            class: 'ab-pinhole-ruler-centre',
            style: {
                height: `${rulerPinholeCentreHeight}px`,
                //top: `${new BigNumber(rulerMouseY).plus(rulerPinholeCentreHeight / 2)}px`,
                top: `${new BigNumber(rulerMouseY).minus(rulerPinholeCentreHeight / 2)}px`,
                opacity: rulerPinholeOpacity,
                background: `${rulerPinholeMaskColourCurrent}`,
            },
        }),
        h('ab-pinhole-ruler-handle', {
            'aria-hidden': 'true',
            class: 'ab-pinhole-ruler-handle ab-bottom',
            style: {
                background: 'black',
                // opacity: rulerPinholeOpacity,
                opacity: 0.65,
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
