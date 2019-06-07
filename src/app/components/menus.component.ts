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
import BigNumber from 'bignumber.js';

const switchEl = (switchState: boolean, switchAction: () => unknown, labelText: string, ariaLabel: string) => {
    return label(
        {
            class: 'ab-label',
            onclick: () => {
                switchAction();
            },
        },
        [
            div(
                {
                    'aria-label': ariaLabel,
                    class: `ab-switch ${switchState ? 'ab-on' : 'ab-off'}`,
                },
                [
                    div({ class: 'ab-handle' }),
                ],
            ),
            span(labelText),
        ],
    );
};

const ttsMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return div({ class: 'ab-menu-content' }, [
        section({ class: 'ab-box ab-flex-column' }, [
            switchEl(state.ttsHoverSpeak, actions.selectToggleSpeakHover, 'Speak on hover', 'Toggle speak on hover'),
        ]),
        section({ class: 'ab-box ab-flex-column' }, [
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
                class: 'ab-custom-list-selection-item',
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

    return div({ class: 'ab-flex-column' }, [
        section({ class: 'ab-box ab-flex-column' }, [
            switchEl(state.fontActive, actions.fontFamilyEnable, 'Toggle Font Type', 'Toggle the page font type'),
        ]),
        section({ class: 'ab-box ab-flex-column' }, [
            div(
                {
                    class: 'ab-font-options',
                },
                [
                    div({ class: 'ab-custom-list ab-flex ab-flex-column' }, [
                        div(
                            {
                                class: `ab-custom-list-box ab-flex ${state.selectFontListActive ? 'ab-active' : ''}`,
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
                                class: `ab-custom-list-selection ${state.selectFontListActive ? 'ab-flex' : 'ab-hide'} ab-flex-column`,
                                id: 'ab-font-list-selection',
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
    return div({ class: 'ab-flex ab-flex-column' }, [
        section({ class: 'ab-box ab-flex-column' }, [
            switchEl(state.fontColourActive, actions.fontColourEnable, 'Toggle Text Colour', 'Toggle the page text colour'),
        ]),
        section({ class: 'ab-box' }, [
            div({ class: 'ab-colour-presets ab-growable ab-flex-column' }, [
                span({ class: 'ab-title' }, 'Presets'),
                div({ class: 'ab-colours' }, [
                    div(
                        {
                            class: `ab-colour ab-red ${state.fontColourCurrent === 'red' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('red');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-blue ${state.fontColourCurrent === 'blue' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('blue');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-green ${state.fontColourCurrent === 'green' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('green');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-yellow ${state.fontColourCurrent === 'yellow' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('yellow');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-orange ${state.fontColourCurrent === 'orange' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('orange');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-purple ${state.fontColourCurrent === 'purple' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('purple');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-black ${state.fontColourCurrent === 'black' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('black');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-grey ${state.fontColourCurrent === 'grey' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('grey');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-white ${state.fontColourCurrent === 'white' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('white');
                            },
                        },
                    ),
                ]),
            ]),
            div({ class: 'ab-colour-custom ab-growable ab-flex-column' }, [
                span({ class: 'ab-title' }, 'Custom'),
                span({ class: 'ab-desc' }, [
                    'Click the box below',
                    br(),
                    'to select a custom colour.',
                ]),
                div({ class: 'ab-custom-container ab-flex' }, [
                    div(
                        {
                            class: `ab-custom-box ${state.fontCustomActive ? 'ab-active' : ''}`,
                            id: 'ab-font-colour-custom-box',
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
                                    el: '#ab-font-colour-custom-box',
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
    return div({ class: 'ab-flex ab-flex-column' }, [
        section({ class: 'ab-box ab-flex-column' }, [
            switchEl(state.fontLineSpacingActive, actions.fontLineSpacingEnable, 'Toggle Line Spacing', 'Toggle the page line spacing'),
        ]),
        section({ class: 'ab-box ab-flex-column' }, [
            div({ class: 'ab-counter ab-growable' }, [
                button(
                    {
                        'aria-label': 'Decrease line spacing',
                        class: 'ab-dec ab-bar-button',
                        id: 'ab-ls-dec',
                        onclick: () => {
                            actions.fontLineSpacingDecrement();
                        },
                        oncreate: () => {
                            tippy('#accessabar #ab-ls-dec', {
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
                            class: 'ab-icon ab-icon-minus',
                        }),
                    ],
                ),
                div({ class: 'ab-count-container' }, [
                    span({ class: 'ab-count-header' }, 'Spacing'),
                    span({ class: 'ab-count' }, state.fontLineSpacingCount),
                ]),
                button(
                    {
                        'aria-label': 'Increase line spacing',
                        class: 'ab-inc ab-bar-button',
                        id: 'ab-ls-inc',
                        onclick: () => {
                            actions.fontLineSpacingIncrement();
                        },
                        oncreate: () => {
                            tippy('#accessabar #ab-ls-inc', {
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
                            class: 'ab-icon ab-icon-plus',
                        }),
                    ],
                ),
            ]),
        ]),
    ]);
};

const textOptionsInnerLetterSpacing = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return div({ class: 'ab-flex ab-flex-column' }, [
        section({ class: 'ab-box ab-flex-column' }, [
            switchEl(state.fontLetterSpacingActive, actions.fontLetterSpacingEnable, 'Toggle Letter Spacing', 'Toggle the page letter spacing'),
        ]),
        section({ class: 'ab-box ab-flex-column' }, [
            div({ class: 'ab-counter ab-growable' }, [
                button(
                    {
                        'aria-label': 'Decrease letter spacing',
                        class: 'ab-dec ab-bar-button',
                        id: 'ab-ks-dec',
                        onclick: () => {
                            actions.fontLetterSpacingDecrement();
                        },
                        oncreate: () => {
                            tippy('#accessabar #ab-ks-dec', {
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
                            class: 'ab-icon ab-icon-minus',
                        }),
                    ],
                ),
                div({ class: 'ab-count-container' }, [
                    span({ class: 'ab-count-header' }, 'Spacing'),
                    span({ class: 'ab-count' }, state.fontLetterSpacingCount),
                ]),
                button(
                    {
                        'aria-label': 'Increase letter spacing',
                        class: 'ab-inc ab-bar-button',
                        id: 'ab-ks-inc',
                        onclick: () => {
                            actions.fontLetterSpacingIncrement();
                        },
                        oncreate: () => {
                            tippy('#accessabar #ab-ks-inc', {
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
                            class: 'ab-icon ab-icon-plus',
                        }),
                    ],
                ),
            ]),
        ]),
    ]);
};

const textOptionsInnerMenus = new Map([
    ['font', textOptionsInnerFont],
    ['text_colour', textOptionsInnerTextColour],
    ['line_spacing', textOptionsInnerLineSpacing],
    ['letter_spacing', textOptionsInnerLetterSpacing],
]);

const textOptionsMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    let innerMenu = div();

    if (textOptionsInnerMenus.has(state.textOpsInnerMenuCurrent)) {
        innerMenu = (textOptionsInnerMenus.get(state.textOpsInnerMenuCurrent) || textOptionsInnerFont)(state, actions);
    }

    return div({ class: 'ab-menu-container' }, [
        div({ class: 'ab-menu-tabs' }, [
            button(
                {
                    class: `ab-menu-tab-button ${state.textOpsInnerMenuCurrent === 'font' ? 'ab-active' : ''}`,
                    onclick: () => {
                        actions.menuTextOpsSwitchInner('font');
                    },
                },
                'Font',
            ),
            button(
                {
                    class: `ab-menu-tab-button ${state.textOpsInnerMenuCurrent === 'text_colour' ? 'ab-active' : ''}`,
                    onclick: () => {
                        actions.menuTextOpsSwitchInner('text_colour');
                    },
                },
                'Text Colour',
            ),
            button(
                {
                    class: `ab-menu-tab-button ${state.textOpsInnerMenuCurrent === 'line_spacing' ? 'ab-active' : ''}`,
                    onclick: () => {
                        actions.menuTextOpsSwitchInner('line_spacing');
                    },
                },
                'Line Spacing',
            ),
            button(
                {
                    class: `ab-menu-tab-button ${state.textOpsInnerMenuCurrent === 'letter_spacing' ? 'ab-active' : ''}`,
                    onclick: () => {
                        actions.menuTextOpsSwitchInner('letter_spacing');
                    },
                },
                'Letter Spacing',
            ),
        ]),
        div({ class: 'ab-menu-content' }, [
            innerMenu,
        ]),
    ]);
};

const magMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return div({ class: 'ab-menu-content' }, [
        section({ class: 'ab-box ab-flex-column' }, [
            switchEl(state.magActive, actions.selectToggleMagnifier, 'Show Magnifier', 'Show magnifier'),
        ]),
        section({ class: 'ab-box ab-flex-column' }, [
            div({ class: 'ab-counter ab-growable' }, [
                button(
                    {
                        'aria-label': 'Decrease magnifier zoom',
                        class: 'ab-dec ab-bar-button',
                        id: 'ab-mag-scale-dec',
                        onclick: () => {
                            actions.magScaleDecrease();
                            actions.magUpdatePosition();
                        },
                        oncreate: () => {
                            tippy('#accessabar #ab-mag-scale-dec', {
                                arrow: true,
                                content: 'Decrease Zoom',
                                placement: 'bottom',
                                theme: 'ab',
                            });
                        },
                    },
                    [
                        i({
                            'aria-hidden': true,
                            class: 'ab-icon ab-icon-minus',
                        }),
                    ],
                ),
                div({ class: 'ab-count-container' }, [
                    span({ class: 'ab-count-header' }, 'Zoom'),
                    span({ class: 'ab-count' }, `${new BigNumber(state.magScale).times(100)}%`),
                ]),
                button(
                    {
                        'aria-label': 'Increase magnifier zoom',
                        class: 'ab-inc ab-bar-button',
                        id: 'ab-mag-scale-inc',
                        onclick: () => {
                            actions.magScaleIncrease();
                            actions.magUpdatePosition();
                        },
                        oncreate: () => {
                            tippy('#accessabar #ab-mag-scale-inc', {
                                arrow: true,
                                content: 'Increase Zoom',
                                placement: 'bottom',
                                theme: 'ab',
                            });
                        },
                    },
                    [
                        i({
                            'aria-hidden': true,
                            class: 'ab-icon ab-icon-plus',
                        }),
                    ],
                ),
            ]),
        ]),
    ]);
};

const maskMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return div({ class: 'ab-menu-content' }, [
        section({ class: 'ab-box ab-flex-column' }, [
            switchEl(state.maskActive, actions.selectToggleMask, 'Show Screen Mask', 'Show screen mask'),
        ]),
        section({ class: 'ab-box' }, [
            div({ class: 'ab-colour-presets ab-growable ab-flex-column' }, [
                span({ class: 'ab-title' }, 'Presets'),
                div({ class: 'ab-colours' }, [
                    div(
                        {
                            class: `ab-colour ab-red ${state.maskColourCurrent === 'red' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('red');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-blue ${state.maskColourCurrent === 'blue' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('blue');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-green ${state.maskColourCurrent === 'green' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('green');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-yellow ${state.maskColourCurrent === 'yellow' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('yellow');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-orange ${state.maskColourCurrent === 'orange' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('orange');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-purple ${state.maskColourCurrent === 'purple' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('purple');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-black ${state.maskColourCurrent === 'black' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('black');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-grey ${state.maskColourCurrent === 'grey' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('grey');
                            },
                        },
                    ),
                    div(
                        {
                            class: `ab-colour ab-white ${state.maskColourCurrent === 'white' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('white');
                            },
                        },
                    ),
                ]),
            ]),
            div({ class: 'ab-colour-custom ab-growable ab-flex-column' }, [
                span({ class: 'ab-title' }, 'Custom'),
                span({ class: 'ab-desc' }, [
                    'Click the box below',
                    br(),
                    'to select a custom colour.',
                ]),
                div({ class: 'ab-custom-container ab-flex' }, [
                    div(
                        {
                            class: `ab-custom-box ${state.maskCustomActive ? 'ab-active' : ''}`,
                            id: 'ab-mask-colour-custom-box',
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
                                    el: '#ab-mask-colour-custom-box',
                                    onSave: (hsva) => {
                                        window.abar.appActions.colourCustomChangeMask(hsva.toHEX().toString());
                                    },
                                    useAsButton: true,
                                });
                            },
                            style: { background: state.maskColourCustomCurrent },
                        },
                    ),
                ]),
            ]),
        ]),
    ]);
};

//
// const rulerOptionsInnerMenus = new Map([
//     ['', textOptionsInnerFont],
// ]);

export {
    ttsMenu,
    textOptionsMenu,
    magMenu,
    maskMenu,
};
