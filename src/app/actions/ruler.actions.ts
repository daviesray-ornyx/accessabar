import { ActionsType } from 'hyperapp';
import BigNumber from 'bignumber.js';

interface IDragEvent extends MouseEvent, TouchEvent {}

function rulerPassthrough(event) {
    window.abar.appActions.rulerMove(event);
}

const rulerActions: ActionsType<Accessabar.IState, Accessabar.IRulerActions> = {
    rulerReadingEnable: () => (_, { rulerAddListener }) => {
        rulerAddListener();

        return {
            rulerReadingActive: true,
        };
    },

    rulerReadingStop: () => (_, { rulerRemoveListener }) => {
        rulerRemoveListener();

        return {
            rulerReadingActive: false,
        };
    },

    rulerPinholeEnable: () => (_, { rulerAddListener }) => {
        rulerAddListener();

        return {
            rulerPinholeActive: true,
        };
    },

    rulerPinholeStop: () => (_, { rulerRemoveListener }) => {
        rulerRemoveListener();

        return {
            rulerPinholeActive: false,
        };
    },

    rulerAddListener: () => ({ rulerEventActive }) => {
        if (!rulerEventActive) {
            document.addEventListener('mousemove', rulerPassthrough);
            document.addEventListener('touchmove', rulerPassthrough);

            return {
                rulerEventActive: true,
            };
        }
    },

    rulerRemoveListener: () => ({ rulerEventActive }) => {
        if (rulerEventActive) {
            document.removeEventListener('mousemove', rulerPassthrough);
            document.removeEventListener('touchmove', rulerPassthrough);

            return {
                rulerEventActive: false,
            };
        }
    },

    rulerMove: (event: IDragEvent) => () => {
        const ev = event.touches ? event.touches[0] : event;

        const {
            clientX,
            clientY,
        } = ev;

        return {
            rulerMouseX: clientX,
            rulerMouseY: clientY,
        };
    },

    rulerReadingOpacityInc: () => ({ rulerReadingOpacity, rulerReadingOpacityStep, rulerReadingOpacityMax }) => {
        const newOpacity = new BigNumber(rulerReadingOpacity).plus(rulerReadingOpacityStep);

        if (newOpacity.isGreaterThan(rulerReadingOpacityMax)) {
            return;
        }

        return {
            rulerReadingOpacity: newOpacity.toString(),
        };
    },

    rulerReadingOpacityDec: () => ({ rulerReadingOpacity, rulerReadingOpacityStep, rulerReadingOpacityMin }) => {
        const newOpacity = new BigNumber(rulerReadingOpacity).minus(rulerReadingOpacityStep);

        if (newOpacity.isLessThan(rulerReadingOpacityMin)) {
            return;
        }

        return {
            rulerReadingOpacity: newOpacity.toString(),
        };
    },

    rulerSizeDecrease: () => ({ rulerHeight, rulerHeightMin, rulerHeightStep}) => {
        const newHeight = new BigNumber(rulerHeight).minus(rulerHeightStep);

        if (newHeight.isLessThan(rulerHeightMin)) {
            return;
        }

        return {
            rulerHeight: newHeight.toString(),
        };
    },

    rulerSizeIncrease: () => ({ rulerHeight, rulerHeightMax, rulerHeightStep }) => {
       const newHeight = new BigNumber(rulerHeight).plus(rulerHeightStep);

        if (newHeight.isGreaterThan(rulerHeightMax)) {
            return;
        }

        return {
            rulerHeight: newHeight.toString(),
        };
    },


    rulerPinholeOpacityInc: () => ({ rulerPinholeOpacity, rulerPinholeOpacityStep, rulerPinholeOpacityMax }) => {
        const newOpacity = new BigNumber(rulerPinholeOpacity).plus(rulerPinholeOpacityStep);

        if (newOpacity.isGreaterThan(rulerPinholeOpacityMax)) {
            return;
        }

        return {
            rulerPinholeOpacity: newOpacity.toString(),
        };
    },

    rulerPinholeOpacityDec: () => ({ rulerPinholeOpacity, rulerPinholeOpacityStep, rulerPinholeOpacityMin }) => {
        const newOpacity = new BigNumber(rulerPinholeOpacity).minus(rulerPinholeOpacityStep);

        if (newOpacity.isLessThan(rulerPinholeOpacityMin)) {
            return;
        }

        return {
            rulerPinholeOpacity: newOpacity.toString(),
        };
    },

    rulerPinholeSizeInc: () => ({ rulerPinholeCentreHeight, rulerPinholeCentreHeightStep, rulerPinholeCentreHeightMax }) => {
        const newSize = rulerPinholeCentreHeight + rulerPinholeCentreHeightStep;

        if (newSize > rulerPinholeCentreHeightMax) {
            return;
        }

        return {
            rulerPinholeCentreHeight: newSize,
        };
    },

    rulerPinholeSizeDec: () => ({ rulerPinholeCentreHeight, rulerPinholeCentreHeightStep, rulerPinholeCentreHeightMin }) => {
        const newSize = rulerPinholeCentreHeight - rulerPinholeCentreHeightStep;

        if (newSize < rulerPinholeCentreHeightMin) {
            return;
        }

        return {
            rulerPinholeCentreHeight: newSize,
        };
    },
};

export default rulerActions;
export { rulerActions };
