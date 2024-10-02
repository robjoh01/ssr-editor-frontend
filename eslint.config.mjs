import globals from "globals"
import pluginJs from "@eslint/js"
import pluginReact from "eslint-plugin-react"

export default [
    { files: ["**/*.{js,mjs,cjs,jsx}"] },
    { files: ["**/*.js"], languageOptions: { sourceType: "module" } },
    {
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            // No semi in the code
            semi: ["error", "never"],

            // No console logs in the code
            "no-console": "warn",

            // Enforce double quotes
            quotes: ["error", "double"],
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
]
