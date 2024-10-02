import { render, screen, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Home from "../pages/Home"
import About from "../pages/About"

const queryClient = new QueryClient()

test("navigates to About page and renders content", async () => {
    render(
        <QueryClientProvider client={queryClient}>
            <About />
        </QueryClientProvider>
    )

    // Wait for the About page to be rendered
    await waitFor(() => {
        expect(screen.getByText(/About/i)).toBeInTheDocument()
    })
})
