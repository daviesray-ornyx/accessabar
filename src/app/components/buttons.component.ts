import {h} from 'hyperapp';
import {ttsHoverEnable, ttsStopCurrent} from '../actions/tts.actions';
import {aceAddTippy, aceHide} from '../actions/ace.actions';
import {menuOpen} from '../actions/menu.actions';
import {
  fontDecSize,
  fontIncSize,
  fontSizingDisable,
} from '../actions/font.actions';
import resetAll from '../actions/reset.actions';
import {settingsOpen} from '../actions/settings.actions';
import {aboutOpen} from '../actions/about.actions';
import closeAce from '../actions/close.actions';
import {magEnable} from '../actions/mag.actions';
import {maskEnable} from '../actions/mask.actions';
import {rulerReadingEnable} from '../actions/ruler.actions';
import {srEnable} from '../actions/sr.actions';

function handleButtonNavigation(_, event) {
  const {code, target} = event;

  if (!code || !target) {
    return;
  }

  if (code === 'Enter' || code === 'Space') {
    target.click();
  }
}

const stopButton = () => {
  return h(
    'ab-bar-stop-button',
    {
      'aria-label': 'Stop',
      class: 'ab-bar-button',
      id: 'ab-stop',
      onclick: ttsStopCurrent,
      onmouseover: [aceAddTippy, {id: '#ab-stop', content: 'Stop'}],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-stop',
      }),
    ]
  );
};

const ttsButton = ({menus}: Ace.State) => {
  return h(
    'ab-bar-tts-button',
    {
      'aria-controls': 'ab-menu',
      'aria-expanded': 'false',
      'aria-haspopup': 'true',
      'aria-label': 'Enable text to speech',
      'aria-pressed':
        Object.keys(menus).indexOf('tts') !== -1 ? 'true' : 'false',
      class: 'ab-bar-button',
      id: 'ab-tts',
      onclick: [
        menuOpen,
        {menuName: 'tts', title: 'Text to Speech', defaultFunc: ttsHoverEnable},
      ],
      onmouseover: [aceAddTippy, {id: '#ab-tts', content: 'Text to Speech'}],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-tts',
      }),
    ]
  );
};

const incButton = () => {
  return h(
    'ab-bar-inc-button',
    {
      'aria-label': 'Increase font size',
      class: 'ab-bar-button',
      id: 'ab-font-increase',
      onclick: fontIncSize,
      onmouseover: [
        aceAddTippy,
        {id: '#ab-font-increase', content: 'Increase Font Size'},
      ],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-plus',
      }),
    ]
  );
};

const decButton = () => {
  return h(
    'ab-bar-dec-button',
    {
      'aria-label': 'Decrease font size',
      class: 'ab-bar-button',
      id: 'ab-font-decrease',
      onclick: fontDecSize,
      onmouseover: [
        aceAddTippy,
        {id: '#ab-font-decrease', content: 'Decrease Font Size'},
      ],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-minus',
      }),
    ]
  );
};

const fontResetButton = ({fontSizingActive}: Ace.State) => {
  return h(
    'ab-bar-font-reset-button',
    {
      'aria-label': 'Reset font sizing',
      class: `ab-bar-button ab-warning ${fontSizingActive ? '' : 'ab-hide'}`,
      id: 'ab-font-reset',
      onclick: fontSizingDisable,
      onmouseover: [
        aceAddTippy,
        {id: '#ab-font-reset', content: 'Reset Font Sizing'},
      ],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-reset',
      }),
    ]
  );
};

const textOpsButton = ({menus}: Ace.State) => {
  return h(
    'ab-bar-text-options-button',
    {
      'aria-controls': 'ab-menu',
      'aria-expanded': 'false',
      'aria-haspopup': 'true',
      'aria-label': 'Text options',
      'aria-pressed':
        Object.keys(menus).indexOf('textOptions') !== -1 ? 'true' : 'false',
      class: 'ab-bar-button',
      id: 'ab-text-options',
      onclick: [menuOpen, {menuName: 'textOptions', title: 'Text Options'}],
      onmouseover: [
        aceAddTippy,
        {id: '#ab-text-options', content: 'Text Options'},
      ],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-font',
      }),
    ]
  );
};

const magButton = ({menus}: Ace.State) => {
  return h(
    'ab-bar-mag-button',
    {
      'aria-controls': 'ab-menu',
      'aria-expanded': 'false',
      'aria-haspopup': 'true',
      'aria-label': 'Magnifier',
      'aria-pressed':
        Object.keys(menus).indexOf('magnifier') !== -1 ? 'true' : 'false',
      class: 'ab-bar-button',
      id: 'ab-magnifier',
      onclick: [
        menuOpen,
        {menuName: 'magnifier', title: 'Magnifier', defaultFunc: magEnable},
      ],
      onmouseover: [aceAddTippy, {id: '#ab-magnifier', content: 'Magnifier'}],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-zoom',
      }),
    ]
  );
};

const maskButton = ({menus}: Ace.State) => {
  return h(
    'ab-bar-mask-button',
    {
      'aria-controls': 'ab-menu',
      'aria-expanded': 'false',
      'aria-haspopup': 'true',
      'aria-label': 'Screen Masking',
      'aria-pressed':
        Object.keys(menus).indexOf('masking') !== -1 ? 'true' : 'false',
      class: 'ab-bar-button',
      id: 'ab-screen-mask',
      onclick: [
        menuOpen,
        {menuName: 'masking', title: 'Screen Masking', defaultFunc: maskEnable},
      ],
      onmouseover: [
        aceAddTippy,
        {id: '#ab-screen-mask', content: 'Screen Masking'},
      ],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-palette',
      }),
    ]
  );
};

