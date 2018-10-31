import { View } from 'hyperapp';
import { div } from '@hyperapp/html';
import buttonArea from './components/button_area';
import { hideButton } from './components/buttons';

const mainView: View<Accessabar.IState, Accessabar.IActions> = (state, actions) => div({ id: 'accessabar-container' }, [
    hideButton(state, actions),
    buttonArea(),
]);

export default mainView;
