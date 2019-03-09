import { ActionsType } from 'hyperapp';
import state from '../state';

const resetActions: ActionsType<Accessabar.IState, Accessabar.IResetActions> = {
    resetAll: () => {
        const resetState = {
            magActive: state.magActive,

            menuMouseX: state.menuMouseX,
            menuMouseY: state.menuMouseY,
            // Reset to default position
            menuPosX: 50,
            menuPosY: window.abar.mainElement.getBoundingClientRect().height,

            ttsHighlightSpeak: state.ttsHighlightSpeak,
            ttsHoverSpeak: state.ttsHoverSpeak,

            fontActive: state.fontActive,
            fontColourActive: state.fontColourActive,
            fontLetterSpacingActive: state.fontLetterSpacingActive,
            fontLetterSpacingCount: state.fontLetterSpacingCount,
            fontLineSpacingActive: state.fontLineSpacingActive,
            fontLineSpacingCount: state.fontLineSpacingCount,

            selectFontListActive: state.selectFontListActive,
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