const rulerButton = ({menus}: Ace.State) => {
  return h(
    'ab-bar-ruler-button',
    {
      'aria-controls': 'ab-menu',
      'aria-expanded': 'false',
      'aria-haspopup': 'true',
      'aria-label': 'Reading rulers',
      'aria-pressed':
        Object.keys(menus).indexOf('rulerOptions') !== -1 ? 'true' : 'false',
      class: 'ab-bar-button',
      id: 'ab-rulers',
      onclick: [
        menuOpen,
        {
          menuName: 'rulerOptions',
          title: 'Ruler Options',
          defaultFunc: rulerReadingEnable,
        },
      ],
      onmouseover: [aceAddTippy, {id: '#ab-rulers', content: 'Reading Rulers'}],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-ruler',
      }),
    ]
  );
};

const srButton = ({menus}: Ace.State) => {
  return h(
    'ab-bar-sr-button',
    {
      'aria-controls': 'ab-menu',
      'aria-expanded': 'false',
      'aria-haspopup': 'true',
      'aria-label': 'Speech recognition',
      'aria-pressed':
        Object.keys(menus).indexOf('speechRecognition') !== -1
          ? 'true'
          : 'false',
      class: 'ab-bar-button',
      id: 'ab-speech-recognition',
      onclick: [
        menuOpen,
        {
          menuName: 'speechRecognition',
          title: 'Speech Recognition',
          defaultFunc: srEnable,
        },
      ],
      onmouseover: [
        aceAddTippy,
        {id: '#ab-speech-recognition', content: 'Speech Recognition'},
      ],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-mic',
      }),
    ]
  );
};

const ptButton = ({menus}: Ace.State) => {
  return h(
    'ab-bar-pt-button',
    {
      'aria-controls': 'ab-menu',
      'aria-expanded': 'false',
      'aria-haspopup': 'true',
      'aria-label': 'Page Translation',
      'aria-pressed':
        Object.keys(menus).indexOf('pageTranslate') !== -1 ? 'true' : 'false',
      class: 'ab-bar-button',
      id: 'ab-page-translate',
      onclick: [
        menuOpen,
        {menuName: 'pageTranslate', title: 'Page Translation'},
      ],
      onmouseover: [
        aceAddTippy,
        {id: '#ab-page-translate', content: 'Page Translation'},
      ],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabindex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-translate',
      }),
    ]
  );
};

const resetButton = () => {
  return h(
    'ab-bar-reset-button',
    {
      'aria-label': 'Reset accessabar entirely',
      class: 'ab-bar-button ab-warning',
      id: 'ab-reset',
      onclick: resetAll,
      onmouseover: [aceAddTippy, {id: '#ab-reset', content: 'Reset All'}],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-reset',
      }),
    ]
  );
};

const settingsButton = ({settingsHidden}: Ace.State) => {
  return h(
    'ab-bar-settings-button',
    {
      'aria-controls': 'ab-settings',
      'aria-expanded': String(!settingsHidden),
      'aria-haspopup': 'true',
      'aria-label': 'Settings',
      'aria-pressed': String(!settingsHidden),
      class: 'ab-bar-button',
      id: 'ab-settings-button',
      onclick: settingsOpen,
      onmouseover: [
        aceAddTippy,
        {id: '#ab-settings-button', content: 'Settings'},
      ],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-settings-gear',
      }),
    ]
  );
};

const aboutButton = ({aboutHidden}: Ace.State) => {
  return h(
    'ab-bar-about-button',
    {
      'aria-controls': 'ab-about',
      'aria-expanded': String(!aboutHidden),
      'aria-haspopup': 'true',
      'aria-label': 'About',
      'aria-pressed': String(!aboutHidden),
      class: 'ab-bar-button',
      id: 'ab-about-button',
      onclick: aboutOpen,
      onmouseover: [aceAddTippy, {id: '#ab-about-button', content: 'About'}],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-about',
      }),
    ]
  );
};

const closeButton = () => {
  return h(
    'ab-bar-close-button',
    {
      'aria-label': 'Close ACE',
      class: 'ab-bar-button ab-close',
      id: 'ab-close',
      onclick: closeAce,
      onmouseover: [aceAddTippy, {id: '#ab-close', content: 'Close ACE'}],
      onkeydown: handleButtonNavigation,
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: 'ab-icon ab-icon-cross',
      }),
    ]
  );
};

const hideButton = ({aceHidden}: Ace.State) => {
  return h(
    'ab-hide-button',
    {
      'aria-controls': 'accessabar',
      'aria-label': 'Hide ACE',
      'aria-pressed': aceHidden ? 'true' : 'false',
      class: 'ab-hide-button',
      id: 'ab-hide',
      onclick: aceHide,
      onmouseover: [
        aceAddTippy,
        {id: '#ab-hide', content: aceHidden ? 'Show ACE' : 'Hide ACE'},
      ],
      onkeydown: handleButtonNavigation,
      onchange: [
        el => {
          const {_tippy: tip} = el;

          tip.setContent(aceHidden ? 'Show ACE' : 'Hide ACE');
        },
        ev => ev.target,
      ],
      role: 'button',
      tabIndex: 0,
    },
    [
      h('ab-icon', {
        'aria-hidden': 'true',
        class: aceHidden
          ? 'ab-icon ab-icon-nav-down'
          : 'ab-icon ab-icon-nav-up',
      }),
    ]
  );
};

export {
  closeButton,
  ttsButton,
  stopButton,
  incButton,
  fontResetButton,
  decButton,
  textOpsButton,
  magButton,
  maskButton,
  rulerButton,
  srButton,
  ptButton,
  resetButton,
  settingsButton,
  aboutButton,
  hideButton,
  handleButtonNavigation,
};
