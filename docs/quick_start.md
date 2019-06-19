# Quick Start
There are three main install options:
<!-- tabs:start -->

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

Add the script and css files:
```html
<link rel="stylesheet" href="path/to/accessabar/app.css">
<script src="path/to/accessabar/accessabar.bundle.js"></script>
```

Configure Accessabar by adding a script to the website:
```javascript
const accessabar = new Accessabar({
    enableButton: '#enable-accessabar',
});
```

#### ** unpkg.com **

> Coming Soon

#### ** ES6 Module **

> Coming Soon

<!-- tabs:end -->
