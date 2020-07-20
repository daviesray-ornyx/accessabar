import {apiSendEvent} from './api.actions';

function closeAce(state) {
  if (state.feedbackProvided) {
    apiSendEvent('AceClosed');
    window.ace.close();
    return state;
  }

  return {
    ...state,
    feedbackActive: !state.feedbackProvided,
  };
}

export default closeAce;
export {closeAce};
