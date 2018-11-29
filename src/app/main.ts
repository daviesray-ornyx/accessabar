import { View } from 'hyperapp';
import { div } from '@hyperapp/html';
import buttonArea from './components/button_area.component';
import { hideButton } from './components/buttons.component';
import menuArea from './components/menu_area.component';

const innerBar = (state, actions) => {
    return div({ class: 'bar growable' }, [
        div({ class: 'bar-container growable' }, [
            buttonArea(state, actions),
        ]),
    ]);
};

const underBar = (state, actions) => {
    return div({ class: 'underbar growable' }, [
        hideButton(state, actions),
    ]);
};

/**
 * Main container for all Accessabar elements
 *
 * @param {*} state
 * @param {*} actions
 */
const mainView: View<Accessabar.IState, Accessabar.IActions> = (state, actions) => {
    return div({ class: 'bar-grid' }, [
        innerBar(state, actions),
        underBar(state, actions),
        menuArea(state, actions),
    ]);
};

export default mainView;
