import {h} from 'hyperapp';
import {handleButtonNavigation} from './buttons.component';
import * as menus from './menus.component';
import tippy from 'tippy.js';
import {
  menuClose,
  menuStartDrag,
  menuUpdatePosition,
} from '../actions/menu.actions';

const menuConfigs = new Map([
  ['tts', {title: 'Text to Speech', menu: menus.ttsMenu}],
  ['textOptions', {title: 'Text Options', menu: menus.textOptionsMenu}],
  ['magnifier', {title: 'Magnifier Options', menu: menus.magMenu}],
  ['masking', {title: 'Screen Masking Options', menu: menus.maskMenu}],
  ['rulerOptions', {title: 'Ruler Options', menu: menus.rulerOptionsMenu}],
  ['speechRecognition', {title: 'Speech Recognition', menu: menus.srMenu}],
  ['pageTranslate', {title: 'Page Translation', menu: menus.ptMenu}],
]);

const placeholderEl = () => h('ab-placeholder');

const menu = (state: Ace.State, name: string) => {
  const menuConfig = menuConfigs.get(name) || {title: '', menu: placeholderEl};

  return h(
    'ab-menu',
    {
      'aria-label': `${menuConfig.title} Menu`,
      class: 'ab-menu ab-draggable',
      id: 'ab-menu',
      oncreate: [menuUpdatePosition, el => ({el, name})],
      style: {
        left:
          state.menus[name].menuPosX !== false
            ? `${state.menus[name].menuPosX}px`
            : null,
        top:
          state.menus[name].menuPosY !== false
            ? `${state.menus[name].menuPosY}px`
            : null,
      },
    },
    [
      h(
        'ab-menu-header',
        {
          'aria-label': 'Hold left mouse button to drag the menu',
          class: 'ab-menu-header ab-flex',
          onmousedown: [menuStartDrag, name],
          ontouchstart: [menuStartDrag, name],
        },
        [
          h(
            'ab-menu-header-text',
            {class: 'ab-menu-header-text'},
            menuConfig.title
          ),
          h(
            'ab-menu-close-button',
            {
              'aria-label': 'Close menu',
              class: 'ab-menu-close',
              id: 'ab-menu-close',
              onclick: [menuClose, name],
              oncreate: () => {
                tippy('#accessabar #ab-menu-close', {
                  arrow: true,
                  content: 'Close Menu',
                  placement: 'bottom',
                  theme: 'ab',
                });
              },
              onkeydown: handleButtonNavigation,
              role: 'button',
              tabIndex: 1,
            },
            [
              h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-cross',
              }),
            ]
          ),
        ]
      ),
      menuConfig.menu(state),
    ]
  );
};

export default menu;
export {menu};
