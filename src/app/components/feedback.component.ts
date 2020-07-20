import { h } from 'hyperapp';
import {aceAddTippy} from '../actions/ace.actions';
import {handleButtonNavigation} from './buttons.component';
import {thumbsUpFeedback, thumbsDownFeedback, tellMeMore, closeFeedback} from '../actions/feedback.actions';

interface IFeedbackState {
    feedbackProvided: Accessabar.IState['feedbackProvided'];
    feedbackActive: Accessabar.IState['feedbackActive'];
    feedbackHeight: Accessabar.IState['feedbackHeight'];
    feedbackHeightMin: Accessabar.IState['feedbackHeightMin'];
    feedbackWidth: Accessabar.IState['feedbackWidth'];
    feedbackWidthMin: Accessabar.IState['feedbackWidthMin'];
    feedbackPosX: Accessabar.IState['feedbackPosX'];
    feedbackPosY: Accessabar.IState['feedbackPosY'];
}


const feedback = ({feedbackActive, feedbackHeight, feedbackHeightMin, feedbackWidth, feedbackWidthMin, feedbackPosX, feedbackPosY }: IFeedbackState) => {

    return h(
        'ab-feedback-menu',
        {
            'aria-label': `Feedback Dialog`,
            class: `ab-feedback-menu ab-draggable  ${feedbackActive == true ? '' : 'ab-hide'}`, // ${ false ? 'ab-hide' : ''}
            id: 'ab-feedback-menu',
            oncreate: (el: HTMLElement) => {
                //actions.menuUpdatePosition(el);
            },
            style: {
                left: `${ feedbackPosX }px`,
                top: `${ feedbackPosY }px`,
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
                    h('ab-feedback-menu-header-text', { class: 'ab-feedback-menu-header-text' }, 'User Feedback'),
                    h('ab-feedback-menu-buttons-container', {class: 'ab-feedback-menu-buttons-container'}, 
                    [                        
                        h(
                            'ab-feedback-menu-close-button',
                            {
                                'aria-label': 'Close Feedback',
                                class: 'ab-feedback-menu-close',
                                id: 'ab-feedback-menu-close',
                                onclick: [ closeFeedback, ] ,
                                onmouseover: [aceAddTippy, {id: '#ab-feedback-menu-close', content: `Close feedback window?`}],
                                onkeydown: handleButtonNavigation,
                                role: 'button',
                                tabIndex: 1,
                            },
                            [
                                h('ab-icon', {
                                    'aria-hidden': 'true',
                                    class: 'ab-icon ab-icon-cross',
                                }),
                            ],
                        ),                        
                    ]), 
                ]
            ),
            h(
                'ab-feedback-prompt-text', 
                {
                    'aria-label': `Are you enjoying ACE?`,
                    class: `ab-feedback-prompt-text`,
                    id:'ab-feedback-prompt-text'
                },
                ['Have you enjoyed using ACE?']
            ),
            h(
                'ab-feedback-actions-container',
                {
                    class: `ab-feedback-actions-container`,
                    id:`ab-feedback-actions-container`
                },
                [
                    h(
                        'ab-feedback-action-thumbs-up',
                        {
                            'aria-label': 'Enjoying ACE',
                            class: 'ab-feedback-action-thumbs-up',
                            id: 'ab-feedback-action-thumbs-up',
                            onclick: [ thumbsUpFeedback, ],
                            onmouseover: [aceAddTippy, {id: '#ab-feedback-action-thumbs-up', content: `Yes`}],
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                            tabIndex: 1,
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
                            onclick: [ thumbsDownFeedback, ],
                            onmouseover: [aceAddTippy, {id: '#ab-feedback-action-thumbs-down', content: `No`}],
                            onkeydown: handleButtonNavigation,
                            role: 'button',
                            tabIndex: 1,
                        },
                        [
                            h('ab-icon', {
                                'aria-hidden': 'true',
                                class: 'ab-icon ab-icon-thumbs-down',
                            }),
                        ],
                    )
                ]
            ),
            h(
                'ab-feedback-tell-me-more-button',
                {
                  'aria-controls': 'ab-feedback-tell-me-more-button',
                  'aria-label': 'Tell Me More',
                  class: 'ab-feedback-tell-me-more-button',
                  id: 'ab-feedback-tell-me-more-button',
                  onmouseover: [aceAddTippy, {id: '#ab-feedback-tell-me-more-button', content: `Tell Me More`}],
                  onclick: tellMeMore,
                  role: 'button',
                },
                [
                  'Tell Me More'
                ]
            ),
        ]
    );
};

export default feedback;
export { feedback };
