import { h } from 'hyperapp';
import { handleButtonNavigation } from './buttons.component';
import * as menus from './menus.component';
import tippy from 'tippy.js';

const menuNames = new Map([
    ['tts', menus.ttsMenu],
    ['textOptions', menus.textOptionsMenu],
    ['magnifier', menus.magMenu],
    ['masking', menus.maskMenu],
    ['rulerOptions', menus.rulerOptionsMenu],
    ['speechRecognition', menus.srMenu],
]);

const placeholderEl = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return h('ab-placeholder');
};

const menu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    const menuEl = menuNames.has(state.menuCurrent)
        ? menuNames.get(state.menuCurrent) || placeholderEl
        : placeholderEl;

    return h(
        'ab-menu',
        {
            'aria-label': `${state.menuTitle} Menu`,
            class: `ab-menu ab-draggable ${state.menuHidden ? 'ab-hide' : ''}`,
            id: 'ab-menu',
            oncreate: (el: HTMLElement) => {
                actions.menuUpdatePosition(el);
            },
            style: {
                left: state.menuPosX !== false ? `${ state.menuPosX }px` : null,
                top: state.menuPosY !== false ? `${ state.menuPosY }px` : null,
            },
        },
        [
            h(
                'ab-menu-header',
                {
                    'aria-label': 'Hold left mouse button to drag the menu',
                    class: 'ab-menu-header ab-flex',
                    onmousedown: (event) => {
                        actions.menuStartDrag(event);
                    },
                    ontouchstart: (event) => {
                        actions.menuStartDrag(event);
                    },
                },
                [
                    h('ab-menu-header-text', { class: 'ab-menu-header-text' }, state.menuTitle),
                    h(
                        'ab-menu-close-button',
                        {
                            'aria-label': 'Close menu',
                            class: 'ab-menu-close',
                            id: 'ab-menu-close',
                            onclick: () => {
                                actions.menuClose();
                            },
                            oncreate: () => {
                                tippy('#accessabar #ab-menu-close', {
                                    arrow: true,
                                    content: 'Close Menu',
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                            tabIndex: 1,
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': 'true',
                                class: 'ab-icon ab-icon-cross',
                            }),
                        ],
                    ),
                ],
            ),
            menuEl(state, actions),
        ],
    );
};

export default menu;
export {
    menu,
};
