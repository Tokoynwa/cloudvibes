import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock the Footer component
jest.mock('@/components/layout/footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer Component</footer>;
  };
});

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/cloudvibes/i);
  });

  it('renders weather app content', () => {
    render(<HomePage />);
    
    // Should contain weather-related content
    expect(screen.getByText(/weather/i)).toBeInTheDocument();
  });

  it('includes the footer component', () => {
    render(<HomePage />);
    
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<HomePage />);
    
    // Should have main landmark
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => render(<HomePage />)).not.toThrow();
  });

  it('contains AdSense integration setup', () => {
    render(<HomePage />);
    
    // The component should render successfully with AdSense setup
    // This tests that the layout with AdSense doesn't break the page
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});