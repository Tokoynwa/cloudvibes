import { render, screen } from '@testing-library/react';
import HomePage from '../page';

// Mock the providers
jest.mock('@/components/providers', () => {
  return {
    Providers: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    
    // Look for key elements that should be on the homepage
    expect(screen.getByText(/CloudVibes/i)).toBeInTheDocument();
  });

  it('renders weather information sections', () => {
    render(<HomePage />);
    
    // Check for weather-related content
    const weatherElements = screen.getAllByText(/weather/i);
    expect(weatherElements.length).toBeGreaterThan(0);
  });

  it('has proper document structure', () => {
    render(<HomePage />);
    
    // Check for main container
    const mainContent = screen.getByRole('main') || document.querySelector('main') || document.querySelector('.min-h-screen');
    expect(mainContent).toBeInTheDocument();
  });
});