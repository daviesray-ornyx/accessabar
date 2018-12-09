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
            class: 'button-area growable',
            // Adds margin to body when Accessabar is added to DOM.
            oncreate: () => {
                AccessabarUtil.createSpace();
            },
        },
        [
            section([
                div({ class: 'group', 'aria-label': 'Sound controls' }, [
                    Buttons.playButton(),
                    Buttons.pauseButton(),
                    Buttons.stopButton(),
                ]),
                div({ class: 'group' }, [
                    Buttons.ttsButton(actions),
                    Buttons.incButton(actions),
                    Buttons.decButton(actions),
                    Buttons.textOpsButton(actions),
                    Buttons.magButton(),
                    Buttons.maskButton(),
                    Buttons.rulerButton(),
                    Buttons.srButton(),
                ]),
            ]),
            section([
                Buttons.resetButton(actions),
                Buttons.settingsButton(),
                Buttons.closeButton(actions),
            ]),
        ],
    );
};

export default buttonArea;
export { buttonArea };
