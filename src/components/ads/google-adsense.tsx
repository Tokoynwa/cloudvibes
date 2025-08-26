'use client';

import { useEffect, useRef, useState } from 'react';
import { AdPlaceholder } from './ad-placeholder';

interface GoogleAdSenseProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  adLayoutKey?: string;
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

export function GoogleAdSense({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  style,
  className = '',
  responsive = true,
}: GoogleAdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && adRef.current) {
        const w = window as unknown as { adsbygoogle?: unknown[] };
        if (w.adsbygoogle) {
          // Clear any existing ad
          adRef.current.innerHTML = '';
          
          // Push the ad
          w.adsbygoogle.push({});
        }
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  const adStyle = responsive
    ? { display: 'block', ...style }
    : { display: 'inline-block', ...style };

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={adStyle}
      data-ad-client="ca-pub-1091636822057337"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-ad-layout={adLayout}
      data-ad-layout-key={adLayoutKey}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}

// Predefined AdSense components for different placements
export function AdSenseHeader() {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  
  useEffect(() => {
    // Check if we're in development or if AdSense isn't approved yet
    const timer = setTimeout(() => {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      if (!w.adsbygoogle || w.adsbygoogle.length === 0) {
        setShowPlaceholder(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex justify-center py-4">
      {showPlaceholder ? (
        <AdPlaceholder type="header" className="max-w-4xl w-full" />
      ) : (
        <GoogleAdSense
          adSlot="1234567890" // You'll need to create this ad unit in AdSense
          adFormat="auto"
          className="max-w-4xl w-full"
          style={{ height: 'auto', minHeight: '100px' }}
        />
      )}
    </div>
  );
}

export function AdSenseSidebar() {
  return (
    <div className="w-full">
      <GoogleAdSense
        adSlot="1234567891" // You'll need to create this ad unit in AdSense
        adFormat="auto"
        style={{ 
          width: '100%',
          height: '600px',
          maxWidth: '300px'
        }}
        responsive={true}
      />
    </div>
  );
}

export function AdSenseInContent() {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      if (!w.adsbygoogle || w.adsbygoogle.length === 0) {
        setShowPlaceholder(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex justify-center py-6">
      {showPlaceholder ? (
        <AdPlaceholder type="content" className="max-w-2xl w-full" />
      ) : (
        <GoogleAdSense
          adSlot="1234567892" // You'll need to create this ad unit in AdSense
          adFormat="fluid"
          adLayout="in-article"
          className="max-w-2xl w-full"
          style={{ height: 'auto', minHeight: '250px' }}
        />
      )}
    </div>
  );
}

export function AdSenseFooter() {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      if (!w.adsbygoogle || w.adsbygoogle.length === 0) {
        setShowPlaceholder(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex justify-center py-4">
      {showPlaceholder ? (
        <AdPlaceholder type="footer" className="max-w-5xl w-full" />
      ) : (
        <GoogleAdSense
          adSlot="1234567893" // You'll need to create this ad unit in AdSense
          adFormat="auto"
          className="max-w-5xl w-full"
          style={{ height: 'auto', minHeight: '100px' }}
        />
      )}
    </div>
  );
}

// Mobile-optimized ad units
export function AdSenseMobile() {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      if (!w.adsbygoogle || w.adsbygoogle.length === 0) {
        setShowPlaceholder(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex justify-center py-4 md:hidden">
      {showPlaceholder ? (
        <AdPlaceholder type="mobile" className="w-full max-w-sm" />
      ) : (
        <GoogleAdSense
          adSlot="1234567894" // Mobile-specific ad unit
          adFormat="auto"
          className="w-full max-w-sm"
          style={{ height: 'auto', minHeight: '250px' }}
        />
      )}
    </div>
  );
}

// Large rectangle for desktop
export function AdSenseLargeRectangle() {
  return (
    <div className="w-full flex justify-center py-4 hidden md:block">
      <GoogleAdSense
        adSlot="1234567895" // Large rectangle ad unit
        adFormat="rectangle"
        className="w-full"
        style={{ 
          width: '336px', 
          height: '280px',
          margin: '0 auto'
        }}
        responsive={false}
      />
    </div>
  );
}