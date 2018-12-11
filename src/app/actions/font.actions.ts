import { ActionsType } from 'hyperapp';
import config from '../../config/functions.config.json5';
import { AccessabarUtil } from '../util';
import fontConfig from '../../config/fonts.config.json5';

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
        const { fontSizing }: { fontSizing: Accessabar.IConfigObject } = config;
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
                    el.setAttribute(fontSizing.attrNames.orig, el.style.fontSize || 'none');
                }

                el.style.fontSize = `${parseInt(size, 10) - 1}px`;
            }
        }
    },

    resetFontSizing: () => (state, { fontReset }) => {
        fontReset('fontSizing');
    },

    incFontSize: () => {
        const parentElements = getParents();
        const { fontSizing }: { fontSizing: Accessabar.IConfigObject } = config;

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
                    el.setAttribute(fontSizing.attrNames.orig, el.style.fontSize || 'none');
                }

                el.style.fontSize = `${parseInt(size, 10) + 1}px`;
            }
        }
    },

    fontFamilyEnable: () => ({ fontActive }, { fontChangeFamilyAll, fontFamilyReset }) => {
        if (!fontActive) {
            AccessabarUtil.startFunction('fontFamily', fontFamilyReset, fontChangeFamilyAll);

            return {
                fontActive: true,
            };
        }

        AccessabarUtil.stopFunction('fontFamily');

        return {
            fontActive: false,
        };
    },

    fontFamilyReset: () => (state, { fontReset }) => {
        fontReset('fontFamily');
    },

    fontChangeFamilyAll: (key?: string) => ({ fontCurrentKey }) => {
        const currentKey: string = key || fontCurrentKey;

        if (currentKey.length <= 0) {
            return;
        }

        const currentFontFamily = fontConfig[currentKey].family || null;
        const { fontFamily }: { fontFamily: Accessabar.IConfigObject } = config;
        const parentElements = getParents();

        for (const el of parentElements) {
            const abarEdited = el.getAttribute('accessabar-edited');

            if (!abarEdited) {
                el.setAttribute('accessabar-edited', fontFamily.editName);
                el.setAttribute(fontFamily.attrNames.orig, el.style.fontFamily || 'none');
            }

            if (abarEdited && abarEdited.split(' ').indexOf(fontFamily.editName) === -1) {
                const funcNames = abarEdited.split(' ');

                funcNames.push(fontFamily.editName);
                el.setAttribute('accessabar-edited', funcNames.join(' '));
                el.setAttribute(fontFamily.attrNames.orig, el.style.fontFamily || 'none');
            }

            el.style.fontFamily = currentFontFamily;
        }
    },

    fontColourChange: (colour: string) => ({ fontColourCurrent }) => {
        const currentColour: string = colour || fontColourCurrent;

        if (currentColour.length <= 0) {
            return;
        }

        const { fontColour }: { fontColour: Accessabar.IConfigObject } = config;
        const parentElements = getParents();

        // TODO: Make loop func
        for (const el of parentElements) {
            const abarEdited = el.getAttribute('accessabar-edited');

            if (!abarEdited) {
                el.setAttribute('accessabar-edited', fontColour.editName);
                el.setAttribute(fontColour.attrNames.orig, el.style.color || 'none');
            }

            if (abarEdited && abarEdited.split(' ').indexOf(fontColour.editName) === -1) {
                const funcNames = abarEdited.split(' ');

                funcNames.push(fontColour.editName);
                el.setAttribute('accessabar-edited', funcNames.join(' '));
                el.setAttribute(fontColour.attrNames.orig, el.style.color || 'none');
            }

            el.style.color = currentColour;
        }
    },

    fontColourEnable: () => ({ fontColourActive }, { fontColourChange, fontColourReset }) => {
        if (!fontColourActive) {
            AccessabarUtil.startFunction('fontColour', fontColourReset, fontColourChange);

            return {
                fontColourActive: true,
            };
        }

        AccessabarUtil.stopFunction('fontColour');

        return {
            fontColourActive: false,
        };
    },

    fontColourReset: () => (state, { fontReset }) => {
        fontReset('fontColour');
    },

    fontReset: (configKey: string) => {
        const parentElements = getParents();
        const configObj: Accessabar.IConfigObject = config[configKey];

        for (const el of parentElements) {
            const abarEdited = el.getAttribute('accessabar-edited');

            if (!abarEdited) {
                continue;
            }

            const orig = el.getAttribute(configObj.attrNames.orig);

            if (!orig) {
                continue;
            }

            if (orig === 'none') {
                el.style.setProperty(configObj.editName, null);
            } else {
                el.style.setProperty(configObj.editName, orig);
            }

            AccessabarUtil.pruneFuncs(el, abarEdited, configObj);
            el.removeAttribute(configObj.attrNames.orig);
        }
    },

    lineSpacingEnable: () => ({ fontLineSpacingActive }) => {
        return {
            fontLineSpacingActive: !fontLineSpacingActive,
        };
    },

    charSpacingEnable: () => ({ fontCharSpacingActive }) => {
        return {
            fontCharSpacingActive: !fontCharSpacingActive,
        };
    },
};

export default fontActions;
export { fontActions };
