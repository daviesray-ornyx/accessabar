import { ActionsType } from 'hyperapp';

const resetActions: ActionsType<Accessabar.IState, Accessabar.IResetActions> = {
    resetAll: () => {
        for (const func of window.abar.appliedFunctions.values()) {
            func();
        }

        window.abar.appliedFunctions.clear();
    },
};

export default resetActions;
export { resetActions };
