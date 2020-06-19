import {rulerMove} from '../actions/ruler.actions';

function subRuler(state: Ace.State) {
  return [subRulerEnableEvents(state)];
}

function subRulerEnableEvents(state: Ace.State) {
  const rulerPassthrough = (event, dispatch, props) =>
    dispatch(props.action, event);
  return state.rulerEventActive
    ? [
        (dispatch, props) => {
          document.addEventListener(
            'mousemove',
            rulerPassthrough.bind(null, dispatch, props)
          );
          document.addEventListener(
            'touchmove',
            rulerPassthrough.bind(null, dispatch, props)
          );
        },
        {
          action: rulerMove,
        },
      ]
    : [
        (dispatch, props) => {
          document.removeEventListener(
            'mousemove',
            rulerPassthrough.bind(null, dispatch, props)
          );
          document.removeEventListener(
            'touchmove',
            rulerPassthrough.bind(null, dispatch, props)
          );
        },
        {},
      ];
}

export default subRuler;
