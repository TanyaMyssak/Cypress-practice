const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto2.forstudy.space",
    env: {
      AUTH_USERNAME: 'guest',
      AUTH_PASSWORD: 'welcome2qauto',
      TEST_USER_EMAIL: "tanyamyssak+quato2-19@gmail.com",
      TEST_USER_PASSWORD: "Happy2025"
    },
  }
});
