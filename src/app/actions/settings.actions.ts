import { ActionsType } from 'hyperapp';

const settingsActions: ActionsType<Accessabar.IState, Accessabar.ISettingsActions> = {
    settingsOpen: () => ({ settingsHidden }) => {
        return {
            settingsHidden: false,
        };
    },

    settingsClose: () => ({ settingsHidden }) => {
        return {
            settingsHidden: true,
        };
    },

    settingsToggleTTSList: () => ({ ttsVoiceListActive }) => {
        return {
            ttsVoiceListActive: !ttsVoiceListActive,
        };
    },

    settingsToggleSRLangList: () => ({ srLangListActive }) => {
        return {
            srLangListActive: !srLangListActive,
        };
    },
};

export default settingsActions;
export {
    settingsActions,
};
