import {
    div,
} from '@hyperapp/html';
import menu from './menu.component';
import mag from './mag.component';

// Contains all the menu and magnifier in Accessabar
const menuArea = (state, actions) => {
    return div({ class: 'ab-menu-area' }, [
        menu(state, actions),
        mag(state, actions),
    ]);
};

export default menuArea;
export { menuArea };
