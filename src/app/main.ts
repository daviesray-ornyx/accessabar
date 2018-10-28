import { View } from 'hyperapp';
import { div } from '@hyperapp/html';
import logo from './components/logo';

const mainView: View<Accessabar.IState, Accessabar.IActions> = (state, actions) => div({ id: 'accessabar-container' }, [
    logo(),
]);

export default mainView;
