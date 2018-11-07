import { ActionsType } from 'hyperapp';

function getParents(): Set<HTMLElement> {
    const elements = document.body.childNodes;
    const taggedElements: ChildNode[] = [];
    const textNodes: Node[] = [];
    const parentElements: Set<HTMLElement> = new Set();

    for (const el of elements) {
        if (el === window.abar.mainElement || el.childNodes.length === 0) {
            taggedElements.push(el);
        }
    }

    for (const el of elements) {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }
    }

    for (const node of textNodes) {
        const text = (node.textContent || '').trim();

        if (text === '' || text === '\n') {
            continue;
        }

        const parent = node.parentElement;

        if (!parent) {
            continue;
        }

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

        for (const el of parentElements) {
            const size = window.getComputedStyle(el).fontSize;

            if (size) {
                el.style.fontSize = `${parseInt(size, 10) - 1}px`;
            }
        }
    },
    incFontSize: () => {
        const parentElements = getParents();

        for (const el of parentElements) {
            const size = window.getComputedStyle(el).fontSize;

            if (size) {
                el.style.fontSize = `${parseInt(size, 10) + 1}px`;
            }
        }
    },
};

export default fontActions;
export { fontActions };
