import { ActionsType } from 'hyperapp';
import AccessabarUtil from '../util';

const selectActions: ActionsType<Accessabar.IState, Accessabar.ISelectActions> = {
    selectToggleSpeakHover: () => ({ ttsHoverSpeak }, { ttsHoverStart, ttsStop, apiSendEvent }: Accessabar.IActions) => {
        if (ttsHoverSpeak) {
            AccessabarUtil.stopFunction('tts');
        } else {
            AccessabarUtil.startFunction('tts', ttsStop, ttsHoverStart);
            apiSendEvent('AceTTSHover_On');
        }

        return {
            ttsHighlightSpeak: false,
            ttsHoverSpeak: !ttsHoverSpeak,
        };
    },

    selectToggleHighlightSpeak: () => ({ ttsHighlightSpeak }, { ttsHighlightStart, ttsStop, apiSendEvent }: Accessabar.IActions) => {
        if (ttsHighlightSpeak) {
            AccessabarUtil.stopFunction('tts');
        } else {
            AccessabarUtil.startFunction('tts', ttsStop, ttsHighlightStart);
            apiSendEvent('AceTTSHighlight_On');
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

    selectToggleLanguageList: (event: Event) => ({ selectLanguageListActive }) => {
        return {
            selectLanguageListActive: !selectLanguageListActive,
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

    selectToggleLanguageCurrent: (key: string) => ({ languageActive }, { languageChangeAll }: Accessabar.IActions) => {

        // if (languageActive) {
        //     languageChangeAll(key);
        // }

        languageChangeAll(key);

        return {
            languageCurrentKey: key,
            selectLanguageListActive: false,
        };
    },

    selectToggleMagnifier: () => ({ magActive }, { magEnable, magStop, apiSendEvent }: Accessabar.IActions) => {
        if (magActive) {
            AccessabarUtil.stopFunction('magnifier');
        } else {
            AccessabarUtil.startFunction('magnifier', magStop, magEnable);
            apiSendEvent('AceMagnifier_On');
        }
    },

    selectToggleMask: () => ({ maskActive }, { maskEnable, maskStop, apiSendEvent }: Accessabar.IActions) => {
        if (maskActive) {
            AccessabarUtil.stopFunction('magnifier');
        } else {
            AccessabarUtil.startFunction('magnifier', maskStop, maskEnable);
            apiSendEvent('AceScreenMask_On');
        }
    },

    selectToggleReadingRuler: () => ({ rulerReadingActive }, { rulerReadingEnable, rulerReadingStop, apiSendEvent }: Accessabar.IActions) => {
        if (rulerReadingActive) {
            AccessabarUtil.stopFunction('rulerReading');
        } else {
            AccessabarUtil.startFunction('rulerReading', rulerReadingStop, rulerReadingEnable);
            apiSendEvent('AceRulerReading_On');
        }
    },

    selectTogglePinholeRuler: () => ({ rulerPinholeActive }, { rulerPinholeEnable, rulerPinholeStop, apiSendEvent }: Accessabar.IActions) => {
        if (rulerPinholeActive) {
            AccessabarUtil.stopFunction('rulerPinhole');
        } else {
            AccessabarUtil.startFunction('rulerPinhole', rulerPinholeStop, rulerPinholeEnable);
            apiSendEvent('AceRulerPinhole_On');
        }
    },

    selectToggleSpeechRecognition: () => ({ srActive }, { srEnable, srDisable, apiSendEvent }: Accessabar.IActions) => {
        if (srActive) {
            AccessabarUtil.stopFunction('speechRecognition');
        } else {
            AccessabarUtil.startFunction('speechRecognition', srDisable, srEnable);
            apiSendEvent('AceSpeechRecognition_On');
        }
    },
        }
    },
};

export default selectActions;
export { selectActions };
