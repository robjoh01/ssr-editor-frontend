import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

import { ColorModeScript, ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            throwOnError: true,
        },
        mutations: {
            throwOnError: true,
        },
    },
})
import { SnackbarProvider } from "notistack"

import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "@/systems/Auth"

const Main = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <BrowserRouter basename={import.meta.env.VITE_BASENAME}>
                    <AuthProvider>
                        <SnackbarProvider>
                            <App />
                        </SnackbarProvider>
                    </AuthProvider>
                </BrowserRouter>
            </ChakraProvider>
        </QueryClientProvider>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Main />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
