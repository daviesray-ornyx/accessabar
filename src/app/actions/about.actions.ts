function aboutOpen(state: Ace.State) {
  return {
    ...state,
    aboutHidden: false,
  };
}

function aboutClose(state: Ace.State) {
  return {
    ...state,
    aboutHidden: true,
  };
}

export {aboutOpen, aboutClose};
