import hotkeys from 'hotkeys-js';
import {aceHide} from './ace.actions';
import {menuOpen} from './menu.actions';
import {fontDecSize, fontIncSize, fontSizingDisable} from './font.actions';
import resetAll from './reset.actions';
import {settingsOpen} from './settings.actions';
import {aboutOpen} from './about.actions';
import closeAce from './close.actions';
import {magEnable} from './mag.actions';
import {maskEnable} from './mask.actions';
import {rulerReadingEnable} from './ruler.actions';
import {srEnable} from './sr.actions';
//import {menuOpen, menuClose} from './menu.actions';

function addShortcutKeysListener(state: Ace.State) {
  hotkeys('ctrl+shift+s,command+shift+s,', event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    menuOpen(state, {menuName: 'tts', title: 'Text to Speech'});
    //[menuOpen, {menuName: 'tts', title: 'Text to Speech'}, defaultFunc: ttsHoverEnable}];
  });

  hotkeys('ctrl-+,command-+,', {splitKey: '-'}, event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    fontIncSize(state);
  });

  hotkeys('ctrl+-,command+-,', {splitKey: '+'}, event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    fontDecSize(state);
  });

  hotkeys('ctrl+r+f,command+r+f,', event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    fontSizingDisable(state);
  });

  hotkeys('ctrl+shift+t,command+shift+t,', event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    menuOpen(state, {menuName: 'textOptions', title: 'Text Options'});
  });

  hotkeys('ctrl+m,command+m,', (event, handler) => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    menuOpen(state, {
      menuName: 'magnifier',
      title: 'Magnifier',
      defaultFunc: magEnable,
    });
  });

  hotkeys('ctrl+shift+m,command+shift+m,', event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    menuOpen(state, {
      menuName: 'masking',
      title: 'Screen Masking',
      defaultFunc: maskEnable,
    });
  });

  hotkeys('ctrl+shift+r,command+shift+r,', event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    menuOpen(state, {
      menuName: 'rulerOptions',
      title: 'Ruler Options',
      defaultFunc: rulerReadingEnable,
    });
  });

  hotkeys('ctrl+shift+g,command+shift+g,', event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    menuOpen(state, {
      menuName: 'speechRecognition',
      title: 'Speech Recognition',
      defaultFunc: srEnable,
    });
  });

  hotkeys('ctrl+shift+t,command+shift+t,', event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    resetAll(state);
  });

  hotkeys('shift+s,', event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    settingsOpen(state);
  });

  hotkeys('shift+a,', event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    aboutOpen(state);
  });

  hotkeys('shift+c,', event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    closeAce(state);
  });

  hotkeys('shift+h,', event => {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    //alert('About to enable Text to speech!')
    aceHide(state);
  });

  return {
    ...state,
  };
}

export {addShortcutKeysListener};
