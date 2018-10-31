import { app } from 'hyperapp';

import state from './state';
import actions from './actions';
import view from './main';

class AccessabarElement extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define('accessabar-app', AccessabarElement);
console.log('test');

class AccessabarController {
    public buttonElement: Element;

    public bindTo: Element;

    private appActions: Accessabar.IActions;

    private rendered = false;

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
    }

    public start() {
        this.initEnableButton();
    }

    public initEnableButton() {
        this.buttonElement.addEventListener('click', () => {
            this.toggleShow();
            this.initEvents();
        });
    }

    public initEvents() {
        // handle resizes when accessabar is hidden
        window.addEventListener('resize', this.appActions.abarHideResize);
    }

    public toggleShow() {
        if (!this.rendered) {
            const renderFunc = () => {
                const containerEl = new AccessabarElement();

                containerEl.id = 'accessabar';
                this.bindTo.insertAdjacentElement('afterbegin', containerEl);

                this.appActions = app(state, actions, view, containerEl);
                this.rendered = true;

                const event = new CustomEvent('accessabarLoad');

                window.dispatchEvent(event);
            };

            if (document.readyState === 'interactive' || document.readyState === 'complete') {
                renderFunc();
                return;
            }

            document.addEventListener('DOMContentLoaded', renderFunc.bind(this));

            return;
        }

        const abEl = document.querySelector('#accessabar');
        if (abEl) {
            abEl.classList.toggle('hide');
        }
    }
}

export default AccessabarController;
export { AccessabarController };
