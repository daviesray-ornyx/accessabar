import { ActionsType } from 'hyperapp';

const rulerActions: ActionsType<Accessabar.IState, Accessabar.IRulerActions> = {
    rulerReadingEnable: () => () => {
        return {
            rulerReadingActive: true,
        };
    },

    rulerReadingStop: () => () => {
        return {
            rulerReadingActive: false,
        };
    },
};

export default rulerActions;
export { rulerActions };
