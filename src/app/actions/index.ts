import { ActionsType } from 'hyperapp';
import hideActions from './hide.actions';
import utilActions from './util.actions';
import fontActions from './font.actions';
import resetActions from './reset.actions';
import closeActions from './close.actions';
import menuActions from './menu.actions';
import ttsActions from './tts.actions';
import selectActions from './select.actions';
import colourActions from './colour.actions';
import magActions from './mag.actions';
import maskActions from './mask.actions';
import rulerActions from './ruler.actions';
import srActions from './sr.actions';
import settingsActions from './settings.actions';

const actions: ActionsType<Accessabar.IState, Accessabar.IActions> = {
    ...hideActions,
    ...utilActions,
    ...fontActions,
    ...resetActions,
    ...closeActions,
    ...menuActions,
    ...ttsActions,
    ...selectActions,
    ...colourActions,
    ...magActions,
    ...maskActions,
    ...rulerActions,
    ...srActions,
    ...settingsActions,
};

export default actions;
