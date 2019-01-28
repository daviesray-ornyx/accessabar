import {
    div,
    section,
    label,
    span,
    button,
    ul,
    li,
    br,
    i,
} from '@hyperapp/html';
import fontConfig from '../../config/fonts.config.json5';
import { VNode } from 'hyperapp';
import tippy from 'tippy.js';
import Pickr from 'pickr-widget';

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
            switchEl(state.ttsHoverSpeak, actions.selectToggleSpeakHover, 'Speak on hover', 'Toggle speak on hover'),
        ]),
        section({ class: 'box flex-column' }, [
            switchEl(state.ttsHighlightSpeak, actions.selectToggleHighlightSpeak, 'Speak only highlighted', 'Toggle speak only highlighted text'),
        ]),
    ]);
};

const textOptionsInnerFont = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    /* tslint:disable-next-line */
    const fontList: VNode<any>[] = [];
    const fonts = Object.entries((fontConfig as Accessabar.IFontConfig));
    const currentFont = state.fontCurrentKey.length > 0
        ? (fontConfig[state.fontCurrentKey].name || 'Select Font:')
        : 'Select Font:';
    const currentFontFamily = state.fontCurrentKey.length > 0
        ? (fontConfig[state.fontCurrentKey].family || null)
        : null;

    for (const [key, obj] of fonts) {
        const item = li(
            {
                class: 'custom-list-selection-item',
                onclick: () => {
                    actions.selectToggleFontCurrent(key);
                },
                role: 'listitem',
                style: {
                    fontFamily: obj.family,
                },
            },
            obj.name,
        );

        fontList.push(item);
    }

    return div({ class: 'flex-column' }, [
        section({ class: 'box flex-column' }, [
            switchEl(state.fontActive, actions.fontFamilyEnable, 'Toggle Font Type', 'Toggle the page font type'),
        ]),
        section({ class: 'box flex-column' }, [
            div(
                {
                    class: 'font-options',
                },
                [
                    div({ class: 'custom-list flex flex-column' }, [
                        div(
                            {
                                class: `custom-list-box flex ${state.selectFontListActive ? 'active' : ''}`,
                                onclick: (event) => {
                                    actions.selectToggleFontList(event);
                                },
                                role: 'listbox',
                                style: {
                                    fontFamily: currentFontFamily,
                                },
                            },
                            currentFont,
                        ),
                        ul(
                            {
                                class: `custom-list-selection ${state.selectFontListActive ? 'flex' : 'hide'} flex-column`,
                                id: 'font-list-selection',
                                role: 'list',
                            },
                            fontList,
                        ),
                    ]),
                ],
            ),
        ]),
    ]);
};

const textOptionsInnerTextColour = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return div({ class: 'flex flex-column' }, [
        section({ class: 'box flex-column' }, [
            switchEl(state.fontColourActive, actions.fontColourEnable, 'Toggle Text Colour', 'Toggle the page text colour'),
        ]),
        section({ class: 'box' }, [
            div({ class: 'text-colour-presets growable flex-column' }, [
                span({ class: 'title' }, 'Presets'),
                div({ class: 'colours' }, [
                    div(
                        {
                            class: `colour red ${state.fontColourCurrent === 'red' ? 'active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('red');
                            },
                        },
                    ),
                    div(
                        {
                            class: `colour blue ${state.fontColourCurrent === 'blue' ? 'active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('blue');
                            },
                        },
                    ),
                    div(
                        {
                            class: `colour green ${state.fontColourCurrent === 'green' ? 'active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('green');
                            },
                        },
                    ),
                    div(
                        {
                            class: `colour yellow ${state.fontColourCurrent === 'yellow' ? 'active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('yellow');
                            },
                        },
                    ),
                    div(
                        {
                            class: `colour orange ${state.fontColourCurrent === 'orange' ? 'active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('orange');
                            },
                        },
                    ),
                    div(
                        {
                            class: `colour purple ${state.fontColourCurrent === 'purple' ? 'active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('purple');
                            },
                        },
                    ),
                    div(
                        {
                            class: `colour black ${state.fontColourCurrent === 'black' ? 'active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('black');
                            },
                        },
                    ),
                    div(
                        {
                            class: `colour grey ${state.fontColourCurrent === 'grey' ? 'active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('grey');
                            },
                        },
                    ),
                    div(
                        {
                            class: `colour white ${state.fontColourCurrent === 'white' ? 'active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('white');
                            },
                        },
                    ),
                ]),
            ]),
            div({ class: 'text-colour-custom growable flex-column' }, [
                span({ class: 'title' }, 'Custom'),
                span({ class: 'desc' }, [
                    'Click the box below',
                    br(),
                    'to select a custom colour.',
                ]),
                div({ class: 'custom-container flex' }, [
                    div(
                        {
                            class: `custom-box ${state.fontCustomActive ? 'active' : ''}`,
                            id: 'colour-custom-box',
                            oncreate: (el: HTMLElement) => {
                                window.pickr = new Pickr({
                                    components: {
                                        hue: true,
                                        interaction: {
                                            clear: false,
                                            cmyk: false,
                                            hex: true,
                                            hsla: false,
                                            hsva: false,
                                            input: true,
                                            rgba: true,
                                            save: true,
                                        },
                                        opacity: true,
                                        preview: true,
                                    },
                                    el: '#colour-custom-box',
                                    onSave: (hsva) => {
                                        window.abar.appActions.colourCustomChangeFont(hsva.toHEX().toString());
                                    },
                                    useAsButton: true,
                                });
                            },
                            style: { background: state.fontColourCustomCurrent },
                        },
                    ),
                ]),
            ]),
        ]),
    ]);
};

const textOptionsInnerLineSpacing = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return div({ class: 'flex flex-column' }, [
        section({ class: 'box flex-column' }, [
            switchEl(state.fontLineSpacingActive, actions.fontLineSpacingEnable, 'Toggle Line Spacing', 'Toggle the page line spacing'),
        ]),
        section({ class: 'box flex-column' }, [
            div({ class: 'counter growable' }, [
                button(
                    {
                        'aria-label': 'Decrease line spacing',
                        class: 'dec bar-button',
                        id: 'ls-dec',
                        onclick: () => {
                            actions.fontLineSpacingDecrement();
                        },
                        oncreate: () => {
                            tippy('#accessabar #ls-dec', {
                                arrow: true,
                                content: 'Decrease',
                                placement: 'bottom',
                                theme: 'ab',
                            });
                        },
                    },
                    [
                        i({
                            'aria-hidden': true,
                            class: 'ab-icon-minus',
                        }),
                    ],
                ),
                span({ class: 'count' }, state.fontLineSpacingCount),
                button(
                    {
                        'aria-label': 'Increase line spacing',
                        class: 'inc bar-button',
                        id: 'ls-inc',
                        onclick: () => {
                            actions.fontLineSpacingIncrement();
                        },
                        oncreate: () => {
                            tippy('#accessabar #ls-inc', {
                                arrow: true,
                                content: 'Increase',
                                placement: 'bottom',
                                theme: 'ab',
                            });
                        },
                    },
                    [
                        i({
                            'aria-hidden': true,
                            class: 'ab-icon-plus',
                        }),
                    ],
                ),
            ]),
        ]),
    ]);
};

const textOptionsInnerCharSpacing = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return section({ class: 'box flex-column' }, [
        switchEl(state.fontCharSpacingActive, actions.fontCharSpacingEnable, 'Toggle Character Spacing', 'Toggle the page character spacing'),
    ]);
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
