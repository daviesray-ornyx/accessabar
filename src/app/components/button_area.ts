import {
    section,
    div,
} from '@hyperapp/html';
import * as Buttons from './buttons';

const buttonArea = () => {
    return div({ id: 'button-area' }, [
        section([
            div({ className: 'group', 'aria-label': 'Sound controls' }, [
                Buttons.playButton(),
                Buttons.pauseButton(),
                Buttons.stopButton(),
            ]),
            div({ className: 'group' }, [
                Buttons.ttsButton(),
                Buttons.incButton(),
                Buttons.decButton(),
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
    ]);
};

export default buttonArea;
export { buttonArea };
