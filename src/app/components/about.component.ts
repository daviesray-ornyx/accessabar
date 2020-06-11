import { h } from 'hyperapp';

const aboutHeader = ({ aboutHidden }, { aboutClose }) => {
    return h('ab-about-header', { class: 'ab-about-header' }, [
        h('ab-logo', { class: 'ab-logo-large ab-settings-logo', 'aria-label': 'Ace logo' }, [
            h('ab-logo-img', { class: 'ab-logo-img-word', alt: 'Ace Logo' }),
        ]),
        h('ab-about-header-title', { class: 'ab-about-header-title' }, 'Accessible Content Everywhere (ACE)'),
        h(
            'ab-about-close-button',
            {
                'aria-controls': 'ab-about',
                'aria-label': 'Close About',
                'aria-pressed': String(aboutHidden),
                class: 'ab-about-close-button',
                onclick: () => {
                    aboutClose();
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

const aboutInfoSection = ({  }, { }) => {

    return [
        h('ab-about-section-title', { class: 'ab-about-section-title' }, 'About'),
        h('ab-about-sr-lang', { class: 'ab-about-section-group' }, [
            // Links need to be added here
            'Accessabar is a toolbar that provides a range of features to make any website accessible.'
        ]),
        h('ab-about-sr-lang', { class: 'ab-about-section-group' }, [
            // Links need to be added here
            `Accessibility is becoming more important every day in today's internet landscape. Websites are becoming more creative, laden with images and fancy animations, all packed into a javascript rendered frontend. Whilst this is great for most, it can sometimes alienate the disabled.`
        ]),
        h('ab-about-sr-lang', { class: 'ab-about-section-group' }, [
            // Links need to be added here
            'Accessabar pairs with any website to make it accessible to everyone.'
        ]),
    ];
};

const aboutLinksSection = ({  }, { }) => {
    return [
        h('ab-about-section-title', { class: 'ab-about-section-title' }, 'Links'),
        h('a', {
            'aria-controls': 'ab-about-hfc-link',
            class: 'ab-about-section-group',
            href: 'http://hands-free.co.uk/',
            target: '_blank',
        },
        [
            // Links need to be added here
            'hands-free.co.uk'
        ]),
        h('a', {
            'aria-controls': 'ab-about-ace-link',
            class: 'ab-about-section-group',
            href: 'https://acetoolbar.com/',
            target: '_blank',
        },
        [
            // Links need to be added here
            'acetoolbar.com'
        ]),
    ];
};

const aboutVersionSection = ({  }, { }) => {
    return [
        h('ab-about-section-title', { class: 'ab-about-section-title' }, 'Version'),
        h('ab-about-sr-lang', { class: 'ab-about-section-group' }, [
            window.abar.version,
            // Links need to be added here
        ]),
    ];
};

const aboutMenu = (state: Accessabar.IState, actions: Accessabar.IActions) => {
    return h('ab-about-menu', { id: 'ab-about', class: `ab-about ${state.aboutHidden ? 'ab-hide' : ''}`, 'aria-label': 'Accessabar about' }, [
        aboutHeader(state, actions),
        h('ab-about-section', { class: 'ab-about-section' }, [
            ...aboutInfoSection(state, actions),
            ...aboutLinksSection(state, actions),
            ...aboutVersionSection(state, actions),
        ]),
    ]);
};

export default aboutMenu;
export {
    aboutMenu,
};
