import { h } from 'hyperapp';
import tippy from 'tippy.js';

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

interface IFeedbackActions {    
    showFeedback: Accessabar.IFeedbackActions['showFeedback'];
    thumbsUpFeedback: Accessabar.IFeedbackActions['thumbsUpFeedback'];
    thumbsDownFeedback: Accessabar.IFeedbackActions['thumbsDownFeedback'];
    closeFeedback: Accessabar.IFeedbackActions['closeFeedback'];
    //magUpdateSize
}

const feedback = ({feedbackActive, feedbackHeight, feedbackHeightMin, feedbackWidth, feedbackWidthMin, feedbackPosX, feedbackPosY }: IFeedbackState, {showFeedback, thumbsUpFeedback, thumbsDownFeedback, closeFeedback }: IFeedbackActions) => {

    return h(
        'ab-feedback-menu',
        {
            'aria-label': `Feedback Dialog`,
            class: `ab-feedback-menu ab-draggable  ${feedbackActive == false ? 'ab-hide' : ''}`, // ${ false ? 'ab-hide' : ''}
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
                    onmousedown: (event) => {
                        //actions.menuStartDrag(event);
                    },
                    ontouchstart: (event) => {
                        //actions.menuStartDrag(event);
                    },
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
                                onclick: () => {
                                    closeFeedback();
                                },
                                oncreate: () => {
                                    tippy('#accessabar #ab-feedback-menu-close', {
                                        arrow: true,
                                        content: 'Close dialog',
                                        placement: 'bottom',
                                        theme: 'ab',
                                    });
                                },
                                //onkeydown: handleButtonNavigation,
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
                ['Are you enjoying ACE? ']
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
                            onclick: () => {
                                thumbsUpFeedback();
                            },
                            oncreate: () => {
                                tippy('#accessabar #ab-feedback-action-thumbs-up', {
                                    arrow: true,
                                    content: `Yes`,
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            //onkeydown: handleButtonNavigation,
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
                            onclick: () => {
                                thumbsDownFeedback();
                            },
                            oncreate: () => {
                                tippy('#accessabar #ab-feedback-action-thumbs-down', {
                                    arrow: true,
                                    content: 'No',
                                    placement: 'bottom',
                                    theme: 'ab',
                                });
                            },
                            //onkeydown: handleButtonNavigation,
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
            )
        ]
    );
};

export default feedback;
export { feedback };
