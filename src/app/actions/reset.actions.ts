import aceState from '../state/ace.state';

function resetState(state) {
  const resetStateObj = {
    fontActive: aceState.fontActive,
    fontColourActive: aceState.fontColourActive,
    fontColourCurrent: aceState.fontColourCurrent,
    fontColourCustomCurrent: aceState.fontColourCustomCurrent,
    fontLetterSpacingActive: aceState.fontLetterSpacingActive,
    fontLetterSpacingCount: aceState.fontLetterSpacingCount,
    fontLineSpacingActive: aceState.fontLineSpacingActive,
    fontLineSpacingCount: aceState.fontLineSpacingCount,

    magActive: aceState.magActive,
    magScale: aceState.magScale,

    maskColourCurrent: aceState.maskColourCurrent,
    maskColourCustomCurrent: aceState.maskColourCustomCurrent,
    maskOpacity: aceState.maskOpacity,

    menuMouseX: aceState.menuMouseX,
    menuMouseY: aceState.menuMouseY,
    // Reset to default position
    menuPosX: 50,
    menuPosY: window.ace.mainElement?.getBoundingClientRect().height,

    rulerPinholeCentreHeight: aceState.rulerPinholeCentreHeight,
    rulerPinholeOpacity: aceState.rulerPinholeOpacity,
    rulerReadingOpacity: aceState.rulerReadingOpacity,

    ttsHighlightSpeak: aceState.ttsHighlightSpeak,
    ttsHoverSpeak: aceState.ttsHoverSpeak,

    selectFontListActive: aceState.selectFontListActive,
  };

  return {...state, ...resetStateObj};
}

function resetFunctions() {
  for (const func of window.ace.appliedFunctions.values()) {
    func();
  }

  window.ace.appliedFunctions.clear();
}

function resetAll(state) {
  resetFunctions();
  return resetState(state);
}

export default resetAll;
