import { ActionsType } from 'hyperapp';

const feedbackActions: ActionsType<Accessabar.IState, Accessabar.IFeedbackActions> = {
    showFeedback: () => ({ feedbackProvided, feedbackActive }, { resetAll }: Accessabar.IActions) => {

        // This is more of a toggle....
        return {
            feedbackActive: feedbackProvided ? false: true,
        };
    },
    thumbsUpFeedback: () => ({ feedbackActive }, { resetAll }: Accessabar.IActions) => {

        // Thumbs up feedback

        // Ensure feedback status is set to true
        resetAll();
        window.abar.close();

        return { 
            abarHidden: false,
            feedbackProvided: true,
            feedbackActive: false 
        };
    },
    thumbsDownFeedback: () => ({ feedbackActive }, { resetAll }: Accessabar.IActions) => {

        // Thumbsdown feedback

        // Ensure feedback status is set to true
        resetAll();
        window.abar.close();

        return { 
            abarHidden: false,
            feedbackProvided: true,
            feedbackActive: false 
        };
    },
    closeFeedback: () => ({ feedbackActive }, { resetAll }: Accessabar.IActions) => {
        
        // Ensure feedback status is set to false

        // Ensure feedback status is set to false
        resetAll();
        window.abar.close();

        return { 
            abarHidden: false,
            feedbackProvided: false,
            feedbackActive: false 
        };
    },
};

export default feedbackActions;
export { feedbackActions };
