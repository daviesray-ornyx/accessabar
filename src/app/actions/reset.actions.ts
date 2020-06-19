import aceState from '../state/ace.state';

function resetState(state: Ace.State) {
  const resetStateObj = {
    aceHidden: state.aceHidden,
    // Reset to default position
    menuPosX: 50,
    menuPosY: window.ace.mainElement?.getBoundingClientRect().height,
  };

  return {...aceState, ...resetStateObj};
}

function resetAll(state: Ace.State) {
  return resetState(state);
}

export default resetAll;
