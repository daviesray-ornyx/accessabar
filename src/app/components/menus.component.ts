import {
    div,
    section,
    label,
    span,
} from '@hyperapp/html';

const switchEl = (switchState: boolean, switchAction: () => unknown, labelText: string, ariaLabel: string) => {
    return label({ class: 'label' }, [
        div(
            {
                'aria-label': ariaLabel,
                class: `switch ${switchState ? 'on' : 'off'}`,
                onclick: (event) => {
                    switchAction();
                },
            },
            [
                div({ class: 'handle' }),
            ],
        ),
        span(labelText),
    ]);
};

const ttsMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return div({ class: 'menu-content' }, [
        section({ class: 'box flex-column' }, [
            switchEl(state.ttsHoverSpeak, actions.toggleSpeakHover, 'Speak on hover', 'Toggle speak on hover'),
        ]),
        section({ class: 'box flex-column' }, [
            switchEl(state.ttsHighlightSpeak, actions.toggleHighlightSpeak, 'Speak only highlighted', 'Toggle speak only highlighted text'),
        ]),
    ]);
};

export {
    ttsMenu,
};
