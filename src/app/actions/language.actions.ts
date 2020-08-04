import languageConfig from '../../config/language.config.json5';
import {getParents} from './ace.actions';
import {apiGetTranslation, apiSendEvent} from './api.actions';
import {fxLanguageChangeAll, fxPtCachePage} from '../fx/language.fx';


function ptEnable(state: Ace.State) {
  apiSendEvent('AcePageTranslation_On');
  const newState =  {
    ...state,
    ptActive: true,
  };
  return [newState, fxPtCachePage(newState)];
}

function ptCachePage(state: Ace.State){
  const parentElements = getParents();
  parentElements.forEach(element => {
    const originalTextContent = element.textContent || undefined;
    element.dataset.original = originalTextContent;
  })
  return (state.ptPageUrlCached !=  window.location.href) ?  {
      ...state,
      ptPageUrlCached: window.location.href,
    } : state;
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
  const newState = {
    ...state,
    ptActive: !state.ptActive,
    selectLanguageListActive: state.ptActive ? false : state.selectLanguageListActive,
  };

  apiSendEvent(`AcePageTranslation_${newState.ptActive ? 'On' : 'Off'}`);
  return [newState, fxPtCachePage(newState)];
}

function ptBackToOriginalTranslation(state: Ace.State){

  if(state.ptPageUrlCached != window.location.href || !state.ptActive){
    return state;
  }

  // pending logic to replace content
  getParents().forEach(element => {
    element.textContent = element.dataset.original || element.textContent;
  });
  
  return {
    ...state,
    languageCurrentKey: '',
  }
}
export {ptEnable, ptToggle, languageChangeAll, languageToggleCurrent, languageToggleList, ptBackToOriginalTranslation, ptCachePage};
