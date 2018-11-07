import {
    section,
    div,
} from '@hyperapp/html';
import * as Buttons from './buttons';
import { AccessabarUtil } from '../';

// Contains all the buttons in Accessabar
const buttonArea = (actions) => {
    return div(
        {
            id: 'button-area',
            // Adds margin to body when Accessabar is added to DOM.
            oncreate: () => {
                AccessabarUtil.createSpace();
            },
        },
        [
            section([
                div({ className: 'group', 'aria-label': 'Sound controls' }, [
                    Buttons.playButton(),
                    Buttons.pauseButton(),
                    Buttons.stopButton(),
                ]),
                div({ className: 'group' }, [
                    Buttons.ttsButton(),
                    Buttons.incButton(actions),
                    Buttons.decButton(actions),
                    Buttons.textOpsButton(),
                    Buttons.magButton(),
                    Buttons.maskButton(),
                    Buttons.rulerButton(),
                    Buttons.srButton(),
                ]),
            ]),
            section([
                Buttons.resetButton(),
                Buttons.settingsButton(),
                Buttons.closeButton(),
            ]),
        ],
    );
};

export default buttonArea;
export { buttonArea };
