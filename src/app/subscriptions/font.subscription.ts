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
    fontFamily(state),
    fontSizing(state),
    fontColour(state),
    fontLineSpacing(state),
    fontLetterSpacing(state),
  ];
}

function fontFamily(state: Ace.State) {
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

function fontSizing(state: Ace.State) {
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

function fontColour(state: Ace.State) {
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

function fontLineSpacing(state: Ace.State) {
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

function fontLetterSpacing(state: Ace.State) {
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
