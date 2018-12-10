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
                const highlight = span({ class: 'tts-prompt-word highlight' }, value);
                wordArr.push(highlight);

                continue;
            }

            const word = span({ class: 'tts-prompt-word' }, value);
            wordArr.push(word);
        }
    }

    return div({ class: `tts-prompt ${ttsVoiceActive ? 'flex' : 'hide'}` }, [
        p({ class: 'tts-prompt-text flex' }, wordArr),
    ]);
};

export default ttsPrompt;
export { ttsPrompt };
