import { ActionsType } from 'hyperapp';

const settingsActions: ActionsType<Accessabar.IState, Accessabar.ISettingsActions> = {
    settingsOpen: () => ({ settingsHidden }) => {
        return {
            settingsHidden: false,
        };
    },
};

export default settingsActions;
export {
    settingsActions,
};
