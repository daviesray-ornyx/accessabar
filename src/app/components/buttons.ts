import {
    button,
    i,
} from '@hyperapp/html';
import tippy from 'tippy.js';

const closeButton = () => {
    return button(
        {
            'aria-label': 'Close Accessabar',
            id: 'close',
            oncreate: () => {
                tippy('#accessabar #close', {
                    arrow: true,
                    content: 'Close Accessabar',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-cancel',
            }),
        ],
    );
};

const ttsButton = () => {
    return button(
        {
            'aria-label': 'Enable text to speech',
            id: 'tts',
            oncreate: () => {
                tippy('#accessabar #tts', {
                    arrow: true,
                    content: 'Text to Speech',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-audio-description',
            }),
        ],
    );
};

const playButton = () => {
    return button(
        {
            'aria-label': 'Play',
            id: 'play',
            oncreate: () => {
                tippy('#accessabar #play', {
                    arrow: true,
                    content: 'Play',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-play',
            }),
        ],
    );
};

const pauseButton = () => {
    return button(
        {
            'aria-label': 'Pause',
            id: 'pause',
            oncreate: () => {
                tippy('#accessabar #pause', {
                    arrow: true,
                    content: 'Pause',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-pause',
            }),
        ],
    );
};

const stopButton = () => {
    return button(
        {
            'aria-label': 'Stop',
            id: 'stop',
            oncreate: () => {
                tippy('#accessabar #stop', {
                    arrow: true,
                    content: 'Stop',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-stop',
            }),
        ],
    );
};

const incButton = () => {
    return button(
        {
            'aria-label': 'Increase font size',
            id: 'font-increase',
            oncreate: () => {
                tippy('#accessabar #font-increase', {
                    arrow: true,
                    content: 'Increase font size',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-plus',
            }),
        ],
    );
};

const decButton = () => {
    return button(
        {
            'aria-label': 'Decrease font size',
            id: 'font-decrease',
            oncreate: () => {
                tippy('#accessabar #font-decrease', {
                    arrow: true,
                    content: 'Decrease font size',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-minus',
            }),
        ],
    );
};

const textOpsButton = () => {
    return button(
        {
            'aria-label': 'Text options',
            id: 'text-options',
            oncreate: () => {
                tippy('#accessabar #text-options', {
                    arrow: true,
                    content: 'Text Options',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-font',
            }),
        ],
    );
};

const magButton = () => {
    return button(
        {
            'aria-label': 'Magnifier',
            id: 'magnifier',
            oncreate: () => {
                tippy('#accessabar #magnifier', {
                    arrow: true,
                    content: 'Magnifier',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-zoom-in',
            }),
        ],
    );
};

const maskButton = () => {
    return button(
        {
            'aria-label': 'Screen Masking',
            id: 'screen-mask',
            oncreate: () => {
                tippy('#accessabar #screen-mask', {
                    arrow: true,
                    content: 'Screen Masking',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-brush',
            }),
        ],
    );
};

const rulerButton = () => {
    return button(
        {
            'aria-label': 'Reading rulers',
            id: 'rulers',
            oncreate: () => {
                tippy('#accessabar #rulers', {
                    arrow: true,
                    content: 'Reading Rulers',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-ruler',
            }),
        ],
    );
};

const srButton = () => {
    return button(
        {
            'aria-label': 'Speech recognition',
            id: 'speech-recognition',
            oncreate: () => {
                tippy('#accessabar #speech-recognition', {
                    arrow: true,
                    content: 'Speech Recognition',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-mic',
            }),
        ],
    );
};

const resetButton = () => {
    return button(
        {
            'aria-label': 'Reset accessabar',
            id: 'reset',
            oncreate: () => {
                tippy('#accessabar #reset', {
                    arrow: true,
                    content: 'Reset',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-reset',
            }),
        ],
    );
};

const settingsButton = () => {
    return button(
        {
            'aria-label': 'Settings',
            id: 'settings',
            oncreate: () => {
                tippy('#accessabar #settings', {
                    arrow: true,
                    content: 'Settings',
                    placement: 'bottom',
                });
            },
            tabIndex: 0,
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-cog',
            }),
        ],
    );
};

const testButton = () => {
    return button('test');
};

export {
    closeButton,
    testButton,
    ttsButton,
    playButton,
    pauseButton,
    stopButton,
    incButton,
    decButton,
    textOpsButton,
    magButton,
    maskButton,
    rulerButton,
    srButton,
    resetButton,
    settingsButton,
};
