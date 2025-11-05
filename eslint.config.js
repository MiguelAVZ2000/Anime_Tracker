// eslint.config.js
import globals from "globals/index.js";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    ignores: [".next/", "node_modules/"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.eslint.json"], // Important for type-aware linting
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tseslint.plugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactRecommended.rules, // Use recommended React rules
      ...reactJsxRuntime.rules, // Enable automatic JSX runtime
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // Custom rules or overrides
      "react/react-in-jsx-scope": "off", // Next.js doesn't require React to be in scope
      "react/prop-types": "off", // Often not needed with TypeScript
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off"
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
];
