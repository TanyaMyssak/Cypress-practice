const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    
    setupNodeEvents(on, config) {
    },
    video: true,
    env: {
      AUTH_USERNAME: 'guest',
      AUTH_PASSWORD: 'welcome2qauto',
      TEST_USER_EMAIL: 'tanyamyssak+testuser@gmail.com',
      TEST_USER_PASSWORD: 'Happy2025'
    },


    // implement node event listeners here }, */

    /*   retries: {
        runMode: 2, /*runs in terminal
        openMode: 3,/*runs in cypress browser
      }, */

  }
});