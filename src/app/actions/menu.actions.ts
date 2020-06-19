function spawnMenu(state: Ace.State, opts) {
  const {menus} = state;

  if (Object.keys(menus).indexOf(opts.name) === -1) {
    return state;
  }

  return {
    ...state,
    menus: {
      ...menus,
      ...menuFactory(opts.name, opts.title),
    },
  };
}

function menuFactory(name: string, title: string) {
  if (!window.ace.mainElement) {
    return {};
  }

  const bar = window.ace.mainElement.querySelector('.ab-bar');

  if (!bar) {
    return {};
  }

  return {
    [name]: {
      menuActive: true,
      menuPosX: 50,
      menuPosY: bar.getBoundingClientRect().height,
      menuTitle: title,
    },
  };
}

function menuMove(state: Ace.State, name: string) {
  const {menus, menusMouseY, menusMouseX, menusCanDrag} = state;
  const menuOpts = menus[name];

  if (!menuOpts || !window.ace.mainElement) {
    return state;
  }

  const {menuPosX, menuPosY} = menuOpts;
  const menu = window.ace.mainElement.querySelector('#ab-menu');

  if (
    !menusCanDrag ||
    !menu ||
    typeof menuPosX === 'boolean' ||
    typeof menuPosY === 'boolean'
  ) {
    return state;
  }

  const rect = menu.getBoundingClientRect();
  const windowWidth = window.innerWidth - rect.width;
  const windowHeight = window.innerHeight - rect.height;
  let x = menusMouseX - menuPosX;
  let y = menusMouseY - menuPosY;

  if (x < 0) {
    x = 0;
  }

  if (x > windowWidth) {
    x = windowWidth;
  }

  if (y < 0) {
    y = 0;
  }

  if (y > windowHeight) {
    y = windowHeight;
  }

  return {
    ...state,
    menus: {
      ...menus,
      [name]: {
        ...menuOpts,
        menuPosX: x,
        menuPosY: y,
      },
    },
  };
}

function menuUpdatePosition(state: Ace.State, opts) {
  const rect = opts.el.getBoundingClientRect();

  return {
    ...state,
    menus: {
      ...state.menus,
      [opts.name]: {
        ...state.menus[opts.name],
        menuPosX: rect.left,
        menuPosY: rect.top,
      },
    },
  };
}

function menuStartDrag(state: Ace.State, name: string) {
  return {...state, menusCanDrag: true, menuDragActive: name};
}

function menuOpen(state: Ace.State, opts: {name: string; title: string}) {
  const {menus} = state;
  const {name, title} = opts;

  return [
    state,
    Object.keys(menus).indexOf(name) !== -1
      ? [
          (dispatch, props) => dispatch(props.action, props.name),
          {
            action: menuClose,
            name,
          },
        ]
      : [
          (dispatch, props) => dispatch(props.action, props.opts),
          {
            action: spawnMenu,
            opts: {
              name,
              title,
            },
          },
        ],
  ];
}

function menuClose(state: Ace.State, name: string) {
  const {menus} = state;
  const menusCopy = menus;

  delete menusCopy[name];

  return {
    ...state,
    menus: menusCopy,
  };
}

function menuTextOpsSwitchInner(state: Ace.State, current: string) {
  return {
    ...state,
    textOpsInnerMenuCurrent: current,
  };
}

function menuRulerOpsSwitchInner(state: Ace.State, current: string) {
  return {
    ...state,
    rulerOpsInnerMenuCurrent: current,
  };
}

export {
  menuMove,
  menuClose,
  menuOpen,
  menuRulerOpsSwitchInner,
  menuStartDrag,
  menuTextOpsSwitchInner,
  menuUpdatePosition,
};
