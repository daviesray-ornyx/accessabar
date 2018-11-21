import { ActionsType } from 'hyperapp';
import state from '../state';

const resetActions: ActionsType<Accessabar.IState, Accessabar.IResetActions> = {
    resetAll: () => {
        const resetState = {
            menuMouseX: state.menuMouseX,
            menuMouseY: state.menuMouseY,
            // Reset to default position
            menuPosX: 50,
            menuPosY: window.abar.mainElement.getBoundingClientRect().height,

            ttsHighlightSpeak: state.ttsHighlightSpeak,
            ttsHoverSpeak: state.ttsHoverSpeak,
        };

        for (const func of window.abar.appliedFunctions.values()) {
            func();
        }

        window.abar.appliedFunctions.clear();

        return resetState;
    },
};

export default resetActions;
export { resetActions };