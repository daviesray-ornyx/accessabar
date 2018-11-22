import { ActionsType } from 'hyperapp';

const ttsActions: ActionsType<Accessabar.IState, Accessabar.ITTSActions> = {
    toggleSpeakHover: () => ({ ttsHoverSpeak }, { ttsHoverStart, ttsStopCurrent }) => {
        if (ttsHoverSpeak) {
            ttsStopCurrent();
        } else {
            ttsHoverStart();
        }

        return {
            ttsHighlightSpeak: false,
            ttsHoverSpeak: !ttsHoverSpeak,
        };
    },

    toggleHighlightSpeak: () => ({ ttsHighlightSpeak }, { ttsHighlightStart, ttsStopCurrent }) => {
        if (ttsHighlightSpeak) {
            ttsStopCurrent();
        } else {
            ttsHighlightStart();
        }

        return {
            ttsHighlightSpeak: !ttsHighlightSpeak,
            ttsHoverSpeak: false,
        };
    },

    ttsHoverStart: () => (state, { ttsStopCurrent }) => {
        console.log('start hover');
        ttsStopCurrent();

        return;
    },

    ttsHighlightStart: () => (state, { ttsStopCurrent }) => {
        console.log('start highlight');
        ttsStopCurrent();

        return;
    },

    ttsStart: () => ({ ttsHighlightSpeak, ttsHoverSpeak }, { openMenu, ttsHighlightStart, ttsHoverStart }: Accessabar.IActions) => {
        openMenu('tts');

        if (ttsHighlightSpeak) {
            ttsHighlightStart();
        }

        if (ttsHoverSpeak) {
            ttsHoverStart();
        }
    },

    ttsStop: () => (state, { closeMenu, ttsStopCurrent }: Accessabar.IActions) => {
        ttsStopCurrent();
        closeMenu('tts');
    },

    ttsStopCurrent: () => () => {
        console.log('stop current');
        return;
    },
};

export default ttsActions;
export { ttsActions };
