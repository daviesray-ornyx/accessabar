import { View, h } from 'hyperapp';
import buttonArea from './components/button_area.component';
import { hideButton } from './components/buttons.component';
import menuArea from './components/menu_area.component';
import ttsPrompt from './components/tts_prompt.component';
import funcArea from './components/function_area.component';
import settingsMenu from './components/settings.component';
import aboutMenu from './components/about.component';

const innerBar = (state, actions) => {
    return h('ab-inner-bar', { class: 'ab-bar ab-growable' }, [
        h('ab-logo', { class: 'ab-logo', 'aria-label': 'Accessabar logo' }, [
            h('ab-logo-img', { class: 'ab-logo-img', alt: 'Accessabar Logo' }),
        ]),
        h('ab-button-area-container', { class: 'ab-bar-container ab-growable' }, [
            buttonArea(state, actions),
        ]),
    ]);
};

const underBar = (state, actions) => {
    return h('ab-underbar', { class: 'ab-underbar' }, [
        h('ab-hide-button-container', { class: 'ab-hide-button-container ab-flex' }, [
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
    return h('ab-grid', { class: 'ab-bar-grid' }, [
        innerBar(state, actions),
        underBar(state, actions),
        funcArea(state, actions),
        menuArea(state, actions),
        settingsMenu(state, actions),
        aboutMenu(state, actions),
    ]);
};

export default mainView;
