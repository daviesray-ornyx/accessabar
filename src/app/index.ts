import {app} from 'hyperapp';

import initState from './state/ace.state';
import view from './main.view';
import apiSendEvent from './actions/api.actions';
import resizeAceHandle from './subscriptions/resize.subscription';
import {ttsInit, ttsSpeak} from './actions/tts.actions';

declare global {
  // tslint:disable-next-line
  interface Window {
    ace: AceController;
    pickr: any;
  }
}

// Custom Element used as the container for Ace.
class AceElement extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define('ace-app', AceElement);

// Entry point for Ace.
class AceController {
  public version = '0.10.4';

  // Element in page that activates Ace.
  public buttonElement: Element | undefined;

  // Element that will contain Ace.
  public bindTo: Element;

  // A reference to the Ace element when rendered.
  public mainElement: HTMLElement | undefined;

  // Contains all applied functions.
  public appliedFunctions: Map<string, () => unknown> = new Map();

  // Copy of ace state for interop.
  private aceState: {[x: string]: any} = {};

  // Position of Accessabar on the page.
  public position: string;

  /**
   * If enabled, the margin top of the document's body
   * will equal Ace's height. This will move the page's content
   * down in order to make space for Ace.
   */
  public moveBody: boolean;
  private rendered = false;

  constructor({
    enableButton = '',
    bindTo = 'body',
    position = 'top',
    moveBody,
  }: Ace.AceConfig = {}) {
    // Allows easy access during runtime to separate parts of the code
    window.ace = this;

    // -- enableButton --
    if (enableButton) {
      const buttonEl = document.querySelector(String(enableButton));
      if (!buttonEl) {
        throw Error('[Ace] Error: Cannot find element with the given id');
      }

      this.buttonElement = buttonEl;

      this.initEnableButton();
    }

    // -- bindTo --
    const strBindTo = String(bindTo);
    const bindEl = document.querySelector(strBindTo);
    if (!bindEl) {
      throw Error(
        '[Ace] Error: Cannot find element to bind to with the given id'
      );
    }

    this.bindTo = bindEl;

    // -- position --
    const positions = new Set(['top', 'bottom', 'none']);

    if (!positions.has(position)) {
      throw Error(
        `[Ace] Error: The given position '${position}' is not valid. Options are: top, bottom.`
      );
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

    // -- check if opened --
    this.restoreRenderState();
  }

  public open() {
    this.openSilent();

    apiSendEvent('AceOpened');
  }

  private openSilent() {
    this.toggleShow();
  }

  public close() {
    if (this.mainElement?.parentElement) {
      this.mainElement.parentElement.removeChild(this.mainElement);
    }

    if (this.moveBody) {
      document.body.style.marginTop = '0';
    }

    this.disableRenderState();

    delete this.mainElement;
  }

  public speakText(str: string) {
    const cleanStr = String(str);

    if (cleanStr.length < 1) {
      return;
    }

    console.log(`[Ace] Speaking ${cleanStr}`);

    ttsInit(this.aceState);
    ttsSpeak(this.aceState, cleanStr);
  }

  private enableRenderState() {
    this.rendered = true;

    if (!window.localStorage) {
      return;
    }

    window.localStorage.setItem('aceRendered', 'true');
  }

  private disableRenderState() {
    this.rendered = false;

    if (!window.localStorage) {
      return;
    }

    window.localStorage.setItem('aceRendered', 'false');
  }

  private restoreRenderState() {
    if (this.rendered && this.mainElement) {
      return;
    }

    if (!window.localStorage) {
      return;
    }

    const storedRenderState = window.localStorage.getItem('aceRendered');

    if (storedRenderState) {
      this.openSilent();
    }
  }

  private saveState(state: {[x: string]: any}) {
    this.aceState = state;

    if (!window.localStorage) {
      return;
    }

    window.localStorage.setItem('aceLocalState', JSON.stringify(state));
  }

  private getState(): {[x: string]: any} {
    if (!window.localStorage) {
      return initState;
    }

    const localState = window.localStorage.getItem('aceLocalState');

    if (localState) {
      return JSON.parse(localState);
    }

    return initState;
  }

  private subStateSave(_, props: {[x: string]: any}) {
    this.saveState(props.state);
  }

  private createApp(containerEl: AceElement) {
    const appConfig = {
      view,
      init: this.getState(),
      node: containerEl,
      subscriptions: (state: {[x: string]: any}) => [
        [
          this.subStateSave,
          {
            state,
          },
        ],
        [resizeAceHandle, {}],
      ],
    };

    return app(appConfig);
  }

  /**
   * Handles rendering of ace.
   * Fires a CustomEvent after rendering ace if needed.
   */
  private toggleShow() {
    if (!this.rendered) {
      const renderFunc = () => {
        const containerEl = this.setContainerStyle(new AceElement());

        containerEl.id = 'ace';
        containerEl.setAttribute('aria-label', 'Start of Ace toolbar.');
        this.mainElement = containerEl;
        this.bindTo.insertAdjacentElement('afterbegin', containerEl);

        this.createApp(containerEl);
        this.enableRenderState();

        const event = new CustomEvent('aceLoad');
        window.dispatchEvent(event);
      };

      // Check page if page is ready to render Accessabar
      if (
        document.readyState === 'interactive' ||
        document.readyState === 'complete'
      ) {
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
   */

  private setContainerStyle(containerEl: AceElement) {
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
   */
  private initEnableButton() {
    if (this.buttonElement) {
      this.buttonElement.addEventListener('click', this.open.bind(this));
    }
  }
}

export default AceController;
export {AceController};
