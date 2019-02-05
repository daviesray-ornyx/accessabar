import { ActionsType } from 'hyperapp';

const magActions: ActionsType<Accessabar.IState, Accessabar.IMagActions> = {
    magEnable: () => ({ magActive }) => {
        console.log('start');
    },

    magStop: () => ({ magActive }) => {
        console.log('stop');
    },
};

export default magActions;
export {
    magActions,
};
