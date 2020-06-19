import {ActionsType} from 'hyperapp';
import BigNumber from 'bignumber.js';

function maskChangeMaskColour(state: Ace.State, colour: string) {
  return {
    ...state,
    maskColourCurrent: colour,
    maskCustomActive: false,
  };
}

function maskChangeMaskColourCustom(state: Ace.State, colour: string) {
  return {
    ...state,
    maskColourCurrent: colour,
    maskColourCustomCurrent: colour,
    maskCustomActive: true,
  };
}

function maskChangePinholeMaskColour(state: Ace.State, colour: string) {
  return {
    ...state,
    rulerPinholeMaskColourCurrent: colour,
    rulerPinholeMaskCustomActive: false,
  };
}

function maskChangePinholeMaskCustomColour(state: Ace.State, colour: string) {
  return {
    ...state,
    rulerPinholeMaskColourCurrent: colour,
    rulerPinholeMaskColourCustomCurrent: colour,
    rulerPinholeMaskCustomActive: true,
  };
}

const maskActions: ActionsType<Accessabar.IState, Accessabar.IMaskActions> = {
  maskEnable: () => ({maskActive}) => {
    console.log(maskActive);
    return {
      maskActive: true,
    };
  },

  maskStop: () => ({maskActive}) => {
    console.log(maskActive);

    return {
      maskActive: false,
    };
  },

  maskColourChange: (colour: string) => ({maskColourCurrent}) => {
    const currentColour: string = colour || maskColourCurrent;

    if (currentColour.length <= 0) {
      return;
    }

    return {
      maskColourCurrent: colour,
    };
  },

  maskDecreaseOpacity: () => ({
    maskOpacity,
    maskOpacityStep,
    maskOpacityMin,
  }) => {
    const newOpacity = new BigNumber(maskOpacity).minus(maskOpacityStep);

    if (newOpacity.isLessThan(maskOpacityMin)) {
      return;
    }

    return {
      maskOpacity: newOpacity.toString(),
    };
  },

  maskIncreaseOpacity: () => ({
    maskOpacity,
    maskOpacityStep,
    maskOpacityMax,
  }) => {
    const newOpacity = new BigNumber(maskOpacity).plus(maskOpacityStep);

    if (newOpacity.isGreaterThan(maskOpacityMax)) {
      return;
    }

    return {
      maskOpacity: newOpacity.toString(),
    };
  },
};

export default maskActions;
export {maskActions};
