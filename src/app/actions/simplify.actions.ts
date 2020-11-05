function simplifyOpen(state: Ace.State) {
  return {
    ...state,
    simplifyHidden: false,
  };
}

function simplifyClose(state: Ace.State) {
  return {
    ...state,
    simplifyHidden: true,
  };
}

export {simplifyClose, simplifyOpen};
