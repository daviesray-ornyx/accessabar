import hotkeys from 'hotkeys-js';
import {ttsHoverEnable, ttsStopCurrent} from '../actions/tts.actions';
import {aceHide} from '../actions/ace.actions';
import {menuOpen, } from '../actions/menu.actions';
import {
  fontDecSize,
  fontIncSize,
  fontSizingDisable,
} from '../actions/font.actions';
import resetAll from '../actions/reset.actions';
import {settingsOpen} from '../actions/settings.actions';
import {aboutOpen} from '../actions/about.actions';
import closeAce from '../actions/close.actions';
import {magEnable} from '../actions/mag.actions';
import {maskEnable} from '../actions/mask.actions';
import {rulerReadingEnable} from '../actions/ruler.actions';
import {srEnable} from '../actions/sr.actions';
//import {menuOpen, menuClose} from './menu.actions';

  function addShortcutKeysListener(state: Ace.State) {
        
    hotkeys('ctrl+shift+s,command+shift+s,', function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        menuOpen(state, {menuName: 'tts', title: 'Text to Speech'});
        //[menuOpen, {menuName: 'tts', title: 'Text to Speech'}, defaultFunc: ttsHoverEnable}];
    });

    hotkeys('ctrl-+,command-+,', { splitKey: '-' }, function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        fontIncSize(state);
    });

    hotkeys('ctrl+-,command+-,', { splitKey: '+' }, function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        fontDecSize(state);
    });

    hotkeys('ctrl+r+f,command+r+f,', function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        fontSizingDisable(state);
    });

    hotkeys('ctrl+shift+t,command+shift+t,', function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        menuOpen(state, {menuName: 'textOptions', title: 'Text Options'});
    });

    hotkeys('ctrl+m,command+m,', function(event, handler){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        menuOpen(state, {menuName: 'magnifier', title: 'Magnifier', defaultFunc: magEnable});
        
    });

    hotkeys('ctrl+shift+m,command+shift+m,', function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        menuOpen(state, {menuName: 'masking', title: 'Screen Masking', defaultFunc: maskEnable});
    });

    hotkeys('ctrl+shift+r,command+shift+r,', function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        menuOpen(state, {menuName: 'rulerOptions', title: 'Ruler Options', defaultFunc: rulerReadingEnable,});
    });
       

    hotkeys('ctrl+shift+g,command+shift+g,', function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        menuOpen(state, {menuName: 'speechRecognition', title: 'Speech Recognition', defaultFunc: srEnable,});
    });

    hotkeys('ctrl+shift+t,command+shift+t,', function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        resetAll(state);
    });

    hotkeys('shift+s,', function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        settingsOpen(state);
    });

    hotkeys('shift+a,', function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        aboutOpen(state);
    });

    hotkeys('shift+c,', function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        closeAce(state);
    });

    hotkeys('shift+h,', function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault() 
        //alert('About to enable Text to speech!') 
        aceHide(state);
    });

  
    return {
      ...state,
    };
  }


  export {addShortcutKeysListener}