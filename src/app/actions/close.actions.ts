import { ActionsType } from 'hyperapp';

const closeActions: ActionsType<Accessabar.IState, Accessabar.ICloseActions> = {
    closeAccessabar: () => ({ abarHidden }, { resetAll }: Accessabar.IActions) => {
        resetAll();
        window.abar.close();

        return { abarHidden: false };
    },
};

export default closeActions;
export { closeActions };
