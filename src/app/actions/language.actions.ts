import languageConfig from '../../config/language.config.json5';
import {getParents} from './ace.actions';
import {apiGetTranslation, apiSendEvent} from './api.actions';
import {fxLanguageChangeAll} from '../fx/language.fx';

function languageChangeAll(state: Ace.State, key?: string) {
  const {languageCurrentKey} = state;
  const currentKey: string = key || languageCurrentKey;
  if (currentKey.length <= 0) {
    return state;
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

  return state;
}

function languageToggleCurrent(state: Ace.State, key: string) {
  apiSendEvent('AcePageTranslation_On');
  return [
    {
      ...state,
      languageActive: true,
      languageCurrentKey: key,
      selectLanguageListActive: false,
    },
    fxLanguageChangeAll(key),
  ];
}

function languageToggleList(state: Ace.State) {
  return {
    ...state,
    selectLanguageListActive: !state.selectLanguageListActive,
  };
}

export {languageChangeAll, languageToggleCurrent, languageToggleList};
