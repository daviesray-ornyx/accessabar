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

    colourChangeMask: (colour: string) => ({ maskActive }, { maskColourChange }: Accessabar.IActions) => {
        return {
            maskColourCurrent: colour,
            maskCustomActive: false,
        };
    },

    colourCustomChangeMask: (colour: string) => ({ maskActive }, { maskColourChange }: Accessabar.IActions) => {
        return {
            maskColourCurrent: colour,
            maskColourCustomCurrent: colour,
            maskCustomActive: true,
        };
    },

    // Pinhole mask color change
    colourChangePinholeMask: (colour: string) => ({ maskActive }, { maskColourChange }: Accessabar.IActions) => {
        return {
            rulerPinholeMaskColourCurrent: colour,
            rulerPinholeMaskCustomActive: false,
        };
    },

    colourCustomChangePinholeMask: (colour: string) => ({ maskActive }, { maskColourChange }: Accessabar.IActions) => {
        return {
            rulerPinholeMaskColourCurrent: colour,
            rulerPinholeMaskColourCustomCurrent: colour,
            rulerPinholeMaskCustomActive: true,
        };
    },
};

export default colourActions;
export { colourActions };
