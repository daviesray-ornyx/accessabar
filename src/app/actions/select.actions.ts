import { ActionsType } from 'hyperapp';

const selectActions: ActionsType<Accessabar.IState, Accessabar.ISelectActions> = {
    selectToggleFontList: (event: Event) => ({ selectFontListActive }) => {
        return {
            selectFontListActive: !selectFontListActive,
        };
    },

    selectToggleFontCurrent: (key: string) => () => {
        return {
            fontCurrentKey: key,
        };
    },
};

export default selectActions;
export { selectActions };
