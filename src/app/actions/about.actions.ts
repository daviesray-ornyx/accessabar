import { ActionsType } from 'hyperapp';

const aboutActions: ActionsType<Accessabar.IState, Accessabar.IAboutActions> = {
    aboutOpen: () => ({ aboutHidden }) => {
        return {
            aboutHidden: false,
        };
    },

    aboutClose: () => ({ aboutHidden }) => {
        return {
            aboutHidden: true,
        };
    },
};

export default aboutActions;
export {
    aboutActions,
};
