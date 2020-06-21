import languageConfig from '../../config/language.config.json5';
import {getParents} from './ace.actions';
import {apiGetTranslation, apiSendEvent} from './api.actions';

function languageChangeAll(state: Ace.State, key?: string) {
  const {languageCurrentKey} = state;
  const currentKey: string = key || languageCurrentKey;
  if (currentKey.length <= 0) {
    return;
  }

  const currentLanguageCode = languageConfig[currentKey].code || 'en';
  const parentElements = getParents();

  parentElements.forEach(async element => {
    const elementTextContent = element.textContent;

    const req = await apiGetTranslation({
      strings: [elementTextContent],
      to: currentLanguageCode,
    });

    element.textContent = req?.trans[0] || elementTextContent;
  });
}

function languageToggleCurrent(state: Ace.State, key: string) {
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

function languageToggleList(state: Ace.State) {
  return {
    ...state,
    selectLanguageListActive: !state.selectLanguageListActive,
  };
}

export {languageChangeAll, languageToggleCurrent, languageToggleList};
