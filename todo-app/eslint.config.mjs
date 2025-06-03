// import js from "@eslint/js";
// import globals from "globals";
// import { defineConfig } from "eslint/config";


// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
//   { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
// ]);
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint-define-config";

export default defineConfig([
  // Base JS recommended config
  js.configs.recommended,

  // Global configuration for all files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // Add Node.js globals
        ...globals.jest // Add Jest globals for test files
      }
    },
    rules: {
      "no-unused-vars": "warn", // Change to warn instead of error
      "no-undef": "error"
    }
  },

  // Specific configuration for test files
  {
    files: ["**/__tests__/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest // Additional Jest-specific globals
      }
    },
    rules: {
      "no-unused-vars": "off" // Disable for test files if needed
    }
  },

  // Specific configuration for migrations and models
  {
    files: ["**/migrations/**/*.js", "**/models/**/*.js"],
    rules: {
      "no-unused-vars": "off" // Sequelize often has unused params
    }
  }
]);