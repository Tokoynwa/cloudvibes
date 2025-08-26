'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

export function AdSenseTest({ showTest = true }: { showTest?: boolean }) {
  if (!showTest) return null;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [adsbygoogleAvailable, setAdsbygoogleAvailable] = useState(false);
  const [clientId, setClientId] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const checkAdSenseIntegration = () => {
      const errors: string[] = [];
      
      // Check if AdSense script is loaded
      const adSenseScript = document.querySelector('script[src*="adsbygoogle.js"]');
      if (adSenseScript) {
        setScriptLoaded(true);
        const src = adSenseScript.getAttribute('src');
        const match = src?.match(/client=(ca-pub-\d+)/);
        if (match) {
          setClientId(match[1]);
        }
      } else {
        errors.push('AdSense script not found in document');
      }

      // Check if adsbygoogle array is available
      const w = window as unknown as { adsbygoogle?: unknown[] };
      if (w.adsbygoogle) {
        setAdsbygoogleAvailable(true);
      } else {
        errors.push('adsbygoogle array not initialized');
      }

      // Check for ad slots in the page
      const adSlots = document.querySelectorAll('.adsbygoogle');
      if (adSlots.length === 0) {
        errors.push('No AdSense ad slots found on page');
      }

      setErrors(errors);
    };

    // Check immediately and after a delay to allow scripts to load
    checkAdSenseIntegration();
    const timer = setTimeout(checkAdSenseIntegration, 2000);

    return () => clearTimeout(timer);
  }, []);

  const StatusIcon = ({ condition }: { condition: boolean }) => {
    if (condition) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl p-4 shadow-lg max-w-sm z-50">
      <div className="flex items-center space-x-2 mb-3">
        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
        <h3 className="font-semibold text-gray-800 text-sm">AdSense Integration Test</h3>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Script Loaded:</span>
          <StatusIcon condition={scriptLoaded} />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">AdsByGoogle Available:</span>
          <StatusIcon condition={adsbygoogleAvailable} />
        </div>
        
        {clientId && (
          <div className="bg-green-50 p-2 rounded border border-green-200">
            <div className="text-green-700 font-medium text-xs">Client ID Found:</div>
            <div className="text-green-600 text-xs font-mono">{clientId}</div>
          </div>
        )}

        {errors.length > 0 && (
          <div className="bg-red-50 p-2 rounded border border-red-200 mt-2">
            <div className="text-red-700 font-medium text-xs mb-1">Issues Found:</div>
            {errors.map((error, index) => (
              <div key={index} className="flex items-start space-x-1">
                <AlertCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-600 text-xs">{error}</span>
              </div>
            ))}
          </div>
        )}

        <div className="bg-blue-50 p-2 rounded border border-blue-200 mt-2">
          <div className="text-blue-700 font-medium text-xs">Note:</div>
          <div className="text-blue-600 text-xs">
            Ads won&apos;t display until AdSense approval. Integration testing only.
          </div>
        </div>
      </div>
    </div>
  );
}