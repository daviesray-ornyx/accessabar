import {srInitRuntime, srStart, srAddEvents} from '../actions/sr.actions';

function subSR(state: Ace.State) {
  return [subSREnable(state)];
}

function subSREnable(state: Ace.State) {
  return state.srActive
    ? [
        [
          (dispatch, _) => {
            dispatch(srInitRuntime);
            dispatch(srAddEvents);
            dispatch(srStart);
          },
          {},
        ],
      ]
    : [
        (dispatch, props) => dispatch(props.action),
        {
          action: (state: Ace.State) => {
            if (typeof state.srRuntime !== 'boolean') {
              state.srRuntime.abort();
            }

            return {
              ...state,
              srRuntime: false,
            };
          },
        },
      ];
}

export default subSR;
