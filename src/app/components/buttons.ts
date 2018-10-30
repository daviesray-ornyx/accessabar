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
                });
            },
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
                });
            },
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
                });
            },
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
                });
            },
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
                });
            },
        },
        [
            i({
                'aria-hidden': true,
                className: 'ab-icon-stop',
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
};
