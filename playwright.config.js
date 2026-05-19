const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/system",
  use: {
    baseURL: "http://localhost:3000"
  },
  webServer: [
    {
      command: "node backend/server.js",
      port: 3001,
      reuseExistingServer: !process.env.CI
    },
    {
      command: "npx vite",
      port: 3000,
      reuseExistingServer: !process.env.CI
    }
  ]
});
