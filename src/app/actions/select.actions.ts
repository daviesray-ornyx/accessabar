import { ActionsType } from 'hyperapp';

const selectActions: ActionsType<Accessabar.IState, Accessabar.ISelectActions> = {
    selectToggleFontList: (event: Event) => ({ selectFontListActive }) => {
        return {
            selectFontListActive: !selectFontListActive,
        };
    },

    selectToggleFontCurrent: (key: string) => ({ fontActive }, { fontChangeAll }: Accessabar.IActions) => {
        if (fontActive) {
            fontChangeAll(key);
        }

        return {
            fontCurrentKey: key,
            selectFontListActive: false,
        };
    },
};

export default selectActions;
export { selectActions };
