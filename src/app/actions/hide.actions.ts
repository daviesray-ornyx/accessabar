import { ActionsType } from 'hyperapp';
import { AccessabarUtil } from '../util';

const hideActions: ActionsType<Accessabar.IState, Accessabar.IHideActions> = {
    // Hides accessabar
    abarHide: () => ({ abarHidden }) => {
        const { mainElement } = window.abar;

        if (!mainElement) {
            return;
        }

        if (abarHidden) {
            mainElement.style.top = '0';

            AccessabarUtil.moveBody();

            return { abarHidden: false };
        }

        // Get height of Accessabar, then push Accessabar above the window view
        // by that height - 2px (allows a small amount of Accessabar to still show).
        const rect = mainElement.getBoundingClientRect();

        mainElement.style.top = `-${rect.height - 2}px`;
        document.body.style.marginTop = '2px';

        return { abarHidden: true };
    },
};

export default hideActions;
export { hideActions };
