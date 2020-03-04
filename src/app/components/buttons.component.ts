import { h } from 'hyperapp';
import tippy from 'tippy.js';
import { AccessabarUtil } from '../util';

function handleButtonNavigation(event) {
    const {
        code,
        target,
    } = event;

    if (!code || !target) {
        return;
    }

    if (code === 'Enter' || code === 'Space') {
        target.click();
    }
}

interface IPlayButtonActions {
    ttsResumeCurrent: Accessabar.IActions['ttsResumeCurrent'];
}

const playButton = ({ ttsResumeCurrent }: IPlayButtonActions) => {
    return h(
        'ab-bar-play-button',
        {
            'aria-label': 'Play',
            class: 'ab-bar-button',
            id: 'ab-play',
            onclick: () => {
                ttsResumeCurrent();
            },
            oncreate: () => {
                tippy('#accessabar #ab-play', {
                    arrow: true,
                    content: 'Play',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-play',
            }),
        ],
    );
};

interface IPauseButtonActions {
    ttsPauseCurrent: Accessabar.IActions['ttsPauseCurrent'];
}

const pauseButton = ({ ttsPauseCurrent }: IPauseButtonActions) => {
    return h(
        'ab-bar-pause-button',
        {
            'aria-label': 'Pause',
            class: 'ab-bar-button',
            id: 'ab-pause',
            onclick: () => {
                ttsPauseCurrent();
            },
            oncreate: () => {
                tippy('#accessabar #ab-pause', {
                    arrow: true,
                    content: 'Pause',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-pause',
            }),
        ],
    );
};

interface IStopButtonActions {
    ttsStopCurrent: Accessabar.IActions['ttsStopCurrent'];
}

const stopButton = ({ ttsStopCurrent }: IStopButtonActions) => {
    return h(
        'ab-bar-stop-button',
        {
            'aria-label': 'Stop',
            class: 'ab-bar-button',
            id: 'ab-stop',
            onclick: () => {
                ttsStopCurrent();
            },
            oncreate: () => {
                tippy('#accessabar #ab-stop', {
                    arrow: true,
                    content: 'Stop',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-stop',
            }),
        ],
    );
};

interface ITTSButtonActions {
    menuHandle: Accessabar.IActions['menuHandle'];
    ttsInit: Accessabar.IActions['ttsInit'];
}

interface ITTSButtonState {
    menuCurrent: Accessabar.IState['menuCurrent'];
}

const ttsButton = ({ menuCurrent }: ITTSButtonState, { menuHandle, ttsInit }: ITTSButtonActions) => {
    return h(
        'ab-bar-tts-button',
        {
            'aria-controls': 'ab-menu',
            'aria-expanded': 'false',
            'aria-haspopup': 'true',
            'aria-label': 'Enable text to speech',
            'aria-pressed': menuCurrent === 'tts' ? 'true' : 'false',
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
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
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
    return h(
        'ab-bar-inc-button',
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
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
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
    return h(
        'ab-bar-dec-button',
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
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-minus',
            }),
        ],
    );
};

interface IFontResetButtonState {
    fontSizingActive: Accessabar.IState['fontSizingActive'];
}

const fontResetButton = ({ fontSizingActive }: IFontResetButtonState) => {
    return h(
        'ab-bar-font-reset-button',
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
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-reset',
            }),
        ],
    );
};

interface ITextOpsButtonActions {
    menuHandle: Accessabar.IActions['menuHandle'];
}

interface ITextOpsButtonState {
    menuCurrent: Accessabar.IState['menuCurrent'];
}

const textOpsButton = ({ menuCurrent }: ITextOpsButtonState, { menuHandle }: ITextOpsButtonActions) => {
    return h(
        'ab-bar-text-options-button',
        {
            'aria-controls': 'ab-menu',
            'aria-expanded': 'false',
            'aria-haspopup': 'true',
            'aria-label': 'Text options',
            'aria-pressed': menuCurrent === 'textOptions' ? 'true' : 'false',
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
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-font',
            }),
        ],
    );
};

interface IMagButtonActions {
    menuHandle: Accessabar.IActions['menuHandle'];
}

interface IMagButtonState {
    menuCurrent: Accessabar.IState['menuCurrent'];
}

const magButton = ({ menuCurrent }: IMagButtonState, { menuHandle }: IMagButtonActions) => {
    return h(
        'ab-bar-mag-button',
        {
            'aria-controls': 'ab-menu',
            'aria-expanded': 'false',
            'aria-haspopup': 'true',
            'aria-label': 'Magnifier',
            'aria-pressed': menuCurrent === 'magnifier' ? 'true' : 'false',
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
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-zoom',
            }),
        ],
    );
};

interface IMaskButtonActions {
    menuHandle: Accessabar.IActions['menuHandle'];
}

