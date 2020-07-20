import {h} from 'hyperapp';

const ttsPrompt = (state: Ace.State) => {
  if (state === undefined) {
    return;
  }

  const {
    ttsVoiceActive,
    ttsCurrentUtterSentences,
    ttsCurrentUtterSentenceIndex,
    ttsCurrentUtterSentenceWordIndex,
  } = state;

  const wordArr: unknown[] = [];

  if (
    ttsCurrentUtterSentences !== undefined &&
    ttsCurrentUtterSentences.length > 0
  ) {
    for (const [index, value] of ttsCurrentUtterSentences[
      ttsCurrentUtterSentenceIndex
    ].entries()) {
      if (index === ttsCurrentUtterSentenceWordIndex) {
        const highlight = h(
          'ab-tts-prompt-word',
          {class: 'ab-tts-prompt-word ab-highlight'},
          value
        );
        wordArr.push(highlight);

        continue;
      }

      const word = h(
        'ab-tts-prompt-word',
        {class: 'ab-tts-prompt-word'},
        value
      );
      wordArr.push(word);
    }
  }

  return h(
    'ab-tts-prompt',
    {
      class: `ab-tts-prompt ${ttsVoiceActive ? 'ab-flex' : 'ab-hide'}`,
      role: 'marquee',
    },
    [h('ab-tts-prompt-text', {class: 'ab-tts-prompt-text ab-flex'}, wordArr)]
  );
};

export default ttsPrompt;
export {ttsPrompt};
