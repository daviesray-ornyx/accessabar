import {
    div,
    header,
    span,
} from '@hyperapp/html';
import * as menus from './menus.component';

const menuNames = new Map([
    ['tts', menus.ttsMenu],
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
                actions.addMenuListener();
            },
            style: {
                left: state.menuPosX !== false ? `${ state.menuPosX }px` : null,
                top: state.menuPosY !== false ? `${ state.menuPosY }px` : null,
            },
        },
        [
            header(
                {
                    class: 'menu-header',
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
