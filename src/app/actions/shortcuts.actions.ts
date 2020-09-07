import fontConfig from '../../config/fonts.config.json5';
import {apiSendEvent} from './api.actions';
import {ttsStopCurrent} from './tts.actions';

import {fxTTSHighlight, fxTTSHover, fxTTSDelaySpeech} from '../fx/tts.fx';

import {
  fxFontFamilyChange,
  fxFontSizeIncrease,
  fxFontSizeDecrease,
  fxFontColorChange,
  fxFontLineSpacingInc,
  fxFontLineSpacingDec,
  fxFontLetterSpacingInc,
  fxFontLetterSpacingDec,
  fxMagShow,
  fxMaskShow,
  fxRulerShow,
  fxRulerSizeIncrease,
  fxRulerSizeDecrease,
  fxPinholeShow,
  fxPinholeColorChange,
  fxPinholeSizeIncrease,
  fxPinholeSizeDecrease,
  fxSREnable,
} from '../fx/shortcuts.fx';

function buildKeyCombination(state: Ace.State, eventData: KeyboardEvent) {
  if (!state.kbsReady) {
    return state;
  }

  if (eventData.type === 'keydown') {
    if (state.kbsCurrentCombination.split(',').length === 3) {
      return {
        ...state,
        kbsCurrentCombination: '',
        kbsCount: 0,
        kbsReady: true,
      };
    }

    if (
      state.kbsCurrentCombination.indexOf(eventData.key) !== -1 ||
      eventData.repeat
    ) {
      return state;
    }

    const keyToAdd = eventData.key === ',' ? '@' : eventData.key.toLowerCase();
    const newCombination =
      state.kbsCurrentCombination +
      (state.kbsCurrentCombination.length > 0 ? ',' : '') +
      keyToAdd;
    const newCount = state.kbsCount + 1;
    const newState = {
      ...state,
      kbsCurrentCombination: newCombination,
      kbsCount: newCount,
    };
    return newState;
  } else if (eventData.type === 'keyup') {
    const newCount = state.kbsCount <= 0 ? 0 : state.kbsCount - 1;

    if (newCount > 0) {
      return {
        ...state,
        kbsCount: newCount,
      };
    }

    let newState = {
      ...state,
      kbsCurrentCombination: '',
      kbsCount: 0,
      kbsReady: true,
    };
    switch (state.kbsCurrentCombination) {
      case 'alt,shift,p':
        ttsStopCurrent(newState);
        newState = {
          ...newState,
          ttsHoverSpeak: true,
          ttsHighlightSpeak: false,
        };
        apiSendEvent('AceTTSHover_On');
        return [newState, fxTTSHighlight(newState), fxTTSHover(newState)];
      case 'alt,shift,s':
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }

        newState = {
          ...newState,
          ttsHoverSpeak: false,
          ttsHighlightSpeak: false,
        };

        ttsStopCurrent(newState);
        return newState;
      case 'alt,shift,h':
        // first check if hover is enabled and disable
        ttsStopCurrent(newState);
        // Reading highlighted text
        // eslint-disable-next-line no-case-declarations
        const selection = window.getSelection();

        if (!selection) {
          return newState;
        }
        // eslint-disable-next-line no-case-declarations
        const currentText = selection.toString();
        return [newState, fxTTSDelaySpeech(newState, currentText)];
      case 'alt,i':
        // Increase font
        return [newState, fxFontSizeIncrease(newState)];
      case 'alt,shift,d':
        // Decrease font size
        return [newState, fxFontSizeDecrease(newState)];
      case 'alt,shift,>':
      case 'alt,shift,.':
        // Next font
        if (!newState.fontActive) {
          newState = {...newState, fontActive: true};
        }
        if (newState.fontCurrentKey.length <= 0) {
          // No font set yet. Set font to the first key
          newState = {...newState, fontCurrentKey: 'sylexiad_sans'};
          return [newState, fxFontFamilyChange(newState, 'sylexiad_sans')];
        }
        // eslint-disable-next-line no-case-declarations
        let currentFont = fontConfig[newState.fontCurrentKey];
        // eslint-disable-next-line no-case-declarations
        let nextFontKey = newState.fontCurrentKey;
        for (const key in fontConfig) {
          if (fontConfig[key]?.id > currentFont.id) {
            nextFontKey = key;
            break;
          }
        }

        newState = {...newState, fontCurrentKey: nextFontKey};
        return [newState, fxFontFamilyChange(newState, nextFontKey)];
      case 'alt,shift,<':
      case 'alt,shift,@':
        // Previous font
        if (!newState.fontActive) {
          newState = {...newState, fontActive: true};
        }
        if (newState.fontCurrentKey.length <= 0) {
          // No font set yet. Set font to the first key
          newState = {...newState, fontCurrentKey: 'sylexiad_sans'};
          return [newState, fxFontFamilyChange(newState, 'sylexiad_sans')];
        }
        currentFont = fontConfig[newState.fontCurrentKey];
        // eslint-disable-next-line no-case-declarations
        let prevFontKey = newState.fontCurrentKey;
        for (const key in fontConfig) {
          if (fontConfig[key]?.id === currentFont.id - 1) {
            prevFontKey = key;
            break;
          }
        }
        newState = {...newState, fontCurrentKey: prevFontKey};
        return [newState, fxFontFamilyChange(newState, prevFontKey)];
      case 'alt,c,1':
        return [newState, fxFontColorChange(newState, 'red')];
      case 'alt,c,2':
        return [newState, fxFontColorChange(newState, 'blue')];
      case 'alt,c,3':
        return [newState, fxFontColorChange(newState, 'green')];
      case 'alt,c,4':
        return [newState, fxFontColorChange(newState, 'yellow')];
      case 'alt,c,5':
        return [newState, fxFontColorChange(newState, 'orange')];
      case 'alt,c,6':
        return [newState, fxFontColorChange(newState, 'purple')];
      case 'alt,c,7':
        return [newState, fxFontColorChange(newState, 'black')];
      case 'alt,c,8':
        return [newState, fxFontColorChange(newState, 'grey')];
      case 'alt,c,9':
        return [newState, fxFontColorChange(newState, 'white')];
      case 'l,+':
      case 'l,=':
        if (!newState.fontLineSpacingActive) {
          newState = {...newState, fontLineSpacingActive: true};
        }
        return [newState, fxFontLineSpacingInc(newState)];
      case 'l,-':
      case 'l,_':
        if (!newState.fontLineSpacingActive) {
          newState = {...newState, fontLineSpacingActive: true};
        }
        return [newState, fxFontLineSpacingDec(newState)];
      case 'c,+':
      case 'c,=':
        if (!newState.fontLetterSpacingActive) {
          newState = {...newState, fontLetterSpacingActive: true};
        }
        return [newState, fxFontLetterSpacingInc(newState)];
      case 'c,-':
      case 'c,_':
        if (!newState.fontLetterSpacingActive) {
          newState = {...newState, fontLetterSpacingActive: true};
        }
        return [newState, fxFontLetterSpacingDec(newState)];
      case 'alt,m':
        return [newState, fxMagShow(newState)];
      case 'alt,o,1':
        if (!newState.maskActive) {
          newState = {...newState, maskActive: true};
        }
        return [newState, fxMaskShow(newState, 'red')];
      case 'alt,o,2':
        if (!newState.maskActive) {
          newState = {...newState, maskActive: true};
        }
        return [newState, fxMaskShow(newState, 'blue')];
      case 'alt,o,3':
        if (!newState.maskActive) {
          newState = {...newState, maskActive: true};
        }
        return [newState, fxMaskShow(newState, 'green')];
      case 'alt,o,4':
        if (!newState.maskActive) {
          newState = {...newState, maskActive: true};
        }
        return [newState, fxMaskShow(newState, 'yellow')];
      case 'alt,o,5':
        if (!newState.maskActive) {
          newState = {...newState, maskActive: true};
        }
        return [newState, fxMaskShow(newState, 'orange')];
      case 'alt,o,6':
        if (!newState.maskActive) {
          newState = {...newState, maskActive: true};
        }
        return [newState, fxMaskShow(newState, 'purple')];
      case 'alt,r':
        // open reading bar
        if (newState.rulerReadingActive) {
          return newState;
        }
        return [newState, fxRulerShow(newState)];
      case 'r,+':
      case 'r,=':
        if (!newState.rulerReadingActive) {
          return newState;
        }
        return [newState, fxRulerSizeIncrease(newState)];
      case 'r,-':
      case 'r,_':
        if (!newState.rulerReadingActive) {
          return newState;
        }
        return [newState, fxRulerSizeDecrease(newState)];
      case 'alt,shift,o':
        if (!newState.rulerReadingActive) {
          newState = {...newState, rulerReadingActive: true};
        }
        return [newState, fxPinholeShow(newState)];
      case 'alt,1':
        return [newState, fxPinholeColorChange(newState, 'red')];
      case 'alt,2':
        return [newState, fxPinholeColorChange(newState, 'blue')];
      case 'alt,3':
        return [newState, fxPinholeColorChange(newState, 'green')];
      case 'alt,4':
        return [newState, fxPinholeColorChange(newState, 'yellow')];
      case 'alt,5':
        return [newState, fxPinholeColorChange(newState, 'orange')];
      case 'alt,6':
        return [newState, fxPinholeColorChange(newState, 'purple')];
      case 'alt,7':
        return [newState, fxPinholeColorChange(newState, 'black')];
      case 'alt,8':
        return [newState, fxPinholeColorChange(newState, 'grey')];
      case 'alt,9':
        return [newState, fxPinholeColorChange(newState, 'white')];
      case 'o,+':
      case 'o,=':
        return [newState, fxPinholeSizeIncrease(newState)];
      case 'o,-':
      case 'o,_':
        return [newState, fxPinholeSizeDecrease(newState)];
      case 'alt,s':
        return [newState, fxSREnable(newState)];
      default:
        // if no match is found. Clear combination value
        return {
          ...state,
          kbsCurrentCombination: '',
          kbsCount: 0,
          kbsReady: true,
        };
    }
  }
}

export default buildKeyCombination;
