import { ActionsType } from 'hyperapp';

const maskActions: ActionsType<Accessabar.IState, Accessabar.IMaskActions> = {
    maskEnable: () => ({ maskActive }) => {
        console.log(maskActive);
        return {
            maskActive: true,
        };

    },

    maskStop: () => ({ maskActive }) => {
        console.log(maskActive);

        return {
            maskActive: false,
        };
    },

    maskColourChange: (colour: string) => ({ maskColourCurrent }) => {
        const currentColour: string = colour || maskColourCurrent;

        if (currentColour.length <= 0) {
            return;
        }

        return {
            maskColourCurrent: colour,
        };
    },
};

export default maskActions;
export { maskActions };
