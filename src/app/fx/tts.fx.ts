import {
  ttsHandleHighlight,
  ttsHandleHover,
  ttsHandlePrompt,
  ttsSpeak,
} from '../actions/tts.actions';

function fxTTSInit(state: Ace.State) {
  return (
    !state.ttsInitiated && [
      // setup voices
      [
        (dispatch, props) => {
          props.voices.length > 1 &&
            dispatch((state: Ace.State) => ({
              ...state,
              ttsVoices: props.voices,
            }));

          window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 1) {
              dispatch((state: Ace.State) => {
                return {
                  ...state,
                  ttsVoices: window.speechSynthesis.getVoices(),
                };
              });
            }
          };
        },
        {
          voices: window?.speechSynthesis.getVoices(),
        },
      ],
    ]
  );
}

const hoverHandle: unknown[] = [];
const hoverPassthrough = (dispatch, props) => {
  hoverHandle.length < 1 &&
    hoverHandle.push(event => dispatch(props.action, event));

  return hoverHandle[0];
};

function fxTTSHover(state: Ace.State) {
  return !state.ttsHoverSpeak
    ? [
        (dispatch, props) => {
          document.addEventListener(
            'mouseover',
            hoverPassthrough(dispatch, props)
          );

          return () => {
            document.removeEventListener(
              'mouseover',
              hoverPassthrough(dispatch, props)
            );
          };
        },
        {
          action: ttsHandleHover,
        },
      ]
    : [
        (dispatch, props) => {
          document.removeEventListener('mouseover', props.action);
        },
        {action: hoverHandle[0]},
      ];
}

const highlightHandle: unknown[] = [];
const highlightPassthrough = (dispatch, props) => {
  highlightHandle.length < 1 &&
    highlightHandle.push(event => dispatch(props.action, event));

  return highlightHandle[0];
};

function fxTTSHighlight(state: Ace.State) {
  return !state.ttsHighlightSpeak
    ? [
        (dispatch, props) => {
          document.addEventListener(
            'mouseup',
            highlightPassthrough(dispatch, props)
          );

          return () => {
            document.removeEventListener(
              'mouseup',
              highlightPassthrough(dispatch, props)
            );
          };
        },
        {
          action: ttsHandleHighlight,
        },
      ]
    : [
        (dispatch, props) => {
          document.removeEventListener('mouseup', props.action);
        },
        {action: highlightHandle[0]},
      ];
}

const timeoutHandle: NodeJS.Timeout[] = [];

function fxTTSDelaySpeech(state: Ace.State, currentText: string) {
  for (const handle of timeoutHandle) {
    clearTimeout(handle);
  }

  return [
    (dispatch, props) => {
      const to = setTimeout(
        () => dispatch(props.action, props.currentText),
        500
      );
      timeoutHandle.push(to);

      return () => {
        clearTimeout(to);
      };
    },
    {
      currentText,
      action: ttsSpeak,
    },
  ];
}

function fxTTSPrompt(state: Ace.State, utterance) {
  return [
    (dispatch, props) => {
      utterance.onstart = event => {
        dispatch(props.action, event);
      };

      utterance.onboundary = event => {
        dispatch(props.action, event);
      };

      utterance.onend = event => {
        dispatch(props.action, event);
      };
    },
    {
      action: ttsHandlePrompt,
    },
  ];
}

export {fxTTSInit, fxTTSHighlight, fxTTSHover, fxTTSDelaySpeech, fxTTSPrompt};
