import { VNode, h } from 'hyperapp';

interface ITTSPromptState {
    ttsVoiceActive: Accessabar.IState['ttsVoiceActive'];
    ttsCurrentUtterSentences: Accessabar.IState['ttsCurrentUtterSentences'];
    ttsCurrentUtterSentenceIndex: Accessabar.IState['ttsCurrentUtterSentenceIndex'];
    ttsCurrentUtterSentenceWordIndex: Accessabar.IState['ttsCurrentUtterSentenceWordIndex'];
}

const ttsPrompt = ({ ttsVoiceActive, ttsCurrentUtterSentences, ttsCurrentUtterSentenceIndex, ttsCurrentUtterSentenceWordIndex }: ITTSPromptState) => {
    const wordArr: VNode[] = [];

    if (ttsCurrentUtterSentences.length > 0) {
        for (const [index, value] of ttsCurrentUtterSentences[ttsCurrentUtterSentenceIndex].entries()) {
            if (index === ttsCurrentUtterSentenceWordIndex) {
                const highlight = h('ab-tts-prompt-word', { class: 'ab-tts-prompt-word ab-highlight' }, value);
                wordArr.push(highlight);

                continue;
            }

            const word = h('ab-tts-prompt-word', { class: 'ab-tts-prompt-word' }, value);
            wordArr.push(word);
        }
    }

    return h('ab-tts-prompt', { class: `ab-tts-prompt ${ttsVoiceActive ? 'ab-flex' : 'ab-hide'}`, role: 'marquee' }, [
        h('ab-tts-prompt-text', { class: 'ab-tts-prompt-text ab-flex' }, wordArr),
    ]);
};

export default ttsPrompt;
export { ttsPrompt };
