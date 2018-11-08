import { ActionsType } from 'hyperapp';
import hideActions from './hide.actions';
import utilActions from './util.actions';
import fontActions from './font.actions';
import resetActions from './reset.actions';

const actions: ActionsType<Accessabar.IState, Accessabar.IActions> = {
    ...hideActions,
    ...utilActions,
    ...fontActions,
    ...resetActions,
};

export default actions;
