import { ActionsType } from 'hyperapp';

const colourActions: ActionsType<Accessabar.IState, Accessabar.IColourActions> = {
    colourChangeFont: (colour: string) => ({ fontColourActive }, { fontColourChange }: Accessabar.IActions) => {
        if (fontColourActive) {
            fontColourChange(colour);
        }

        return {
            fontColourCurrent: colour,
            fontCustomActive: false,
        };
    },

    colourCustomChangeFont: (colour: string) => ({ fontColourActive }, { fontColourChange }: Accessabar.IActions) => {
        if (fontColourActive) {
            fontColourChange(colour);
        }

        return {
            fontColourCurrent: colour,
            fontColourCustomCurrent: colour,
            fontCustomActive: true,
        };
    },
};

export default colourActions;
export { colourActions };
