import { ActionsType } from 'hyperapp';
import { AccessabarUtil } from '../util';

const utilActions: ActionsType<Accessabar.IState, Accessabar.IUtilActions> = {
    // As the viewport resizes, Accessabar will expand or compress.
    // This function ensures Accessabar remains above the viewport if hidden.
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
