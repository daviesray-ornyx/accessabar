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
     * Version number of Accessabar
     *
     * @type string
     * @memberOf AccessabarController
     */
    public version: string = '0.8.7';
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
     * Position of Accessabar on the page.
     *
     * @type string
     * @memberOf AccessabarController
     */
    public position: string;

    /**
     * If enabled, the margin top of the documents body
     * will equal Accessabar's height. This in effect will move the pages content
     * down in order to make space for Accessabar.
     *
     * @type boolean
     * @memberOf AccessabarController
     */

    public moveBody: boolean;

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
     * @param {string} enableButton = ''
     * Optional; Query selector string for element that enables Accessabar
     *
     * @param {string} bindTo = 'body'
     * Optional; Query selector for element Accessabar will bind to (be inside).
     *
     * @param {string} position = 'top'
     * Optional; Position of Accessabar.
     *
     * @param {boolean} moveBody
     * Optional; If enabled, the margin top of the documents body
     * will equal Accessabar's height. This in effect will move the pages content
     * down in order to make space for Accessabar.
     *
     * @memberof AccessabarController
     */
    constructor({ enableButton = '', bindTo = 'body', position = 'top', moveBody }: Accessabar.IAccessabarConfig = {}) {
        // Allows easy access during runtime to separate parts of the code
        window.abar = this;

        // -- enableButton --
        if (enableButton) {
            const buttonEl = document.querySelector(String(enableButton));
            if (!buttonEl) {
                throw Error('[Accessabar] Error: Cannot find element with the given id');
            }

            this.buttonElement = buttonEl;

            this.initEnableButton();
        }

        // -- bindTo
        const strBindTo = String(bindTo);
        const bindEl = document.querySelector(strBindTo);
        if (!bindEl) {
            throw Error('[Accessabar] Error: Cannot find element to bind to with the given id');
        }

        this.bindTo = bindEl;

        // -- position --
        const positions = new Set(['top', 'bottom', 'none']);

        if (!positions.has(position)) {
            throw Error(`[Accessabar] Error: The given position '${position}' is not valid. Options are: top, bottom.`);
        }

        this.position = position;

        // -- moveBody --
        switch (typeof moveBody) {
        default:
        case 'undefined':
            if (strBindTo === 'body') {
                this.moveBody = true;
                break;
            }

            this.moveBody = false;
            break;

        case 'boolean':
            this.moveBody = moveBody;
            break;
        }
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
                const containerEl = this.setContainerStyle(new AccessabarElement());

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
    }

    /**
     * Sets the dynamic styles of the container element.
     *
     * @param containerEl
     */

    public setContainerStyle(containerEl: AccessabarElement) {
        switch (this.position) {
        default:
        case 'top':
            containerEl.style.position = 'fixed';
            containerEl.style.top = '0';
            break;
        case 'bottom':
            containerEl.style.position = 'fixed';
            containerEl.style.bottom = '0';
            break;
        case 'none':
            break;
        }

        return containerEl;
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
