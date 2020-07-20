import {apiSendEvent} from './api.actions';

function showFeedback(state: Ace.State) {
  return {
    ...state,
    feedbackActive: !state.feedbackProvided,
  };
}

function thumbsUpFeedback(state: Ace.State) {
  apiSendEvent('AceFeedbackPositive');
  apiSendEvent('AceClosed');
  window.ace.close();
  return {
    ...state,
    feedbackProvided: true,
    feedbackActive: false,
  };
}

function thumbsDownFeedback(state: Ace.State) {
  apiSendEvent('AceFeedbackNegative');
  apiSendEvent('AceClosed');
  window.ace.close();
  return {
    ...state,
    feedbackProvided: true,
    feedbackActive: false,
  };
}

function closeFeedback(state: Ace.State) {
  apiSendEvent('AceFeedbackIgnored');
  apiSendEvent('AceClosed');
  window.ace.close();
  return {
    ...state,
    feedbackProvided: false,
    feedbackActive: false,
  };
}

export {showFeedback, thumbsUpFeedback, thumbsDownFeedback, closeFeedback};
