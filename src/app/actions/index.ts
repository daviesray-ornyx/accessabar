import { ActionsType } from 'hyperapp';
import hideActions from './hide.actions';
import utilActions from './util.actions';
import fontActions from './font.actions';
import resetActions from './reset.actions';
import closeActions from './close.actions';
import menuActions from './menu.actions';
import ttsActions from './tts.actions';
import textOptionsActions from './text_options.actions';
import selectActions from './select.actions';

const actions: ActionsType<Accessabar.IState, Accessabar.IActions> = {
    ...hideActions,
    ...utilActions,
    ...fontActions,
    ...resetActions,
    ...closeActions,
    ...menuActions,
    ...ttsActions,
    ...textOptionsActions,
    ...selectActions,
};

export default actions;
