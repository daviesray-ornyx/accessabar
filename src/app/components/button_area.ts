import {
    section,
    div,
} from '@hyperapp/html';
import * as Buttons from './buttons';

const buttonArea = () => {
    return div({ id: 'button-area' }, [
        section([
            Buttons.ttsButton,
            Buttons.playButton,
            Buttons.pauseButton,
            Buttons.stopButton,
        ]),
        section([
            Buttons.closeButton,
        ]),
    ]);
};

export default buttonArea;
export { buttonArea };
