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
        const jsonObj = res.json();
        console.log(link, jsonObj);
    }
}

const apiActions: ActionsType<Accessabar.IState, Accessabar.IApiActions> = {
    apiAceOpened: async () => {
        if (!localStorage) {
            return;
        }

        let userID = localStorage.getItem('ace_user');

        if (!userID) {
            const newID = uuidv4();
            localStorage.setItem('ace_user', newID);

            userID = newID;
        }

        const data = {
            user: userID,
            type: 'AceOpened',
            host: location.hostname,
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

    apiAceClosed: async () => {
        if (!localStorage) {
            return;
        }

        let userID = localStorage.getItem('ace_user');

        if (!userID) {
            const newID = uuidv4();
            localStorage.setItem('ace_user', newID);

            userID = newID;
        }

        const data = {
            user: userID,
            type: 'AceClosed',
            host: location.hostname,
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
};

export default apiActions;
export { apiActions };
