import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

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
        },
    },
    plugins: [react()],
})
