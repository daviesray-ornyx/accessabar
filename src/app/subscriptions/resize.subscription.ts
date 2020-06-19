import {aceResize} from '../actions/ace.actions';

function resizeAceHandle(dispatch, _) {
  const dispatchFunc = () => {
    dispatch(aceResize);
  };

  window.addEventListener('resize', dispatchFunc, {passive: true});

  return () => {
    window.removeEventListener('resize', dispatchFunc);
  };
}

export default resizeAceHandle;
export {resizeAceHandle};
