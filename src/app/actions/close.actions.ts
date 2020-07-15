import {apiSendEvent} from './api.actions';

function closeAce(state) {
    if(state.feedbackProvided == true){
        apiSendEvent('AceClosed');
        return state;
    }else{
        return {
            ...state,
            feedbackActive: state.feedbackProvided ? false: true,
        };
        
    }
  
}

export default closeAce;
export {closeAce};
