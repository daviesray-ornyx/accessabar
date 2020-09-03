# Quick Start
<!-- tabs:start -->

#### ** CDN **
The easiest way to add ACE to a website is via a CDN.

1. Add the script and CSS files to the website:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@handsfree/accessabar@latest/public/dist/accessabar/app.css">
<script src="https://cdn.jsdelivr.net/npm/@handsfree/accessabar@latest/public/dist/accessabar/accessabar.bundle.js"></script>
```

2. Configure ACE by adding a script to the website:
```html
<body>

    <!-- PAGE CONTENT -->

    <script>
        const ace = new Accessabar({
            // Position to show ACE button
            buttonFloatPosition: 'top-right',
        });
    </script>
</body>
```

Great! ACE is now installed. A new button will appear in the top right corner of the website to open ACE.

> Note: Have a look at the [Configuration Options](config.md) to tweak ACE further.

#### ** Wordpress **
1. Install the plugin [Head, Footer and Post Injections](https://wordpress.org/plugins/header-footer/) to the Wordpress site.
Here's a guide for installing Wordpress plugins: [https://www.wpbeginner.com/beginners-guide/step-by-step-guide-to-install-a-wordpress-plugin-for-beginners/](https://www.wpbeginner.com/beginners-guide/step-by-step-guide-to-install-a-wordpress-plugin-for-beginners/) 
2. From the Wordpress Admin Dashboard, go to `Settings > Header and Footer`.
3. Add the following code to the 'ON EVERY PAGE' section underneath '\<HEAD\> PAGE SECTION INJECTION':
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@handsfree/accessabar@latest/public/dist/accessabar/app.css">
<script src="https://cdn.jsdelivr.net/npm/@handsfree/accessabar@latest/public/dist/accessabar/accessabar.bundle.js"></script>
```
4. Add the following code to the 'DESKTOP' section underneath 'BEFORE THE \</BODY\> CLOSING TAG (FOOTER)':
```html
<script>
    const ace = new Accessabar({
        // Position to show ACE button
        buttonFloatPosition: 'top-right',
    });
</script>
```
5. Click the 'save' button.

Great! ACE is now installed. A new button will appear in the top right corner of the website to open ACE.

> Note: Have a look at the [Configuration Options](config.md) to tweak ACE further.

#### ** ES6 Module **
1. Install the package `@handsfree/accessabar`:
```
yarn add @handsfree/accessabar
```

2. Import ACE:
```javascript
import '@handsfree/accessabar/public/dist/accessabar/app.css';
import Accessabar from '@handsfree/accessabar';
const ace = new Accessabar({
    // Position to show ACE button
    buttonFloatPosition: 'top-right',
});
```

Great! ACE is now installed. A new button will appear in the top right corner of the website to open ACE.

> Note: Have a look at the [Configuration Options](config.md) to tweak ACE further.

<!-- tabs:end -->

To install from source, go [here](build.md)

