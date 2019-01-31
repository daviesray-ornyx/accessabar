import { ActionsType } from 'hyperapp';

const magActions: ActionsType<Accessabar.IState, Accessabar.IMagActions> = {
    magEnable: () => ({ magActive }) => {
        return {
            magActive: !magActive,
        };
    },
};

export default magActions;
export {
    magActions,
};
