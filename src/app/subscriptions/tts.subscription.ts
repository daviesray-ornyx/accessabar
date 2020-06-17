import {ttsHandleHover, ttsHandleHighlight} from '../actions/tts.actions';

function subTTS(state: Ace.State) {
  return [
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
    ],
    state.ttsHoverSpeak && [
      [
        (dispatch, _) => {
          const hoverPassthrough = event => dispatch(ttsHandleHover, event);

          document.addEventListener('mouseover', hoverPassthrough);

          return () =>
            document.removeEventListener('mouseover', hoverPassthrough);
        },
        {},
      ],
    ],
    state.ttsHighlightSpeak && [
      [
        (dispatch, _) => {
          const highlightPassthrough = event =>
            dispatch(ttsHandleHighlight, event);

          document.addEventListener('mouseup', highlightPassthrough);

          return () =>
            document.removeEventListener('mouseup', highlightPassthrough);
        },
        {},
      ],
    ],
  ];
}

export default subTTS;
