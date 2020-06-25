import ISO6391 from 'iso-639-1';
import {apiSendEvent} from './api.actions';
import {fxSREnable} from '../fx/sr.fx';

declare let webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

function srInitRuntime(state: Ace.State) {
  let srRuntime: boolean | SpeechRecognition = false;

  try {
    srRuntime = new webkitSpeechRecognition() || new window.SpeechRecognition();
  } catch {
    return {
      ...state,
      srRuntime,
    };
  }

  return {
    ...state,
    srRuntime,
  };
}

function srStart(state: Ace.State) {
  const {srRuntime, srLang} = state;
  if (typeof srRuntime === 'boolean') {
    return state;
  }

  srRuntime.lang = srLang;
  // srRuntime.interimResults = true;
  srRuntime.continuous = true;
  srRuntime.start();
  return state;
}

function srToggle(state: Ace.State) {
  const newState = {
    ...state,
    srActive: !state.srActive,
  };

  newState.srActive && apiSendEvent('AceSpeechRecognition_On');

  return [newState, fxSREnable(newState)];
}

function srAddEvents(state: Ace.State) {
  const {srRuntime} = state;
  if (typeof srRuntime === 'boolean') {
    return state;
  }

  srRuntime.onresult = srHandleResult;
  return state;
}

function srHandleResult(event: SpeechRecognitionEvent) {
  const finalSentence: string[] = [];

  for (const alt of event.results[event.results.length - 1]) {
    finalSentence.push(alt.transcript);
  }

  srOutput(finalSentence.join(''));
}

function srOutput(str: string) {
  const active = document.activeElement;

  if (!active) {
    return;
  }

  switch (active.nodeName) {
    case 'INPUT':
    case 'TEXTAREA':
    case 'SELECT':
      (active as HTMLInputElement).value += str;
      break;
    default:
      if (
        active.hasAttribute('contenteditable') &&
        active.getAttribute('contenteditable')
      ) {
        active.textContent += str;
      }

      break;
  }

  const selection = getSelection();

  if (selection) {
    selection.selectAllChildren(active);
    selection.collapseToEnd();
  }
}

function srChangeLang(state: Ace.State, lang: string) {
  return {
    ...state,
    srLang: lang,
    srLangName: ISO6391.getNativeName(lang),
  };
}

export {srAddEvents, srChangeLang, srToggle, srInitRuntime, srStart};
