import {h} from 'hyperapp';
import {customList, customListItemFactory} from './custom_list.component';
import ISO6391 from 'iso-639-1';
import {
  settingsClose,
  settingsToggleSRLangList,
  settingsToggleTTSList,
} from '../actions/settings.actions';
import {
  ttsChangePitch,
  ttsChangeRate,
  ttsChangeVoice,
  ttsChangeVolume,
} from '../actions/tts.actions';
import {srChangeLang} from '../actions/sr.actions';

const settingsHeader = ({settingsHidden}) => {
  return h('ab-settings-header', {class: 'ab-settings-header'}, [
    h(
      'ab-logo',
      {
        class: 'ab-logo-large ab-settings-logo',
        'aria-label': 'Ace logo',
      },
      [h('ab-logo-img', {class: 'ab-logo-img-word', alt: 'Ace Logo'})]
    ),
    h(
      'ab-settings-header-title',
      {class: 'ab-settings-header-title'},
      'Settings'
    ),
    h(
      'ab-settings-close-button',
      {
        'aria-controls': 'ab-settings',
        'aria-label': 'Close Settings',
        'aria-pressed': String(settingsHidden),
        class: 'ab-settings-close-button',
        onclick: settingsClose,
        role: 'button',
      },
      [
        h('ab-icon', {
          'aria-hidden': 'true',
          class: 'ab-icon ab-icon-cross',
        }),
      ]
    ),
  ]);
};

const settingsTTSSection = ({
  ttsVoices,
  ttsVoiceListActive,
  ttsCurrentVoiceName,
  ttsVolume,
  ttsRate,
  ttsPitch,
}) => {
  const factoryCfg: Ace.ListItem[] = [];
  let customListVoices = h(
    'ab-setting-placeholder',
    {class: 'ab-setting-placeholder'},
    ['Please open Text to Speech to choose a voice.']
  );

  if (ttsVoices && ttsVoices.length > 0) {
    for (const [key, obj] of ttsVoices.entries()) {
      factoryCfg.push({
        key,
        name: obj.name,
        action: (state, actionKey: number) => {
          return [
            state,
            [
              (dispatch, props) => {
                dispatch(props.toggleSettings);
                dispatch(props.changeVoice, props.key);
              },
              {
                toggleSettings: settingsToggleTTSList,
                changeVoice: ttsChangeVoice,
                key: actionKey,
              },
            ],
          ];
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
    h(
      'ab-settings-section-title',
      {class: 'ab-settings-section-title'},
      'Text To Speech'
    ),
    h('ab-settings-tts-voice', {class: 'ab-settings-section-group'}, [
      h('ab-setting-title', {class: 'ab-setting-title'}, 'Voice'),
      customListVoices,
    ]),
    h('ab-settings-tts-volume', {class: 'ab-settings-section-group'}, [
      h(
        'ab-setting-title',
        {id: 'ab-setting-title-volume', class: 'ab-setting-title'},
        'Volume'
      ),
      h('input', {
        'aria-labelledby': 'ab-setting-title-volume',
        class: 'ab-range',
        type: 'range',
        onchange: [ttsChangeVolume, ev => ev.target.value],
        min: '0',
        max: '1',
        step: '0.05',
        value: ttsVolume,
      }),
    ]),
    h('ab-settings-tts-rate', {class: 'ab-settings-section-group'}, [
      h(
        'ab-setting-title',
        {id: 'ab-setting-title-speed', class: 'ab-setting-title'},
        'Speed'
      ),
      h('input', {
        'aria-labelledby': 'ab-setting-title-speed',
        class: 'ab-range',
        type: 'range',
        onchange: [ttsChangeRate, ev => ev.target.value],
        min: '0',
        max: '1',
        step: '0.05',
        value: ttsRate,
      }),
    ]),
    h('ab-settings-tts-pitch', {class: 'ab-settings-section-group'}, [
      h(
        'ab-setting-title',
        {id: 'ab-setting-title-pitch', class: 'ab-setting-title'},
        'Pitch'
      ),
      h('input', {
        'aria-labelledby': 'ab-setting-title-pitch',
        class: 'ab-range',
        type: 'range',
        onchange: [ttsChangePitch, ev => ev.target.value],
        min: '0',
        max: '1',
        step: '0.05',
        value: ttsPitch,
      }),
    ]),
  ];
};

const settingsSRSection = ({srLangListActive, srLangName}) => {
  const factoryCfg: Ace.ListItem[] = [];
  const langKeys = ISO6391.getAllCodes();

  for (const key of langKeys) {
    factoryCfg.push({
      key,
      name: ISO6391.getNativeName(key),
      action: (state, actionKey: number) => {
        return [
          state,
          [
            (dispatch, props) => {
              dispatch(props.toggleSettings);
              dispatch(props.changeLang, props.key);
            },
            {
              toggleSettings: settingsToggleSRLangList,
              changeLang: srChangeLang,
              key: actionKey,
            },
          ],
        ];
      },
    });
  }

  const listItems = customListItemFactory(factoryCfg);
  const customListObj = {
    listItems,
    active: srLangListActive,
    currentItem: srLangName,
    openList: settingsToggleSRLangList,
    customListID: 'ab-custom-list-sr-langs',
  };
  const langListEl = customList(customListObj);

  return [
    h(
      'ab-settings-section-title',
      {class: 'ab-settings-section-title'},
      'Speech Recognition'
    ),
    h('ab-settings-sr-lang', {class: 'ab-settings-section-group'}, [
      h('ab-setting-title', {class: 'ab-setting-title'}, 'Language'),
      langListEl,
    ]),
  ];
};

const settingsMenu = (state: Ace.State) => {
  return h(
    'ab-settings-menu',
    {
      id: 'ab-settings',
      class: `ab-settings ${state.settingsHidden ? 'ab-hide' : ''}`,
      'aria-label': 'Ace settings',
    },
    [
      settingsHeader(state),
      h('ab-settings-section', {class: 'ab-settings-section'}, [
        ...settingsTTSSection(state),
        ...settingsSRSection(state),
      ]),
    ]
  );
};

export default settingsMenu;
export {settingsMenu};
