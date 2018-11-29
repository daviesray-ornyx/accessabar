import {
    div,
} from '@hyperapp/html';
import menu from './menu.component';

// Contains all the menus in Accessabar
const menuArea = (state, actions) => {
    return div({ class: 'menu-area' }, [
        menu(state, actions),
    ]);
};

export default menuArea;
export { menuArea };
