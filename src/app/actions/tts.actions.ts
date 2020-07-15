import BigNumber from 'bignumber.js';
import {apiSendEvent} from './api.actions';
import {
  fxTTSDelaySpeech,
  fxTTSHighlight,
  fxTTSHover,
  fxTTSInit,
  fxTTSPrompt,
} from '../fx/tts.fx';

function ttsHandleHover(state: Ace.State, event: MouseEvent) {
  const {ttsHoverTimeout} = state;
  const {target} = event;
  const selection = window.getSelection();

  if (!target || !selection) {
    return state;
  }

  selection.removeAllRanges();
  selection.selectAllChildren(target as Node);

  const currentText = selection.toString();

  if (ttsHoverTimeout && typeof ttsHoverTimeout !== 'boolean') {
    clearTimeout(ttsHoverTimeout);
  }

  return [state, fxTTSDelaySpeech(state, currentText)];
}

function ttsHandleHighlight(state: Ace.State) {
  const selection = window.getSelection();

  if (!selection) {
    return state;
  }

  const currentText = selection.toString();

  return [state, fxTTSDelaySpeech(state, currentText)];
}

function ttsHandlePrompt(state: Ace.State, event: SpeechSynthesisEvent) {
  const {
    ttsVoiceActive,
    // ttsCurrentUtterText
    ttsCurrentUtterWordIndex,
    ttsCurrentUtterCharIndex,
  } = state;

  switch (event.type) {
    case 'start':
      const words = event.utterance.text.split(/\s/);
      const sentencesArr = Array(Math.ceil(words.length / 5)).fill('');
      const sentenceChunks = sentencesArr.map((_, i) =>
        words.slice(i * 5, i * 5 + 5)
      );

      // console.log('Chunks:', sentenceChunks);

      return {
        ...state,
        ttsCurrentUtterCharIndex: event.charIndex,
        ttsCurrentUtterSentences: sentenceChunks,
        ttsCurrentUtterText: event.utterance.text,
        ttsCurrentUtterWords: words,
        ttsVoiceActive: true,
      };
    case 'boundary':
      if (!ttsVoiceActive) {
        return state;
      }

      if (event.name !== 'word') {
        return state;
      }

      // const { charIndex } = event;
      // const sentence = ttsCurrentUtterText.substring(charIndex);
      // // Match everything before fullstop, comma, speech mark, close bracket and whitespace
      // const re = /([^\.,"\)\s]+)/;
      // const wordArr = re.exec(sentence);
      // const length = (wordArr || [''])[0].length;

      let wordIndex = ttsCurrentUtterWordIndex;

      if (
        event.charIndex !== ttsCurrentUtterCharIndex &&
        event.charIndex !== 0
      ) {
        wordIndex++;
      }

      const sentenceIndex = Math.floor(wordIndex / 5);
      const sentenceWordIndex = wordIndex % 5;

      return {
        ...state,
        ttsCurrentUtterCharIndex: event.charIndex,
        ttsCurrentUtterSentenceIndex: sentenceIndex,
        ttsCurrentUtterSentenceWordIndex: sentenceWordIndex,
        ttsCurrentUtterWordIndex: wordIndex,
      };
    case 'end':
      return {
        ...state,
        ttsCurrentUtterCharIndex: 0,
        ttsCurrentUtterSentences: [],
        ttsCurrentUtterText: '',
        ttsCurrentUtterWordIndex: 0,
        ttsCurrentUtterWords: [],
        ttsVoiceActive: false,
      };
    default:
      return state;
  }
}

function ttsHoverToggle(state: Ace.State) {
  ttsStopCurrent(state);

  if (!state.ttsHoverSpeak) {
    apiSendEvent('AceTTSHover_On');
  }

  const newState = {
    ...state,
    ttsHoverSpeak: !state.ttsHoverSpeak,
    ttsHighlightSpeak: false,
  };

  return [newState, fxTTSHighlight(newState), fxTTSHover(newState)];
}

function ttsHightlightToggle(state: Ace.State) {
  ttsStopCurrent(state);

  if (!state.ttsHighlightSpeak) {
    apiSendEvent('AceTTSHighlight_On');
  }

  const newState = {
    ...state,
    ttsHighlightSpeak: !state.ttsHighlightSpeak,
    ttsHoverSpeak: false,
  };

  return [newState, fxTTSHover(newState), fxTTSHighlight(newState)];
}

function ttsSpeak(state: Ace.State, text: string) {
  const {ttsPitch, ttsRate, ttsVolume, ttsLang, ttsVoices, ttsVoice} = state;
  if (ttsVoices.length === 0) {
    return state;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
  }

  utterance.pitch = new BigNumber(ttsPitch).toNumber();
  utterance.rate = new BigNumber(ttsRate).toNumber();
  utterance.volume = new BigNumber(ttsVolume).toNumber();
  utterance.lang = ttsLang;

  if (ttsVoice) {
    utterance.voice = ttsVoice;
  }

  // console.log(utterance);

  window.speechSynthesis.speak(utterance);
  return [state, fxTTSPrompt(state, utterance)];
}

function ttsStopCurrent(state: Ace.State) {
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
    return state;
  }

  return state;
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

function ttsInit(state: Ace.State) {
  return [
    {
      ...state,
      ttsInitiated: true,
    },
    fxTTSInit(state),
  ];
}

function ttsChangeVoice(state: Ace.State, key: number) {
  const {ttsVoices} = state;

  if (!ttsVoices || ttsVoices.length < 1) {
    return state;
  }

  console.log(ttsVoices[key].name);

  return {
    ...state,
    ttsCurrentVoiceName: ttsVoices[key].name,
    ttsVoice: ttsVoices[key],
  };
}

function ttsChangeVolume(state: Ace.State, volume: string) {
  return {
    ...state,
    ttsVolume: volume,
  };
}

function ttsChangeRate(state: Ace.State, rate: string) {
  return {
    ...state,
    ttsRate: rate,
  };
}

function ttsChangePitch(state: Ace.State, pitch: string) {
  return {
    ...state,
    ttsPitch: pitch,
  };
}

export {
  ttsInit,
  ttsSpeak,
  ttsHandleHover,
  ttsHandleHighlight,
  ttsHandlePrompt,
  ttsHoverToggle,
  ttsHightlightToggle,
  ttsChangePitch,
  ttsChangeRate,
  ttsChangeVoice,
  ttsChangeVolume,
  ttsStopAll,
  ttsStopHightlight,
  ttsStopHover,
  ttsStopCurrent,
};
