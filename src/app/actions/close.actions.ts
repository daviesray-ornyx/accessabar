import { ActionsType } from 'hyperapp';

const closeActions: ActionsType<Accessabar.IState, Accessabar.ICloseActions> = {
    closeAccessabar: () => ({ abarHidden, feedbackProvided }, { resetAll }: Accessabar.IActions) => {

        // Before hiding menu... Check for feedback status
        if(feedbackProvided == false){
            // Show feedback dialog first
            return {
                feedbackProvided: false,
                feedbackActive: true,
            }
        }

        // feedback already provided. Proceed to hide menu

        resetAll();
        window.abar.close();

        return { abarHidden: false };
    },
};

export default closeActions;
export { closeActions };
