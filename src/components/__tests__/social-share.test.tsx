import { render, screen, fireEvent } from '@testing-library/react';
import { SocialShare } from '../social-share';

describe('SocialShare Component', () => {
  const defaultProps = {
    url: 'https://cloudvibes.org/test',
    title: 'Test Article',
    description: 'Test description',
    hashtags: ['weather', 'test'],
  };

  it('renders social share buttons', () => {
    render(<SocialShare {...defaultProps} />);
    
    expect(screen.getByText('Share:')).toBeInTheDocument();
    expect(screen.getByText('Tweet')).toBeInTheDocument();
    expect(screen.getByText('Share')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('handles copy to clipboard functionality', async () => {
    // Mock clipboard API
    const mockWriteText = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    render(<SocialShare {...defaultProps} />);
    
    const copyButton = screen.getByText('Copy');
    fireEvent.click(copyButton);
    
    expect(mockWriteText).toHaveBeenCalledWith(defaultProps.url);
  });

  it('opens social media windows when buttons are clicked', () => {
    const mockOpen = jest.fn();
    window.open = mockOpen;

    render(<SocialShare {...defaultProps} />);
    
    const tweetButton = screen.getByText('Tweet');
    fireEvent.click(tweetButton);
    
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('twitter.com/intent/tweet'),
      '_blank',
      'width=600,height=400'
    );
  });
});