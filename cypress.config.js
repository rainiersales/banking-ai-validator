const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } =
  require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } =
  require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  projectId: 'ta3u8r', // Banking AI Validator - Cypress Cloud
  e2e: {
    baseUrl: 'https://2ndround.sandb0x.run',
    async setupNodeEvents(on, config) {
      // Gherkin/Cucumber: register plugin + esbuild loader for .feature files
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] }),
      );
      return config;
    },
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/e2e/**/*.feature', // Gherkin BDD feature files
    ],
    supportFile: 'cypress/support/e2e.ts',
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
  },
});
