import BigNumber from 'bignumber.js';
import {apiSendEvent} from './api.actions';

interface DragEvent extends MouseEvent, TouchEvent {}

function rulerReadingToggle(state: Ace.State) {
  if (!state.rulerReadingActive) {
    apiSendEvent('AceRulerReading_On');
  }

  return {
    ...state,
    rulerReadingActive: !state.rulerReadingActive,
  };
}

function rulerPinholeToggle(state: Ace.State) {
  if (!state.rulerPinholeActive) {
    apiSendEvent('AceRulerPinhole_On');
  }

  return {
    ...state,
    rulerPinholeActive: !state.rulerPinholeActive,
  };
}

function rulerMove(state: Ace.State, event: DragEvent) {
  const ev = event.touches ? event.touches[0] : event;

  const {clientX, clientY} = ev;

  return {
    ...state,
    rulerMouseX: clientX,
    rulerMouseY: clientY,
  };
}

function rulerReadingOpacityInc(state: Ace.State) {
  const {
    rulerReadingOpacity,
    rulerReadingOpacityStep,
    rulerReadingOpacityMax,
  } = state;
  const newOpacity = new BigNumber(rulerReadingOpacity).plus(
    rulerReadingOpacityStep
  );

  if (newOpacity.isGreaterThan(rulerReadingOpacityMax)) {
    return state;
  }

  return {
    ...state,
    rulerReadingOpacity: newOpacity.toString(),
  };
}

function rulerReadingOpacityDec(state: Ace.State) {
  const {
    rulerReadingOpacity,
    rulerReadingOpacityStep,
    rulerReadingOpacityMin,
  } = state;
  const newOpacity = new BigNumber(rulerReadingOpacity).minus(
    rulerReadingOpacityStep
  );

  if (newOpacity.isLessThan(rulerReadingOpacityMin)) {
    return state;
  }

  return {
    ...state,
    rulerReadingOpacity: newOpacity.toString(),
  };
}

function rulerSizeDecrease(state: Ace.State) {
  const {rulerHeight, rulerHeightMin, rulerHeightStep} = state;
  const newHeight = new BigNumber(rulerHeight).minus(rulerHeightStep);

  if (newHeight.isLessThan(rulerHeightMin)) {
    return state;
  }

  return {
    ...state,
    rulerHeight: newHeight.toString(),
  };
}

function rulerSizeIncrease(state: Ace.State) {
  const {rulerHeight, rulerHeightMax, rulerHeightStep} = state;
  const newHeight = new BigNumber(rulerHeight).plus(rulerHeightStep);

  if (newHeight.isGreaterThan(rulerHeightMax)) {
    return state;
  }

  return {
    ...state,
    rulerHeight: newHeight.toString(),
  };
}

function rulerPinholeOpacityInc(state: Ace.State) {
  const {
    rulerPinholeOpacity,
    rulerPinholeOpacityStep,
    rulerPinholeOpacityMax,
  } = state;
  const newOpacity = new BigNumber(rulerPinholeOpacity).plus(
    rulerPinholeOpacityStep
  );

  if (newOpacity.isGreaterThan(rulerPinholeOpacityMax)) {
    return state;
  }

  return {
    ...state,
    rulerPinholeOpacity: newOpacity.toString(),
  };
}

function rulerPinholeOpacityDec(state: Ace.State) {
  const {
    rulerPinholeOpacity,
    rulerPinholeOpacityStep,
    rulerPinholeOpacityMin,
  } = state;
  const newOpacity = new BigNumber(rulerPinholeOpacity).minus(
    rulerPinholeOpacityStep
  );

  if (newOpacity.isLessThan(rulerPinholeOpacityMin)) {
    return state;
  }

  return {
    ...state,
    rulerPinholeOpacity: newOpacity.toString(),
  };
}

function rulerPinholeSizeInc(state: Ace.State) {
  const {
    rulerPinholeCentreHeight,
    rulerPinholeCentreHeightStep,
    rulerPinholeCentreHeightMax,
  } = state;
  const newSize = rulerPinholeCentreHeight + rulerPinholeCentreHeightStep;

  if (newSize > rulerPinholeCentreHeightMax) {
    return state;
  }

  return {
    ...state,
    rulerPinholeCentreHeight: newSize,
  };
}

function rulerPinholeSizeDec(state: Ace.State) {
  const {
    rulerPinholeCentreHeight,
    rulerPinholeCentreHeightStep,
    rulerPinholeCentreHeightMin,
  } = state;
  const newSize = rulerPinholeCentreHeight - rulerPinholeCentreHeightStep;

  if (newSize < rulerPinholeCentreHeightMin) {
    return state;
  }

  return {
    ...state,
    rulerPinholeCentreHeight: newSize,
  };
}

function rulerChangePinholeMaskColour(state: Ace.State, colour: string) {
  const {rulerPinholeMaskColourCurrent} = state;
  const currentColour: string = colour || rulerPinholeMaskColourCurrent;

  if (currentColour.length <= 0) {
    return state;
  }

  return {
    ...state,
    rulerPinholeMaskColourCurrent: colour,
    rulerPinholeMaskCustomActive: false,
  };
}

function rulerChangePinholeMaskCustomColour(state: Ace.State, colour: string) {
  const {rulerPinholeMaskColourCurrent} = state;
  const currentColour: string = colour || rulerPinholeMaskColourCurrent;

  if (currentColour.length <= 0) {
    return state;
  }

  return {
    ...state,
    rulerPinholeMaskColourCurrent: colour,
    rulerPinholeMaskColourCustomCurrent: colour,
    rulerPinholeMaskCustomActive: true,
  };
}

export {
  rulerReadingToggle,
  rulerMove,
  rulerPinholeOpacityDec,
  rulerPinholeOpacityInc,
  rulerPinholeSizeDec,
  rulerPinholeSizeInc,
  rulerPinholeToggle,
  rulerReadingOpacityDec,
  rulerReadingOpacityInc,
  rulerSizeDecrease,
  rulerSizeIncrease,
  rulerChangePinholeMaskColour,
  rulerChangePinholeMaskCustomColour,
};
