import { View } from 'hyperapp';
import { div } from '@hyperapp/html';
import buttonArea from './components/button_area';

const mainView: View<Accessabar.IState, Accessabar.IActions> = (state, actions) => div({ id: 'accessabar-container' }, [
    buttonArea(),
]);

export default mainView;
