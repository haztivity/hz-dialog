# hz-dialog
hz-dialog is an haztivity resource to create dialogs.\
hz-dialog uses [jquery ui dialog](https://jqueryui.com/dialog/) under the hood.
## Install
### NPM
```npm i --save @haztivity/hz-dialog```
## Dependencies
- JQuery
- JQuery UI dialog
- @haztivity/core
## Usage
1. Import @haztivity/hz-dialog
2. Add HzDialogResource to the page
3. Create a button to open the dialog
3. Create the dialog and set ```data-hz-resource="HzDialog"```
4. Set to the dialog the attribute ```data-opt-hz-dialog-trigger="selectorToButton"``` where __selectorToButton__ is a jquery selector for the button created before
### Ts
```typescript
import {PageFactory, Page, PageController, PageRegister} from "@haztivity/core";
import template from "./page.pug";
import {HzDialogResource} from "@haztivity/hz-dialog";
export let page: PageRegister = PageFactory.createPage(
    {
        name: "myPage",
        resources: [
            HzDialogResource
        ],
        template: template
    }
);
```
### Pug
```pug
button#trigger1 Open
div(data-hz-resource="HzDialog", data-opt-hz-dialog-trigger="#trigger1")
    p Dialog content

```
or
### HTML
```html
<button id="trigger1">Open</button>
<div data-hz-resource="HzDialog" data-opt-hz-dialog-trigger="#trigger1">
    <p>Dialog content</p>
</div>
```
## Options
All the options of jquery ui dialog **except** functions could be specified by attributes using:
```pug
    data-opt-dialog-[option]=[value]
```
If the option have multiple words, use dashes, for example ```appendTo``` have to be provided as ```append-to```
###Examples:
#### Pug
```pug
// Draggable
button#draggable Open draggable dialog
div(data-hz-resource="HzDialog"
    data-opt-hz-dialog-trigger="#draggable"
    data-opt-dialog-draggable="true")
    p Dialog draggable
// Fixed with
button#width Dialog with fixed width
div(data-hz-resource="HzDialog"
    data-opt-hz-dialog-trigger="#width"
    data-opt-dialog-width="600px")
        p Dialog with fixed width
// Multiple options
button#multiple Open dialog with multiple options
div(data-hz-resource="HzDialog"
    data-opt-hz-dialog-trigger="#multiple"
    data-opt-dialog-draggable="true"
    data-opt-dialog-resizable="true",
    data-opt-dialog-position='{"my":"center top","at":"center top","of":"body"}')
        p Dialog resizable
        p Dialog draggable
        p Position to center top of body
```
or
#### Html
```html
    <!-- Draggable -->
    <button id="draggable">Open draggable dialog</button>
    <div data-hz-resource="HzDialog"
         data-opt-hz-dialog-trigger="#draggable"
         data-opt-dialog-draggable="true">
      <p>Dialog draggable</p>
    </div>

    <!-- Fixed width -->
    <button id="width">Dialog with fixed width</button>
    <div data-hz-resource="HzDialog"
         data-opt-hz-dialog-trigger="#width"
         data-opt-dialog-width="600px">
      <p>Dialog draggable</p>
    </div>

    <!-- Multiple options -->
    <button id="multiple">Open dialog with multiple options</button>
    <div data-hz-resource="HzDialog"
         data-opt-hz-dialog-trigger="#multiple"
         data-opt-dialog-draggable="true"
         data-opt-dialog-resizable="true"
         data-opt-dialog-position='{"my":"center top","at":"center top","of":"body"}'>
      <p>Dialog draggable</p>
    </div>
```
