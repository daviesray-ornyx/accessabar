import {languageChangeAll} from '../actions/language.actions';

function fxLanguageChangeAll(key: string) {
  return [
    (dispatch, props) => {
      dispatch(props.action, props.key);
    },
    {
      key,
      action: languageChangeAll,
    },
  ];
}

export {fxLanguageChangeAll};
