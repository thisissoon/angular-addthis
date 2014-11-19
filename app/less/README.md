# CSS Style Guide
Welcome to the SOON_ CSS style guide. Before continuing, you should have a general understanding for the [LESS](http://lesscss.org/) CSS syntax as we write all our styling using this language.

## Coding style

Every repo should have an `.editorconfig` file included which will define spacing rules and more, please use an editor which supports using the `.editorconfig` file.


### Spacing

* Put spaces after `:` in property declarations: `color: red`
* Put spaces before `{` in rule declarations: `.rule {`
* Put only a single line breaks between rulesets:

  
  ``` css

  .rule-1 {
    ...
  }

  .rule-2 {
    ...
  }
    
  ``` 
  
* When grouping selectors, keep individual selectors to a single line.

  ``` css
  .rule-1,
  .rule-2 {
    ...
  }
  
  ``` 

* Place closing braces of declaration blocks on a new line.
* Each declaration should appear on its own line for more accurate error reporting:

  ``` css
  .rule-1 {
    background-color: black;
    color: red; 
  }
  
  ``` 
* Avoid unnecessary whitespace when nesting LESS code and only include blank lines directly above rule declarations


### Formatting

* Use 6 digit hex color codes `#000000` unless using `rgba()`.
* Use jsdocs style `/** */` for comment blocks (instead of `//`) to help generate docs easier.
* Avoid specifying units for zero values, e.g., `margin: 0;` instead of `margin: 0px;`.
* Limit use of shorthand declarations to instances where you must explicitly set all the available values. e.g., `background-color: red` instead of `background: red`.
* List properties for css blocks in alphabetical order. This will help the browser render the css quicker.


### Misc

As a rule of thumb, avoid unnecessary nesting in LESS. At most, aim for three levels. If you cannot help it, step back and rethink your overall strategy (either the specificity needed, or the layout of the nesting). 

Document styles with JSDocs style notation. Example: 

``` css
/**
 * this block of code styles a regular version 
 * of a list within this module 
 * @property .my-rule
 * @example <span class="my-rule"></span>
 */
.my-rule {
  ...
  
  &.active {
    ...
  }
}

/**
 * this block of code styles a variant version 
 * of a list within this module which makes
 * changes the opacity and makes it grey etc...
 * @property .my-rule
 * @example <span class="my-rule variant"></span>
 */
.my-rule.variant {
  ...
  
  &.active {
    ...
  }
}
``` 


### Examples

Here are some good examples that apply the above guidelines:

``` css
// Example of good basic formatting practices
.styleguide-format {
    color: #000000;
    background-color: rgba(0, 0, 0, .5);
    border: 1px solid #f0f0f0;
}

// Example of individual selectors getting their own lines (for error reporting)
.multiple,
.classes,
.get-new-lines {
  display: block;
}

// Avoid unnecessary shorthand declarations
.not-so-good {
  margin: 0 0 20px;
}

.good {
  margin-bottom: 20px;
}

// Avoid declaring rules specifically for a single property
.color-red { // don't do this
  color: red;
}

.my-module-or-state { // do this instead
  color: red
  // other styles here
}
``` 

## File organisation

In general, the CSS file organisation should follow something like this:

```

css
├── desktop
│   ├── core 
│   │   ├── typography.less
│   │   └── colors.less
│   ├── modules 
│   │   ├── header.less
│   │   └── nav.less
├── large
│   ├── core 
│   │   ├── typography.less
│   │   └── colors.less
│   ├── modules 
│   │   ├── header.less
│   │   └── nav.less
├── tablet
│   ├── core 
│   │   ├── typography.less
│   │   └── colors.less
│   ├── modules 
│   │   ├── header.less
│   │   └── nav.less
└── mobile
    ├── core 
    │   ├── typography.less
    │   └── colors.less
    └── modules 
        ├── header.less
        └── nav.less

    
```

## LESS

* Each one of our less files should be as specific as possible and only apply to a single module or component e.g. `header` or `navigation`.
* Never create a less file that includes styles for an entire page or more than one component. Instead break the page into individual modules and create less files for each module that you can reuse elsewhere in your app.
* If your less file is becoming very large (e.g. over 200 lines) consider refactoring the module further into separate smaller files.
* If creating variable include variables only in a single location preferably a  `variables.less` file.
* Use variables for colors for constancy and also allowing us to globally change colors throughout the site in just one place. Example:

``` css
@black: #000000;
@white: #ffffff;

.rule {
  background-color: @white;
  color: @black;
}
``` 


### Including LESS files

* You should import all less files only in `app/less/main.less` This gives us a good overview of all the less in our project.
* You should only import the less files you require rather than whole libraries.
* You should also also import all device specific less files e.g. our tablet and mobile files in our `app/less/main.less` in a single media query block of code.

Example:

``` css

/**
 * our libraries here
 */
@import "../components/bootstrap/buttons.less";

/**
 * our styles here
 */
@import "default/core/buttons.less";

@media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) {
  @import "tablet/modules/header.less";
  @import "tablet/modules/footer.less";
}

``` 

This is also how Bootstrap's styles are to be included, should you need them.

### Bootstrap and Other LESS libraries

Much of our core CSS comes from Bootstrap. It's a separate repository that we include via Bower to import common and global styles like our grid system, buttons, and more.

When using bootstrap or any other library we normally need to modify it to change the theme for our project. We however never directly modify the source code of the library itself. Instead we make a less file of the same name and place it into an appropriate place in our directory structure and copy the code from the library that we need to change. We can then override the styles here.

Since we import our styles after our libraries our code will be complied into the css build file after the libraries code so will be overridden.

## Responsive styles and device support

All styling submitted for code reviews should include styling for all devices and browsers the application is expected to support. This means including the following styling (if required):

* Fallbacks for older browsers e.g. IE8
* Fallbacks for non CSS3 browsers e.g., IE8 doesn't support `opacity` so the `ms-filter` property must be used if supporting this browser.
* Browser specific properties for CSS3 properties such as `moz-`, `webkit`, `ms` and `-o`

In all these cases using LESS mixins should be used to avoid unnecessary duplication of code and makes it much easier to read and maintain.

If you are unsure that a browser supports a certain css property, search for that property on [caniuse.com](http://caniuse.com/) to look at the browser support for that property.


### Media Queries

Media queries in our own code should __ONLY__ be declared in our `app/less/main.less` file. With the relevant less files for that media query imported within this block. __DO NOT__ write media queries in any other file other than `app/main/less`. 

## Pixels vs. ems

Use `em`'s for `font-size` and never `px` because it allows us to change the font size for everything globally by changing the `font-size` of the `body`. 

It is recommended to create a single less variable with the base font value and apply this variable to the `body` tag initially. This way we can use this variable to override `px` values for `font-size` in modules from libraries.

Additionally, unit-less `line-height` is preferred because it does not inherit a percentage value of its parent element, but instead is based on a multiplier of the `font-size`.

Example:

``` css
@initial-font-size: 16px;

body {
  font-size: @initial-font-size;
  line-height: 1.2; // line-height will be 19px
}

``` 

## Class naming conventions

* Never reference js- prefixed class names from CSS files. js- are used exclusively from JS files.
* Use the is- prefix for state rules that are shared between CSS and JS.
* Use css style lowercase hyphenated naming for class and less variable names e.g., use `.my-rule` instead of `.myRule` or `.myrule`.

## Specificity (classes vs. ids)

__NEVER__ use `id`'s in your HTML unless absolutely necessary such as for anchor points on your page for scrolling to. Id's should never be used to style an element, period! CSS should be as reusable as possible. A code block should define a rule that can be applied to any element which meets this rule. And `id's` prevent this as an `id` can only be applied to a single element on a page.

Avoid using element tags instead use classes as element tags will apply globally. Also avoid using element tags in a nested code block again just use classes.

When styling a component, start with an class namespace and nest styling within this code block, prefer direct descendant selectors by default, and use as little specificity as possible. Here is a good example:



``` css

.category-list { // class namespace

  // Direct descendant selector > for list items
  > .list-item {
      list-style-type: disc;
  }

  // Don't do this as category list may contain
  // other links which you don't want to style this color
  a {
     color: #f00000;
  }
}

``` 

## CSS Specificity guidelines

If you must use an `id` selector (`#selector`) and this should only be because you cannot modify the html, for example a partial from a library. Make sure that you have no more than one in your rule declaration. A rule like the below is considered harmful:


``` css
#header .search #quicksearch { 
  ... 
}
``` 

When modifying an existing element for a specific use, try to use specific class names. Instead of `.listings-layout.bigger` use rules like `.listings-layout.listings-bigger`. Think about searching your code in the future.

The class names `disabled`, `mousedown`, `danger`, `hover`, `selected`, and `active` should always be namespaced by a class (`button.selected` is a good example).

## A small word on HTML

* It should go without saying that all HTML should be valid HTML with a `!DOCTYPE` declaration specified at the top of the page.
* Correct tags should be used for semantics. 
* Some elements have required attributes such as the `<a href="#">` tag requires the `href` attribute or the `<img src="image.jpg" alt="image">` requires the `src` and `alt` attributes. If these attributes are not included then this could cause issues with some browsers.
* Follow W3C guidelines on valid HTML.

If in doubt copy and paste your mark up into [W3C Validator](http://validator.w3.org/). 
