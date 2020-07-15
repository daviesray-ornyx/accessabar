import { ActionsType } from 'hyperapp';
import {apiSendEvent} from './api.actions';

function showFeedback(state: Ace.State) {
    return {
      ...state,
      feedbackActive: state.feedbackProvided ? false: true,
    };
  }

  function thumbsUpFeedback(state: Ace.State) {
    return state;
  }

  function thumbsDownFeedback(state: Ace.State) {
    return state;
  }

  function settingcloseFeedbacksClose(state: Ace.State) {
    // return {
    //   ...state,
    //   settingsHidden: true,
    // };
    return state;
  }

  function closeFeedback(state: Ace.State) {

    
    return {
      ...state,
      feedbackActive: false,
    };
  }

  
export { 
    showFeedback,
    thumbsUpFeedback,
    thumbsDownFeedback,
    settingcloseFeedbacksClose,
    closeFeedback
 };
