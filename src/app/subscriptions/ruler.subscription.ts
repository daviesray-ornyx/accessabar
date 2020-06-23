import {rulerMove} from '../actions/ruler.actions';

function subRuler(state: Ace.State) {
  return [subRulerEnableEvents(state)];
}

function subRulerEnableEvents(state: Ace.State) {
  return (
    state.rulerEventActive && [
      (dispatch, props) => {
        const rulerPassthrough = event => dispatch(props.action, event);
        document.addEventListener('mousemove', rulerPassthrough);
        document.addEventListener('touchmove', rulerPassthrough);

        return () => {
          document.removeEventListener('mousemove', rulerPassthrough);
          document.removeEventListener('touchmove', rulerPassthrough);
        };
      },
      {
        action: rulerMove,
      },
    ]
  );
}

export default subRuler;
