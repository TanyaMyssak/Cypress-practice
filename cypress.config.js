const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "mm13yo",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    /*  baseUrl: 'https://example.cypress.io', */
  },
  retries: {
    runMode: 2, /*runs in terminal*/
    openMode: 3,/*runs in cypress browser*/
  },
  video: true
});
