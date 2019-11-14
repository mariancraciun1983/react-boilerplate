<h1 align="center">ReactJS BoilerPlate</h1>



<div align="center">
  <a href="https://travis-ci.org/mariancraciun1983/react-boilerplate">
    <img src="https://secure.travis-ci.org/mariancraciun1983/react-boilerplate.svg?branch=master" alt="Travis CI" />
  </a>
   
  <a href="https://coveralls.io/r/mariancraciun1983/react-boilerplate">
    <img src="https://img.shields.io/coveralls/mariancraciun1983/react-boilerplate?branch=master&style=flat" alt="Coverage Status" />
  </a>
  <a href="https://david-dm.org/mariancraciun1983/react-boilerplate">
    <img src="https://david-dm.org/mariancraciun1983/react-boilerplate/status.svg" alt="Dependencies Status" />
  </a>
  <a href="https://david-dm.org/mariancraciun1983/react-boilerplate">
    <img src="https://david-dm.org/mariancraciun1983/react-boilerplate/dev-status.svg"  alt="devDependencies Status" />
  </a>
   <a href="https://www.codefactor.io/repository/github/mariancraciun1983/react-boilerplate">
    <img src="https://www.codefactor.io/repository/github/mariancraciun1983/react-boilerplate/badge" alt="code quality">
  </a>
  <a href="https://deepscan.io/dashboard#view=project&tid=5557&pid=7405&bid=74166">
    <img src="https://deepscan.io/api/teams/5557/projects/7405/branches/74166/badge/grade.svg" alt="DeepScan grade">
  </a>
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/mariancraciun1983/react-boilerplate.svg" alt="Greenkeeper badge" />
  </a>
  <a href="https://bettercodehub.com/">
    <img src="https://bettercodehub.com/edge/badge/mariancraciun1983/npm-boilerplate?branch=master" alt="BCH compliance" />
  </a>
  <a href="https://codebeat.co/projects/github-com-mariancraciun1983-react-boilerplate-master">
    <img src="https://codebeat.co/badges/8470180c-1287-4ebd-97a6-0f4bc0f53f01" alt="codebeat badge" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
  </a>
</div>


<br />
<strong><a href="https://admiring-jennings-8bf1ff.netlify.com/">Live Demo Site (Netlify)</a></strong> 
<br />
<a href="https://app.netlify.com/sites/admiring-jennings-8bf1ff/deploys">
    <img src="https://api.netlify.com/api/v1/badges/9b21f420-af82-4246-88c5-0d45c721497f/deploy-status" alt="Netlify Status" />
  </a>
<br />

## About the boilerplate

