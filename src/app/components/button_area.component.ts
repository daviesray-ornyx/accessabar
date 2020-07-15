import {h} from 'hyperapp';
import * as Buttons from './buttons.component';

// Contains all the buttons in Ace
const buttonArea = (state: Ace.State) => {
  if(state == undefined){
    return;
  }
  return h(
    'ab-button-area',
    {
      'aria-role': 'toolbar',
      class: 'ab-button-area ab-growable',
    },
    [
      h('ab-button-section', {}, [
        h(
          'ab-button-group',
          {
            class: `ab-group ${
              state.ttsHoverSpeak || state.ttsHighlightSpeak ? '' : 'ab-hide'
            }`,
            'aria-label': 'Sound controls',
          },
          [Buttons.stopButton()]
        ),
        h('ab-button-group', {class: 'ab-group'}, [
          Buttons.ttsButton(state),
          Buttons.incButton(),
          Buttons.decButton(),
          Buttons.fontResetButton(state),
          Buttons.textOpsButton(state),
          Buttons.magButton(state),
          Buttons.maskButton(state),
          Buttons.rulerButton(state),
          Buttons.srButton(state),
          Buttons.ptButton(state),
        ]),
      ]),
      h('ab-button-section', {}, [
        Buttons.resetButton(),
        Buttons.settingsButton(state),
        Buttons.aboutButton(state),
        Buttons.closeButton(),
      ]),
    ]
  );
};

export default buttonArea;
export {buttonArea};
