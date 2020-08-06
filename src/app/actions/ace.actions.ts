import Pickr from '@simonwep/pickr';
import tippy from 'tippy.js';
import {fxAceSpeakTooltip} from '../fx/ace.fx';

function aceMoveBody() {
  const {mainElement} = window.ace;

  if (mainElement) {
    const rect = mainElement.getBoundingClientRect();
    document.body.style.marginTop = `${rect.height}px`;
  }
}

function aceResize(state: Ace.State) {
  const {aceHidden} = state;
  const {mainElement} = window.ace;

  if (!mainElement) {
    return state;
  }

  if (aceHidden) {
    const rect = mainElement.getBoundingClientRect();

    mainElement.style.top = `-${rect.height - 2}px`;

    return state;
  }

  aceMoveBody();
  return state;
}

function acePruneFuncs(
  el: HTMLElement,
  aceEdited: string,
  config: Ace.FuncConfig
) {
  const funcNames = aceEdited.split(' ') || [];

  if (funcNames.indexOf(config.editName) !== -1 && funcNames.length > 1) {
    const index = funcNames.indexOf(config.editName);
    funcNames.splice(index, 1);
    el.setAttribute('ace-edited', funcNames.join(' '));
  } else {
    el.removeAttribute('ace-edited');
  }
}

function aceHide(state: Ace.State) {
  const {aceHidden} = state;
  const {mainElement, moveBody} = window.ace;

  if (!mainElement) {
    return state;
  }

  if (aceHidden) {
    mainElement.style.top = '0';

    if (moveBody) {
      aceMoveBody();
    }

    return {...state, aceHidden: false, menusHidden: false};
  }

  const bar = mainElement.querySelector('.ab-bar');

  if (!bar) {
    return state;
  }

  // Get height of Ace, then push Ace above the window view
  // by that height - 2px (allows a small amount of Ace to still show).
  const rect = bar.getBoundingClientRect();

  mainElement.style.top = `-${rect.height - 2}px`;

  if (moveBody) {
    document.body.style.marginTop = '2px';
  }

  return {...state, aceHidden: true, menusHidden: true};
}

function getParents(): Set<HTMLElement> {
  const elements = document.body.childNodes;
  const taggedElements: ChildNode[] = [];
  const textNodes: Node[] = [];
  const parentElements: Set<HTMLElement> = new Set();

  // Filter through immediate child elements of body
  // and get elements to walk
  for (const el of elements) {
    // Do not add ace or elements with no children
    if (el !== window.ace.mainElement && el.childNodes.length !== 0) {
      taggedElements.push(el);
    }
  }

  for (const el of taggedElements) {
    // Will find all text nodes in element
    const walker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    // Push each text node found into array
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }
  }

  for (const node of textNodes) {
    const text = (node.textContent || '').trim();

    // Do not add empty text nodes or line feeds in HTML
    if (text === '' || text === '\n') {
      continue;
    }

    const parent = node.parentElement;

    if (!parent) {
      continue;
    }

    // Do not add tippy tooltips
    if (parent.classList.contains('tippy-content')) {
      continue;
    }

    // Do not add duplicates
    if (parentElements.has(parent)) {
      continue;
    }

    parentElements.add(parent);
  }

  return parentElements;
}

function editLoop(
  currentConfig: Ace.FuncConfig,
  modifier: string,
  modifierValue: string | number
) {
  const parentElements = getParents();

  for (const el of parentElements) {
    const abarEdited = el.getAttribute('ace-edited');

    if (!abarEdited) {
      el.setAttribute('ace-edited', currentConfig.editName);
      el.setAttribute(
        currentConfig.attrNames.orig,
        el.style[modifier] || 'none'
      );
    }

    if (
      abarEdited &&
      abarEdited.split(' ').indexOf(currentConfig.editName) === -1
    ) {
      const funcNames = abarEdited.split(' ');

      funcNames.push(currentConfig.editName);
      el.setAttribute('ace-edited', funcNames.join(' '));
      el.setAttribute(
        currentConfig.attrNames.orig,
        el.style[modifier] || 'none'
      );
    }

    el.style[modifier] = modifierValue;
  }
}

