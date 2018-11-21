import { ActionsType } from 'hyperapp';

const ttsActions: ActionsType<Accessabar.IState, Accessabar.ITTSActions> = {
    toggleSpeakHover: () => ({ ttsHoverSpeak }) => {
        return {
            ttsHighlightSpeak: false,
            ttsHoverSpeak: !ttsHoverSpeak,
        };
    },

    toggleHighlightSpeak: () => ({ ttsHighlightSpeak }) => {
        return {
            ttsHighlightSpeak: !ttsHighlightSpeak,
            ttsHoverSpeak: false,
        };
    },
};

export default ttsActions;
export { ttsActions };
