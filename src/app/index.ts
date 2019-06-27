import { app } from 'hyperapp';

import state from './state';
import actions from './actions';
import view from './main';
import AccessabarUtil from './util';

declare global {
    // tslint:disable-next-line
    interface Window {
        abar: AccessabarController;
        pickr: any;
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
     * Contains all applied functions
     *
     * @type {Map<string, object>}
     * @memberof AccessabarController
     */
    public appliedFunctions: Map<string, (() => unknown)> = new Map();

    /**
     * Reference to hyperapp actions.
     *
     * @private
     * @type {Accessabar.IActions}
     * @memberof AccessabarController
     */
    public appActions: Accessabar.IActions;

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
    constructor({ enableButton = '', bindTo = 'body' }: Accessabar.IAccessabarConfig) {
        if (enableButton) {
            const buttonEl = document.querySelector(String(enableButton));
            if (!buttonEl) {
                throw Error('[Accessabar] Error: Cannot find element with the given id');
            }

            this.buttonElement = buttonEl;
        }

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

    public close() {
        document.body.removeChild(this.mainElement);
        document.body.style.marginTop = '0';

        this.rendered = false;

        delete this.appActions;
        delete this.mainElement;
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
        if (this.buttonElement) {
            this.buttonElement.addEventListener('click', this.open.bind(this));
        }
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
