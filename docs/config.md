# Configuration
## Example configuration
```javascript
const ace = new Accessabar({
    buttonFloatPosition: 'top-right',
});
```

## Configuration Options
### buttonFloatPosition
| Default | Type | Options
| --- | --- | ---
| `''` | `string` | `top-left` 
|        |          | `top-right` 
|        |          | `bottom-left` 
|        |          | `bottom-right`  

Creates a button to open ACE in the provided position. The button will float above other page content.

### buttonFloatOffset
| Default | Type
| --- | ---
| `0` | `number`

If `buttonFloatPosition` is specified, this option will offset the button by the specified amount of pixels.
This is helpful for moving the button into a position where it doesn't overlap essential page elements (e.g. fixed navigation).

### enableButton
| Default | Type
| --- | ---
| `''` | `string`

Selector for an element that opens ACE when clicked (e.g. `#enable-ace`). Use this option if the page has a bespoke button for ACE.

### bindTo
| Default | Type
| --- | ---
| `body` | `string`

Selector for the element ACE will bind to. ACE will be placed inside this element as the first child. By default ACE is placed into the document `body`.

### fixedNavigation
| Default | Type
| --- | ---
| `''` | `string`

Selector for main fixed navigation element (e.g. `#main-nav`). This option will help if the page's fixed navigation is overlapped by the ACE toolbar. It attempts to place ACE above the fixed navigation.

### moveBody
| Default | Type
| --- | ---
| `true` | `boolean`

ACE by default adds a margin to the document `body` to push page content below the ACE toolbar. Making this `false` will stop this behaviour.

If `bindTo` is set to a selector that is not `body`, then `moveBody` default becomes `false`.

### fillWidth
| Default | Type
| --- | ---
| `false` | `boolean`

If `true`, ACE will have a width of `100%` to fill the containing element.

If `false`, ACE will have a width of `100vw` to be contained within the browser window.
