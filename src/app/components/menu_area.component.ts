import {
    div,
} from '@hyperapp/html';
import * as Menus from './menus.component';

// Contains all the menus in Accessabar
const menuArea = (state, actions) => {
    return div(
        {
            class: 'menu-area',
        },
        [
            Menus.ttsMenu(state),
        ],
    );
};

export default menuArea;
export { menuArea };
