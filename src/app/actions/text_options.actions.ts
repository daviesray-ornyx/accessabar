import { ActionsType } from 'hyperapp';

const textOptionsActions: ActionsType<Accessabar.IState, Accessabar.ITextOptionsActions> = {
    textOpsSwitchInner: (current: string) => () => {
        return {
            textOpsInnerMenuCurrent: current,
        };
    },
};

export default textOptionsActions;
export { textOptionsActions };
