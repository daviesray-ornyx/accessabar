import { h } from 'hyperapp';
import * as Buttons from './buttons.component';
import { AccessabarUtil } from '../util';

// Contains all the buttons in Accessabar
const buttonArea = (state, actions) => {
    return h(
        'ab-button-area',
        {
            'aria-role': 'toolbar',
            class: 'ab-button-area ab-growable',
            oncreate: () => {
                if (window.abar.moveBody) {
                    // Adds margin to body when Accessabar is added to DOM.
                    AccessabarUtil.createSpace();
                }
            },
        },
        [
            h('ab-button-section', [
                h('ab-button-group', { class: `ab-group ${state.ttsHoverSpeak || state.ttsHighlightSpeak ? '' : 'ab-hide'}`, 'aria-label': 'Sound controls' }, [
                    Buttons.playButton(actions),
                    Buttons.pauseButton(actions),
                    Buttons.stopButton(actions),
                ]),
                h('ab-button-group', { class: 'ab-group' }, [
                    Buttons.ttsButton(state, actions),
                    Buttons.incButton(actions),
                    Buttons.decButton(actions),
                    Buttons.fontResetButton(state),
                    Buttons.textOpsButton(state, actions),
                    Buttons.magButton(state, actions),
                    Buttons.maskButton(state, actions),
                    Buttons.rulerButton(state, actions),
                    Buttons.srButton(state, actions),
                ]),
            ]),
            h('ab-button-section', [
                Buttons.resetButton(actions),
                Buttons.settingsButton(actions),
                Buttons.closeButton(actions),
            ]),
        ],
    );
};

export default buttonArea;
export { buttonArea };
