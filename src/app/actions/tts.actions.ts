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

    ttsStart: () => (state, { openMenu }: Accessabar.IActions) => {
        console.log('Start');
        openMenu('tts');
    },

    ttsStop: () => (state, { closeMenu }: Accessabar.IActions) => {
        console.log('Stop');
        closeMenu('tts');
    },
};

export default ttsActions;
export { ttsActions };