This code can be used as a starting point for a new ReactJS based project. It contains a working example of a very basic movie rental shop. The code was developed in node v10.16.3.
During development, you will have an express.js app that provides and API (/api) endpoint. In production, you could use the same API (in prod mode) or the one at [Serverless boilerplate](https://github.com/mariancraciun1983/serverless-boilerplate).
Check out the [React Boilerplate CI/CD](https://github.com/mariancraciun1983/react-boilerplate-cd) for an automated CI/CD configuration of this project.

## Getting started

You can get started quickly with:

```
git clone https://github.com/mariancraciun1983/react-boilerplate.git
cp config/default.yml.example config/default.yml
nvm use
yarn
yarn run dev
```

## Code Purpose

The code serves various purposes:

- frontend - code supposed to be running on the client
- backend - server code to help serving apis, static content, ...
- other - mocks, test code, supporting scripts

## Features

The developed application offers the user the following:
- listing of movies
- classification by category
- login/registration and authorization
- cart/ordering
- multi language
- multi theme

## Directory Structure

The most important paths are:

- \_\_mock\_\_ - data used by APIs and testing code, as there are no db connection
- \_\_test\_\_ - unit and integration tests
- src
  - assets - static files like images/fonts
  - backend - express.js and webpack code
  - frontend - frontend code (reactjs/redux/...)
  - public - other static files (index.html/css)
- tools - starter files used to build and run source code

# NPM Scripts

To support development, testing and building there are a bunch of scripts like:

- config - dumps the configuration found in config/default.yml
- dev - alias of dev:serve
- dev:serve - stars the dev server
- lint - alias of the lint:app lint:styles lint:backend
- lint:app - linter for the frontend code
- lint:tests - linter for the test code
- lint:styles - linter for the frontend styles
- lint:backend - linter for the backend code
- test - alias for the test:app
- test:app - test runner for the frontend app
- test:app:watch- test runner in watch mode useful while writing tests
- build - alias for the build:js
- build:js - client side code builder/bundler
- build:js:analyze - web tool to analyze the bundle
- prod:serve - run the production server (static+api). commonly used after rebuilding the bundle

You can run any of the scripts using the ```yarn run dev``` command.

## Configuration

The default.yml file contains the various settings used for development and deployment.

```
frontend:
  app: - this gets passed in the webpack bundler to the frontend app as a global variable \_\_CONFIG\_\_
  build:
    jsBaseDir: used in the deployed bundle by the webpack loader. This could be a CDN location.

backend:
  http:
    url: full URL displayed while running the backend code
    ip: ip to listen on by the backend
    port: port
    compression: if true, will help you understand how much traffic your app generates (with gzip enabled)
```
You can also run ```yarn run config``` to dump the configuration contents.

## Dev Server

During development, you will need to start an express instance which serves the following:

- APIs - fake API endpoint. It uses the data found in the mock directory
- Static - delivers static files like index.html, favicons, images and other files found in the /assets folder
- App webpack bundler - instead of using the default webpack dev server, this code uses the webpack middleware (dev mode webpack)

The App route is a default route, in order to handle all routes through the React App.

## Webpack bundler

There are 2 configurations of the webpack bundler and they differe a little bit.

The **dev** version has:
- hot module reloading
The **prod** version has:
- copy/html/cleanup plugins to manage the release folder content
- terser plugin to optimize the bundle
- chunk splitting


## Frontend Supporting Libraries

In addition to the react.js library, the following are used:

**redux** and **react-redux** - state

**redux saga** - handles side effects using generators. Useful to handle app initialization, authentication flows ...etc

**redux-form** - form state management (login/register)

**react-router** - declarative routing  (redux bases)

**reselect** - library to optimize advanced selectors with memoization

**node-sass** and **style-loader** - handles sass compilation hot-loading or swapping of the styles

There are other libraries being used too, which could be identified in the package.json file.

## Frontend Code Structure

All the custom code which is supposed to run on the client side, is found in the **src/frontend** folder. The starting point is App.jsx or App.dev.jsx (development/hot-loading). They are organised as:
- core
  - middleware - middlewares that register with the redux store
    - api - collection of methods that consume the APIs
    - assets - loads/swaps the language or the theme/styles
    - logging - sample redux logger - this can be changed with the redux logger official libs  
  - polyfil - example of polyfils
  - sagas - side effects that handle various app flows
  - selectors - static and memoized selectors
  - store - reducers and action creators
  - utils - various utilities
- jsx
  - common - folder with generic react components (Layout/Header/...)
  - pages - Routes related pages (/auth - Auth, /error - Error, ...)

## Testing
The code being tested at the moment is the frontend/reactjs code and it used the jest test runner with the enzyme library for jsx files.
There is a lot of improvement to be done by adding better integration testing in addition to the existing unit tests.
Tests are being used by CircleCI CI platform.
Also, husky is being used as a git commit hooks for the master branch, which should prevent commits that are braking the master code tests.
Check the \_\_test\_\_ directory for more info.

## Linting
There are various linting configuration that helps during development with coding quality. As there are various pieces of code in the project with different purposes, there are different liting rules found too. The most important ones are for tests (\_\_test\_\_/jest/.eslint), backend (src/backend/.eslint) , frontend (src/frontend/.eslint) and styles (src/frontend/styles/.sasslintrc).
For js/jsx code eslint is used, while for styles sass-lint.
Prettier and editor configurations are found to help during coding.

## Building
To build a bundle there is a production version of the webpack and an express.js configuration to serve the static content and APIs.
These are the steps to bundle and check the results:
```
# build the bundle in the release folder
yarn run build
# start an express instance to server the contents found in the release folder
yarn run serve
# now open http://localhost.s-r-v.net:3000 to see the results
```

The "production instance" handles the same APIs as the dev instance, but servers the static content in a different way.

## Commits
husky is being used to handle commit hooks. Currently, it makes sure that commits to the master and dev branches are preceeded by successful tests. This can be configured in the .huskyrc and .huskyrc.run.sh.

## Demo

[![asciicast](https://asciinema.org/a/271024.svg)](https://asciinema.org/a/271024)


## License
Check out [bootstrap](src/frontend/styles/lib/bootstrap/LICENSE) and  [fontawesome](src/frontend/styles/lib/fontawesome/LICENSE) license.
