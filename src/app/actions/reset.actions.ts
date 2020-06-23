import aceState from '../state/ace.state';
import {fontReset} from './font.actions';

function resetState(state: Ace.State) {
  const resetStateObj = {
    aceHidden: state.aceHidden,
    menus: state.menus,
  };

  return {...aceState, ...resetStateObj};
}

function resetFunctions(state: Ace.State) {
  state.fontSizingActive && fontReset(state, 'fontSizing');
  state.fontActive && fontReset(state, 'fontFamily');
  state.fontColourActive && fontReset(state, 'fontColour');
  state.fontLineSpacingActive && fontReset(state, 'fontLineSpacing');
  state.fontLetterSpacingActive && fontReset(state, 'fontLetterSpacing');
}

function resetAll(state: Ace.State) {
  resetFunctions(state);
  return resetState(state);
}

export default resetAll;
