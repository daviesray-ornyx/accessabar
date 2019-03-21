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
};

export default selectActions;
export { selectActions };
