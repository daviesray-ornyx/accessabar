import {
    div,
    header,
    span,
    button,
    i,
} from '@hyperapp/html';
import * as menus from './menus.component';
import tippy from 'tippy.js';

const menuNames = new Map([
    ['tts', menus.ttsMenu],
    ['textOptions', menus.textOptionsMenu],
]);

const placeholderEl = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return div();
};

const menu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    const menuEl = menuNames.has(state.menuCurrent)
        ? menuNames.get(state.menuCurrent) || placeholderEl
        : placeholderEl;

    return div(
        {
            class: `menu draggable ${state.menuHidden ? 'hide' : ''}`,
            id: 'menu',
            oncreate: (el: HTMLElement) => {
                actions.updatePosition(el);
            },
            style: {
                left: state.menuPosX !== false ? `${ state.menuPosX }px` : null,
                top: state.menuPosY !== false ? `${ state.menuPosY }px` : null,
            },
        },
        [
            header(
                {
                    class: 'menu-header flex',
                    onmousedown: (event) => {
                        actions.startDrag(event);
                    },
                    onmouseup: () => {
                        actions.stopDrag();
                    },
                    ontouchcancel: () => {
                        actions.stopDrag();
                    },
                    ontouchend: () => {
                        actions.stopDrag();
                    },
                    ontouchstart: (event) => {
                        actions.startDrag(event);
                    },
                },
                [
                    span({ class: 'menu-header-text' }, state.menuTitle),
                    button(
                        {
                            'aria-label': 'Close menu',
                            class: 'menu-close',
                            id: 'menu-close',
                            onclick: () => {
                                actions.closeMenu();
                            },
                            oncreate: () => {
                                tippy('#accessabar #menu-close', {
                                    arrow: true,
                                    content: 'Close Menu',
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            tabIndex: 1,
                        },
                        [
                            i({
                                'aria-hidden': true,
                                class: 'ab-icon-cancel',
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
