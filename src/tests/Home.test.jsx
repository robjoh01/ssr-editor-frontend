import { render, screen, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Home from "../old_pages/home"
import About from "../pages/about"

const queryClient = new QueryClient()

// TODO: Fix these test cases

// FIXME: Could not import and render home page. Setup and mock API calls and fix render home page without any issues.

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
