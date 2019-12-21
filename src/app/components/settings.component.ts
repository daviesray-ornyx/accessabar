import { h } from 'hyperapp';

const settingsHeader = ({ settingsHidden }, { settingsClose }) => {
    return h('ab-settings-header', { class: 'ab-settings-header' }, [
        h('ab-logo', { class: 'ab-logo-large ab-settings-logo', 'aria-label': 'Accessabar logo' }, [
            h('ab-logo-img', { class: 'ab-logo-img', alt: 'Accessabar Logo' }),
        ]),
        h(
            'ab-settings-close-button',
            {
                'aria-controls': 'ab-settings',
                'aria-label': 'Close Settings',
                'aria-pressed': String(settingsHidden),
                'aria-role': 'button',
                class: 'ab-settings-close-button',
                onclick: () => {
                    settingsClose();
                },
            },
            [
                h('ab-icon', {
                    'aria-hidden': 'true',
                    class: 'ab-icon ab-icon-cross',
                }),
            ],
        ),
    ]);
};

const settingsTTSSection = () => {
    return h('ab-settings-section', { class: 'ab-settings-section' }, [
        h('ab-settings-section-title', { class: 'ab-settings-section-header' }, 'Text To Speech'),
    ]);
};

const settingsMenu = (state, actions) => {
    return h('ab-settings-menu', { id: 'ab-settings', class: `ab-settings ${state.settingsHidden ? 'ab-hide' : ''}`, 'aria-label': 'Accessabar settings' }, [
        settingsHeader(state, actions),
        settingsTTSSection(),
    ]);
};

export default settingsMenu;
export {
    settingsMenu,
};
