import {
    section,
    div,
} from '@hyperapp/html';
import * as Buttons from './buttons.component';
import { AccessabarUtil } from '../util';

// Contains all the buttons in Accessabar
const buttonArea = (state, actions) => {
    return div(
        {
            class: 'ab-button-area ab-growable',
            oncreate: () => {
                if (window.abar.moveBody) {
                    // Adds margin to body when Accessabar is added to DOM.
                    AccessabarUtil.createSpace();
                }
            },
        },
        [
            section([
                div({ class: `ab-group ${state.ttsHoverSpeak || state.ttsHighlightSpeak ? '' : 'ab-hide'}`, 'aria-label': 'Sound controls' }, [
                    Buttons.playButton(actions),
                    Buttons.pauseButton(actions),
                    Buttons.stopButton(actions),
                ]),
                div({ class: 'ab-group' }, [
                    Buttons.ttsButton(actions),
                    Buttons.incButton(actions),
                    Buttons.decButton(actions),
                    Buttons.fontResetButton(state),
                    Buttons.textOpsButton(actions),
                    Buttons.magButton(actions),
                    Buttons.maskButton(actions),
                    Buttons.rulerButton(actions),
                    Buttons.srButton(actions),
                ]),
            ]),
            section([
                Buttons.resetButton(actions),
                Buttons.settingsButton(actions),
                Buttons.closeButton(actions),
            ]),
        ],
    );
};

export default buttonArea;
export { buttonArea };
