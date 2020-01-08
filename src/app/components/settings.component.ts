import { h } from 'hyperapp';
import { customList, customListItemFactory } from './custom_list.component';

const settingsHeader = ({ settingsHidden }, { settingsClose }) => {
    return h('ab-settings-header', { class: 'ab-settings-header' }, [
        h('ab-logo', { class: 'ab-logo-large ab-settings-logo', 'aria-label': 'Accessabar logo' }, [
            h('ab-logo-img', { class: 'ab-logo-img', alt: 'Accessabar Logo' }),
        ]),
        h('ab-settings-header-title', { class: 'ab-settings-header-title' }, 'Settings'),
        h(
            'ab-settings-close-button',
            {
                'aria-controls': 'ab-settings',
                'aria-label': 'Close Settings',
                'aria-pressed': String(settingsHidden),
                class: 'ab-settings-close-button',
                onclick: () => {
                    settingsClose();
                },
                role: 'button',
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

const settingsTTSSection = ({ ttsVoices, ttsVoiceListActive, ttsCurrentVoiceName, ttsVolume, ttsRate, ttsPitch }, { settingsToggleTTSList, ttsChangeVoice, ttsChangeVolume, ttsChangeRate, ttsChangePitch }) => {
    const factoryCfg: Accessabar.IListItem[] = [];
    let customListVoices = h('ab-setting-placeholder', { class: 'ab-setting-placeholder' }, ['Please open Text to Speech to choose a voice.']);

    if (ttsVoices && ttsVoices.length > 0) {
        for (const [key, obj] of ttsVoices.entries()) {
            factoryCfg.push({
                key,
                name: obj.name,
                action: (actionKey) => {
                    ttsChangeVoice(actionKey);
                    settingsToggleTTSList();
                },
            });
        }

        const listItems = customListItemFactory(factoryCfg);
        const customListObj = {
            listItems,
            active: ttsVoiceListActive,
            currentItem: ttsCurrentVoiceName,
            openList: settingsToggleTTSList,
            customListID: 'ab-custom-list-tts-voices',
        };

        customListVoices = customList(customListObj);
    }

    return [
        h('ab-settings-section-title', { class: 'ab-settings-section-title' }, 'Text To Speech'),
        h('ab-settings-tts-voice', { class: 'ab-settings-section-group' }, [
            h('ab-setting-title', { class: 'ab-setting-title' }, 'Voice'),
            customListVoices,
        ]),
        h('ab-settings-tts-volume', { class: 'ab-settings-section-group' }, [
            h('ab-setting-title', { id: 'ab-setting-title-volume' , class: 'ab-setting-title' }, 'Volume'),
            h('input', {
                'aria-labelledby': 'ab-setting-title-volume',
                class: 'ab-range',
                type: 'range',
                onchange: (ev) => {
                    if (ev.target) {
                        ttsChangeVolume(ev.target.value);
                    }
                },
                min: '0',
                max: '1',
                step: '0.05',
                value: ttsVolume,
            }),
        ]),
        h('ab-settings-tts-rate', { class: 'ab-settings-section-group' }, [
            h('ab-setting-title', { id: 'ab-setting-title-speed', class: 'ab-setting-title' }, 'Speed'),
            h('input', {
                'aria-labelledby': 'ab-setting-title-speed',
                class: 'ab-range',
                type: 'range',
                onchange: (ev) => {
                    if (ev.target) {
                        ttsChangeRate(ev.target.value);
                    }
                },
                min: '0',
                max: '1',
                step: '0.05',
                value: ttsRate,
            }),
        ]),
        h('ab-settings-tts-pitch', { class: 'ab-settings-section-group' }, [
            h('ab-setting-title', { id: 'ab-setting-title-pitch', class: 'ab-setting-title' }, 'Pitch'),
            h('input', {
                'aria-labelledby': 'ab-setting-title-pitch',
                class: 'ab-range',
                type: 'range',
                onchange: (ev) => {
                    if (ev.target) {
                        ttsChangePitch(ev.target.value);
                    }
                },
                min: '0',
                max: '1',
                step: '0.05',
                value: ttsPitch,
            }),
        ]),
    ];
};

const settingsSRSection = (state, actions) => {
    return [
        h('ab-settings-section-title', { class: 'ab-settings-section-title' }, 'Speech Recognition'),
    ];
};

const settingsMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return h('ab-settings-menu', { id: 'ab-settings', class: `ab-settings ${state.settingsHidden ? 'ab-hide' : ''}`, 'aria-label': 'Accessabar settings' }, [
        settingsHeader(state, actions),
        h('ab-settings-section', { class: 'ab-settings-section' }, [
            ...settingsTTSSection(state, actions),
            ...settingsSRSection(state, actions),
        ]),
    ]);
};

export default settingsMenu;
export {
    settingsMenu,
};
