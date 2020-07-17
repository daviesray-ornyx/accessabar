import {apiSendEvent} from './api.actions';

function showFeedback(state: Ace.State) {
    return {
      ...state,
      feedbackActive: state.feedbackProvided ? false: true,
    };
  }

  function thumbsUpFeedback(state: Ace.State) {
    apiSendEvent('ThumbsUp');
    apiSendEvent('AceClosed');
    window.ace.close();
    return {
      ...state,
      feedbackProvided: true,
      feedbackActive: false,
    }
  }

  function thumbsDownFeedback(state: Ace.State) {
    apiSendEvent('ThumbsDown');
    apiSendEvent('AceClosed');
    window.ace.close();
    return {
      ...state,
      feedbackProvided: true,
      feedbackActive: false,
    }
  }

  function settingcloseFeedbacksClose(state: Ace.State) {
    apiSendEvent('Feedback Ignored');
    apiSendEvent('AceClosed');
    window.ace.close();
    return {
      ...state,
      feedbackProvided: false,
      feedbackActive: false,
    }
  }

  function closeFeedback(state: Ace.State) {
    apiSendEvent('Feedback Ignored');
    apiSendEvent('AceClosed');
    window.ace.close();
    return {
      ...state,
      feedbackProvided: false,
      feedbackActive: false,
    }
  }

  
export { 
    showFeedback,
    thumbsUpFeedback,
    thumbsDownFeedback,
    settingcloseFeedbacksClose,
    closeFeedback
 };
