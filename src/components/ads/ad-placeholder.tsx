'use client';

import { motion } from 'framer-motion';
import { DollarSign, Eye } from 'lucide-react';

interface AdPlaceholderProps {
  type: 'header' | 'content' | 'footer' | 'mobile' | 'sidebar';
  className?: string;
}

export function AdPlaceholder({ type, className = '' }: AdPlaceholderProps) {
  const getAdInfo = () => {
    switch (type) {
      case 'header':
        return { 
          name: 'Header Banner', 
          size: '728x90 or Responsive', 
          position: 'Top of page',
          cpm: '$1-5',
          color: 'from-blue-500 to-cyan-500'
        };
      case 'content':
        return { 
          name: 'In-Content Ad', 
          size: 'Responsive', 
          position: 'Between sections',
          cpm: '$2-6 (Best)',
          color: 'from-green-500 to-emerald-500'
        };
      case 'footer':
        return { 
          name: 'Footer Banner', 
          size: '728x90 or Responsive', 
          position: 'Bottom of page',
          cpm: '$0.50-3',
          color: 'from-purple-500 to-pink-500'
        };
      case 'mobile':
        return { 
          name: 'Mobile Banner', 
          size: '320x50', 
          position: 'Mobile only',
          cpm: '$1-4',
          color: 'from-orange-500 to-red-500'
        };
      case 'sidebar':
        return { 
          name: 'Sidebar Ad', 
          size: '300x250', 
          position: 'Desktop sidebar',
          cpm: '$1-4',
          color: 'from-indigo-500 to-purple-500'
        };
      default:
        return { 
          name: 'Ad Slot', 
          size: 'Auto', 
          position: 'Various',
          cpm: '$1-5',
          color: 'from-gray-500 to-slate-500'
        };
    }
  };

  const adInfo = getAdInfo();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden bg-gradient-to-br ${adInfo.color} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      style={{ 
        minHeight: type === 'mobile' ? '60px' : type === 'header' || type === 'footer' ? '100px' : '250px' 
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20" />
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col items-center justify-center text-center text-white">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3"
        >
          <DollarSign className="w-6 h-6" />
        </motion.div>
        
        <h3 className="font-bold text-lg mb-2">{adInfo.name}</h3>
        <div className="space-y-1 text-sm opacity-90">
          <div className="flex items-center justify-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>{adInfo.position}</span>
          </div>
          <div>Size: {adInfo.size}</div>
          <div className="font-semibold bg-white/20 px-2 py-1 rounded">
            CPM: {adInfo.cpm}
          </div>
        </div>
        
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-3 text-xs bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full"
        >
          AdSense Slot Ready
        </motion.div>
      </div>

      {/* Corner Label */}
      <div className="absolute top-2 right-2 text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded">
        Test Mode
      </div>
    </motion.div>
  );
}