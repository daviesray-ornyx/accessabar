import { h } from 'hyperapp';

interface IMaskState {
    maskActive: Accessabar.IState['maskActive'];
    maskColourCurrent: Accessabar.IState['maskColourCurrent'];
    maskOpacity: Accessabar.IState['maskOpacity'];
}

const mask = ({ maskActive, maskColourCurrent, maskOpacity }: IMaskState) => {
    return h('ab-mask', {
        'aria-hidden': 'true',
        class: `ab-mask ${maskActive ? '' : 'ab-hide'}`,
        style: {
            background: maskColourCurrent,
            opacity: maskOpacity,
        },
    });
};

export default mask;
export { mask };
