import fontConfig from '../../config/fonts.config.json5';
import { handleButtonNavigation } from './buttons.component';
import { VNode, h } from 'hyperapp';
import tippy from 'tippy.js';
import Pickr from '@simonwep/pickr';
import BigNumber from 'bignumber.js';

const switchEl = (switchState: boolean, switchAction: () => unknown, labelText: string, ariaLabel: string) => {
    return h(
        'ab-switch-label',
        {
            class: 'ab-label',
            onclick: () => {
                switchAction();
            },
        },
        [
            h(
                'ab-switch',
                {
                    'aria-checked': switchState ? 'true' : 'false',
                    'aria-label': ariaLabel,
                    class: `ab-switch ${switchState ? 'ab-on' : 'ab-off'}`,
                    role: 'switch',
                },
                [
                    h('ab-switch-handle', { class: 'ab-handle' }),
                ],
            ),
            h('ab-switch-label-text', {}, labelText),
        ],
    );
};

const ttsMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return h('ab-tts-inner-menu', { class: 'ab-menu-content' }, [
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            switchEl(state.ttsHoverSpeak, actions.selectToggleSpeakHover, 'Speak on hover', 'Toggle speak on hover'),
        ]),
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
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
        const item = h(
            'ab-custom-list-selection-item',
            {
                class: 'ab-custom-list-selection-item',
                onclick: () => {
                    actions.selectToggleFontCurrent(key);
                },
                role: 'option',
                style: {
                    fontFamily: obj.family,
                },
            },
            obj.name,
        );

        fontList.push(item);
    }

    return h('ab-text-options-inner-menu-font', { class: 'ab-flex-column' }, [
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            switchEl(state.fontActive, actions.fontFamilyEnable, 'Toggle Font Type', 'Toggle the page font type'),
        ]),
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            h(
                'ab-font-options-menu',
                {
                    class: 'ab-font-options',
                },
                [
                    h('ab-custom-list', { class: 'ab-custom-list ab-flex ab-flex-column' }, [
                        h(
                            'ab-custom-list-box',
                            {
                                class: `ab-custom-list-box ab-flex ${state.selectFontListActive ? 'ab-active' : ''}`,
                                id: 'ab-custom-list-box',
                                onclick: (event) => {
                                    actions.selectToggleFontList(event);
                                },
                                style: {
                                    fontFamily: currentFontFamily,
                                },
                            },
                            currentFont,
                        ),
                        h(
                            'ab-custom-list-selection',
                            {
                                'aria-labelledby': 'ab-custom-list-box',
                                class: `ab-custom-list-selection ${state.selectFontListActive ? 'ab-flex' : 'ab-hide'} ab-flex-column`,
                                id: 'ab-font-list-selection',
                                role: 'listbox',
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
    return h('ab-text-options-inner-menu-colour', { class: 'ab-flex ab-flex-column' }, [
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            switchEl(state.fontColourActive, actions.fontColourEnable, 'Toggle Text Colour', 'Toggle the page text colour'),
        ]),
        h('ab-inner-menu-section', { class: 'ab-box' }, [
            h('ab-colour-presets', { class: 'ab-colour-presets ab-growable ab-flex-column' }, [
                h('ab-inner-menu-title', { class: 'ab-title' }, 'Presets'),
                h('ab-colours', { class: 'ab-colours' }, [
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change font colour to red',
                            class: `ab-colour ab-red ${state.fontColourCurrent === 'red' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('red');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change font colour to blue',
                            class: `ab-colour ab-blue ${state.fontColourCurrent === 'blue' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('blue');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change font colour to green',
                            class: `ab-colour ab-green ${state.fontColourCurrent === 'green' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('green');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change font colour to yellow',
                            class: `ab-colour ab-yellow ${state.fontColourCurrent === 'yellow' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('yellow');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change font colour to orange',
                            class: `ab-colour ab-orange ${state.fontColourCurrent === 'orange' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('orange');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change font colour to purple',
                            class: `ab-colour ab-purple ${state.fontColourCurrent === 'purple' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('purple');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change font colour to black',
                            class: `ab-colour ab-black ${state.fontColourCurrent === 'black' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('black');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change font colour to grey',
                            class: `ab-colour ab-grey ${state.fontColourCurrent === 'grey' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('grey');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change font colour to white',
                            class: `ab-colour ab-white ${state.fontColourCurrent === 'white' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeFont('white');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                ]),
            ]),
            h('ab-colour-custom', { class: 'ab-colour-custom ab-growable ab-flex-column' }, [
                h('ab-inner-menu-title', { class: 'ab-title' }, 'Custom'),
                h('ab-inner-menu-desc', { id: 'ab-custom-colour-desc-font', class: 'ab-desc' }, [
                    'Click the box below',
                    h('br'),
                    'to select a custom colour.',
                ]),
                h('ab-custom-colour-container', { class: 'ab-custom-container ab-flex' }, [
                    h(
                        'ab-custom-colour-box',
                        {
                            'aria-labelledby': 'ab-custom-colour-desc-font',
                            'aria-pressed': state.fontCustomActive ? 'true' : 'false',
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
                                    theme: 'nano',
                                    useAsButton: true,
                                });

                                window.pickr.on('save', (hsva) => {
                                    window.abar.appActions.colourCustomChangeFont(hsva.toHEXA().toString());
                                });
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                            style: { background: state.fontColourCustomCurrent },
                        },
                    ),
                ]),
            ]),
        ]),
    ]);
};

const textOptionsInnerLineSpacing = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return h('ab-text-options-inner-menu-line-spacing', { class: 'ab-flex ab-flex-column' }, [
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            switchEl(state.fontLineSpacingActive, actions.fontLineSpacingEnable, 'Toggle Line Spacing', 'Toggle the page line spacing'),
        ]),
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            h(
                'ab-counter',
                {
                    'aria-valuemax': String(state.fontLineSpacingMax),
                    'aria-valuemin': '0',
                    'aria-valuenow': String(state.fontLineSpacingCount),
                    'aria-valuetext': String(state.fontLineSpacingCount),
                    class: 'ab-counter ab-growable',
                    role: 'spinbutton',
                },
                [
                    h(
                        'ab-counter-decrease',
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
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-minus',
                            }),
                        ],
                    ),
                    h('ab-count-container', { class: 'ab-count-container' }, [
                        h('ab-count-header', { class: 'ab-count-header' }, 'Spacing'),
                        h('ab-count-value', { class: 'ab-count' }, state.fontLineSpacingCount),
                    ]),
                    h(
                        'ab-counter-increase',
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
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-plus',
                            }),
                        ],
                    ),
                ],
            ),
        ]),
    ]);
};

const textOptionsInnerLetterSpacing = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return h('ab-text-options-inner-menu-letter-spacing', { class: 'ab-flex ab-flex-column' }, [
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            switchEl(state.fontLetterSpacingActive, actions.fontLetterSpacingEnable, 'Toggle Letter Spacing', 'Toggle the page letter spacing'),
        ]),
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            h(
                'ab-counter',
                {
                    'aria-valuemax': String(state.fontLetterSpacingMax),
                    'aria-valuemin': '0',
                    'aria-valuenow': String(state.fontLetterSpacingCount),
                    'aria-valuetext': String(state.fontLetterSpacingCount),
                    class: 'ab-counter ab-growable',
                    role: 'spinbutton',
                },
                [
                    h(
                        'ab-counter-decrease',
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
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-minus',
                            }),
                        ],
                    ),
                    h('ab-count-container', { class: 'ab-count-container' }, [
                        h('ab-count-header', { class: 'ab-count-header' }, 'Spacing'),
                        h('ab-count-value', { class: 'ab-count' }, state.fontLetterSpacingCount),
                    ]),
                    h(
                        'ab-counter-increase',
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
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-plus',
                            }),
                        ],
                    ),
                ],
            ),
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
    let innerMenu = h('ab-placeholder', {}, '');

    if (textOptionsInnerMenus.has(state.textOpsInnerMenuCurrent)) {
        innerMenu = (textOptionsInnerMenus.get(state.textOpsInnerMenuCurrent) || textOptionsInnerFont)(state, actions);
    }

    return h('ab-menu-container', { class: 'ab-menu-container' }, [
        h('ab-menu-tabs', { class: 'ab-menu-tabs', role: 'tablist' }, [
            h(
                'ab-tab-button',
                {
                    'aria-selected': state.textOpsInnerMenuCurrent === 'font' ? 'true' : 'false',
                    class: `ab-menu-tab-button ${state.textOpsInnerMenuCurrent === 'font' ? 'ab-active' : ''}`,
                    onclick: () => {
                        actions.menuTextOpsSwitchInner('font');
                    },
                    onkeydown: handleButtonNavigation,
                    role: 'tab',
                },
                'Font',
            ),
            h(
                'ab-tab-button',
                {
                    'aria-selected': state.textOpsInnerMenuCurrent === 'text_colour' ? 'true' : 'false',
                    class: `ab-menu-tab-button ${state.textOpsInnerMenuCurrent === 'text_colour' ? 'ab-active' : ''}`,
                    onclick: () => {
                        actions.menuTextOpsSwitchInner('text_colour');
                    },
                    onkeydown: handleButtonNavigation,
                    role: 'tab',
                },
                'Text Colour',
            ),
            h(
                'ab-tab-button',
                {
                    'aria-selected': state.textOpsInnerMenuCurrent === 'line_spacing' ? 'true' : 'false',
                    class: `ab-menu-tab-button ${state.textOpsInnerMenuCurrent === 'line_spacing' ? 'ab-active' : ''}`,
                    onclick: () => {
                        actions.menuTextOpsSwitchInner('line_spacing');
                    },
                    onkeydown: handleButtonNavigation,
                    role: 'tab',
                },
                'Line Spacing',
            ),
            h(
                'ab-tab-button',
                {
                    'aria-selected': state.textOpsInnerMenuCurrent === 'letter_spacing' ? 'true' : 'false',
                    class: `ab-menu-tab-button ${state.textOpsInnerMenuCurrent === 'letter_spacing' ? 'ab-active' : ''}`,
                    onclick: () => {
                        actions.menuTextOpsSwitchInner('letter_spacing');
                    },
                    onkeydown: handleButtonNavigation,
                    role: 'tab',
                },
                'Letter Spacing',
            ),
        ]),
        h(
            'ab-inner-menu-container',
            {
                class: 'ab-menu-content',
                role: 'tabpanel',
            },
            [
                innerMenu,
            ],
        ),
    ]);
};

const magMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    const currentMagPercentage = new BigNumber(state.magScale).times(100);

    return h('ab-mag-inner-menu', { class: 'ab-menu-content' }, [
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            switchEl(state.magActive, actions.selectToggleMagnifier, 'Show Magnifier', 'Show magnifier'),
        ]),
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            h(
                'ab-counter',
                {
                    'aria-valuemax': '500',
                    'aria-valuemin': '50',
                    'aria-valuenow': currentMagPercentage,
                    'aria-valuetext': `${currentMagPercentage}%`,
                    class: 'ab-counter ab-growable',
                    role: 'spinbutton',
                },
                [
                    h(
                        'ab-counter-decrease',
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
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-minus',
                            }),
                        ],
                    ),
                    h('ab-count-container', { class: 'ab-count-container' }, [
                        h('ab-count-header', { class: 'ab-count-header' }, 'Zoom'),
                        h('ab-count-value', { class: 'ab-count' }, `${currentMagPercentage}%`),
                    ]),
                    h(
                        'ab-counter-increase',
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
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-plus',
                            }),
                        ],
                    ),
                ],
            ),
        ]),
    ]);
};

const maskMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    const opacityCurrentPercentage = new BigNumber(state.maskOpacity).times(100);

    return h('ab-inner-menu-mask', { class: 'ab-menu-content' }, [
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            switchEl(state.maskActive, actions.selectToggleMask, 'Show Screen Mask', 'Show screen mask'),
        ]),
        h('ab-inner-menu-section', { class: 'ab-box' }, [
            h('ab-colour-presets', { class: 'ab-colour-presets ab-growable ab-flex-column' }, [
                h('ab-inner-menu-title', { class: 'ab-title' }, 'Presets'),
                h('ab-colours', { class: 'ab-colours' }, [
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change mask colour to red',
                            class: `ab-colour ab-red ${state.maskColourCurrent === 'red' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('red');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change mask colour to blue',
                            class: `ab-colour ab-blue ${state.maskColourCurrent === 'blue' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('blue');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change mask colour to green',
                            class: `ab-colour ab-green ${state.maskColourCurrent === 'green' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('green');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change mask colour to yellow',
                            class: `ab-colour ab-yellow ${state.maskColourCurrent === 'yellow' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('yellow');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change mask colour to orange',
                            class: `ab-colour ab-orange ${state.maskColourCurrent === 'orange' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('orange');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change mask colour to purple',
                            class: `ab-colour ab-purple ${state.maskColourCurrent === 'purple' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('purple');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change mask colour to black',
                            class: `ab-colour ab-black ${state.maskColourCurrent === 'black' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('black');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change mask colour to grey',
                            class: `ab-colour ab-grey ${state.maskColourCurrent === 'grey' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('grey');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                    h(
                        'ab-colour',
                        {
                            'aria-label': 'Change mask colour to white',
                            class: `ab-colour ab-white ${state.maskColourCurrent === 'white' ? 'ab-active' : ''}`,
                            onclick: () => {
                                actions.colourChangeMask('white');
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                    ),
                ]),
            ]),
            h('ab-colour-custom', { class: 'ab-colour-custom ab-growable ab-flex-column' }, [
                h('ab-inner-menu-title', { class: 'ab-title' }, 'Custom'),
                h('ab-inner-menu-desc', { id: 'ab-custom-colour-desc-mask', class: 'ab-desc' }, [
                    'Click the box below',
                    h('br'),
                    'to select a custom colour.',
                ]),
                h('ab-custom-colour-container', { class: 'ab-custom-container ab-flex' }, [
                    h(
                        'ab-custom-colour-box',
                        {
                            'aria-labelledby': 'ab-custom-colour-desc-mask',
                            'aria-pressed': state.maskCustomActive ? 'true' : 'false',
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
                                    theme: 'nano',
                                    useAsButton: true,
                                });

                                window.pickr.on('save', (hsva) => {
                                    window.abar.appActions.colourCustomChangeMask(hsva.toHEXA().toString());
                                });
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                            style: { background: state.maskColourCustomCurrent },
                        },
                    ),
                ]),
            ]),
        ]),
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            h(
                'ab-counter',
                {
                    'aria-valuemax': '95',
                    'aria-valuemin': '5',
                    'aria-valuenow': opacityCurrentPercentage,
                    'aria-valuetext': `${opacityCurrentPercentage}%`,
                    class: 'ab-counter ab-growable',
                    role: 'spinbutton',
                },
                [
                    h(
                        'ab-counter-decrease',
                        {
                            'aria-label': 'Decrease mask opacity',
                            class: 'ab-dec ab-bar-button',
                            id: 'ab-mask-opacity-dec',
                            onclick: () => {
                                actions.maskDecreaseOpacity();
                            },
                            oncreate: () => {
                                tippy('#accessabar #ab-mask-opacity-dec', {
                                    arrow: true,
                                    content: 'Decrease Mask Opacity',
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-minus',
                            }),
                        ],
                    ),
                    h('ab-count-container', { class: 'ab-count-container' }, [
                        h('ab-count-header', { class: 'ab-count-header' }, 'Opacity'),
                        h('ab-count-value', { class: 'ab-count' }, `${opacityCurrentPercentage}%`),
                    ]),
                    h(
                        'ab-counter-increase',
                        {
                            'aria-label': 'Increase mask opacity',
                            class: 'ab-inc ab-bar-button',
                            id: 'ab-mask-opacity-inc',
                            onclick: () => {
                                actions.maskIncreaseOpacity();
                            },
                            oncreate: () => {
                                tippy('#accessabar #ab-mask-opacity-inc', {
                                    arrow: true,
                                    content: 'Increase Zoom',
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-plus',
                            }),
                        ],
                    ),
                ],
            ),
        ]),
    ]);
};

const rulerOptionsInnerReading = (state, actions) => {
    const rulerReadingOpacityPercentage = new BigNumber(state.rulerReadingOpacity).times(100);

    return h('ab-ruler-options-inner-menu-reading', { class: 'ab-flex-column' }, [
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            switchEl(state.rulerReadingActive, actions.selectToggleReadingRuler, 'Toggle Reading Ruler', 'Toggle the reading ruler'),
        ]),
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            h(
                'ab-counter',
                {
                    'aria-valuemax': '90',
                    'aria-valuemin': '20',
                    'aria-valuenow': rulerReadingOpacityPercentage,
                    'aria-valuetext': `${rulerReadingOpacityPercentage}%`,
                    class: 'ab-counter ab-growable',
                    role: 'spinbutton',
                },
                [
                    h(
                        'ab-counter-decrease',
                        {
                            'aria-label': 'Decrease reading ruler opacity',
                            class: 'ab-dec ab-bar-button',
                            id: 'ab-reading-ruler-opacity-dec',
                            onclick: () => {
                                actions.rulerReadingOpacityDec();
                            },
                            oncreate: () => {
                                tippy('#accessabar #ab-reading-ruler-opacity-dec', {
                                    arrow: true,
                                    content: 'Decrease Ruler Opacity',
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-minus',
                            }),
                        ],
                    ),
                    h('ab-count-container', { class: 'ab-count-container' }, [
                        h('ab-count-header', { class: 'ab-count-header' }, 'Opacity'),
                        h('ab-count-value', { class: 'ab-count' }, `${rulerReadingOpacityPercentage}%`),
                    ]),
                    h(
                        'ab-counter-increase',
                        {
                            'aria-label': 'Increase reading ruler opacity',
                            class: 'ab-inc ab-bar-button',
                            id: 'ab-reading-ruler-opacity-inc',
                            onclick: () => {
                                actions.rulerReadingOpacityInc();
                            },
                            oncreate: () => {
                                tippy('#accessabar #ab-ruler-reading-opacity-inc', {
                                    arrow: true,
                                    content: 'Increase Ruler Opacity',
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-plus',
                            }),
                        ],
                    ),
                ],
            ),
        ]),
    ]);
};

const rulerOptionsInnerPinhole = (state, actions) => {
    const size = state.rulerPinholeCentreHeight / state.rulerPinholeCentreHeightStep;
    const rulerPinholeOpacityPercentage = new BigNumber(state.rulerPinholeOpacity).times(100);

    return h('ab-ruler-options-inner-menu-pinhole', { class: 'ab-flex-column' }, [
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            switchEl(state.rulerPinholeActive, actions.selectTogglePinholeRuler, 'Toggle Pinhole Ruler', 'Toggle the pinhole ruler'),
        ]),
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            h(
                'ab-counter',
                {
                    'aria-valuemax': '90',
                    'aria-valuemin': '20',
                    'aria-valuenow': rulerPinholeOpacityPercentage,
                    'aria-valuetext': `${rulerPinholeOpacityPercentage}%`,
                    class: 'ab-counter ab-growable',
                    role: 'spinbutton',
                },
                [
                    h(
                        'ab-counter-decrease',
                        {
                            'aria-label': 'Decrease pinhole ruler opacity',
                            class: 'ab-dec ab-bar-button',
                            id: 'ab-pinhole-ruler-opacity-dec',
                            onclick: () => {
                                actions.rulerPinholeOpacityDec();
                            },
                            oncreate: () => {
                                tippy('#accessabar #ab-pinhole-ruler-opacity-dec', {
                                    arrow: true,
                                    content: 'Decrease Ruler Opacity',
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-minus',
                            }),
                        ],
                    ),
                    h('ab-count-container', { class: 'ab-count-container' }, [
                        h('ab-count-header', { class: 'ab-count-header' }, 'Opacity'),
                        h('ab-count-value', { class: 'ab-count' }, `${rulerPinholeOpacityPercentage}%`),
                    ]),
                    h(
                        'ab-counter-increase',
                        {
                            'aria-label': 'Increase pinhole ruler opacity',
                            class: 'ab-inc ab-bar-button',
                            id: 'ab-pinhole-ruler-opacity-inc',
                            onclick: () => {
                                actions.rulerPinholeOpacityInc();
                            },
                            oncreate: () => {
                                tippy('#accessabar #ab-ruler-pinhole-opacity-inc', {
                                    arrow: true,
                                    content: 'Increase Ruler Opacity',
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-plus',
                            }),
                        ],
                    ),
                ],
            ),
        ]),
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            h(
                'ab-counter',
                {
                    'aria-valuemax': String(state.rulerPinholeCentreHeightMax / state.rulerPinholeCentreHeightStep),
                    'aria-valuemin': '1',
                    'aria-valuenow': String(size),
                    'aria-valuetext': String(size),
                    class: 'ab-counter ab-growable',
                    role: 'spinbutton',
                },
                [
                    h(
                        'ab-counter-decrease',
                        {
                            'aria-label': 'Decrease pinhole ruler size',
                            class: 'ab-dec ab-bar-button',
                            id: 'ab-pinhole-ruler-size-dec',
                            onclick: () => {
                                actions.rulerPinholeSizeDec();
                            },
                            oncreate: () => {
                                tippy('#accessabar #ab-pinhole-ruler-size-dec', {
                                    arrow: true,
                                    content: 'Decrease Ruler Size',
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-minus',
                            }),
                        ],
                    ),
                    h('ab-count-container', { class: 'ab-count-container' }, [
                        h('ab-count-header', { class: 'ab-count-header' }, 'Size'),
                        h('ab-count-value', { class: 'ab-count' }, size),
                    ]),
                    h(
                        'ab-counter-increase',
                        {
                            'aria-label': 'Increase pinhole ruler size',
                            class: 'ab-inc ab-bar-button',
                            id: 'ab-pinhole-ruler-size-inc',
                            onclick: () => {
                                actions.rulerPinholeSizeInc();
                            },
                            oncreate: () => {
                                tippy('#accessabar #ab-ruler-pinhole-size-inc', {
                                    arrow: true,
                                    content: 'Increase Ruler Size',
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': true,
                                class: 'ab-icon ab-icon-plus',
                            }),
                        ],
                    ),
                ],
            ),
        ]),
    ]);
};

const rulerOptionsInnerMenus = new Map([
    ['reading', rulerOptionsInnerReading],
    ['pinhole', rulerOptionsInnerPinhole],
]);

const rulerOptionsMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    let innerMenu = h('ab-placeholder', {}, '');

    if (rulerOptionsInnerMenus.has(state.rulerOpsInnerMenuCurrent)) {
        innerMenu = (rulerOptionsInnerMenus.get(state.rulerOpsInnerMenuCurrent) || rulerOptionsInnerReading)(state, actions);
    }

    return h('ab-menu-container', { class: 'ab-menu-container' }, [
        h('ab-menu-tabs', { class: 'ab-menu-tabs', role: 'tablist' }, [
            h(
                'ab-tab-button',
                {
                    'aria-selected': state.rulerOpsInnerMenuCurrent === 'reading' ? 'true' : 'false',
                    class: `ab-menu-tab-button ${state.rulerOpsInnerMenuCurrent === 'reading' ? 'ab-active' : ''}`,
                    onclick: () => {
                        actions.menuRulerOpsSwitchInner('reading');
                    },
                    onkeydown: handleButtonNavigation,
                    role: 'tab',
                },
                'Reading',
            ),
            h(
                'ab-tab-button',
                {
                    'aria-selected': state.rulerOpsInnerMenuCurrent === 'pinhole' ? 'true' : 'false',
                    class: `ab-menu-tab-button ${state.rulerOpsInnerMenuCurrent === 'pinhole' ? 'ab-active' : ''}`,
                    onclick: () => {
                        actions.menuRulerOpsSwitchInner('pinhole');
                    },
                    onkeydown: handleButtonNavigation,
                    role: 'tab',
                },
                'Pinhole',
            ),
        ]),
        h(
            'ab-inner-menu-container',
            {
                class: 'ab-menu-content',
                role: 'tabpanel',
            },
            [
                innerMenu,
            ],
        ),
    ]);
};

const srMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return h('ab-sr-inner-menu', { class: 'ab-menu-content' }, [
        h('ab-inner-menu-section', { class: 'ab-box ab-flex-column' }, [
            switchEl(state.srActive, actions.selectToggleSpeechRecognition, 'Activate Speech Recognition', 'Activate Speech Recognition'),
        ]),
    ]);
};

export {
    ttsMenu,
    textOptionsMenu,
    magMenu,
    maskMenu,
    rulerOptionsMenu,
    srMenu,
};
