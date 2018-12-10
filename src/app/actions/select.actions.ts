import { ActionsType } from 'hyperapp';

const selectActions: ActionsType<Accessabar.IState, Accessabar.ISelectActions> = {
    selectToggleFontList: (event: Event) => ({ selectFontListActive }) => {
        return {
            selectFontListActive: !selectFontListActive,
        };
    },

    selectToggleFontCurrent: (key: string) => ({ fontActive }, { fontChangeFamilyAll }: Accessabar.IActions) => {
        if (fontActive) {
            fontChangeFamilyAll(key);
        }

        return {
            fontCurrentKey: key,
            selectFontListActive: false,
        };
    },
};

export default selectActions;
export { selectActions };
