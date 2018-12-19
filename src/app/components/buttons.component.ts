import {
    button,
    i,
} from '@hyperapp/html';
import tippy from 'tippy.js';
import { AccessabarUtil } from '../util';

const playButton = () => {
    return button(
        {
            'aria-label': 'Play',
            class: 'bar-button',
            id: 'play',
            oncreate: () => {
                tippy('#accessabar #play', {
                    arrow: true,
                    content: 'Play',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon-play',
            }),
        ],
    );
};

const pauseButton = () => {
    return button(
        {
            'aria-label': 'Pause',
            class: 'bar-button',
            id: 'pause',
            oncreate: () => {
                tippy('#accessabar #pause', {
                    arrow: true,
                    content: 'Pause',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon-pause',
            }),
        ],
    );
};

const stopButton = () => {
    return button(
        {
            'aria-label': 'Stop',
            class: 'bar-button',
            id: 'stop',
            oncreate: () => {
                tippy('#accessabar #stop', {
                    arrow: true,
                    content: 'Stop',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                class: 'ab-icon-stop',
            }),
        ],
    );
};

interface ITTSButtonActions {
    handleMenu: Accessabar.IActions['handleMenu'];
    ttsInit: Accessabar.IActions['ttsInit'];
}

const ttsButton = ({ handleMenu, ttsInit }: ITTSButtonActions) => {
    return button(
        {
            'aria-label': 'Enable text to speech',
            class: 'bar-button',
            id: 'tts',
            onclick: () => {
                ttsInit();
                handleMenu('tts');
            },
            oncreate: () => {
                tippy('#accessabar #tts', {
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
                class: 'ab-icon-audio-description',
            }),
        ],
    );
};

interface IIncButtonActions {
    incFontSize: Accessabar.IFontActions['incFontSize'];
    resetFontSizing: Accessabar.IFontActions['resetFontSizing'];
}

const incButton = ({ incFontSize, resetFontSizing }: IIncButtonActions) => {
    return button(
        {
            'aria-label': 'Increase font size',
            class: 'bar-button',
            id: 'font-increase',
            onclick: () => {
                AccessabarUtil.startFunction('fontSizing', resetFontSizing, incFontSize);
            },
            oncreate: () => {
                tippy('#accessabar #font-increase', {
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
                class: 'ab-icon-plus',
            }),
        ],
    );
};

interface IDecButtonActions {
    decFontSize: Accessabar.IFontActions['decFontSize'];
    resetFontSizing: Accessabar.IFontActions['resetFontSizing'];
}

const decButton = ({ decFontSize, resetFontSizing }: IDecButtonActions) => {
    return button(
        {
            'aria-label': 'Decrease font size',
            class: 'bar-button',
            id: 'font-decrease',
            onclick: () => {
                AccessabarUtil.startFunction('fontSizing', resetFontSizing, decFontSize);
            },
            oncreate: () => {
                tippy('#accessabar #font-decrease', {
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
                class: 'ab-icon-minus',
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
            class: `bar-button warning ${fontSizingActive ? '' : 'hide'}`,
            id: 'font-reset',
            onclick: () => {
                AccessabarUtil.stopFunction('fontSizing');
            },
            oncreate: () => {
                tippy('#accessabar #font-reset', {
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
                class: 'ab-icon-reset',
            }),
        ],
    );
};

interface ITextOpsActions {
    handleMenu: Accessabar.IActions['handleMenu'];
}

const textOpsButton = ({ handleMenu }: ITextOpsActions) => {
    return button(
        {
            'aria-label': 'Text options',
            class: 'bar-button',
            id: 'text-options',
            onclick: () => {
                handleMenu('textOptions');
            },
            oncreate: () => {
                tippy('#accessabar #text-options', {
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
                class: 'ab-icon-font',
            }),
        ],
    );
};

const magButton = () => {
    return button(
        {
            'aria-label': 'Magnifier',
            class: 'bar-button',
            id: 'magnifier',
            oncreate: () => {
                tippy('#accessabar #magnifier', {
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
                class: 'ab-icon-zoom-in',
            }),
        ],
    );
};

const maskButton = () => {
    return button(
        {
            'aria-label': 'Screen Masking',
            class: 'bar-button',
            id: 'screen-mask',
            oncreate: () => {
                tippy('#accessabar #screen-mask', {
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
                class: 'ab-icon-brush',
            }),
        ],
    );
};

const rulerButton = () => {
    return button(
        {
            'aria-label': 'Reading rulers',
            class: 'bar-button',
            id: 'rulers',
            oncreate: () => {
                tippy('#accessabar #rulers', {
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
                class: 'ab-icon-ruler',
            }),
        ],
    );
};

const srButton = () => {
    return button(
        {
            'aria-label': 'Speech recognition',
            class: 'bar-button',
            id: 'speech-recognition',
            oncreate: () => {
                tippy('#accessabar #speech-recognition', {
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
                class: 'ab-icon-mic',
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
            class: 'bar-button warning',
            id: 'reset',
            onclick: () => {
                resetAll();
            },
            oncreate: () => {
                tippy('#accessabar #reset', {
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
                class: 'ab-icon-reset',
            }),
        ],
    );
};

const settingsButton = () => {
    return button(
        {
            'aria-label': 'Settings',
            class: 'bar-button',
            id: 'settings',
            oncreate: () => {
                tippy('#accessabar #settings', {
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
                class: 'ab-icon-cog',
            }),
        ],
    );
};

const closeButton = ({ closeAccessabar }) => {
    return button(
        {
            'aria-label': 'Close Accessabar',
            class: 'bar-button close',
            id: 'close',
            onclick: () => {
                closeAccessabar();
            },
            oncreate: () => {
                tippy('#accessabar #close', {
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
                class: 'ab-icon-cancel',
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
            class: 'hide-button',
            id: 'hide',
            onclick: () => {
                abarHide();
            },
            oncreate: () => {
                tippy('#accessabar #hide', {
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
                class: abarHidden ? 'ab-icon-angle-down' : 'ab-icon-angle-up',
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
