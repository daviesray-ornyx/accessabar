import { ActionsType } from 'hyperapp';

const selectActions: ActionsType<Accessabar.IState, Accessabar.ISelectActions> = {
    selectToggleFontList: (event: Event) => ({ selectFontListActive }, actions) => {
        return {
            selectFontListActive: !selectFontListActive,
        };
    },
};

export default selectActions;
export { selectActions };
