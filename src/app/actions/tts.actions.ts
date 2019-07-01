import { ActionsType } from 'hyperapp';

function hoverPassthrough(event) {
    window.abar.appActions.ttsHandleHover(event);
}

function highlightPassthrough() {
    window.abar.appActions.ttsHandleHighlight();
}

const ttsActions: ActionsType<Accessabar.IState, Accessabar.ITTSActions> = {
    ttsHandleHover: (event: MouseEvent) => ({ ttsHoverTimeout }) => {
        const { target } = event;
        const selection = window.getSelection();

        if (!target) {
            return;
        }

        if (!selection) {
            return;
        }

        selection.removeAllRanges();
        selection.selectAllChildren((target as Node));

        const currentText = selection.toString();

        if (ttsHoverTimeout && typeof ttsHoverTimeout !== 'boolean') {
            clearTimeout(ttsHoverTimeout);
        }

        return {
            ttsHoverTimeout: setTimeout(window.abar.appActions.ttsSpeak.bind(null, currentText), 500),
        };
    },

    ttsHandleHighlight: () => ({ ttsHighlightTimeout }) => {
        const selection = window.getSelection();

        if (!selection) {
            return;
        }

        const currentText = selection.toString();

        if (ttsHighlightTimeout && typeof ttsHighlightTimeout !== 'boolean') {
            clearTimeout(ttsHighlightTimeout);
        }

        return {
            ttsHighlightTimeout: setTimeout(window.abar.appActions.ttsSpeak.bind(null, currentText), 500),
        };
    },

    ttsHandlePrompt: (event: SpeechSynthesisEvent) => ({ ttsVoiceActive, ttsCurrentUtterText, ttsCurrentUtterWordIndex, ttsCurrentUtterCharIndex }) => {
        // console.log(event);

        switch (event.type) {
        case 'start':
            const words = event.utterance.text.split(/\s/);
            const sentencesArr = Array(Math.ceil(words.length / 5)).fill('');
            const sentenceChunks = sentencesArr.map((_, i) => words.slice(i * 5, i * 5 + 5));

            // console.log('Chunks:', sentenceChunks);

            return {
                ttsCurrentUtterCharIndex: event.charIndex,
                ttsCurrentUtterSentences: sentenceChunks,
                ttsCurrentUtterText: event.utterance.text,
                ttsCurrentUtterWords: words,
                ttsVoiceActive: true,
            };
        case 'boundary':
            if (!ttsVoiceActive) {
                return;
            }

            if (event.name !== 'word') {
                return;
            }

            // const { charIndex } = event;
            // const sentence = ttsCurrentUtterText.substring(charIndex);
            // // Match everything before fullstop, comma, speech mark, close bracket and whitespace
            // const re = /([^\.,"\)\s]+)/;
            // const wordArr = re.exec(sentence);
            // const length = (wordArr || [''])[0].length;

            let wordIndex = ttsCurrentUtterWordIndex;

            if (event.charIndex !== ttsCurrentUtterCharIndex && event.charIndex !== 0) {
                wordIndex++;
            }

            const sentenceIndex = Math.floor(wordIndex / 5);
            const sentenceWordIndex = wordIndex % 5;

            return {
                ttsCurrentUtterCharIndex: event.charIndex,
                ttsCurrentUtterSentenceIndex: sentenceIndex,
                ttsCurrentUtterSentenceWordIndex: sentenceWordIndex,
                ttsCurrentUtterWordIndex: wordIndex,
            };
        case 'end':
            return {
                ttsCurrentUtterCharIndex: 0,
                ttsCurrentUtterSentences: [],
                ttsCurrentUtterText: '',
                ttsCurrentUtterWordIndex: 0,
                ttsCurrentUtterWords: [],
                ttsVoiceActive: false,
            };
        default:
            return;
        }
    },

    ttsHoverStart: () => (state, { ttsStopCurrent }) => {
        // console.log('start hover');
        ttsStopCurrent();

        document.addEventListener('mouseover', hoverPassthrough);

        return;
    },

    ttsHighlightStart: () => (state, { ttsStopCurrent }) => {
        // console.log('start highlight');
        ttsStopCurrent();

        document.addEventListener('mouseup', highlightPassthrough);

        return;
    },

    ttsSpeak: (text: string) => ({ ttsPitch, ttsRate, ttsVolume, ttsLang, ttsVoices }) => {
        if (ttsVoices.length === 0) {
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);

        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            window.speechSynthesis.cancel();
        }

        utterance.pitch = ttsPitch;
        utterance.rate = ttsRate;
        utterance.volume = ttsVolume;
        utterance.lang = ttsLang;

        utterance.onstart = (event) => {
            window.abar.appActions.ttsHandlePrompt(event);
        };

        utterance.onboundary = (event) => {
            window.abar.appActions.ttsHandlePrompt(event);
        };

        utterance.onend = (event) => {
            window.abar.appActions.ttsHandlePrompt(event);
        };

        // console.log(utterance);

        window.speechSynthesis.speak(utterance);
    },

    ttsInit: () => ({ ttsInitiated, ttsHighlightSpeak, ttsHoverSpeak }, { menuHandle, ttsHighlightStart, ttsHoverStart, ttsUpdateVoices }: Accessabar.IActions) => {
        if (ttsInitiated) {
            return;
        }

        ttsUpdateVoices();

        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = window.abar.appActions.ttsUpdateVoices;
        }

        return {
            ttsInitiated: true,
        };
    },

    ttsStop: () => (state, { menuHandle, ttsStopCurrent }: Accessabar.IActions) => {
        ttsStopCurrent();
    },

    ttsStopCurrent: () => ({ ttsHighlightSpeak, ttsHoverSpeak }) => {
        // console.log('stop current');

        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            window.speechSynthesis.cancel();
        }

        if (ttsHighlightSpeak) {
            document.removeEventListener('mouseup', highlightPassthrough);
        }

        if (ttsHoverSpeak) {
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
