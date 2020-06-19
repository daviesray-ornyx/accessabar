import {languageChangeAll} from './language.actions';
import {fontChangeFamilyAll} from './font.actions';
import {apiSendEvent} from './api.actions';

function selectToggleFontList(state: Ace.State) {
  return {
    ...state,
    selectFontListActive: !state.selectFontListActive,
  };
}

function selectToggleLanguageList(state: Ace.State) {
  return {
    ...state,
    selectLanguageListActive: !state.selectLanguageListActive,
  };
}

function selectToggleFontCurrent(state: Ace.State, key: string) {
  return [
    {
      ...state,
      fontCurrentKey: key,
      selectFontListActive: false,
    },
    state.fontActive && [
      (dispatch, props) => dispatch(props.action, props.key),
      {
        key,
        action: fontChangeFamilyAll,
      },
    ],
  ];
}

function selectToggleLanguageCurrent(state: Ace.State, key: string) {
  apiSendEvent('AcePageTranslation_On');
  return [
    {
      ...state,
      languageCurrentKey: key,
      selectLanguageListActive: false,
    },
    [
      (dispatch, props) => dispatch(props.action, props.key),
      {
        key,
        action: languageChangeAll,
      },
    ],
  ];
}

export {
  selectToggleFontCurrent,
  selectToggleFontList,
  selectToggleLanguageCurrent,
  selectToggleLanguageList,
};
