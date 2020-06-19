import {aceResize} from '../actions/ace.actions';

function subResizeAceHandle(dispatch, _) {
  const dispatchFunc = () => {
    dispatch(aceResize);
  };

  window.addEventListener('resize', dispatchFunc, {passive: true});

  return () => {
    window.removeEventListener('resize', dispatchFunc);
  };
}

export default subResizeAceHandle;
export {subResizeAceHandle};
