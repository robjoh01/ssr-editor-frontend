import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Index from '../pages/index';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '@/auth/index';

vi.mock('@/auth/index', () => ({
    useAuth: vi.fn(),
}));
vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: vi.fn(),
}));

import { useNavigate } from 'react-router-dom';

describe('Index Component', () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);
    });

    it('renders the welcome message and description text', () => {
        useAuth.mockReturnValue({ isLoggedIn: false });

        render(
            <BrowserRouter>
                <Index />
            </BrowserRouter>
        );

        expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
        expect(screen.getByText(/SSR-Editor/i)).toBeInTheDocument();
        expect(
            screen.getByText(/real-time web app for collaborative document creation/i)
        ).toBeInTheDocument();
    });

    it('redirects to /dashboard if the user is already logged in', () => {
        useAuth.mockReturnValue({ isLoggedIn: true });

        render(
            <BrowserRouter>
                <Index />
            </BrowserRouter>
        );

        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('renders the login form initially', () => {
        useAuth.mockReturnValue({ isLoggedIn: false });

        render(
            <BrowserRouter>
                <Index />
            </BrowserRouter>
        );

        expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    });

    it('switches to the sign-up form when the tab is changed', () => {
        useAuth.mockReturnValue({ isLoggedIn: false });

        render(
            <BrowserRouter>
                <Index />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/Sign Up/i));
        expect(screen.getByRole('heading', { name: /Sign Up/i })).toBeInTheDocument();
    });

    it('switches back to the login form when the tab is changed again', () => {
        useAuth.mockReturnValue({ isLoggedIn: false });

        render(
            <BrowserRouter>
                <Index />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/Sign Up/i));
        expect(screen.getByRole('heading', { name: /Sign Up/i })).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Login/i));
        expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    });
});
