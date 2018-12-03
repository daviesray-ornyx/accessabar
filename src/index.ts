import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import '@webcomponents/custom-elements';

// import css
import './css';

// import app
import Accessabar from './app';

// service worker
OfflinePluginRuntime.install();

// accept HMR
if (module && module.hot) {
    module.hot.accept();
}

export default Accessabar;
