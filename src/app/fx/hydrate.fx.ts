import {aceHide} from '../actions/ace.actions';
import {fxTTSHighlight, fxTTSHover} from './tts.fx';
import {fontHydrateSize} from '../actions/font.actions';
import {
  fxFontColourToggle,
  fxFontFamilyToggle,
  fxFontLineSpacingToggle,
  fxFontLetterSpacingToggle,
} from './font.fx';
import {magAddPageContent, magScroll} from '../actions/mag.actions';
import {fxMagScrollEvents} from './mag.fx';
import {fxRulerPinholeEvents, fxRulerReadingEvents} from './ruler.fx';
import {fxSREnable} from './sr.fx';
import {languageChangeAll} from '../actions/language.actions';

const stateFuncs: {key: string; func: unknown}[] = [
  {
    key: 'ttsHoverSpeak',
    func: state => [state, fxTTSHover(state)],
  },
  {
    key: 'ttsHighlightSpeak',
    func: state => [state, fxTTSHighlight(state)],
  },
  {key: 'fontSizingActive', func: fontHydrateSize},
  {key: 'fontActive', func: state => [state, fxFontFamilyToggle(state)]},
  {key: 'fontColourActive', func: state => [state, fxFontColourToggle(state)]},
  {
    key: 'fontLineSpacingActive',
    func: state => [state, fxFontLineSpacingToggle(state)],
  },
  {
    key: 'fontLetterSpacingActive',
    func: state => [state, fxFontLetterSpacingToggle(state)],
  },
  {key: 'magActive', func: magAddPageContent},
  {key: 'magActive', func: state => [state, fxMagScrollEvents(state)]},
  {
    key: 'magActive',
    func: state => {
      const scrollFunc = dispatch => dispatch(magScroll);

      return [
        state,
        [
          (dispatch, props) => {
            window.addEventListener('load', props.action.bind(null, dispatch));
          },
          {
            action: scrollFunc,
          },
        ],
      ];
    },
  },
  {
    key: 'rulerReadingActive',
    func: state => [state, fxRulerReadingEvents(state)],
  },
  {
    key: 'rulerPinholeActive',
    func: state => [state, fxRulerPinholeEvents(state)],
  },
  {
    key: 'srActive',
    func: state => [state, fxSREnable(state)],
  },
  {
    key: 'languageActive',
    func: state => [
      state,
      [
        (dispatch, props) => {
          window.addEventListener('load', () => dispatch(props.action));
        },
        {
          action: languageChangeAll,
        },
      ],
    ],
  },
  {key: 'aceHidden', func: aceHide},
];

function hydrateFromState(state: Ace.State, dispatch) {
  const promiseFunc: Promise<never>[] = [];
  for (const obj of stateFuncs) {
    if (state[obj.key]) {
      promiseFunc.push(
        new Promise<never>(resolve => {
          dispatch(obj.func);
          resolve();
        })
      );
    }
  }

  Promise.all(promiseFunc);
}

function fxHydrate(state: Ace.State) {
  return [
    (dispatch, props) => {
      if (window.ace.loaded) {
        props.action(state, dispatch);
        return () => {};
      }

      window.addEventListener('aceLoad', () => props.action(state, dispatch));
      return () => {};
    },
    {
      action: hydrateFromState,
    },
  ];
}

export {fxHydrate};
