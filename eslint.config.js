import globals from "globals"

// JavaScript
import pluginJs from "@eslint/js"

// React
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import pluginReactRefresh from "eslint-plugin-react-refresh"
import pluginJsxA11y from "eslint-plugin-jsx-a11y"

export default [
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                sourceType: "module",
            },
        },
        rules: {
            semi: ["error", "never"],
            "no-console": "warn",
            quotes: ["error", "double"],
        },
    },
    {
        settings: {
            react: {
                version: "detect", // Automatically detect the React version
            },
        },
    },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            "react-hooks": pluginReactHooks,
            "jsx-a11y": pluginJsxA11y,
            "react-refresh": pluginReactRefresh,
        },
    },
    {
        ignores: [
            "node_modules/**/*",
            "dist/**/*",
            "build/**/*",
            "*.chunk.js",
            "*.min.js",
            "**/*.test.{js,mjs,cjs,jsx}",
            "coverage/**/*",
        ],
    },
    {
        rules: {
            "react/prop-types": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react-refresh/only-export-components": "warn",
        },
    },
]
