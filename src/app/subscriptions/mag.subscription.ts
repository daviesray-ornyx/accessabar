import {magAddPageContent, magMove, magScroll} from '../actions/mag.actions';

function subMag(state: Ace.State) {
  return [magEnable(state)];
}

function magEnable(state: Ace.State) {
  const magPassthrough = (event, dispatch, props) =>
    dispatch(props.action, event);
  const magPassthroughScroll = (event, dispatch, props) =>
    dispatch(props.action, event);
  return state.magActive
    ? [
        [
          (dispatch, props) => dispatch(props.action),
          {
            action: magAddPageContent,
          },
        ],
        [
          (dispatch, props) => {
            document.addEventListener(
              'mousemove',
              magPassthrough.bind(null, dispatch, props)
            );
            document.addEventListener(
              'touchmove',
              magPassthrough.bind(null, dispatch, props)
            );
          },
          {
            action: magMove,
          },
        ],
        [
          (dispatch, props) => {
            document.addEventListener(
              'mousemove',
              magPassthroughScroll.bind(null, dispatch, props)
            );
          },
          {
            action: magScroll,
          },
        ],
      ]
    : [
        (dispatch, props) => {
          dispatch(props.action);
          document.removeEventListener(
            'mousemove',
            magPassthrough.bind(null, dispatch, props)
          );
          document.removeEventListener(
            'touchmove',
            magPassthrough.bind(null, dispatch, props)
          );
          document.removeEventListener(
            'scroll',
            magPassthroughScroll.bind(null, dispatch, props)
          );
        },
        {
          action: state => ({
            ...state,
            magPageContent: '',
            magPosX: 0,
            magPosY: 0,
          }),
        },
      ];
}

export default subMag;
