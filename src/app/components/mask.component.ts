import {
    div,
} from '@hyperapp/html';

interface IMaskState {
    maskActive: Accessabar.IState['maskActive'];
    maskColourCurrent: Accessabar.IState['maskColourCurrent'];
    maskOpacity: Accessabar.IState['maskOpacity'];
}

const mask = ({ maskActive, maskColourCurrent, maskOpacity }: IMaskState) => {
    return div({
        class: `ab-mask ${maskActive ? '' : 'ab-hide'}`,
        style: {
            background: maskColourCurrent,
            opacity: maskOpacity,
        },
    });
};

export default mask;
export { mask };
