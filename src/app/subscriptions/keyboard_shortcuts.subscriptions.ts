import buildKeyCombination from '../actions/shortcuts.actions';

// KeyDown Subscription
const subKeyDown = (dispatch, props) => {
  const handler = event => {
    dispatch(props.action, event);
  };

  window.addEventListener('keydown', handler);

  return () => window.removeEventListener('keydown', handler);
};

const subKeyDownHelper = () => [subKeyDown, {action: buildKeyCombination}];

const subKeyUp = (dispatch, props) => {
  const handler = event => {
    dispatch(props.action, event);
  };

  window.addEventListener('keyup', handler);

  return () => window.removeEventListener('keyup', handler);
};

const subKeyUpHelper = () => [subKeyUp, {action: buildKeyCombination}];

export {subKeyDownHelper, subKeyUpHelper};
