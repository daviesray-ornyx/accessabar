import {h} from 'hyperapp';
import menu from './menu.component';

// Contains all the menu and magnifier in Accessabar
const menuArea = (state, actions) => {
  return h(
    'ab-menu-area',
    {class: `ab-menu-area ${state.menusHidden && 'ab-hide'}`},
    [menu(state, actions)]
  );
};

export default menuArea;
export {menuArea};
