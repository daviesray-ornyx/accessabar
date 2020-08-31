import buildKeyCombination from '../actions/shortcuts.actions';

// KeyDown Subscription
const subKeyDown = (dispatch, props) => {
  const hander = event => {
    dispatch([props.action, event]);
  };

  window.addEventListener('keydown', hander);

  return () => window.removeEventListener('keydown');
};

const subKeyDownHelper = () => [subKeyDown, {action: buildKeyCombination}];

const subKeyUp = (dispatch, props) => {
  const hander = event => {
    dispatch([props.action, event]);
  };
  
  window.addEventListener('keyup', hander);
  
  return () => window.removeEventListener('keyup');
};
  
const subKeyUpHelper = () => [subKeyUp, {action: buildKeyCombination}];

export {subKeyDownHelper, subKeyUpHelper};
