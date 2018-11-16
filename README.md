# plan4ba

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.0 and the @nativescript/schematics collection for [NativeScript](https://github.com/NativeScript/NativeScript) support.
It's using the [Code-Sharing] support of NativeScript with Angular. This allows us to keep the code for the web and mobile apps in one place.

## Requirements

Follow the [installation guide](https://docs.nativescript.org/angular/start/quick-setup) at the nativescript documentation.

- [Node.js](https://nodejs.org/en/download/) and npm (included in the Node.js installation)
- [Nativescript CLI](https://github.com/NativeScript/nativescript-cli) with `npm install -g nativescript`
- [iOS or Android requirements](https://docs.nativescript.org/angular/start/quick-setup#step-3-install-ios-and-android-requirements)
- [Angular CLI](https://github.com/angular/angular-cli) (recommended) with `npm install -g @angular/cli`

## Run

### Run for Web

You can run a development web server with the Angular CLI using `ng serve`.
To send api requests to the backend, you can use the [integrated proxy](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md). This is necessary, because the browser tries to prevent XSS-Attacks. After writing the address of the api server to the proxy.conf.json file, you can start the development web server with the proxy by executing `ng serve --proxy-config proxy.conf.json`.

### Run for Mobile

You can run the app on an iOS or Android device using `tns run ios --bundle` or `tns run android --bundle`.
To send api requests from the phone, you need to set the address of the api server in the environment.tns.ts file.

## Build

### Build for Web

To build the web app run `ng build --prod`.

### Build for Mobile

Building for mobile is more difficult. In the Nativescript documentation, you can read up on [iOS Publishing](https://docs.nativescript.org/tooling/publishing/publishing-ios-apps) and [Android Publishing](https://docs.nativescript.org/tooling/publishing/publishing-android-apps). You may also consider using [NativeScript Sidekick](https://www.nativescript.org/nativescript-sidekick) for cloud builds.

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
