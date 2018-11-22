import { ActionsType } from 'hyperapp';

function hoverPassthrough(event) {
    window.abar.appActions.ttsHandleHover(event);
}

function highlightPassthrough() {
    window.abar.appActions.ttsHandleHighlight();
}

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

    ttsHandleHover: (event: MouseEvent) => ({ ttsPitch, ttsRate, ttsVolume, ttsLang, ttsVoices }) => {
        const { target } = event;
        const selection = window.getSelection();

        if (!target) {
            return;
        }

        if (ttsVoices.length === 0) {
            return;
        }

        selection.removeAllRanges();
        selection.selectAllChildren((target as Node));

        const currentText = selection.toString();
        const utterance = new SpeechSynthesisUtterance(currentText);

        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            window.speechSynthesis.cancel();
        }

        utterance.pitch = ttsPitch;
        utterance.rate = ttsRate;
        utterance.volume = ttsVolume;
        utterance.lang = ttsLang;

        window.speechSynthesis.speak(utterance);
    },

    ttsHandleHighlight: () => () => {
        console.log('test 2');
    },

    ttsHoverStart: () => (state, { ttsStopCurrent }) => {
        console.log('start hover');
        ttsStopCurrent();

        document.addEventListener('mouseover', hoverPassthrough);

        return;
    },

    ttsHighlightStart: () => (state, { ttsStopCurrent }) => {
        console.log('start highlight');
        ttsStopCurrent();

        document.addEventListener('mouseup', highlightPassthrough);

        return;
    },

    ttsStart: () => ({ ttsHighlightSpeak, ttsHoverSpeak }, { openMenu, ttsHighlightStart, ttsHoverStart }: Accessabar.IActions) => {
        openMenu('tts');
        window.speechSynthesis.onvoiceschanged = window.abar.appActions.ttsUpdateVoices;

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

    ttsStopCurrent: () => ({ ttsHighlightSpeak, ttsHoverSpeak }) => {
        console.log('stop current');

        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            window.speechSynthesis.cancel();
        }

        if (ttsHighlightSpeak) {
            console.log('yes 1');
            document.removeEventListener('mouseup', highlightPassthrough);
        }

        if (ttsHoverSpeak) {
            console.log('yes 2');
            document.removeEventListener('mouseover', hoverPassthrough);
        }
    },

    ttsUpdateVoices: () => {
        const ttsVoices = window.speechSynthesis.getVoices();

        return {
            ttsVoices,
        };
    },
};

export default ttsActions;
export { ttsActions };
