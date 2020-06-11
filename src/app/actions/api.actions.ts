import { ActionsType } from 'hyperapp';
import { v4 as uuidv4 } from 'uuid';

async function doRequest(link, req) {
    return fetch(link, req).catch((err) => {
        console.log('[ACE API] Error: ', err);
    });
}

async function handleRequest(link, req) {
    const res = await doRequest(link, req);
    if (res) {
        return res.json();
    }
}

const apiActions: ActionsType<Accessabar.IState, Accessabar.IApiActions> = {
    apiSendEvent: async (eventType: string) => {
        if (!localStorage) {
            return;
        }

        const host = location.hostname;

        if (host === 'localhost' || host === '') {
            return;
        }

        let userID = localStorage.getItem('ace_user');

        if (!userID) {
            const newID = uuidv4();
            localStorage.setItem('ace_user', newID);

            userID = newID;
        }

        const data = {
            host,
            user: userID,
            type: eventType.trim(),
        };

        const req = {
            body: JSON.stringify(data),
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' },
        };

        await handleRequest('https://ace-ctrl.acetoolbar.com/api/v1/event/add', req);
    },

    apiGetTranslation: async (data: { [x: string]: any }) => {
        const req = {
            body: JSON.stringify(data),
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' },
        };

        return handleRequest('https://trans.acetoolbar.com/api/v1/translate', req);
    },
};

export default apiActions;
export { apiActions };
