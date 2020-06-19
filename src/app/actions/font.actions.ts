import config from '../../config/functions.config.json5';
import fontConfig from '../../config/fonts.config.json5';
import {apiSendEvent} from './api.actions';
import {acePruneFuncs} from './ace.actions';
import {editLoop, editLoopComputed, getParents} from './ace.actions';

/**
 * Fetches and returns parents of text nodes in the document
 */

function fontDecSize(state: Ace.State) {
  const {fontSizing}: {fontSizing: Ace.FuncConfig} = config;

  editLoopComputed(fontSizing, 'fontSize', -1);

  return {
    ...state,
    fontSizingActive: true,
  };
}

function fontSizingDisable(state: Ace.State) {
  return {
    ...state,
    fontSizingActive: false,
  };
}

function fontIncSize(state: Ace.State) {
  const {fontSizing}: {fontSizing: Ace.FuncConfig} = config;

  editLoopComputed(fontSizing, 'fontSize', 1);

  return {
    ...state,
    fontSizingActive: true,
  };
}

function fontFamilyToggle(state: Ace.State) {
  const {fontActive} = state;

  return {
    ...state,
    fontActive: !fontActive,
  };
}

function fontFamilyReset() {
  fontReset('fontFamily');
}

function fontChangeFamilyAll(state: Ace.State, key?: string) {
  const {fontCurrentKey} = state;
  const currentKey: string = key || fontCurrentKey;

  if (currentKey.length <= 0) {
    return state;
  }

  const currentFontFamily = fontConfig[currentKey]?.family;
  const {fontFamily}: {fontFamily: Ace.FuncConfig} = config;

  editLoop(fontFamily, 'fontFamily', currentFontFamily);

  return state;
}

function fontColourChangeSingle(state: Ace.State, colour: string) {
  const {fontColourActive} = state;
  return [
    {
      ...state,
      fontColourCurrent: colour,
      fontCustomActive: false,
    },
    fontColourActive && [
      (dispatch, props) => dispatch(props.action, props.colour),
      {
        colour,
        action: fontColourChange,
      },
    ],
  ];
}

function fontColourChangeCustom(state: Ace.State, colour: string) {
  return [
    {
      ...state,
      fontColourCurrent: colour,
      fontColourCustomCurrent: colour,
      fontCustomActive: true,
    },
    state.fontColourActive && [
      (dispatch, props) => dispatch(props.action, props.colour),
      {
        colour,
        action: fontColourChange,
      },
    ],
  ];
}

function fontColourChange(state: Ace.State, colour?: string) {
  const {fontColourCurrent} = state;
  const currentColour: string = colour || fontColourCurrent;

  if (currentColour.length <= 0) {
    return state;
  }

  const {fontColour}: {fontColour: Ace.FuncConfig} = config;

  editLoop(fontColour, 'color', currentColour);

  return state;
}

function fontColourToggle(state: Ace.State) {
  return {
    ...state,
    fontColourActive: !state.fontColourActive,
  };
}

function fontColourReset() {
  fontReset('fontColour');
}

function fontReset(configKey: string) {
  const parentElements = getParents();
  const configObj: Ace.FuncConfig = config[configKey];

  for (const el of parentElements) {
    const abarEdited = el.getAttribute('accessabar-edited');

    if (!abarEdited) {
      continue;
    }

    const orig = el.getAttribute(configObj.attrNames.orig);

    if (!orig) {
      continue;
    }

    if (orig === 'none') {
      el.style.setProperty(configObj.editName, null);
    } else {
      el.style.setProperty(configObj.editName, orig);
    }

    acePruneFuncs(el, abarEdited, configObj);
    el.removeAttribute(configObj.attrNames.orig);

    if (configObj.attrNames.origComputed) {
      el.removeAttribute(configObj.attrNames.origComputed);
    }
  }
}

function fontLineSpacingToggle(state: Ace.State) {
  return {
    ...state,
    fontLineSpacingActive: !state.fontLineSpacingActive,
  };
}

