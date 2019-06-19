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

    srStart: () => ({ srRuntime }, { srAddEvents }) => {
        if (typeof srRuntime === 'boolean') {
            return;
        }

        srRuntime.lang = 'en-GB';
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

    srHandleResult: (event: SpeechRecognitionEvent) => () => {
        console.log(event);
    },
};

export default srActions;
export { srActions };
