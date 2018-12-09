import { ActionsType } from 'hyperapp';

const textOptionsActions: ActionsType<Accessabar.IState, Accessabar.ITextOptionsActions> = {
    textOpsOpen: () => (state, { openMenu }: Accessabar.IActions) => {
        openMenu('textOptions');
    },

    textOpsClose: () => (state, { closeMenu }: Accessabar.IActions) => {
        closeMenu('textOptions');
    },

    textOpsSwitchInner: (current: string) => () => {
        return {
            textOpsInnerMenuCurrent: current,
        };
    },
};

export default textOptionsActions;
export { textOptionsActions };
