import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4200',
  },
  env: {
    githubUrl: 'https://github.com/KamilChmielowski/',
    linkedInUrl: 'https://www.linkedin.com/in/kamil-chmielowski-1540562a8/'
  }
});
