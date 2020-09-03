# Adding to a Website
## Adding to the HTML
Two files must be added to the page's HTML, `accessabar.bundle.js` and `app.css`. And a configuration script must be provided inside the document `body`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<!-- Add accessabar.bundle.js and app.css in the head -->
  	<link rel="stylesheet" href="path/to/accessabar/app.css">
  	<script src="path/to/accessabar/accessabar.bundle.js"></script>
  	<title>Example Page</title>
  </head>
  <body>
  	<!--
  	 *  ------------
  	 *  PAGE CONTENT
  	 *  ------------
  	-->

    <script>
        const ace = new Accessabar({
            // Position to show ACE button
            buttonFloatPosition: 'top-right',
        });
    </script>
  </body>
</html>
```

> Note: Have a look at the [Configuration Options](config.md) to tweak ACE further.


