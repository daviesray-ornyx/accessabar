import { ActionsType } from 'hyperapp';
import hideActions from './hide.actions';
import utilActions from './util.actions';
import fontActions from './font.actions';
import languageActions from './language.actions';
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
import apiActions from './api.actions';

const actions: ActionsType<Accessabar.IState, Accessabar.IActions> = {
    ...hideActions,
    ...utilActions,
    ...fontActions,
    ...languageActions,
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
    ...apiActions,
};

export default actions;
