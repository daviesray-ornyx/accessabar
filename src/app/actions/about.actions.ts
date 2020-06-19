function aboutOpen(state: Ace.State) {
  return {
    ...state,
    aboutHidden: true,
  };
}

function aboutClose(state: Ace.State) {
  return {
    ...state,
    aboutHidden: true,
  };
}

export {aboutOpen, aboutClose};
