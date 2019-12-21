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
};

export default settingsActions;
export {
    settingsActions,
};
