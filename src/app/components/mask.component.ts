import {
    div,
} from '@hyperapp/html';

interface IMaskState {
    maskActive: Accessabar.IState['maskActive'];
    maskColour: Accessabar.IState['maskColour'];
    maskOpacity: Accessabar.IState['maskOpacity'];
}

const mask = ({ maskActive, maskColour, maskOpacity }: IMaskState) => {
    return div({
        class: `ab-mask ${maskActive ? '' : 'ab-hide'}`,
        style: {
            background: maskColour,
            opacity: maskOpacity,
        },
    });
};

export default mask;
export { mask };
