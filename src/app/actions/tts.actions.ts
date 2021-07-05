import {apiSendEvent} from './api.actions';
import {
  fxTTSDelaySpeech,
  fxTTSHighlight,
  fxTTSHover,
  fxTTSPlayAudio,
} from '../fx/tts.fx';

function ttsHandleHover(state: Ace.State, event: MouseEvent) {
  const {target} = event;
  const selection = window.getSelection();

  const ignoredTargetIds = [
    'ab-stop',
    'ab-icon-stop',
    'ab-pause-toggle',
    'ab-icon-pause-toggle',
  ];

  if (ignoredTargetIds.indexOf((event.target as HTMLElement).id) > -1) {
    return state;
  }

  if (!selection) {
    return state;
  }

  selection.removeAllRanges();
  selection.selectAllChildren(target as Node);

  const currentText = selection.toString();

  return [state, fxTTSDelaySpeech(state, currentText)];
}

function ttsHandleHighlight(state: Ace.State, event: MouseEvent) {
  const ignoredTargetIds = [
    'ab-stop',
    'ab-icon-stop',
    'ab-pause-toggle',
    'ab-icon-pause-toggle',
  ];

  if (ignoredTargetIds.indexOf((event.target as HTMLElement).id) > -1) {
    return state;
  }

  const selection = window.getSelection();

  if (!selection) {
    return state;
  }

  const currentText = selection.toString();

  return [state, fxTTSDelaySpeech(state, currentText)];
}

function ttsHoverToggle(state: Ace.State) {
  ttsStopCurrent(state);

  const newState = {
    ...state,
    ttsHoverSpeak: !state.ttsHoverSpeak,
    ttsHighlightSpeak: false,
  };

  newState.ttsHoverSpeak && apiSendEvent('AceTTSHover_On');

  return [newState, fxTTSHighlight(newState), fxTTSHover(newState)];
}

function ttsHoverEnable(state: Ace.State) {
  if (state.ttsHoverSpeak) {
    return state;
  }

  ttsStopCurrent(state);

  const newState = {
    ...state,
    ttsHoverSpeak: true,
    ttsHighlightSpeak: false,
  };

  apiSendEvent('AceTTSHover_On');

  return [newState, fxTTSHighlight(newState), fxTTSHover(newState)];
}

function ttsHightlightToggle(state: Ace.State) {
  ttsStopCurrent(state);

  const newState = {
    ...state,
    ttsHighlightSpeak: !state.ttsHighlightSpeak,
    ttsHoverSpeak: false,
  };

  newState.ttsHighlightSpeak && apiSendEvent('AceTTSHighlight_On');

  return [newState, fxTTSHover(newState), fxTTSHighlight(newState)];
}

function ttsHightlightEnable(state: Ace.State) {
  if (state.ttsHighlightSpeak) {
    return state;
  }
  ttsStopCurrent(state);

  const newState = {
    ...state,
    ttsHighlightSpeak: true,
    ttsHoverSpeak: false,
  };

  apiSendEvent('AceTTSHighlight_On');

  return [newState, fxTTSHover(newState), fxTTSHighlight(newState)];
}

function ttsPlayAudio(state: Ace.State, id: string) {
  const ttsAudio = new Audio(
    `https://ace-tts.acetoolbar.com/api/v1/text/${id}`
  );

  ttsAudio.addEventListener('canplaythrough', () => ttsAudio.play());
  // ttsAudio.addEventListener('ended', () => {
  //   console.log('Ended playing the audio');
  // });
  return {
    ...state,
    ttsAudio,
    ttsAudioState: 'Playing',
  };
}

function ttsSpeak(state: Ace.State, text: string) {
  const {ttsVoice} = state;
  if (!text || text.length === 0) {
    return state;
  }
  const data: Ace.TTSData = {
    text,
    lang: ttsVoice.lang,
    gender: state.ttsGender,
  };

  return [state, fxTTSPlayAudio(data)];
}

function ttsPausePlayToggleCurrent(state: Ace.State) {
  const {ttsAudio, ttsAudioState} = state;
  if (!ttsAudio || typeof ttsAudio.pause !== 'function') {
    return state;
  }

  if (ttsAudioState === 'Playing') {
    ttsAudio.pause();
  } else {
    ttsAudio.play();
  }

  return {
    ...state,
    ttsAudio,
    ttsAudioState: ttsAudioState === 'Paused' ? 'Playing' : 'Paused',
  };
}

function ttsStopCurrent(state: Ace.State) {
  const {ttsAudio} = state;

  if (ttsAudio && typeof ttsAudio.pause === 'function') {
    ttsAudio.pause();
  }

  return {
    ...state,
    ttsAudio,
    ttsAudioState: 'None',
  };
}

function ttsStopAll(state: Ace.State) {
  return {
    ...state,
    ttsHoverSpeak: false,
    ttsHightlightSpeak: false,
  };
}

function ttsStopHover(state: Ace.State) {
  return {
    ...state,
    ttsHoverSpeak: false,
  };
}

function ttsStopHightlight(state: Ace.State) {
  return {
    ...state,
    ttsHightlightSpeak: false,
  };
}

function ttsChangeVoice(state: Ace.State, key: number) {
  const {ttsVoices} = state;

  if (!ttsVoices || ttsVoices.length < 1) {
    return state;
  }

  return {
    ...state,
    ttsCurrentVoiceName: ttsVoices[key].name,
    ttsVoice: ttsVoices[key],
  };
}

function ttsChangeGender(state: Ace.State, key: number) {
  const {ttsGenders} = state;

  return {
    ...state,
    ttsGender: ttsGenders[key],
  };
}

export {
  ttsSpeak,
  ttsHandleHover,
  ttsPausePlayToggleCurrent,
  ttsHandleHighlight,
  ttsHoverToggle,
  ttsHightlightToggle,
  ttsChangeVoice,
  ttsStopAll,
  ttsStopHightlight,
  ttsStopHover,
  ttsStopCurrent,
  ttsHightlightEnable,
  ttsHoverEnable,
  ttsPlayAudio,
  ttsChangeGender,
};
