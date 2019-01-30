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

function editLoop(currentConfig: Accessabar.IConfigObject, modifier: string, modifierValue: string | number) {
    const parentElements = getParents();

    for (const el of parentElements) {
        const abarEdited = el.getAttribute('accessabar-edited');

        if (!abarEdited) {
            el.setAttribute('accessabar-edited', currentConfig.editName);
            el.setAttribute(currentConfig.attrNames.orig, el.style[modifier] || 'none');
        }

        if (abarEdited && abarEdited.split(' ').indexOf(currentConfig.editName) === -1) {
            const funcNames = abarEdited.split(' ');

            funcNames.push(currentConfig.editName);
            el.setAttribute('accessabar-edited', funcNames.join(' '));
            el.setAttribute(currentConfig.attrNames.orig, el.style[modifier] || 'none');
        }

        el.style[modifier] = modifierValue;
    }
}

function editLoopComputed(currentConfig: Accessabar.IConfigObject, modifier: string, modifierStep: number, modifierCount?: number) {
    const parentElements = getParents();

    // Loops over elements and changes text size for each element
    for (const el of parentElements) {
        // Get exact computed size for accurate results
        const computed = window.getComputedStyle(el)[modifier];
        // fix for letter-spacing when set to normal
        const size: string = computed === 'normal' ? '0px' : computed;
        const sizeNumeric: number = parseFloat(size);

        if (size) {
            const abarEdited = el.getAttribute('accessabar-edited');

            // Add attribute to element to flag edits from Accessabar.
            // If 'font-size' was set inline, it is added to 'accessabar-orig-font-size'.
            if (!abarEdited) {
                el.setAttribute('accessabar-edited', currentConfig.editName);
                el.setAttribute(currentConfig.attrNames.orig, el.style[modifier] || 'none');
                el.setAttribute(currentConfig.attrNames.origComputed, size);
            }

            if (abarEdited && abarEdited.split(' ').indexOf(currentConfig.editName) === -1) {
                const funcNames = abarEdited.split(' ');

                funcNames.push(currentConfig.editName);
                el.setAttribute('accessabar-edited', funcNames.join(' '));
                el.setAttribute(currentConfig.attrNames.orig, el.style[modifier] || 'none');
            }

            if (typeof modifierCount === 'undefined') {
                el.style[modifier] = `${sizeNumeric + modifierStep}px`;
                return;
            }

            const origComputed = el.getAttribute(currentConfig.attrNames.origComputed);

            if (origComputed) {
                const origComputedNumeric: number = parseFloat(origComputed);

                el.style[modifier] = `${origComputedNumeric + (modifierStep * modifierCount)}px`;
            }
        }
    }
}

