import { ActionsType } from 'hyperapp';
// import fromEvent from 'rxjs';

interface IDragEvent extends MouseEvent, TouchEvent {}

const magActions: ActionsType<Accessabar.IState, Accessabar.IMagActions> = {
    magEnable: () => ({ magActive }) => {
        let pageContent = document.documentElement.outerHTML;
        const abarEl = /<accessabar-app.*<\/accessabar-app>/;
        const abarScripts = /<script.*src=.*accessabar.*<\/script>/;

        pageContent = pageContent.replace(abarEl, '');
        pageContent = pageContent.replace(abarScripts, '');

        return {
            magPageContent: pageContent,
        };
    },

    magStop: () => ({ magActive }) => {
        return {
            magPageContent: '',
        };
    },
};

export default magActions;
export {
    magActions,
};
