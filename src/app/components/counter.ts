import { div, button, h1 } from '@hyperapp/html';

const counter = ({ count }, { up, down, reset }) => {
    return div({ id: 'counter' }, [
        h1(count),
        div({ id: 'button-container' }, [
            button(
                {
                    onclick: () => {
                        down();
                    },
                },
                '-',
            ),
            button(
                {
                    onclick: () => {
                        reset();
                    },
                },
                '\u27F2', // ⟲
            ),
            button(
                {
                    onclick: () => {
                        up();
                    },
                },
                '+',
            ),
        ]),
    ]);
};

export default counter;
export { counter };
