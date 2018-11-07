import { ActionsType } from 'hyperapp';
import hideActions from './hide';
import utilActions from './util';
import fontActions from './font';

const actions: ActionsType<Accessabar.IState, Accessabar.IActions> = {
    ...hideActions,
    ...utilActions,
    ...fontActions,
};

export default actions;
