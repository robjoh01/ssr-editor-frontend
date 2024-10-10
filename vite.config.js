import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import Pages from "vite-plugin-pages"

export default defineConfig({
    build: {
        manifest: true,
    },
    resolve: {
        alias: {
            "@": "/src",
            "@components": "/src/components",
            "@hooks": "/src/hooks",
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
