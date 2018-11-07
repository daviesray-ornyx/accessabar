import { ActionsType } from 'hyperapp';
import { AccessabarUtil } from '../';

const utilActions: ActionsType<Accessabar.IState, Accessabar.IUtilActions> = {
    abarResize: () => ({ abarHidden }) => {
        const { mainElement } = window.abar;

        if (!mainElement) {
            return;
        }

        if (abarHidden) {
            const rect = mainElement.getBoundingClientRect();

            mainElement.style.top = `-${rect.height - 2}px`;

            return;
        }

        AccessabarUtil.moveBody();
    },
};

export default utilActions;
export { utilActions };
