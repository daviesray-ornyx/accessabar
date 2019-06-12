import { ActionsType } from 'hyperapp';
import AccessabarUtil from '../util';

const selectActions: ActionsType<Accessabar.IState, Accessabar.ISelectActions> = {
    selectToggleSpeakHover: () => ({ ttsHoverSpeak }, { ttsHoverStart, ttsStop }: Accessabar.IActions) => {
        if (ttsHoverSpeak) {
            AccessabarUtil.stopFunction('tts');
        } else {
            AccessabarUtil.startFunction('tts', ttsStop, ttsHoverStart);
        }

        return {
            ttsHighlightSpeak: false,
            ttsHoverSpeak: !ttsHoverSpeak,
        };
    },

    selectToggleHighlightSpeak: () => ({ ttsHighlightSpeak }, { ttsHighlightStart, ttsStop }: Accessabar.IActions) => {
        if (ttsHighlightSpeak) {
            AccessabarUtil.stopFunction('tts');
        } else {
            AccessabarUtil.startFunction('tts', ttsStop, ttsHighlightStart);
        }

        return {
            ttsHighlightSpeak: !ttsHighlightSpeak,
            ttsHoverSpeak: false,
        };
    },

    selectToggleFontList: (event: Event) => ({ selectFontListActive }) => {
        return {
            selectFontListActive: !selectFontListActive,
        };
    },

    selectToggleFontCurrent: (key: string) => ({ fontActive }, { fontChangeFamilyAll }: Accessabar.IActions) => {
        if (fontActive) {
            fontChangeFamilyAll(key);
        }

        return {
            fontCurrentKey: key,
            selectFontListActive: false,
        };
    },

    selectToggleMagnifier: () => ({ magActive }, { magEnable, magStop }: Accessabar.IActions) => {
        if (magActive) {
            AccessabarUtil.stopFunction('magnifier');
        } else {
            AccessabarUtil.startFunction('magnifier', magStop, magEnable);
        }
    },

    selectToggleMask: () => ({ maskActive }, { maskEnable, maskStop }: Accessabar.IActions) => {
        if (maskActive) {
            AccessabarUtil.stopFunction('magnifier');
        } else {
            AccessabarUtil.startFunction('magnifier', maskStop, maskEnable);
        }
    },

    selectToggleReadingRuler: () => ({ rulerReadingActive }, { rulerReadingEnable, rulerReadingStop }: Accessabar.IActions) => {
        if (rulerReadingActive) {
            AccessabarUtil.stopFunction('rulerReading');
        } else {
            AccessabarUtil.startFunction('rulerReading', rulerReadingStop, rulerReadingEnable);
        }
    },

    selectTogglePinholeRuler: () => ({ rulerPinholeActive }, { rulerPinholeEnable, rulerPinholeStop }: Accessabar.IActions) => {
        if (rulerPinholeActive) {
            AccessabarUtil.stopFunction('rulerPinhole');
        } else {
            AccessabarUtil.startFunction('rulerPinhole', rulerPinholeStop, rulerPinholeEnable);
        }
    },
};

export default selectActions;
export { selectActions };
