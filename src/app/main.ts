import { View } from 'hyperapp';
import { div } from '@hyperapp/html';
import buttonArea from './components/button_area';
import { hideButton } from './components/buttons';

/**
 * Main container for all Accessabar elements
 *
 * @param {*} state
 * @param {*} actions
 */
const mainView: View<Accessabar.IState, Accessabar.IActions> = (state, actions) => div({ id: 'accessabar-container' }, [
    hideButton(state, actions),
    buttonArea(),
]);

export default mainView;
