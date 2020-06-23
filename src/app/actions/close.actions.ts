import {apiSendEvent} from './api.actions';

function closeAce(state) {
  apiSendEvent('AceClosed');
  window.ace.close();
  return state;
}

export default closeAce;
export {closeAce};