function fontLineSpacingIncrement(state: Ace.State) {
  const {fontLineSpacingCount, fontLineSpacingStep, fontLineSpacingMax} = state;
  const nextCount = fontLineSpacingCount + fontLineSpacingStep;

  if (Math.abs(nextCount) > fontLineSpacingMax) {
    return state;
  }

  return [
    {
      ...state,
      fontLineSpacingCount: nextCount,
    },
    [
      (dispatch, props) => dispatch(props.action, props.count),
      {
        action: fontLineSpacingChange,
        count: nextCount,
      },
    ],
  ];
}

function fontLineSpacingDecrement(state: Ace.State) {
  const {fontLineSpacingCount, fontLineSpacingStep, fontLineSpacingMax} = state;
  const nextCount = fontLineSpacingCount - fontLineSpacingStep;

  if (Math.abs(nextCount) > fontLineSpacingMax) {
    return state;
  }

  return [
    {
      ...state,
      fontLineSpacingCount: nextCount,
    },
    [
      (dispatch, props) => dispatch(props.action, props.count),
      {
        action: fontLineSpacingChange,
        count: nextCount,
      },
    ],
  ];
}

function fontLineSpacingChange(state: Ace.State, count?: number) {
  const {fontLineSpacingCount, fontLineSpacingStep} = state;
  const currentCount = count || fontLineSpacingCount;

  const {fontLineSpacing}: {fontLineSpacing: Ace.FuncConfig} = config;

  editLoopComputed(
    fontLineSpacing,
    'lineHeight',
    currentCount,
    fontLineSpacingStep
  );
}

function fontLineSpacingReset() {
  fontReset('fontLineSpacing');
}

function fontLetterSpacingEnable(state: Ace.State) {
  return {
    ...state,
    fontLetterSpacingActive: !state.fontLetterSpacingActive,
  };
}

function fontLetterSpacingIncrement(state: Ace.State) {
  const {
    fontLetterSpacingStep,
    fontLetterSpacingCount,
    fontLetterSpacingMax,
  } = state;
  const nextCount = fontLetterSpacingCount + fontLetterSpacingStep;

  if (Math.abs(nextCount) > fontLetterSpacingMax) {
    return state;
  }

  return [
    {
      ...state,
      fontLetterSpacingCount: nextCount,
    },
    [
      (dispatch, props) => dispatch(props.action, props.count),
      {
        action: fontLetterSpacingChange,
        count: nextCount,
      },
    ],
  ];
}

function fontLetterSpacingDecrement(state: Ace.State) {
  const {
    fontLetterSpacingCount,
    fontLetterSpacingStep,
    fontLetterSpacingMax,
  } = state;
  const nextCount = fontLetterSpacingCount - fontLetterSpacingStep;

  if (Math.abs(nextCount) > fontLetterSpacingMax) {
    return state;
  }

  return [
    {
      ...state,
      fontLetterSpacingCount: nextCount,
    },
    [
      (dispatch, props) => dispatch(props.action, props.count),
      {
        action: fontLetterSpacingChange,
        count: nextCount,
      },
    ],
  ];
}

function fontLetterSpacingChange(state: Ace.State, count: number) {
  const {fontLetterSpacingCount, fontLetterSpacingStep} = state;
  const currentCount = count || fontLetterSpacingCount;

  const {fontLetterSpacing}: {fontLetterSpacing: Ace.FuncConfig} = config;

  editLoopComputed(
    fontLetterSpacing,
    'letterSpacing',
    currentCount,
    fontLetterSpacingStep
  );
}

function fontLetterSpacingReset() {
  fontReset('fontLetterSpacing');
}

export {
  fontDecSize,
  fontIncSize,
  fontSizingDisable,
  fontColourToggle,
  fontColourChange,
  fontColourChangeSingle,
  fontColourChangeCustom,
  fontColourReset,
  fontChangeFamilyAll,
  fontFamilyReset,
  fontFamilyToggle,
  fontLetterSpacingChange,
  fontLetterSpacingDecrement,
  fontLetterSpacingEnable,
  fontLetterSpacingIncrement,
  fontLetterSpacingReset,
  fontLineSpacingIncrement,
  fontLineSpacingChange,
  fontLineSpacingDecrement,
  fontLineSpacingReset,
  fontLineSpacingToggle,
  fontReset,
};