interface IMaskButtonState {
    menuCurrent: Accessabar.IState['menuCurrent'];
}

const maskButton = ({ menuCurrent }: IMaskButtonState, { menuHandle }: IMaskButtonActions) => {
    return h(
        'ab-bar-mask-button',
        {
            'aria-controls': 'ab-menu',
            'aria-expanded': 'false',
            'aria-haspopup': 'true',
            'aria-label': 'Screen Masking',
            'aria-pressed': menuCurrent === 'masking' ? 'true' : 'false',
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
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-palette',
            }),
        ],
    );
};

interface IRulerButtonActions {
    menuHandle: Accessabar.IActions['menuHandle'];
}

interface IRulerButtonState {
    menuCurrent: Accessabar.IState['menuCurrent'];
}

const rulerButton = ({ menuCurrent }: IRulerButtonState, { menuHandle }: IRulerButtonActions) => {
    return h(
        'ab-bar-ruler-button',
        {
            'aria-controls': 'ab-menu',
            'aria-expanded': 'false',
            'aria-haspopup': 'true',
            'aria-label': 'Reading rulers',
            'aria-pressed': menuCurrent === 'rulerOptions' ? 'true' : 'false',
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
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-ruler',
            }),
        ],
    );
};

interface ISRButtonActions {
    menuHandle: Accessabar.IActions['menuHandle'];
}

interface ISRButtonState {
    menuCurrent: Accessabar.IState['menuCurrent'];
}

const srButton = ({ menuCurrent }: ISRButtonState, { menuHandle }: ISRButtonActions) => {
    return h(
        'ab-bar-sr-button',
        {
            'aria-controls': 'ab-menu',
            'aria-expanded': 'false',
            'aria-haspopup': 'true',
            'aria-label': 'Speech recognition',
            'aria-pressed': menuCurrent === 'speechRecognition' ? 'true' : 'false',
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
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-mic',
                style: {
                    background:'#000000',
                    color: '#ffffff' 
                }
            }),
        ],
    );
};

interface IPTButtonActions{
    menuHandle: Accessabar.IActions['menuHandle'];
}

interface IPTButtonState{
    menuCurrent: Accessabar.IState['menuCurrent'];
}

const ptButton = ({menuCurrent}: IPTButtonState, {menuHandle}: IPTButtonActions) => {
    return h(
        'ab-bar-pt-button',
        {
            'aria-controls': 'ab-menu',
            'aria-expanded': 'false',
            'aria-haspopup': 'true',
            'aria-label': 'Page Translation',
            'aria-pressed': menuCurrent === 'pageTranslate' ? true : false,
            class: 'ab-bar-button',
            id: 'ab-page-translate',
            onclick: () => {
                menuHandle('pageTranslate');
            },
            oncreate: () => {
                tippy('#accessabar #ab-page-translate', { 
                    arrow: true,
                    content: 'Page Translation',
                    placement: 'bottom',
                    theme: 'ab'
                }); 
            },
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabindex: 0, 
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-translate'
            }),
        ]
    );
}

interface IResetButtonActions {
    resetAll: Accessabar.IResetActions['resetAll'];
}

const resetButton = ({ resetAll }: IResetButtonActions) => {
    return h(
        'ab-bar-reset-button',
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
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-reset',
            }),
        ],
    );
};

interface ISettingsButtonState {
    settingsHidden: Accessabar.IState['settingsHidden'];
}

interface ISettingsButtonActions {
    settingsOpen: Accessabar.IActions['settingsOpen'];
}

const settingsButton = ({ settingsHidden }: ISettingsButtonState, { settingsOpen }: ISettingsButtonActions) => {
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
            onclick: () => {
                settingsOpen();
            },
            oncreate: () => {
                tippy('#accessabar #ab-settings-button', {
                    arrow: true,
                    content: 'Settings',
                    placement: 'bottom',
                    theme: 'ab',
                });
            },
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-settings-gear',
            }),
        ],
    );
};

interface ICloseActions {
    closeAccessabar: Accessabar.IActions['closeAccessabar'];
}

const closeButton = ({ closeAccessabar }: ICloseActions) => {
    return h(
        'ab-bar-close-button',
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
            onkeydown: handleButtonNavigation,
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
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
    return h(
        'ab-hide-button',
        {
            'aria-controls': 'accessabar',
            'aria-label': 'Hide Accessabar',
            'aria-pressed': abarHidden ? 'true' : 'false',
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
            onkeydown: handleButtonNavigation,
            onupdate: (el) => {
                const { _tippy: tip } = el;

                tip.setContent(abarHidden ? 'Show Accessabar' : 'Hide Accessabar');
            },
            role: 'button',
            tabIndex: 0,
        },
        [
            h('ab-icon', {
                'aria-hidden': 'true',
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
    ptButton,
    resetButton,
    settingsButton,
    hideButton,
    handleButtonNavigation,
};
