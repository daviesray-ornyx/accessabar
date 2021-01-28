import {h} from 'hyperapp';
import {
  aceAddTippy,
  aceSpeakTooltip,
  handleButtonNavigation,
} from '../actions/ace.actions';
import {
  thumbsUpFeedback,
  thumbsDownFeedback,
  tellMeMore,
  closeFeedback,
} from '../actions/feedback.actions';

const feedback = ({feedbackActive, feedbackPosX, feedbackPosY}: Ace.State) => {
  return h(
    'ab-feedback-menu',
    {
      'aria-label': 'Feedback Dialog',
      class: `ab-feedback-menu ab-draggable  ${!feedbackActive && 'ab-hide'}`,
      id: 'ab-feedback-menu',
      style: {
        left: `${feedbackPosX}px`,
        top: `${feedbackPosY}px`,
      },
    },
    [
      h(
        'ab-feedback-menu-header',
        {
          'aria-label': 'Hold left mouse button to drag the menu',
          class: 'ab-feedback-menu-header ab-flex',
        },
        [
          h('ab-spacer', {}, ['']),
          h(
            'ab-feedback-menu-header-text',
            {class: 'ab-feedback-menu-header-text'},
            'User Feedback'
          ),
          h(
            'ab-feedback-menu-buttons-container',
            {class: 'ab-feedback-menu-buttons-container'},
            [
              h(
                'ab-feedback-menu-close-button',
                {
                  'aria-label': 'Close Feedback',
                  class: 'ab-feedback-menu-close',
                  id: 'ab-feedback-menu-close',
                  onclick: closeFeedback,
                  onmouseover: [
                    aceAddTippy,
                    {
                      id: '#ab-feedback-menu-close',
                      content: 'Close feedback window?',
                    },
                  ],
                  onmouseenter: [
                    aceSpeakTooltip,
                    {
                      id: '#ab-feedback-menu-close',
                      content: 'Close feedback window?',
                    },
                  ],
                  onkeydown: closeFeedback,
                  role: 'button',
                  tabindex: 0,
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
        ]
      ),
      h(
        'ab-feedback-prompt-text',
        {
          'aria-label': 'Are you enjoying ACE?',
          class: 'ab-feedback-prompt-text',
          id: 'ab-feedback-prompt-text',
        },
        ['Have you enjoyed using ACE?']
      ),
      h(
        'ab-feedback-actions-container',
        {
          class: 'ab-feedback-actions-container',
          id: 'ab-feedback-actions-container',
        },
        [
          h(
            'ab-feedback-action-thumbs-up',
            {
              'aria-label': 'Enjoying ACE',
              class: 'ab-feedback-action-thumbs-up',
              id: 'ab-feedback-action-thumbs-up',
              onclick: thumbsUpFeedback,
              onmouseover: [
                aceAddTippy,
                {id: '#ab-feedback-action-thumbs-up', content: 'Yes'},
              ],
              onkeydown: (state: Ace.State, event: KeyboardEvent) => {
                const {type, code} = event;
                if (code !== 'Enter') {
                  return state;
                }
                if (
                  type !== 'keydown' &&
                  type !== 'click' &&
                  type !== 'keypress'
                ) {
                  return state;
                }
                return thumbsUpFeedback;
              },
              role: 'button',
              tabIndex: 0,
            },
            [
              h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-thumbs-up',
              }),
            ]
          ),
          h(
            'ab-feedback-action-thumbs-down',
            {
              'aria-label': 'Not Enjoying ACE',
              class: 'ab-feedback-action-thumbs-down',
              id: 'ab-feedback-action-thumbs-down',
              onclick: thumbsDownFeedback,
              onmouseover: [
                aceAddTippy,
                {id: '#ab-feedback-action-thumbs-down', content: 'No'},
              ],
              onkeydown: (state: Ace.State, event: KeyboardEvent) => {
                const {type, code} = event;
                if (code !== 'Enter') {
                  return state;
                }
                if (
                  type !== 'keydown' &&
                  type !== 'click' &&
                  type !== 'keypress'
                ) {
                  return state;
                }
                return thumbsDownFeedback;
              },
              role: 'button',
              tabIndex: 0,
            },
            [
              h('ab-icon', {
                'aria-hidden': 'true',
                class: 'ab-icon ab-icon-thumbs-down',
              }),
            ]
          ),
        ]
      ),
      h(
        'ab-feedback-actions-contaner',
        {
          class: 'ab-feedback-actions-container',
          id: 'ab-feedback-buttons-container',
        },
        [
          h(
            'ab-feedback-tell-me-more-button',
            {
              'aria-controls': 'ab-feedback-tell-me-more-button',
              'aria-label': 'Tell Me More',
              class: 'ab-feedback-tell-me-more-button',
              id: 'ab-feedback-tell-me-more-button',
              onmouseover: [
                aceAddTippy,
                {
                  id: '#ab-feedback-tell-me-more-button',
                  content: 'Tell Me More',
                },
              ],
              onclick: tellMeMore,
              onkeydown: (state: Ace.State, event: KeyboardEvent) => {
                const {type, code} = event;
                if (code !== 'Enter') {
                  return state;
                }
                if (
                  type !== 'keydown' &&
                  type !== 'click' &&
                  type !== 'keypress'
                ) {
                  return state;
                }
                return tellMeMore;
              },
              role: 'button',
              tabindex: 0,
            },
            ['Tell Me More']
          ),
          h(
            'ab-feedback-close-button',
            {
              'aria-controls': 'ab-feedback-close-button',
              'aria-label': 'Close feedback',
              class: 'ab-feedback-close-button',
              id: 'ab-feedback-close-button',
              onmouseover: [
                aceAddTippy,
                {id: '#ab-feedback-close-button', content: 'Close feedback'},
              ],
              onclick: closeFeedback,
              onkeydown: (state: Ace.State, event: KeyboardEvent) => {
                const {type, code} = event;
                if (code !== 'Enter') {
                  return state;
                }
                if (
                  type !== 'keydown' &&
                  type !== 'click' &&
                  type !== 'keypress'
                ) {
                  return state;
                }
                return [closeFeedback, event];
              },
              role: 'button',
              tabindex: 0,
            },
            ['Close']
          ),
        ]
      ),
    ]
  );
};

export default feedback;
export {feedback};
