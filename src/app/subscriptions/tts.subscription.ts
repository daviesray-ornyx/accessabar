import {
  ttsHandleHover,
  ttsHandleHighlight,
  ttsStopCurrent,
} from '../actions/tts.actions';

function subTTS(state: Ace.State) {
  return [ttsInit(state), ttsHover(state), ttsHighlight(state)];
}

function ttsInit(state: Ace.State) {
  return (
    state.ttsInitiated && [
      // setup voices
      [
        (dispatch, props) => {
          dispatch((state: Ace.State) => ({...state, ttsVoices: props.voices}));

          if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = dispatch(
              (state: Ace.State) => ({
                ...state,
                ttsVoices: window.speechSynthesis.getVoices(),
              })
            );
          }
        },
        {
          voices: window.speechSynthesis.getVoices(),
        },
      ],
    ]
  );
}

function ttsHover(state: Ace.State) {
  const hoverPassthrough = (event, dispatch, props) =>
    dispatch(props.action, event);
  return state.ttsHoverSpeak
    ? [
        (dispatch, props) => {
          document.addEventListener(
            'mouseover',
            hoverPassthrough.bind(null, dispatch, props)
          );
        },
        {
          action: ttsHandleHover,
        },
      ]
    : [
        (dispatch, props) => {
          dispatch(props.action);
          document.removeEventListener(
            'mouseover',
            hoverPassthrough.bind(null, dispatch, props)
          );
        },
        {
          action: ttsStopCurrent,
        },
      ];
}

function ttsHighlight(state: Ace.State) {
  const highlightPassthrough = (event, dispatch, props) =>
    dispatch(props.action, event);
  return state.ttsHighlightSpeak
    ? [
        (dispatch, props) => {
          document.addEventListener(
            'mouseup',
            highlightPassthrough.bind(null, dispatch, props)
          );
        },
        {
          action: ttsHandleHighlight,
        },
      ]
    : [
        (dispatch, props) => {
          dispatch(props.action);
          document.removeEventListener(
            'mouseover',
            highlightPassthrough.bind(null, dispatch, props)
          );
        },
        {
          action: ttsStopCurrent,
        },
      ];
}

export default subTTS;
