const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    env: {
      AUTH_USERNAME: 'guest',
      AUTH_PASSWORD: 'welcome2qauto',
      TEST_USER_EMAIL: "tanyamyssak+quato1-19@gmail.com",
      TEST_USER_PASSWORD: "Happy2025"
    }
  }
});
