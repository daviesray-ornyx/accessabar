import { h } from 'hyperapp';

const settingsMenu = (state, actions) => {
    return h('ab-settings-menu', { class: `ab-settings ${state.settingsHidden ? 'ab-hide' : ''}`, 'aria-label': 'Accessabar settings' }, [
        h('ab-logo', { class: 'ab-logo-large ab-settings-logo', 'aria-label': 'Accessabar logo' }, [
            h('ab-logo-img', { class: 'ab-logo-img', alt: 'Accessabar Logo' }),
        ]),
    ]);
};

export default settingsMenu;
export {
    settingsMenu,
};