function editLoopComputed(
  currentConfig: Ace.FuncConfig,
  modifier: string,
  modifierStep: number,
  modifierCount?: number
) {
  const parentElements = getParents();

  // Loops over elements and changes text size for each element
  for (const el of parentElements) {
    // Get exact computed size for accurate results
    const computed = window.getComputedStyle(el)[modifier];
    // fix for letter-spacing when set to normal
    const size: string = computed === 'normal' ? '0px' : computed;
    const sizeNumeric: number = parseFloat(size);

    if (size) {
      const abarEdited = el.getAttribute('ace-edited');

      // Add attribute to element to flag edits from Ace.
      // If 'font-size' was set inline, it is added to 'ace-orig-font-size'.
      if (!abarEdited) {
        el.setAttribute('ace-edited', currentConfig.editName);
        el.setAttribute(
          currentConfig.attrNames.orig,
          el.style[modifier] || 'none'
        );
        el.setAttribute(currentConfig.attrNames.origComputed, size);
      }

      if (
        abarEdited &&
        abarEdited.split(' ').indexOf(currentConfig.editName) === -1
      ) {
        const funcNames = abarEdited.split(' ');

        funcNames.push(currentConfig.editName);
        el.setAttribute('ace-edited', funcNames.join(' '));
        el.setAttribute(
          currentConfig.attrNames.orig,
          el.style[modifier] || 'none'
        );
        el.setAttribute(currentConfig.attrNames.origComputed, size);
      }

      if (typeof modifierCount === 'undefined') {
        el.style[modifier] = `${sizeNumeric + modifierStep}px`;
        continue;
      }

      const origComputed = el.getAttribute(
        currentConfig.attrNames.origComputed
      );

      if (origComputed) {
        const origComputedNumeric: number = parseFloat(origComputed);

        el.style[modifier] = `${
          origComputedNumeric + modifierStep * modifierCount
        }px`;
      }
    }
  }
}

function aceCreatePickr(
  state: Ace.State,
  opts: {id: string; action: (state: Ace.State, colour: string) => unknown}
) {
  window.pickr = new Pickr({
    components: {
      hue: true,
      interaction: {
        clear: false,
        cmyk: false,
        hex: true,
        hsla: false,
        hsva: false,
        input: true,
        rgba: true,
        save: true,
      },
      opacity: true,
      preview: true,
    },
    el: opts.id,
    theme: 'nano',
    useAsButton: true,
  });

  return [
    state,
    [
      (dispatch, props) => {
        window.pickr.on('save', hsva => {
          dispatch(props.action, hsva.toHEXA().toString());
        });
      },
      {
        action: opts.action,
      },
    ],
  ];
}

function aceAddTippy(state: Ace.State, opts: {id: string; content: string}) {
  if (state.aceTooltips.indexOf(opts.id) === -1) {
    tippy(`#accessabar ${opts.id}`, {
      arrow: true,
      content: opts.content,
      placement: 'bottom',
      theme: 'ab',
    });
    state.aceTooltips.push(opts.id);
  }

  return {
    ...state,
    aceTooltips: state.aceTooltips,
  };
}

function aceSpeakTooltip(
  state: Ace.State,
  opts: {id: string; content: string}
) {
  return [state, state.aceSpeakTooltips && fxAceSpeakTooltip(state, opts)];
}

function aceSpeakTooltipsToggle(state: Ace.State) {
  return {
    ...state,
    aceSpeakTooltips: !state.aceSpeakTooltips,
  };
}

function handleButtonNavigation(state: Ace.State, event: KeyboardEvent) {
  const {code, target} = event;

  if (!code || !target) {
    return state;
  }

  if (code === 'Enter' || code === 'Space') {
    (target as HTMLElement).click();
  }

  return state;
}

export {
  aceResize,
  aceMoveBody,
  acePruneFuncs,
  aceHide,
  getParents,
  editLoop,
  editLoopComputed,
  aceCreatePickr,
  aceAddTippy,
  aceSpeakTooltipsToggle,
  aceSpeakTooltip,
  handleButtonNavigation,
};
