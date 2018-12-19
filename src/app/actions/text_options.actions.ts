import { ActionsType } from 'hyperapp';

const textOptionsActions: ActionsType<Accessabar.IState, Accessabar.ITextOptionsActions> = {
    textOpsOpen: () => (state, { handleMenu }: Accessabar.IActions) => {
        handleMenu('textOptions');
    },

    textOpsClose: () => (state, { handleMenu }: Accessabar.IActions) => {
        handleMenu('textOptions');
    },

    textOpsSwitchInner: (current: string) => () => {
        return {
            textOpsInnerMenuCurrent: current,
        };
    },
};

export default textOptionsActions;
export { textOptionsActions };
