import {h} from 'hyperapp';
import buttonArea from './components/button_area.component';
import {hideButton} from './components/buttons.component';
import menuArea from './components/menu_area.component';
import ttsPrompt from './components/tts_prompt.component';
import funcArea from './components/function_area.component';
import settingsMenu from './components/settings.component';
import aboutMenu from './components/about.component';
import {switchEl} from './components/menus.component';
import {aceSpeakTooltipsToggle} from './actions/ace.actions';

const innerBarSettings = state => {
  return [
    h(
      'ab-inner-bar-settings',
      {class: 'ab-inner-bar-settings'},
      switchEl(
        state.aceSpeakTooltips,
        aceSpeakTooltipsToggle,
        'Speak Tooltips',
        'Read tooltips aloud on hover'
      )
    ),
  ];
};

const innerBar = state => {
  return h('ab-inner-bar', {class: 'ab-bar ab-growable'}, [
    h('ab-logo', {class: 'ab-logo', 'aria-label': 'Ace logo'}, [
      h('ab-logo-img', {class: 'ab-logo-img', alt: 'Ace Logo'}),
    ]),
    h(
      'ab-button-area-container',
      {class: 'ab-button-area-container ab-bar-container ab-growable'},
      [buttonArea(state)]
    ),
    innerBarSettings(state),
  ]);
};

const underBar = state => {
  return h('ab-underbar', {class: 'ab-underbar'}, [
    h('ab-hide-button-container', {class: 'ab-hide-button-container ab-flex'}, [
      hideButton(state),
    ]),
    ttsPrompt(state),
  ]);
};

/**
 * Main container for all Ace elements
 */
const mainView = state => {
  return h('ab-grid', {class: 'ab-bar-grid'}, [
    innerBar(state),
    underBar(state),
    funcArea(state),
    menuArea(state),
    settingsMenu(state),
    aboutMenu(state),
  ]);
};

export default mainView;
