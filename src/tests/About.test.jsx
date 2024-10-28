import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../pages/about.jsx';

describe('About Component', () => {
  it('renders the title and description', () => {
    render(<About />);

    const titleElement = screen.getByRole('heading', { name: /About SSR Editor/i });
    expect(titleElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(/A powerful, collaborative document editing platform/i);
    expect(descriptionElement).toBeInTheDocument();

    const goalSection = screen.getByRole('heading', { name: /Our Goal/i });
    expect(goalSection).toBeInTheDocument();

    const featureText = screen.getByText(/Real-time collaborative editing/i);
    expect(featureText).toBeInTheDocument();
  });

  it('renders the "Key Features" section with all listed features', () => {
    render(<About />);

    const featuresHeading = screen.getByRole('heading', { name: /Key Features/i });
    expect(featuresHeading).toBeInTheDocument();

    const featureTexts = [
      "Real-time collaborative editing",
      "Server-side rendering for improved performance",
      "Version history and document recovery",
      "Advanced formatting and styling options",
      "Secure document sharing and permissions management",
    ];

    featureTexts.forEach((text) => {
      expect(screen.getByText(new RegExp(text, 'i'))).toBeInTheDocument();
    });
  });

  it('renders the "Our Team" section with team member information', () => {
    render(<About />);

    const teamHeading = screen.getByRole('heading', { name: /Our Team/i });
    expect(teamHeading).toBeInTheDocument();

    const teamMembers = [
      { name: /Robin Johannesson/i, title: /Full Stack Developer/i },
      { name: /Moawya Mearza/i, title: /Full Stack Developer/i },
    ];

    teamMembers.forEach(({ name, title }) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the "Get Involved" section with links to GitHub and email', () => {
    render(<About />);

    const getInvolvedHeading = screen.getByRole('heading', { name: /Get Involved/i });
    expect(getInvolvedHeading).toBeInTheDocument();

    const githubLink = screen.getByRole('link', { name: /GitHub repository/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/robjoh01/ssr-editor-frontend');

    const emailLink = screen.getByRole('link', { name: /get in touch/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:roje22@student.bth.se');
  });
});
