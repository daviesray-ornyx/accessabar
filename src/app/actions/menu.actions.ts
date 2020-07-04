import {
  fxMenuDefaultFunction,
  fxMenuDragEvents,
  fxMenuOpen,
} from '../fx/menu.fx';

function menuSpawn(state: Ace.State, opts) {
  const {menus} = state;

  return {
    ...state,
    menus: {
      ...menus,
      ...menuFactory(opts.menuName, opts.title),
    },
  };
}

function menuFactory(
  name: string,
  title: string
): {[x: string]: Ace.StateMenu} {
  if (!window.ace.mainElement) {
    return {};
  }

  const bar = window.ace.mainElement.querySelector('ab-inner-bar');

  if (!bar) {
    return {};
  }

  return {
    [name]: {
      menuActive: true,
      menuPosX: 0,
      menuPosY: bar.getBoundingClientRect().height,
      menuInitialX: 0,
      menuInitialY: 0,
      menuOffsetX: 0,
      menuOffsetY: bar.getBoundingClientRect().height,
      menuTitle: title,
    },
  };
}

function menuMove(state: Ace.State) {
  if (!window.ace.mainElement) {
    return state;
  }

  const {menusDragActive, menus, dragMouseX, dragMouseY} = state;
  const {menuInitialX, menuInitialY} = menus[menusDragActive];
  const menu = window.ace.mainElement.querySelector(
    `#ab-menu-${menusDragActive}`
  );

  if (!menu) {
    return state;
  }

  const rect = menu.getBoundingClientRect();
  const windowWidth = window.innerWidth - rect.width;
  const windowHeight = window.innerHeight - rect.height;
  let x = dragMouseX - menuInitialX;
  let y = dragMouseY - menuInitialY;

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
      [menusDragActive]: {
        ...menus[menusDragActive],
        menuPosX: x,
        menuPosY: y,
        menuOffsetX: x,
        menuOffsetY: y,
      },
    },
  };
}

function menuStartDrag(
  state: Ace.State,
  opts: {ev: Ace.DragEvent; menuName: string}
) {
  opts.ev.preventDefault();
  const {menuOffsetX, menuOffsetY} = state.menus[opts.menuName];
  const ev = opts.ev.touches ? opts.ev.touches[0] : opts.ev;
  const {clientX, clientY} = ev;
  const newState = {
    ...state,
    menusCanDrag: true,
    menusDragActive: opts.menuName,
    menus: {
      ...state.menus,
      [opts.menuName]: {
        ...state.menus[opts.menuName],
        menuInitialX: clientX - menuOffsetX,
        menuInitialY: clientY - menuOffsetY,
      },
    },
  };

  return [newState, fxMenuDragEvents(newState)];
}

function menuEndDrag(state: Ace.State) {
  const newState = {
    ...state,
    menusCanDrag: false,
    menusDragActive: '',
  };

  return [newState, fxMenuDragEvents(newState)];
}

function menuOpen(
  state: Ace.State,
  opts: {
    menuName: string;
    title: string;
    defaultFunc?: (state: Ace.State) => unknown;
  }
) {
  const {menuName, title, defaultFunc} = opts;

  return [
    state,
    [
      fxMenuOpen(state, menuName, title),
      defaultFunc && fxMenuDefaultFunction(state, defaultFunc),
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
  menuEndDrag,
  menuSpawn,
};
