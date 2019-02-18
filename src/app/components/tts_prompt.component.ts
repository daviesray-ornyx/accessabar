import {
    div,
    p,
    span,
} from '@hyperapp/html';
import { VNode } from 'hyperapp';

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
                const highlight = span({ class: 'ab-tts-prompt-word ab-highlight' }, value);
                wordArr.push(highlight);

                continue;
            }

            const word = span({ class: 'ab-tts-prompt-word' }, value);
            wordArr.push(word);
        }
    }

    return div({ class: `ab-tts-prompt ${ttsVoiceActive ? 'ab-flex' : 'ab-hide'}` }, [
        p({ class: 'ab-tts-prompt-text ab-flex' }, wordArr),
    ]);
};

export default ttsPrompt;
export { ttsPrompt };
