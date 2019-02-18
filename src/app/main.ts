import { View } from 'hyperapp';
import { div } from '@hyperapp/html';
import buttonArea from './components/button_area.component';
import { hideButton } from './components/buttons.component';
import menuArea from './components/menu_area.component';
import ttsPrompt from './components/tts_prompt.component';

const innerBar = (state, actions) => {
    return div({ class: 'ab-bar ab-growable' }, [
        div({ class: 'ab-bar-container ab-growable' }, [
            buttonArea(state, actions),
        ]),
    ]);
};

const underBar = (state, actions) => {
    return div({ class: 'ab-underbar' }, [
        div({ class: 'ab-hide-button-container ab-flex' }, [
            hideButton(state, actions),
        ]),
        ttsPrompt(state),
    ]);
};

/**
 * Main container for all Accessabar elements
 *
 * @param {*} state
 * @param {*} actions
 */
const mainView: View<Accessabar.IState, Accessabar.IActions> = (state, actions) => {
    return div({ class: 'ab-bar-grid' }, [
        innerBar(state, actions),
        underBar(state, actions),
        menuArea(state, actions),
    ]);
};

export default mainView;
