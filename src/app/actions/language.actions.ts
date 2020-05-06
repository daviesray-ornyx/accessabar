import { ActionsType } from 'hyperapp';
import languageConfig from '../../config/language.config.json5';

const https = require('https');


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


const languageActions: ActionsType<Accessabar.IState, Accessabar.ILanguageActions> = {
    /**
     * Translates all text on the page to a specified language
     * 
     */
    languageChangeAll: (key?: string) => ({ languageCurrentKey }) => {
        const currentKey: string = key || languageCurrentKey;
        if (currentKey.length <= 0) {
            return;
        }

        const currentLanguageCode = languageConfig[currentKey].code || null;
        const dataFormat = "html";
        const parentElements = getParents(); 

        parentElements.forEach(element => {
            let elementTextContent = element.textContent;
            console.log(process.env.YANDEX_API_KEY);
            const qs = `?key=${process.env.YANDEX_API_KEY}&lang=${currentLanguageCode}&text=${elementTextContent}&format=${dataFormat}`
            const options = {
                hostname: process.env.YANDEX_HOST_NAME,
                port: process.env.YANDEX_PORT,
                path: process.env.YANDEX_JSON_TRANSLATE_PATH + qs,
                method: 'POST',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            
            const req = https.request(options, res => {
                if(res.statusCode != 200)
                    return; 
                res.on('data', d => {
                    const jsonData = JSON.parse(d);
                    element.textContent = jsonData.text;
                })
            })                        
            req.end();
        });                  
    },
};

export default languageActions;
export { languageActions };
