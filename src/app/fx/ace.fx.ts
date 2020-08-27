import {ttsSpeak, ttsStopCurrent} from '../actions/tts.actions';

function fxAceSpeakTooltip(
  state: Ace.State,
  opts: {id: string; content: string}
) {
  return [
    (dispatch, props) => {
      const {aceTooltipSpeakKeys} = state;
      if (aceTooltipSpeakKeys.indexOf(props.id) !== -1) {
        return () => {};
      }

      ttsStopCurrent(state);

      aceTooltipSpeakKeys.push(props.id);

      dispatch(dState => ({
        ...dState,
        aceTooltipSpeakKeys,
      }));

      setTimeout(() => {
        dispatch(ttsSpeak, props.content); // speak tippy content
        dispatch(dState => {
          const {
            aceTooltipSpeakKeys: dAceTooltipSpeakKeys,
          } = dState as Ace.State;

          dAceTooltipSpeakKeys.splice(
            dAceTooltipSpeakKeys.indexOf(props.id),
            1
          );

          return {
            ...dState,
            aceTooltipSpeakKeys: dAceTooltipSpeakKeys,
          };
        });
      }, 500);

      return () => {};
    },
    {
      ...opts,
    },
  ];
}

export {fxAceSpeakTooltip};
