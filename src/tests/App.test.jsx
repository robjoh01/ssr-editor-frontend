import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest'; // Add this line
import App from '../App'; // Adjust the path if needed

describe('App Component', () => {
    it('renders Header and Footer', () => {
        const { getByText } = render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        expect(getByText(/Header Text/i)).toBeInTheDocument(); // Replace with actual header text
        expect(getByText(/Footer Text/i)).toBeInTheDocument(); // Replace with actual footer text
    });
});
