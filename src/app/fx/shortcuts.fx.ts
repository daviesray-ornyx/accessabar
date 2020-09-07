import {
  ttsHoverEnable,
  ttsStopAll,
  ttsHandleHighlight,
} from '../actions/tts.actions';
import {
  fontChangeFamilyAll,
  fontDecSize,
  fontIncSize,
  fontColourChange,
  fontLetterSpacingDecrement,
  fontLetterSpacingIncrement,
  fontLineSpacingIncrement,
  fontLineSpacingDecrement,
} from '../actions/font.actions';

import {magEnable} from '../actions/mag.actions';
import {maskChangeColour} from '../actions/mask.actions';

import {
  rulerReadingEnable,
  rulerSizeIncrease,
  rulerSizeDecrease,
  rulerPinholeToggle,
  rulerChangePinholeMaskCustomColour,
  rulerPinholeSizeInc,
  rulerPinholeSizeDec,
} from '../actions/ruler.actions';

import {srEnable} from '../actions/sr.actions';

function fxTTSEnable(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: ttsHoverEnable,
    },
  ];
}

function fxTTSStopAll(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: ttsStopAll,
    },
  ];
}

//ttsHandleHighlight
function fxTTSHandleHighlight(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: ttsHandleHighlight,
    },
  ];
}

function fxFontFamilyChange(state: Ace.State, key: string) {
  return [
    (dispatch, props) => {
      dispatch(props.action, key);
    },
    {
      state,
      action: fontChangeFamilyAll,
    },
  ];
}

function fxFontSizeIncrease(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: fontIncSize,
    },
  ];
}

function fxFontSizeDecrease(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: fontDecSize,
    },
  ];
}

function fxFontColorChange(state: Ace.State, colorName: string) {
  return [
    (dispatch, props) => {
      dispatch(props.action, colorName);
    },
    {
      state,
      action: fontColourChange,
    },
  ];
}

function fxFontLineSpacingInc(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: fontLineSpacingIncrement,
    },
  ];
}

function fxFontLineSpacingDec(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: fontLineSpacingDecrement,
    },
  ];
}

function fxFontLetterSpacingInc(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: fontLetterSpacingIncrement,
    },
  ];
}

function fxFontLetterSpacingDec(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: fontLetterSpacingDecrement,
    },
  ];
}

function fxMagShow(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: magEnable,
    },
  ];
}

function fxMaskShow(state: Ace.State, colorName: string) {
  return [
    (dispatch, props) => {
      dispatch(props.action, colorName);
    },
    {
      state,
      action: maskChangeColour,
    },
  ];
}

function fxRulerShow(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: rulerReadingEnable,
    },
  ];
}

function fxRulerSizeIncrease(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: rulerSizeIncrease,
    },
  ];
}

function fxRulerSizeDecrease(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: rulerSizeDecrease,
    },
  ];
}

function fxPinholeShow(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: rulerPinholeToggle,
    },
  ];
}

function fxPinholeColorChange(state: Ace.State, colorName: string) {
  return [
    (dispatch, props) => {
      dispatch(props.action, colorName);
    },
    {
      state,
      action: rulerChangePinholeMaskCustomColour,
    },
  ];
}

function fxPinholeSizeIncrease(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: rulerPinholeSizeInc,
    },
  ];
}

function fxPinholeSizeDecrease(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: rulerPinholeSizeDec,
    },
  ];
}

function fxSREnable(state: Ace.State) {
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: srEnable,
    },
  ];
}

export {
  fxTTSEnable,
  fxTTSStopAll,
  fxTTSHandleHighlight,
  fxFontFamilyChange,
  fxFontSizeIncrease,
  fxFontSizeDecrease,
  fxFontColorChange,
  fxFontLineSpacingInc,
  fxFontLineSpacingDec,
  fxFontLetterSpacingInc,
  fxFontLetterSpacingDec,
  fxMagShow,
  fxMaskShow,
  fxRulerShow,
  fxRulerSizeIncrease,
  fxRulerSizeDecrease,
  fxPinholeShow,
  fxPinholeColorChange,
  fxPinholeSizeIncrease,
  fxPinholeSizeDecrease,
  fxSREnable,
};
