import {apiSendEvent} from '../actions/api.actions';

function fxCloseAce() {
  return [
    (dispatch, props) => {
      apiSendEvent('AceClosed');
      props.action();
    },
    {
      action: window.ace.close,
    },
  ];
}

export {fxCloseAce};