const fontActions: ActionsType<Accessabar.IState, Accessabar.IFontActions> = {
    fontDecSize: () => {
        const { fontSizing }: { fontSizing: Accessabar.IConfigObject } = config;

        editLoopComputed(fontSizing, 'fontSize', -1);

        return {
            fontSizingActive: true,
        };
    },

    fontResetSizing: () => (state, { fontReset }) => {
        fontReset('fontSizing');

        return {
            fontSizingActive: false,
        };
    },

    fontIncSize: () => {
        const { fontSizing }: { fontSizing: Accessabar.IConfigObject } = config;

        editLoopComputed(fontSizing, 'fontSize', 1);

        return {
            fontSizingActive: true,
        };
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

        editLoop(fontFamily, 'fontFamily', currentFontFamily);
    },

    fontColourChange: (colour: string) => ({ fontColourCurrent }) => {
        const currentColour: string = colour || fontColourCurrent;

        if (currentColour.length <= 0) {
            return;
        }

        const { fontColour }: { fontColour: Accessabar.IConfigObject } = config;

        editLoop(fontColour, 'color', currentColour);
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

            if (configObj.attrNames.origComputed) {
                el.removeAttribute(configObj.attrNames.origComputed);
            }
        }
    },

    fontLineSpacingEnable: () => ({ fontLineSpacingActive }, { fontLineSpacingReset, fontLineSpacingChange }) => {
        if (!fontLineSpacingActive) {
            AccessabarUtil.startFunction('fontLineSpacing', fontLineSpacingReset, fontLineSpacingChange);

            return {
                fontLineSpacingActive: true,
            };
        }

        AccessabarUtil.stopFunction('fontLineSpacing');

        return {
            fontLineSpacingActive: false,
        };
    },

    fontLineSpacingIncrement: () => ({ fontLineSpacingCount, fontLineSpacingStep, fontLineSpacingActive, fontLineSpacingMax }, { fontLineSpacingChange }) => {
        const nextCount = fontLineSpacingCount + fontLineSpacingStep;

        if (Math.abs(nextCount) > fontLineSpacingMax) {
            return;
        }

        if (fontLineSpacingActive) {
            fontLineSpacingChange(nextCount);
        }

        return {
            fontLineSpacingCount: nextCount,
        };
    },

    fontLineSpacingDecrement: () => ({ fontLineSpacingCount, fontLineSpacingStep, fontLineSpacingActive, fontLineSpacingMax }, { fontLineSpacingChange }) => {
        const nextCount = fontLineSpacingCount - fontLineSpacingStep;

        if (Math.abs(nextCount) > fontLineSpacingMax) {
            return;
        }

        if (fontLineSpacingActive) {
            fontLineSpacingChange(nextCount);
        }

        return {
            fontLineSpacingCount: nextCount,
        };
    },

    fontLineSpacingChange: (count: number) => ({ fontLineSpacingCount, fontLineSpacingStep }) => {
        const currentCount = typeof count === 'undefined' ? fontLineSpacingCount : count;

        const { fontLineSpacing }: { fontLineSpacing: Accessabar.IConfigObject } = config;

        editLoopComputed(fontLineSpacing, 'lineHeight', currentCount, fontLineSpacingStep);
    },

    fontLineSpacingReset: () => (state, { fontReset }) => {
        fontReset('fontLineSpacing');
    },

    fontLetterSpacingEnable: () => ({ fontLetterSpacingActive }, { fontLetterSpacingReset, fontLetterSpacingChange }) => {
        if (!fontLetterSpacingActive) {
            AccessabarUtil.startFunction('fontLetterSpacing', fontLetterSpacingReset, fontLetterSpacingChange);

            return {
                fontLetterSpacingActive: true,
            };
        }

        AccessabarUtil.stopFunction('fontLetterSpacing');

        return {
            fontLetterSpacingActive: false,
        };
    },

    fontLetterSpacingIncrement: () => ({ fontLetterSpacingCount, fontLetterSpacingStep, fontLetterSpacingActive, fontLetterSpacingMax }, { fontLetterSpacingChange }) => {
        const nextCount = fontLetterSpacingCount + fontLetterSpacingStep;

        if (Math.abs(nextCount) > fontLetterSpacingMax) {
            return;
        }

        if (fontLetterSpacingActive) {
            fontLetterSpacingChange(nextCount);
        }

        return {
            fontLetterSpacingCount: nextCount,
        };
    },

    fontLetterSpacingDecrement: () => ({ fontLetterSpacingCount, fontLetterSpacingStep, fontLetterSpacingActive, fontLetterSpacingMax }, { fontLetterSpacingChange }) => {
        const nextCount = fontLetterSpacingCount - fontLetterSpacingStep;

        if (Math.abs(nextCount) > fontLetterSpacingMax) {
            return;
        }

        if (fontLetterSpacingActive) {
            fontLetterSpacingChange(nextCount);
        }

        return {
            fontLetterSpacingCount: nextCount,
        };
    },

    fontLetterSpacingChange: (count: number) => ({ fontLetterSpacingCount, fontLetterSpacingStep }) => {
        const currentCount = typeof count === 'undefined' ? fontLetterSpacingCount : count;

        const { fontLetterSpacing }: { fontLetterSpacing: Accessabar.IConfigObject } = config;

        editLoopComputed(fontLetterSpacing, 'letterSpacing', currentCount, fontLetterSpacingStep);
    },

    fontLetterSpacingReset: () => (state, { fontReset }) => {
        fontReset('fontLetterSpacing');
    },
};

export default fontActions;
export { fontActions };
