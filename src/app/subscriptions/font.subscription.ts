import {apiSendEvent} from '../actions/api.actions';
import {
  fontReset,
  fontChangeFamilyAll,
  fontFamilyReset,
  fontColourReset,
  fontColourChange,
  fontLineSpacingChange,
  fontLineSpacingReset,
  fontLetterSpacingChange,
  fontLetterSpacingReset,
} from '../actions/font.actions';

function subFont(state: Ace.State) {
  return [
    subFontFamily(state),
    subFontSizing(state),
    subFontColour(state),
    subFontLineSpacing(state),
    subFontLetterSpacing(state),
  ];
}

function subFontFamily(state: Ace.State) {
  return state.fontActive
    ? [
        (dispatch, props) => {
          dispatch(props.action);
          apiSendEvent('AceFontType_On');
        },
        {
          action: fontChangeFamilyAll,
        },
      ]
    : [
        (dispatch, props) => dispatch(props.action),
        {
          action: fontFamilyReset,
        },
      ];
}

function subFontSizing(state: Ace.State) {
  return (
    !state.fontSizingActive && [
      (dispatch, props) => dispatch(props.action, props.opts),
      {
        opts: 'fontSizing',
        action: fontReset,
      },
    ]
  );
}

function subFontColour(state: Ace.State) {
  return state.fontColourActive
    ? [
        (dispatch, props) => {
          dispatch(props.action);
          apiSendEvent('AceFontColour_On');
        },
        {
          action: fontColourChange,
        },
      ]
    : [
        (dispatch, props) => dispatch(props.action),
        {
          action: fontColourReset,
        },
      ];
}

function subFontLineSpacing(state: Ace.State) {
  return state.fontLineSpacingActive
    ? [
        (dispatch, props) => {
          dispatch(props.action);
          apiSendEvent('AceFontLineSpacing_On');
        },
        {
          action: fontLineSpacingChange,
        },
      ]
    : [
        (dispatch, props) => dispatch(props.action),
        {
          action: fontLineSpacingReset,
        },
      ];
}

function subFontLetterSpacing(state: Ace.State) {
  return state.fontLetterSpacingActive
    ? [
        (dispatch, props) => {
          dispatch(props.action);
          apiSendEvent('AceFontLetterSpacing_On');
        },
        {
          action: fontLetterSpacingChange,
        },
      ]
    : [
        (dispatch, props) => dispatch(props.action),
        {
          action: fontLetterSpacingReset,
        },
      ];
}

export default subFont;
