import {
    div,
    section,
    label,
    span,
    button,
} from '@hyperapp/html';

const switchEl = (switchState: boolean, switchAction: () => unknown, labelText: string, ariaLabel: string) => {
    return label(
        {
            class: 'label',
            onclick: (event) => {
                switchAction();
            },
        },
        [
            div(
                {
                    'aria-label': ariaLabel,
                    class: `switch ${switchState ? 'on' : 'off'}`,
                },
                [
                    div({ class: 'handle' }),
                ],
            ),
            span(labelText),
        ],
    );
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

const textOptionsInnerFont = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return section({ class: 'box flex-column' }, [
        switchEl(state.fontActive, actions.fontEnable, 'Change Font', 'Change the page font'),
    ]);
};

const textOptionsInnerTextColour = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return div('tc');
};

const textOptionsInnerLineSpacing = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return div('ls');
};

const textOptionsInnerCharSpacing = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return div('cs');
};

const textOptionsInnerMenus = new Map([
    ['font', textOptionsInnerFont],
    ['text_colour', textOptionsInnerTextColour],
    ['line_spacing', textOptionsInnerLineSpacing],
    ['char_spacing', textOptionsInnerCharSpacing],
]);

const textOptionsMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    let innerMenu = div();

    if (textOptionsInnerMenus.has(state.textOpsInnerMenuCurrent)) {
        innerMenu = (textOptionsInnerMenus.get(state.textOpsInnerMenuCurrent) || textOptionsInnerFont)(state, actions);
    }

    return div({ class: 'menu-container' }, [
        div({ class: 'menu-tabs' }, [
            button(
                {
                    class: `menu-tab-button ${state.textOpsInnerMenuCurrent === 'font' ? 'active' : ''}`,
                    onclick: () => {
                        actions.textOpsSwitchInner('font');
                    },
                },
                'Font',
            ),
            button(
                {
                    class: `menu-tab-button ${state.textOpsInnerMenuCurrent === 'text_colour' ? 'active' : ''}`,
                    onclick: () => {
                        actions.textOpsSwitchInner('text_colour');
                    },
                },
                'Text Colour',
            ),
            button(
                {
                    class: `menu-tab-button ${state.textOpsInnerMenuCurrent === 'line_spacing' ? 'active' : ''}`,
                    onclick: () => {
                        actions.textOpsSwitchInner('line_spacing');
                    },
                },
                'Line Spacing',
            ),
            button(
                {
                    class: `menu-tab-button ${state.textOpsInnerMenuCurrent === 'char_spacing' ? 'active' : ''}`,
                    onclick: () => {
                        actions.textOpsSwitchInner('char_spacing');
                    },
                },
                'Character Spacing',
            ),
        ]),
        div({ class: 'menu-content' }, [
            innerMenu,
        ]),
    ]);
};

export {
    ttsMenu,
    textOptionsMenu,
};
