const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "tkcvhe",

  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
