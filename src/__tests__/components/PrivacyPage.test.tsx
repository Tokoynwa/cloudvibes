import { render, screen } from '@testing-library/react';
import PrivacyPage from '@/app/privacy/page';

describe('PrivacyPage', () => {
  it('renders the privacy policy heading', () => {
    render(<PrivacyPage />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/privacy policy/i);
  });

  it('contains GDPR compliance information', () => {
    render(<PrivacyPage />);
    
    expect(screen.getByText(/gdpr/i)).toBeInTheDocument();
    expect(screen.getByText(/data protection/i)).toBeInTheDocument();
  });

  it('includes Google AdSense disclosure', () => {
    render(<PrivacyPage />);
    
    expect(screen.getByText(/google/i)).toBeInTheDocument();
    expect(screen.getByText(/advertising/i)).toBeInTheDocument();
  });

  it('contains COPPA compliance section', () => {
    render(<PrivacyPage />);
    
    expect(screen.getByText(/children/i)).toBeInTheDocument();
    expect(screen.getByText(/coppa/i)).toBeInTheDocument();
  });

  it('has contact information', () => {
    render(<PrivacyPage />);
    
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('includes data collection information', () => {
    render(<PrivacyPage />);
    
    expect(screen.getByText(/collect/i)).toBeInTheDocument();
    expect(screen.getByText(/information/i)).toBeInTheDocument();
  });

  it('contains cookies policy', () => {
    render(<PrivacyPage />);
    
    expect(screen.getByText(/cookie/i)).toBeInTheDocument();
  });

  it('has proper document structure', () => {
    render(<PrivacyPage />);
    
    // Should have main content area
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    // Should have multiple headings for sections
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(1);
  });

  it('renders without errors', () => {
    expect(() => render(<PrivacyPage />)).not.toThrow();
  });

  it('contains required legal sections', () => {
    render(<PrivacyPage />);
    
    // Essential privacy policy sections
    const requiredSections = [
      /what information we collect/i,
      /how we use/i,
      /third.party/i,
      /your rights/i,
    ];

    requiredSections.forEach(section => {
      expect(screen.getByText(section)).toBeInTheDocument();
    });
  });
});