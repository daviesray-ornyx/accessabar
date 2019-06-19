# Adding to a Website
If Accessabar was built from source, copy the `./public/dist/accessabar` folder to an accessible place within the website's directory.

## Adding via HTML
Two files must be added to the page's HTML, `accessabar.bundle.js` and `app.css`.

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
  </body>
</html>
```

## Adding via ES6 Module
> Coming Soon

