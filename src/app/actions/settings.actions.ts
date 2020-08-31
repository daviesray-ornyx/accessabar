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
    ...state,
    ttsVoiceListActive: !state.ttsVoiceListActive,
  };
}

function settingsToggleSRLangList(state: Ace.State) {
  return {
    ...state,
    srLangListActive: !state.srLangListActive,
  };
}

function settingsChangeTheme(state: Ace.State, themeName: string) {
  return {
    ...state,
    aceTheme: themeName,
  };
}

export {
  settingsOpen,
  settingsClose,
  settingsToggleSRLangList,
  settingsToggleTTSList,
  settingsChangeTheme,
};
