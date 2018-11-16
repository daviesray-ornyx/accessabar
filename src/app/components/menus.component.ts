import {
    div,
    header,
    span,
} from '@hyperapp/html';

const ttsMenu = (state) => {
    return div({ class: 'menu draggable' }, [
        header({ class: 'menu-header' }, [
            span({ class: 'menu-header-text' }, 'Text to Speech'),
        ]),
    ]);
};

export {
    ttsMenu,
};
