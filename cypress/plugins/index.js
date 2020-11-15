/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  /*  module.exports = (on, config) => {
    on('file:preprocessor', cucumber())
  } */

  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
  };

  on("file:preprocessor", cucumber(options));

  on('before:browser:launch', (browser = {}, launchOptions) => {
    // `args` is an array of all the arguments that will
    // be passed to browsers when it launches
    // console.log(launchOptions.args) // print all current args

    if (browser.name === 'chrome') {
      launchOptions.args.push('--disable-site-isolation-trials');

      return launchOptions;
    }

    if (browser.family === 'chromium' && browser.name !== 'electron') {
      // auto open devtools
      //launchOptions.args.push('--auto-open-devtools-for-tabs')
      launchOptions.args.push('--disable-site-isolation-trials');

      // whatever you return here becomes the launchOptions
      return launchOptions
    }

    if (browser.family === 'firefox') {
      // auto open devtools
      //launchOptions.args.push('-devtools')

      return launchOptions
    }
  });

}
