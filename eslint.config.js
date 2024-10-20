import globals from "globals"
import pluginJs from "@eslint/js"
import pluginReact from "eslint-plugin-react"

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
        },
    },
]
