import {h} from 'hyperapp';
import menu from './menu.component';
import {addShortcutKeysListener} from '../actions/shortcuts.actions';

// Add shortcut keys listener to menu

// Contains all the menu and magnifier in Ace
const menuArea = (state: Ace.State) => {
  const menus: unknown[] = [];
  const menuKeys =
    state.menus === undefined ? Object.keys({}) : Object.keys(state.menus);

  if (menuKeys.length > 0) {
    for (const key of menuKeys) {
      menus.push(menu(state, key));
    }
  }

  return h(
    'ab-menu-area',
    {
      class: `ab-menu-area ${state.menusHidden && 'ab-hide'}`,
      onload: addShortcutKeysListener(state),
    },
    menus
  );
};

export default menuArea;
export {menuArea};
