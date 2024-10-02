import { render, screen } from "@testing-library/react"
import About from "../pages/About"

test("renders learn react link", () => {
    render(<About />)
    const linkElement = screen.getByText(/About/i)
    expect(linkElement).toBeInTheDocument()
})
