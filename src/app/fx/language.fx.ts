import {languageChangeAll, ptCachePage} from '../actions/language.actions';

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

function fxPtCachePage(state: Ace.State){  
  return [
    (dispatch, props) => {
      dispatch(props.action);
    },
    {
      state,
      action: ptCachePage,
    },
  ];
}

export {fxLanguageChangeAll, fxPtCachePage};
