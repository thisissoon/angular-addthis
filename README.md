# SOON_ AngularJS Template

This project structure is based on the [angular-seed](https://github.com/angular/angular-seed) application skeleton for a typical [AngularJS](http://angularjs.org/) web app.

The project is preconfigured to install the Angular framework and a bunch of development and testing tools for instant web development gratification.


## Getting Started

To get you started you can simply clone the repository and install the dependencies:

### Clone SOON_ AngularJS Template repository

Clone the soon-angularjs-template repository using [git][git]:

```
cd path/to/parent/directory
git clone git@github.com:thisissoon/soon-angularjs-template.git
cd soon-angularjs-template
```


### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].
* We run regular tasks like code minification via `grunt`, a [javascript task runner][grunt].


The following tools require super user privileges so you will need to install them separately like so:

```
sudo npm install -g bower 
sudo npm install -g grunt-cli
```

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/components` - contains the angular framework files and other libraries

### Install Libraries

We install our frontend libraries via `bower`, a [client-side code package manager][bower].

To install a library such as angular we can simply do:

```
bower install angular --save
```

And this will download the angular package from bower and also update the `bower.json` file to include that package. You will still need to add the script tag to the `app/index.html` like so:

```html
<script src="components/angular/angular.js"></script>
```

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
grunt server
```

Now browse to the app at `http://localhost:8000/app/`.

If you are doing any javascript development you can instead run:

```
grunt serverjs
```

To run tests as well everytime a javascript file is updated

### Running the build script

To create a build to deploy for a staging environment simply run: 

```
grunt build:stage
```

To create a build to deploy for a production environment simply run: 

```
grunt build:production
```

The build files will then be in the `dist/` directory.


## Directory Layout

```

app/                    --> all of the files to be used in production
  components/           --> all of our javascript libraries (installed using bower)
  css/                  --> css files
    app.css             --> default stylesheet (generated using less)
  img/                  --> image files
  less/                 --> less folder
    default/            --> styling appied to all screen sizes (e.g. fonts, colors etc..)
      core/             --> core styling applied to all screen sizes 
      modules/          --> module styling applied to all screen sizes
    large/              --> styling appied to large screen screen sizes (overrides styling in default folder)
      core/             --> core styling applied to large screen screen sizes
      modules/          --> module styling applied to large screen screen sizes 
    tablet/             --> styling appied to tablet screen sizes (overrides styling in default folder)
      core/             --> core styling applied to tablet screens 
      modules/          --> module styling applied to tablet screens
    mobile/             --> styling appied to mobile screen sizes (overrides styling in default folder)
      core/             --> core styling applied to mobile screens 
      modules/          --> module styling applied to mobile screens  
  index.html            --> app layout file (the main html template file of the app)
  js/                   --> javascript files
    {app}/              --> doIt angular app javascript files
      {app}.js          --> angular initialisation
      config.js         --> angular config
      controllers/
        {view}Ctrl.js   --> controllers
      directives/
        {module}.js     --> directives
    modules/            --> static html files for building and testing styling and mark up
      {module}/
        index.html
    partials/           --> angular view partials (partial html templates)
      partial1.html
      partial2.html
tests/                  --> test config and source files
  e2e/                  --> end-to-end specs
    specs/              
      {example}Spec.js
    protractor.conf.js  --> config file for running e2e tests with Protractor
  unit/                 --> unit level specs/tests
    {app}/              --> follows the same folder structure as javascript files in app folder
      controllers/      --> controller folder
        {view}Ctrl.js   --> view controller tests
      directives/
        {module}.js     --> module directive test

```

## Testing

There are two kinds of tests in the angular-seed application: Unit tests and End to End tests.

### Running Unit Tests

The angular-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with [Grunt][grunt].

* the configuration is found in `Gruntfile.js`
* the unit tests are found in `tests/unit/`.

The easiest way to run the unit tests is to do:

```
grunt test
```

This script will start the Jasmine test runner to execute the unit tests. You can also run:

```
grunt serverjs
```

Where the grunt watch command will sit and watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if you unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.


### End to end testing

The angular-seed app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `tests/e2e/protractor.conf.js`
* the end-to-end tests are found in `tests/e2e/specs/`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it. You may need to run this command with superuser privileges:

```
npm install -g protractor
```

To run end to end tests we first need to install protractor with global permissions. In addition, since Protractor is built upon WebDriver we need to install this:


```
webdriver-manager update --standalone --chrome
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied grunt task:

```
grunt e2e
```

This script will execute the end-to-end tests against the application being hosted on the
development server.


## Contact

For more information on AngularJS please check out http://angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[grunt]: http://gruntjs.com/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://pivotal.github.com/jasmine/
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
