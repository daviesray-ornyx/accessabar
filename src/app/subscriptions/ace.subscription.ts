function subAce(state: Ace.State) {
  subAceStateSave(state);
  return [subAceGetDispatch()];
}

function subAceStateSave(state: Ace.State) {
  window.ace.saveState(state);
}

function subAceGetDispatch() {
  return [
    (dispatch, _) => {
      window.ace.setDispatch(dispatch);
      return () => {};
    },
    {},
  ];
}

export default subAce;
export {subAceGetDispatch};
