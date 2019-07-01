import { ActionsType } from 'hyperapp';
import { AccessabarUtil } from '../util';

const hideActions: ActionsType<Accessabar.IState, Accessabar.IHideActions> = {
    // Hides accessabar
    abarHide: () => ({ abarHidden, menuActive }, { menuToggleHide }: Accessabar.IActions) => {
        const { mainElement, moveBody } = window.abar;

        if (!mainElement) {
            return;
        }

        const bar = mainElement.querySelector('.ab-bar');

        if (!bar) {
            return;
        }

        if (abarHidden) {
            mainElement.style.top = '0';

            if (moveBody) {
                AccessabarUtil.moveBody();
            }

            if (menuActive) {
                menuToggleHide();
            }

            return { abarHidden: false };
        }

        // Get height of Accessabar, then push Accessabar above the window view
        // by that height - 2px (allows a small amount of Accessabar to still show).
        const rect = bar.getBoundingClientRect();

        mainElement.style.top = `-${rect.height - 2}px`;

        if (moveBody) {
            document.body.style.marginTop = '2px';
        }

        if (menuActive) {
            menuToggleHide();
        }

        return { abarHidden: true };
    },
};

export default hideActions;
export { hideActions };
