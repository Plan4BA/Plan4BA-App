# plan4ba

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.0.

## Requirements

- [Node.js](https://nodejs.org/en/download/) and npm (included in the Node.js installation)
- [Angular CLI](https://github.com/angular/angular-cli) (recommended) with `npm install -g @angular/cli`

## Preparation

Before running anyting, you have to install the dependencies by running `npm install` in the root directory of this project.
To send api requests to the backend, you can use the [integrated proxy](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md) of the angular cli development server. This is necessary, because the browser tries to prevent XSS-Attacks. You can configure the target address for the proxy in the proxy.conf.json file. Remember to start the development server with the `--proxy-config` as described in "Run for Web" to activate the integrated proxy.

## Run

You can run a development web server with the Angular CLI using `ng serve`. If you want to use the integrated proxy of the angular cli development server, as mentioned in "Prepare for Web", you need to run `ng serve --proxy-config proxy.conf.json`.

## Build

To build the web app run `ng build --prod`.

## Angular CLI auto-generated readme

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
