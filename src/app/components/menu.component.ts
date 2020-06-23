import {h} from 'hyperapp';
import {handleButtonNavigation} from './buttons.component';
import * as menus from './menus.component';
import {menuClose, menuEndDrag, menuStartDrag} from '../actions/menu.actions';
import {aceAddTippy} from '../actions/ace.actions';

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

const menu = (state: Ace.State, menuName: string) => {
  const menuConfig = menuConfigs.get(menuName) || {
    title: '',
    menu: placeholderEl,
  };

  return h(
    'ab-menu',
    {
      'aria-label': `${menuConfig.title} Menu`,
      class: 'ab-menu ab-draggable',
      id: `ab-menu-${menuName}`,
      style: {
        left: `${state.menus[menuName].menuPosX}px`,
        top: `${state.menus[menuName].menuPosY}px`,
      },
    },
    [
      h(
        'ab-menu-header',
        {
          'aria-label': 'Hold left mouse button to drag the menu',
          class: 'ab-menu-header ab-flex',
          onmousedown: [menuStartDrag, ev => ({menuName, ev})],
          ontouchstart: [menuStartDrag, ev => ({menuName, ev})],
          onmouseup: menuEndDrag,
          ontouchend: menuEndDrag,
          ontouchcancel: menuEndDrag,
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
              onclick: [menuClose, menuName],
              onmouseover: [
                aceAddTippy,
                {id: '#ab-menu-close', content: 'Close Menu'},
              ],
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
