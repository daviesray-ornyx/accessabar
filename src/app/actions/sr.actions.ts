import { ActionsType } from 'hyperapp';

declare var webkitSpeechRecognition: {
    prototype: SpeechRecognition;
    new(): SpeechRecognition;
};

const srActions: ActionsType<Accessabar.IState, Accessabar.ISRActions> = {
    srInitRuntime: () => {
        let srRuntime: boolean | SpeechRecognition = false;

        try {
            srRuntime = new webkitSpeechRecognition() || new SpeechRecognition();
        } catch {
            return {
                srRuntime,
            };
        }

        return {
            srRuntime,
        };
    },

    srStart: () => ({ srRuntime, srLang }, { srAddEvents }) => {
        if (typeof srRuntime === 'boolean') {
            return;
        }

        srRuntime.lang = srLang;
        // srRuntime.interimResults = true;
        srRuntime.continuous = true;

        srAddEvents();
        srRuntime.start();
    },

    srEnable: () => (_, { srInitRuntime, srStart }) => {
        srInitRuntime();
        srStart();

        return {
            srActive: true,
        };
    },

    srDisable: () => ({ srRuntime }) => {
        if (typeof srRuntime !== 'boolean') {
            srRuntime.abort();
        }

        return {
            srActive: false,
            srRuntime: false,
        };
    },

    srAddEvents: () => ({ srRuntime }, { srHandleResult }) => {
        if (typeof srRuntime === 'boolean') {
            return;
        }

        srRuntime.onresult = srHandleResult;
    },

    srHandleResult: (event: SpeechRecognitionEvent) => (_, { srOutput }) => {
        const finalSentence: string[] = [];

        for (const alt of event.results[event.results.length - 1]) {
            finalSentence.push(alt.transcript);
        }

        srOutput(finalSentence.join(''));
    },

    srOutput: (str: string) => () => {
        const active = document.activeElement;

        if (!active) {
            return;
        }

        switch (active.nodeName) {
        case 'INPUT':
        case 'TEXTAREA':
        case 'SELECT':
            (active as HTMLInputElement).value += str;
            break;
        default:
            if (active.hasAttribute('contenteditable') && active.getAttribute('contenteditable')) {
                active.textContent += str;
            }

            break;
        }

        const selection = getSelection();

        if (selection) {
            selection.selectAllChildren(active);
            selection.collapseToEnd();
        }
    },
};

export default srActions;
export { srActions };
