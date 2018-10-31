import { ActionsType } from 'hyperapp';

const actions: ActionsType<Accessabar.IState, Accessabar.IActions> = {
    abarHide: () => ({ abarHidden }) => {
        const abar = document.getElementById('accessabar');

        if (!abar) {
            return;
        }

        if (abarHidden) {
            abar.style.top = '0';

            return { abarHidden: false };
        }

        const rect = abar.getBoundingClientRect();

        abar.style.top = `-${rect.height - 2}px`;
        return { abarHidden: true };
    },
};

export default actions;
