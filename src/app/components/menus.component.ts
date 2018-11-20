import {
    div,
    header,
    span,
} from '@hyperapp/html';
interface IMenuComponentState {
    menuPosX: Accessabar.IState['menuPosX'];
    menuPosY: Accessabar.IState['menuPosY'];
}

interface IMenuComponentActions {
    addMenuListener: Accessabar.IMenuActions['addMenuListener'];
    updatePosition: Accessabar.IMenuActions['updatePosition'];
    startDrag: Accessabar.IMenuActions['startDrag'];
    stopDrag: Accessabar.IMenuActions['stopDrag'];
}

const menu = ({ menuPosX, menuPosY }: IMenuComponentState, { addMenuListener, updatePosition, startDrag, stopDrag }: IMenuComponentActions) => {
    return div(
        {
            class: 'menu draggable',
            id: 'menu',
            oncreate: (el) => {
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
