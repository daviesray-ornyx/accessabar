import { ActionsType } from 'hyperapp';
import config from '../../config/functions.config.json5';
import { AccessabarUtil } from '../util';
/**
 * Fetches and returns parents of text nodes in the document
 *
 * @returns {Set<HTMLElement>}
 */
function getParents(): Set<HTMLElement> {
    const elements = document.body.childNodes;
    const taggedElements: ChildNode[] = [];
    const textNodes: Node[] = [];
    const parentElements: Set<HTMLElement> = new Set();

    // Filter through immediate child elements of body
    // and get elements to walk
    for (const el of elements) {
        // Do not add accessabar or elements with no children
        if (el !== window.abar.mainElement && el.childNodes.length !== 0) {
            taggedElements.push(el);
        }
    }

    for (const el of taggedElements) {
        // Will find all text nodes in element
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);

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

const fontActions: ActionsType<Accessabar.IState, Accessabar.IFontActions> = {
    decFontSize: () => {
        const parentElements = getParents();
        const { fontSizing } = config;
        // Loops over elements and changes text size for each element
        for (const el of parentElements) {
            // Get exact computed size for accurate results
            const size = window.getComputedStyle(el).fontSize;

            if (size) {
                const abarEdited = el.getAttribute('accessabar-edited');

                // Add attribute to element to flag edits from Accessabar.
                // If 'font-size' was set inline, it is added to 'accessabar-orig-font-size'.
                if (!abarEdited) {
                    el.setAttribute('accessabar-edited', fontSizing.editName);
                    el.setAttribute(fontSizing.attrNames.orig, el.style.fontSize || 'none');
                }

                if (abarEdited && abarEdited.split(' ').indexOf(fontSizing.editName) === -1) {
                    const funcNames = abarEdited.split(' ');

                    funcNames.push(fontSizing.editName);
                    el.setAttribute('accessabar-edited', funcNames.join(' '));
                }

                el.style.fontSize = `${parseInt(size, 10) - 1}px`;
            }
        }
    },

    resetFontSizing: () => {
        const parentElements = getParents();
        const { fontSizing }: { fontSizing: Accessabar.IConfigObject } = config;

        for (const el of parentElements) {
            const abarEdited = el.getAttribute('accessabar-edited');

            if (!abarEdited) {
                continue;
            }

            const orig = el.getAttribute(fontSizing.attrNames.orig);

            if (!orig) {
                continue;
            }

            if (orig === 'none') {
                el.style.fontSize = null;
            } else {
                el.style.fontSize = orig;
            }

            AccessabarUtil.pruneFuncs(el, abarEdited, fontSizing);
            el.removeAttribute(fontSizing.attrNames.orig);
        }
    },

    incFontSize: () => {
        const parentElements = getParents();
        const { fontSizing } = config;

        for (const el of parentElements) {
            const size = window.getComputedStyle(el).fontSize;

            if (size) {
                const abarEdited = el.getAttribute('accessabar-edited');

                if (!abarEdited) {
                    el.setAttribute('accessabar-edited', fontSizing.editName);
                    el.setAttribute(fontSizing.attrNames.orig, el.style.fontSize || 'none');
                }

                if (abarEdited && abarEdited.split(' ').indexOf(fontSizing.editName) === -1) {
                    const funcNames = abarEdited.split(' ');

                    funcNames.push(fontSizing.editName);
                    el.setAttribute('accessabar-edited', funcNames.join(' '));
                }

                el.style.fontSize = `${parseInt(size, 10) + 1}px`;
            }
        }
    },
};

export default fontActions;
export { fontActions };
