import {apiSendEvent} from './api.actions';

function showFeedback(state: Ace.State) {
  return {
    ...state,
    feedbackActive: !state.feedbackProvided,
  };
}

function thumbsUpFeedback(state: Ace.State) {
  if(state.feedbackProvided != true){
    apiSendEvent('AceFeedbackNegative');
  }
  
  return {
    ...state,
    feedbackProvided: true,
    feedbackActive: true,
  };
}

function thumbsDownFeedback(state: Ace.State) {
  if(state.feedbackProvided != true){
    apiSendEvent('AceFeedbackNegative');
  }
  
  return {
    ...state,
    feedbackProvided: true,
    feedbackActive: true,
  };
}

function settingcloseFeedbacksClose(state: Ace.State) {
  apiSendEvent('AceFeedbackIgnored');
  apiSendEvent('AceClosed');
  window.ace.close();
  return {
    ...state,
    feedbackActive: false,
  };
}

  function tellMeMore(state: Ace.State) {
    const surveyLink = 'https://docs.google.com/forms/d/e/1FAIpQLSfZZcV1Vz6DrNVXxGJ9cszlv5zrVg5MpJCeXqonZI5-8uWdBg/viewform';
    // open link in new tab
    window.open(surveyLink);
    apiSendEvent('AceClosed');
    window.ace.close();
    return {
      ...state,
      feedbackProvided: true,
      feedbackActive: false,
    }
  }
  

  function closeFeedback(state: Ace.State) {
    apiSendEvent('Feedback Ignored');
    apiSendEvent('AceClosed');
    window.ace.close();
    return {
      ...state,
      feedbackActive: false,
    }
  }

  
export { 
    showFeedback,
    thumbsUpFeedback,
    thumbsDownFeedback,
    tellMeMore,
    settingcloseFeedbacksClose,
    closeFeedback
 };
