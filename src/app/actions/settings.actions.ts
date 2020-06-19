function settingsOpen(state: Ace.State) {
  return {
    ...state,
    settingsHidden: false,
  };
}

function settingsClose(state: Ace.State) {
  return {
    ...state,
    settingsHidden: true,
  };
}

function settingsToggleTTSList(state: Ace.State) {
  return {
    ttsVoiceListActive: !state.ttsVoiceListActive,
  };
}

function settingsToggleSRLangList(state: Ace.State) {
  return {
    srLangListActive: !state.srLangListActive,
  };
}

export {
  settingsOpen,
  settingsClose,
  settingsToggleSRLangList,
  settingsToggleTTSList,
};
