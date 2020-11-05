import {h} from 'hyperapp';
import {simplifyClose} from '../actions/simplify.actions';
import {Readability} from '@mozilla/readability';
import DOMPurify from 'dompurify';

const simplifyHeader = ({simplifyHidden}) => {
  return h('ab-simplify-header', {class: 'ab-modal-header'}, [
    h('ab-simplify-image'),
    h('ab-simplify-header-title', {class: 'ab-modal-header-title'}),
    h(
      'ab-simplify-close-button',
      {
        'aria-controls': 'ab-simplify',
        'aria-label': 'Close Simplified Page',
        'aria-pressed': String(simplifyHidden),
        class: 'ab-modal-close-button',
        onclick: simplifyClose,
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

const simplifyEl = (state: Ace.State) => {
  const documentClone = document.cloneNode(true);
  const article = new Readability(documentClone).parse();
  return h(
    'ab-simplify',
    {
      id: 'ab-simplify',
      class: `ab-modal ${state.simplifyHidden ? 'ab-hide' : ''}`,
      'aria-label': 'Simplified page',
    },
    [
      simplifyHeader(state),
      h('ab-simplify-section-left', {class: 'ab-modal-section-left'}),
      h('ab-simplify-section', {class: 'ab-modal-section'}, [
        h('iframe', {
          class: 'ab-simplify-content',
          srcdoc: DOMPurify.sanitize(article.content),
        }),
      ]),
      h('ab-simplify-section-right', {class: 'ab-modal-section-right'}),
    ]
  );
};

export default simplifyEl;
export {simplifyEl};
