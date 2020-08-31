import languageConfig from '../../config/language.config.json5';
import {getParents} from './ace.actions';
import {apiGetTranslation, apiSendEvent} from './api.actions';
import {fxLanguageChangeAll, fxPtCachePage} from '../fx/language.fx';
import {addShortcutKeysListener} from './shortcuts.actions';


function ptEnable(state: Ace.State) {
  apiSendEvent('AcePageTranslation_On');
  const newState =  {
    ...state,
    ptActive: true,
  };

  // Testing for keyboard shortcuts
  addShortcutKeysListener(state);
      alert('Added event listerner');
  return [newState, fxPtCachePage(newState)];
}

function ptCachePage(state: Ace.State){
  if(state.ptPageUrlCached ==  window.location.href){
    return state;
  }
  
  const parentElements = getParents();
  parentElements.forEach(element => {
    const originalTextContent = element.textContent || undefined;
    element.dataset.original = originalTextContent;
  });
  
  return {
    ...state,
    ptPageUrlCached: window.location.href,
  }
}

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

  // Check if caching is necessary
  const newState = {
    ...state,
    languageActive: true,
    languageCurrentKey: key,
    selectLanguageListActive: false,
  }
  return [
    newState,
    fxLanguageChangeAll(key), 
    fxPtCachePage(newState),
  ];
}

function languageToggleList(state: Ace.State) {
  return {
    ...state,
    selectLanguageListActive: !state.selectLanguageListActive && state.ptActive,
  };
}

function ptToggle(state: Ace.State){
  if(state.ptPageUrlCached != window.location.href){
    return state;
  }

  // pending logic to replace content

  getParents().forEach(element => {
    element.textContent = element.dataset.original || element.textContent;
  });

  const newState = {
    ...state,
    ptActive: !state.ptActive,
    languageCurrentKey: '',
    selectLanguageListActive: state.ptActive ? false : state.selectLanguageListActive,
  };

  apiSendEvent(`AcePageTranslation_${newState.ptActive ? 'On' : 'Off'}`);
  return [newState, fxPtCachePage(newState)];
}

export {ptEnable, ptToggle, languageChangeAll, languageToggleCurrent, languageToggleList, ptCachePage};
