import {ActionsType} from 'hyperapp';
import BigNumber from 'bignumber.js';
import {apiSendEvent} from './api.actions';

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

function maskToggle(state: Ace.State) {
  if (!state.maskActive) {
    apiSendEvent('AceScreenMask_On');
  }

  return {
    ...state,
    maskActive: !state.maskActive,
  };
}

function maskColourChange(state: Ace.State, colour?: string) {
  const {maskColourCurrent} = state;
  const currentColour: string = colour || maskColourCurrent;

  if (currentColour.length <= 0) {
    return state;
  }

  return {
    ...state,
    maskColourCurrent: colour,
  };
}

function maskDecreaseOpacity(state: Ace.State) {
  const {maskOpacity, maskOpacityStep, maskOpacityMin} = state;
  const newOpacity = new BigNumber(maskOpacity).minus(maskOpacityStep);

  if (newOpacity.isLessThan(maskOpacityMin)) {
    return state;
  }

  return {
    ...state,
    maskOpacity: newOpacity.toString(),
  };
}

function maskIncreaseOpacity(state: Ace.State) {
  const {maskOpacity, maskOpacityStep, maskOpacityMax} = state;
  const newOpacity = new BigNumber(maskOpacity).plus(maskOpacityStep);

  if (newOpacity.isGreaterThan(maskOpacityMax)) {
    return state;
  }

  return {
    ...state,
    maskOpacity: newOpacity.toString(),
  };
}

export {
  maskChangeMaskColour,
  maskChangeMaskColourCustom,
  maskChangePinholeMaskColour,
  maskChangePinholeMaskCustomColour,
  maskColourChange,
  maskDecreaseOpacity,
  maskIncreaseOpacity,
  maskToggle,
};
