import { defineConfig } from "vite"
import dotenv from "dotenv"

import react from "@vitejs/plugin-react"
import Pages from "vite-plugin-pages"

dotenv.config()

export default defineConfig({
    base: process.env.VITE_HOMEPAGE_URL || "./",
    server: {
        port: process.env.VITE_CLIENT_PORT || 3000,
    },
    build: {
        manifest: true,
    },
    resolve: {
        alias: {
            "@": "/src",
            "@components": "/src/components",
            "@systems": "/src/systems",
            "@hooks": "/src/hooks",
            "@contexts": "/src/contexts",
            "@pages": "/src/pages",
            "@tests": "/src/tests",
            "@utils": "/src/utils",
        },
    },
    plugins: [
        react(),
        Pages({
            dirs: "src/pages",
        }),
    ],
})
