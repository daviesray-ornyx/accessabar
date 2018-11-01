import { app } from 'hyperapp';

import state from './state';
import actions from './actions';
import view from './main';

declare global {
    // tslint:disable-next-line
    interface Window {
        abar: AccessabarController;
    }
}

/**
 * Custom Element used as the container for Accessabar.
 *
 * @class AccessabarElement
 * @extends {HTMLElement}
 */
class AccessabarElement extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define('accessabar-app', AccessabarElement);

/**
 * Util functions for Accessabar.
 *
 * @class AccessabarUtil
 */
class AccessabarUtil {
    /**
     * Moves the page content to accomodate for Accessabar.
     *
     * Note: Possibly should be moved to separate folder.
     *
     * @static
     * @memberof AccessabarUtil
     */
    public static moveBody() {
        const { mainElement } = window.abar;

        if (mainElement) {
            const rect = mainElement.getBoundingClientRect();
            document.body.style.marginTop = `${rect.height}px`;
        }
    }

    /**
     * Checks the page is ready before moving page content.
     *
     * @static
     * @returns
     * @memberof AccessabarUtil
     */
    public static createSpace() {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            this.moveBody();

            return;
        }

        document.addEventListener('DOMContentLoaded', this.moveBody);
    }
}

/**
 * Entry point for Accessabar.
 *
 * @class AccessabarController
 */
class AccessabarController {
    /**
     * Element in webpage that activate Accessabar.
     *
     * @type {Element}
     * @memberof AccessabarController
     */
    public buttonElement: Element;

    /**
     * Element that will contain Accessabar.
     *
     * @type {Element}
     * @memberof AccessabarController
     */
    public bindTo: Element;

    /**
     * A reference to the Accessabar element when rendered.
     *
     * @type {HTMLElement}
     * @memberof AccessabarController
     */
    public mainElement: HTMLElement;

    /**
     * Reference to hyperapp actions.
     *
     * @private
     * @type {Accessabar.IActions}
     * @memberof AccessabarController
     */
    private appActions: Accessabar.IActions;

    /**
     * Set to true when Accessabar has been rendered on the page.
     *
     * @private
     * @memberof AccessabarController
     */
    private rendered = false;

    /**
     * Creates an instance of AccessabarController.
     *
     * @param {string} enableButton
     * Query selector string for element that enables Accessabar
     *
     * @param {string} [bindTo='body']
     * Optional; Query selector for element Accessabar will bind to (be inside).
     *
     * @memberof AccessabarController
     */
    constructor(enableButton: string, bindTo: string = 'body') {
        if (!enableButton) {
            throw new Error('[Accessabar] Error: no id given for button');
        }

        const buttonEl = document.querySelector(String(enableButton));
        if (!buttonEl) {
            throw Error('[Accessabar] Error: Cannot find element with the given id');
        }

        this.buttonElement = buttonEl;

        const bindEl = document.querySelector(String(bindTo));
        if (!bindEl) {
            throw Error('[Accessabar] Error: Cannot find element to bind to with the given id');
        }

        this.bindTo = bindEl;

        // Allows easy access during runtime to separate parts of the code
        window.abar = this;

        this.init();
    }

    /**
     * Initialises Accessabar; all setup code is started here.
     *
     * @memberof AccessabarController
     */
    public init() {
        this.initEnableButton();
    }

    /**
     * Opens accessabar on the webpage.
     *
     * @memberof AccessabarController
     */
    public open() {
        // display accessabar
        this.toggleShow();
        // start events
        this.initEvents();
    }

    /**
     * Handles rendering of accessabar.
     * Fires a CustomEvent after rendering accessabar if needed.
     *
     * @returns void
     * @memberof AccessabarController
     */
    public toggleShow() {
        if (!this.rendered) {
            const renderFunc = () => {
                const containerEl = new AccessabarElement();

                containerEl.id = 'accessabar';
                this.mainElement = containerEl;
                this.bindTo.insertAdjacentElement('afterbegin', containerEl);

                this.appActions = app(state, actions, view, containerEl);
                this.rendered = true;

                const event = new CustomEvent('accessabarLoad');

                window.dispatchEvent(event);
            };

            // Check page if page is ready to render Accessabar
            if (document.readyState === 'interactive' || document.readyState === 'complete') {
                renderFunc();

                return;
            }

            // If page is not ready, wait until it is
            document.addEventListener('DOMContentLoaded', renderFunc.bind(this));

            return;
        }

        // hide Accessabar if enable button is clicked
        if (!this.mainElement) {
            return;
        }

        if (this.mainElement.classList.contains('hide')) {
            this.mainElement.classList.remove('hide');

            AccessabarUtil.moveBody();

            return;
        }

        this.mainElement.classList.add('hide');
        document.body.style.marginTop = '0';
    }

    /**
     * Adds an click event listener to the enable button.
     *
     * @memberof AccessabarController
     */
    public initEnableButton() {
        this.buttonElement.addEventListener('click', this.open.bind(this));
    }

    /**
     * Initialise all events for Accessabar.
     *
     * @memberof AccessabarController
     */
    public initEvents() {
        // Change the body margin upon resizes
        window.addEventListener('resize', this.appActions.abarResize, { passive: true });
    }
}

export default AccessabarController;
export {
    AccessabarController,
    AccessabarUtil,
};
