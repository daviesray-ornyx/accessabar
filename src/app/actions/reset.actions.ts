import { ActionsType } from 'hyperapp';
import state from '../state';

const resetActions: ActionsType<Accessabar.IState, Accessabar.IResetActions> = {
    resetAll: () => {
        const resetState = {
            fontActive: state.fontActive,
            fontColourActive: state.fontColourActive,
            fontColourCurrent: state.fontColourCurrent,
            fontColourCustomCurrent: state.fontColourCustomCurrent,
            fontLetterSpacingActive: state.fontLetterSpacingActive,
            fontLetterSpacingCount: state.fontLetterSpacingCount,
            fontLineSpacingActive: state.fontLineSpacingActive,
            fontLineSpacingCount: state.fontLineSpacingCount,

            magActive: state.magActive,
            magScale: state.magScale,

            maskColourCurrent: state.maskColourCurrent,
            maskColourCustomCurrent: state.maskColourCustomCurrent,
            maskOpacity: state.maskOpacity,

            menuMouseX: state.menuMouseX,
            menuMouseY: state.menuMouseY,
            // Reset to default position
            menuPosX: 50,
            menuPosY: window.abar.mainElement.getBoundingClientRect().height,

            rulerPinholeCentreHeight: state.rulerPinholeCentreHeight,
            rulerPinholeOpacity: state.rulerPinholeOpacity,
            rulerReadingOpacity: state.rulerReadingOpacity,

            ttsHighlightSpeak: state.ttsHighlightSpeak,
            ttsHoverSpeak: state.ttsHoverSpeak,

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
