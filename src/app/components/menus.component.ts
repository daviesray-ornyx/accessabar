import {
    div,
    header,
    span,
} from '@hyperapp/html';
interface IMenuComponentState {
    menuHidden: Accessabar.IState['menuHidden'];
    menuPosX: Accessabar.IState['menuPosX'];
    menuPosY: Accessabar.IState['menuPosY'];
}

interface IMenuComponentActions {
    addMenuListener: Accessabar.IMenuActions['addMenuListener'];
    updatePosition: Accessabar.IMenuActions['updatePosition'];
    startDrag: Accessabar.IMenuActions['startDrag'];
    stopDrag: Accessabar.IMenuActions['stopDrag'];
}

const menu = ({ menuPosX, menuPosY, menuHidden }: IMenuComponentState, { addMenuListener, updatePosition, startDrag, stopDrag }: IMenuComponentActions) => {
    return div(
        {
            class: `menu draggable ${menuHidden ? 'hide' : ''}`,
            id: 'menu',
            oncreate: (el: HTMLElement) => {
                updatePosition(el);
                addMenuListener();
            },
            style: {
                left: menuPosX !== false ? `${ menuPosX }px` : null,
                top: menuPosY !== false ? `${ menuPosY }px` : null,
            },
        },
        [
            header(
                {
                    class: 'menu-header',
                    onmousedown: (event) => {
                        startDrag(event);
                    },
                    onmouseup: () => {
                        stopDrag();
                    },
                    ontouchcancel: () => {
                        stopDrag();
                    },
                    ontouchend: () => {
                        stopDrag();
                    },
                    ontouchstart: (event) => {
                        startDrag(event);
                    },
                },
                [
                    span({ class: 'menu-header-text' }, 'Active Menu'),
                ],
            ),
        ],
    );
};

export default menu;
export {
    menu,
};
