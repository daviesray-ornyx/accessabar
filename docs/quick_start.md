# Quick Start
There are three main install options:
<!-- tabs:start -->

#### ** CDN **

The quickest way to add Accessabar to a website is via a CDN.

Add the script and CSS files to the website:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@handsfree/accessabar@latest/public/dist/accessabar/app.css">
<script src="https://cdn.jsdelivr.net/npm/@handsfree/accessabar@latest/public/dist/accessabar/accessabar.bundle.js"></script>
```

Configure Accessabar by adding a script to the website:
```html
<body>

    <!-- PAGE CONTENT -->
    
    <button id="enable-accessabar">Enable Accessabar</button>

    <script>
        const accessabar = new Accessabar({
            // Selector matching element that enables Accessabar.
            enableButton: '#enable-accessabar',
        });
    </script>
</body>
```

Accessabar will open when `enableButton` is clicked.

#### ** ES6 Module **

Install the package `@handsfree/accessabar`:
```
yarn add @handsfree/accessabar
```

Import Accessabar:
```javascript
import '@handsfree/accessabar/public/dist/accessabar/app.css';
import Accessabar from '@handsfree/accessabar';

const accessabar = new Accessabar({
    // Selector matching element that enables Accessabar.
    // Not needed if opening manually.
    enableButton: '#enable-accessabar',
});

// Manually open
accessabar.open();

// Manually close
accessabar.close();
```

#### ** From Source **
> In depth instructions [here](build.md)

Get the source:
```
git clone git@github.com:HandsFree/accessabar.git
cd accessabar
```
Install:
```
yarn install
yarn build
```

Files are outputted to `./public/dist/accessabar`. Copy the accessabar folder to the website folder.

Add the script and CSS files to the website:
```html
<link rel="stylesheet" href="path/to/accessabar/app.css">
<script src="path/to/accessabar/accessabar.bundle.js"></script>
```

Configure Accessabar by adding a script to the website:
```html
<body>

    <!-- PAGE CONTENT -->
    
    <button id="enable-accessabar">Enable Accessabar</button>

    <script>
        const accessabar = new Accessabar({
            // Selector matching element that enables Accessabar.
            enableButton: '#enable-accessabar',
        });
    </script>
</body>
```

Accessabar will open when `enableButton` is clicked.

<!-- tabs:end -->
