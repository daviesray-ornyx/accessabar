import { h } from 'hyperapp';
import tippy from 'tippy.js';
import { AccessabarUtil } from '../util';

const playButton = (actions) => {
    return h(
        'ab-play-button',
        {
            'aria-label': 'Play',
            class: 'ab-bar-button',
            id: 'ab-play',
            oncreate: () => {
                tippy('#accessabar #ab-play', {
                    arrow: true,
                    content: 'Play',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': true,
                class: 'ab-icon ab-icon-play',
            }),
        ],
    );
};

const pauseButton = (actions) => {
    return h(
        'ab-pause-button',
        {
            'aria-label': 'Pause',
            class: 'ab-bar-button',
            id: 'ab-pause',
            oncreate: () => {
                tippy('#accessabar #ab-pause', {
                    arrow: true,
                    content: 'Pause',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': true,
                class: 'ab-icon ab-icon-pause',
            }),
        ],
    );
};

const stopButton = (actions) => {
    return h(
        'ab-stop-button',
        {
            'aria-label': 'Stop',
            class: 'ab-bar-button',
            id: 'ab-stop',
            oncreate: () => {
                tippy('#accessabar #ab-stop', {
                    arrow: true,
                    content: 'Stop',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            h('ab-icon',{
                'aria-hidden': true,
                class: 'ab-icon ab-icon-stop',
            }),
        ],
    );
};

interface ITTSButtonActions {
    menuHandle: Accessabar.IActions['menuHandle'];
    ttsInit: Accessabar.IActions['ttsInit'];
}

const ttsButton = ({ menuHandle, ttsInit }: ITTSButtonActions) => {
    return button(
        {
            'aria-label': 'Enable text to speech',
            class: 'ab-bar-button',
            id: 'ab-tts',
            onclick: () => {
                ttsInit();
                menuHandle('tts');
            },
            oncreate: () => {
                tippy('#accessabar #ab-tts', {
                    arrow: true,
                    content: 'Text to Speech',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-tts',
            }),
        ],
    );
};

interface IIncButtonActions {
    fontIncSize: Accessabar.IFontActions['fontIncSize'];
    fontResetSizing: Accessabar.IFontActions['fontResetSizing'];
}

const incButton = ({ fontIncSize, fontResetSizing }: IIncButtonActions) => {
    return button(
        {
            'aria-label': 'Increase font size',
            class: 'ab-bar-button',
            id: 'ab-font-increase',
            onclick: () => {
                AccessabarUtil.startFunction('fontSizing', fontResetSizing, fontIncSize);
            },
            oncreate: () => {
                tippy('#accessabar #ab-font-increase', {
                    arrow: true,
                    content: 'Increase font size',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-plus',
            }),
        ],
    );
};

interface IDecButtonActions {
    fontDecSize: Accessabar.IFontActions['fontDecSize'];
    fontResetSizing: Accessabar.IFontActions['fontResetSizing'];
}

const decButton = ({ fontDecSize, fontResetSizing }: IDecButtonActions) => {
    return button(
        {
            'aria-label': 'Decrease font size',
            class: 'ab-bar-button',
            id: 'ab-font-decrease',
            onclick: () => {
                AccessabarUtil.startFunction('fontSizing', fontResetSizing, fontDecSize);
            },
            oncreate: () => {
                tippy('#accessabar #ab-font-decrease', {
                    arrow: true,
                    content: 'Decrease font size',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-minus',
            }),
        ],
    );
};

interface IFontResetButtonState {
    fontSizingActive: Accessabar.IState['fontSizingActive'];
}

const fontResetButton = ({ fontSizingActive }: IFontResetButtonState) => {
    return button(
        {
            'aria-label': 'Reset font sizing',
            class: `ab-bar-button ab-warning ${fontSizingActive ? '' : 'ab-hide'}`,
            id: 'ab-font-reset',
            onclick: () => {
                AccessabarUtil.stopFunction('fontSizing');
            },
            oncreate: () => {
                tippy('#accessabar #ab-font-reset', {
                    arrow: true,
                    content: 'Reset Font Sizing',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-reset',
            }),
        ],
    );
};

interface ITextOpsActions {
    menuHandle: Accessabar.IActions['menuHandle'];
}

const textOpsButton = ({ menuHandle }: ITextOpsActions) => {
    return button(
        {
            'aria-label': 'Text options',
            class: 'ab-bar-button',
            id: 'ab-text-options',
            onclick: () => {
                menuHandle('textOptions');
            },
            oncreate: () => {
                tippy('#accessabar #ab-text-options', {
                    arrow: true,
                    content: 'Text Options',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-font',
            }),
        ],
    );
};

interface IMagActions {
    menuHandle: Accessabar.IActions['menuHandle'];
}

const magButton = ({ menuHandle }: IMagActions) => {
    return button(
        {
            'aria-label': 'Magnifier',
            class: 'ab-bar-button',
            id: 'ab-magnifier',
            onclick: () => {
                menuHandle('magnifier');
            },
            oncreate: () => {
                tippy('#accessabar #ab-magnifier', {
                    arrow: true,
                    content: 'Magnifier',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-zoom',
            }),
        ],
    );
};

interface IMaskActions {
    menuHandle: Accessabar.IActions['menuHandle'];
}

const maskButton = ({ menuHandle }: IMaskActions) => {
    return button(
        {
            'aria-label': 'Screen Masking',
            class: 'ab-bar-button',
            id: 'ab-screen-mask',
            onclick: () => {
                menuHandle('masking');
            },
            oncreate: () => {
                tippy('#accessabar #ab-screen-mask', {
                    arrow: true,
                    content: 'Screen Masking',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-palette',
            }),
        ],
    );
};

interface IRulerActions {
    menuHandle: Accessabar.IActions['menuHandle'];
}

const rulerButton = ({ menuHandle }: IRulerActions) => {
    return button(
        {
            'aria-label': 'Reading rulers',
            class: 'ab-bar-button',
            id: 'ab-rulers',
            onclick: () => {
                menuHandle('rulerOptions');
            },
            oncreate: () => {
                tippy('#accessabar #ab-rulers', {
                    arrow: true,
                    content: 'Reading Rulers',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-ruler',
            }),
        ],
    );
};

interface ISRActions {
    menuHandle: Accessabar.IActions['menuHandle'];
}

const srButton = ({ menuHandle }: ISRActions) => {
    return button(
        {
            'aria-label': 'Speech recognition',
            class: 'ab-bar-button',
            id: 'ab-speech-recognition',
            onclick: () => {
                menuHandle('speechRecognition');
            },
            oncreate: () => {
                tippy('#accessabar #ab-speech-recognition', {
                    arrow: true,
                    content: 'Speech Recognition',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-mic',
            }),
        ],
    );
};

interface IResetButtonActions {
    resetAll: Accessabar.IResetActions['resetAll'];
}

const resetButton = ({ resetAll }: IResetButtonActions) => {
    return button(
        {
            'aria-label': 'Reset accessabar entirely',
            class: 'ab-bar-button ab-warning',
            id: 'ab-reset',
            onclick: () => {
                resetAll();
            },
            oncreate: () => {
                tippy('#accessabar #ab-reset', {
                    arrow: true,
                    content: 'Reset All',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-reset',
            }),
        ],
    );
};

const settingsButton = (actions) => {
    return button(
        {
            'aria-label': 'Settings',
            class: 'ab-bar-button',
            id: 'ab-settings',
            oncreate: () => {
                tippy('#accessabar #ab-settings', {
                    arrow: true,
                    content: 'Settings',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-settings-gear',
            }),
        ],
    );
};

interface ICloseActions {
    closeAccessabar: Accessabar.IActions['closeAccessabar'];
}

const closeButton = ({ closeAccessabar }: ICloseActions) => {
    return button(
        {
            'aria-label': 'Close Accessabar',
            class: 'ab-bar-button ab-close',
            id: 'ab-close',
            onclick: () => {
                closeAccessabar();
            },
            oncreate: () => {
                tippy('#accessabar #ab-close', {
                    arrow: true,
                    content: 'Close Accessabar',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon ab-icon-cross',
            }),
        ],
    );
};

interface IHideButtonActions {
    abarHide: Accessabar.IHideActions['abarHide'];
}

interface IHideButtonState {
    abarHidden: Accessabar.IState['abarHidden'];
}

const hideButton = ({ abarHidden }: IHideButtonState, { abarHide }: IHideButtonActions) => {
    return button(
        {
            'aria-label': 'Hide Accessabar',
            class: 'ab-hide-button',
            id: 'ab-hide',
            onclick: () => {
                abarHide();
            },
            oncreate: () => {
                tippy('#accessabar #ab-hide', {
                    arrow: true,
                    content: abarHidden ? 'Show Accessabar' : 'Hide Accessabar',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            onupdate: (el) => {
                const { _tippy: tip } = el;

                tip.setContent(abarHidden ? 'Show Accessabar' : 'Hide Accessabar');
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: abarHidden ? 'ab-icon ab-icon-nav-down' : 'ab-icon ab-icon-nav-up',
            }),
        ],
    );
};

export {
    closeButton,
    ttsButton,
    playButton,
    pauseButton,
    stopButton,
    incButton,
    fontResetButton,
    decButton,
    textOpsButton,
    magButton,
    maskButton,
    rulerButton,
    srButton,
    resetButton,
    settingsButton,
    hideButton,
};
