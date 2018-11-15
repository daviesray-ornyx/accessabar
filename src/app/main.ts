import { View } from 'hyperapp';
import { div } from '@hyperapp/html';
import buttonArea from './components/button_area.component';
import { hideButton } from './components/buttons.component';
import menuArea from './components/menu_area.component';

/**
 * Main container for all Accessabar elements
 *
 * @param {*} state
 * @param {*} actions
 */
const mainView: View<Accessabar.IState, Accessabar.IActions> = (state, actions) => div({ class: 'accessabar-container growable' }, [
    hideButton(state, actions),
    buttonArea(state, actions),
    menuArea(state, actions),
]);

export default mainView;
