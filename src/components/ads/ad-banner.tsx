'use client';

import { motion } from 'framer-motion';
import { X, ExternalLink, Star } from 'lucide-react';
import { useState } from 'react';

interface AdBannerProps {
  type: 'horizontal' | 'vertical' | 'square';
  position: 'header' | 'sidebar' | 'content' | 'footer';
  className?: string;
}

export function AdBanner({ type, position, className = '' }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  // Demo ads - replace with real ad network integration
  const demoAds = {
    horizontal: {
      title: "Premium Weather Gear",
      description: "Stay dry and comfortable with our top-rated weather protection equipment",
      cta: "Shop Now - 25% Off",
      image: "🌦️",
      brand: "WeatherPro",
      price: "From $49.99"
    },
    vertical: {
      title: "Weather Station",
      description: "Professional home weather monitoring system",
      cta: "Learn More",
      image: "📡",
      brand: "MeteoTech",
      price: "$199.99"
    },
    square: {
      title: "Travel Insurance",
      description: "Weather-related trip protection",
      cta: "Get Quote",
      image: "✈️",
      brand: "TravelSafe",
      price: "From $12/trip"
    }
  };

  const ad = demoAds[type];

  const getAdDimensions = () => {
    switch (type) {
      case 'horizontal': return 'w-full h-24 md:h-32';
      case 'vertical': return 'w-48 h-80';
      case 'square': return 'w-64 h-64';
      default: return 'w-full h-24';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden ${getAdDimensions()} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ad Container */}
      <div className="relative w-full h-full bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 z-10 w-6 h-6 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-3 h-3 text-white" />
        </motion.button>

        {/* Ad Content */}
        <div className="relative z-10 p-4 h-full flex items-center">
          {type === 'horizontal' && (
            <div className="flex items-center space-x-4 w-full">
              {/* Icon/Image */}
              <div className="flex-shrink-0 text-3xl md:text-4xl">
                {ad.image}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-bold text-slate-800 text-sm md:text-base truncate">
                    {ad.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-600 truncate mb-2">
                  {ad.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-green-600">{ad.price}</span>
                  <span className="text-xs text-slate-500">{ad.brand}</span>
                </div>
              </div>
              
              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl text-xs md:text-sm font-medium shadow-lg flex items-center space-x-2 transition-all duration-200"
              >
                <span>{ad.cta}</span>
                <ExternalLink className="w-3 h-3" />
              </motion.div>
            </div>
          )}

          {type === 'vertical' && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{ad.image}</div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{ad.title}</h3>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 mb-3">{ad.description}</p>
              </div>
              
              {/* Features */}
              <div className="flex-1 space-y-2 mb-4">
                {['Real-time data', 'Mobile alerts', '24/7 support'].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-slate-700">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}\n              </div>
              
              {/* Bottom */}
              <div className="mt-auto">
                <div className="text-center mb-3">
                  <span className="text-lg font-bold text-green-600">{ad.price}</span>
                  <p className="text-xs text-slate-500">{ad.brand}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-medium shadow-lg flex items-center justify-center space-x-2 transition-all duration-200"
                >
                  <span>{ad.cta}</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          )}

          {type === 'square' && (
            <div className="flex flex-col h-full text-center">
              <div className="text-5xl mb-3">{ad.image}</div>
              <h3 className="font-bold text-slate-800 text-xl mb-2">{ad.title}</h3>
              <div className="flex items-center justify-center space-x-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 mb-4 flex-1">{ad.description}</p>
              <div className="mb-4">
                <span className="text-xl font-bold text-green-600">{ad.price}</span>
                <p className="text-sm text-slate-500">{ad.brand}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <span>{ad.cta}</span>
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Hover Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl"
        />

        {/* Ad Label */}
        <div className="absolute top-2 left-2 text-xs text-slate-500 bg-white/80 backdrop-blur-sm rounded px-2 py-1">
          Sponsored
        </div>
      </div>
    </motion.div>
  );
}

// Native Ad Component for content integration
export function NativeAd({ className = '' }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-gradient-to-br from-white/80 via-white/40 to-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start space-x-4">
        <div className="text-3xl">🌡️</div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-bold text-slate-800">Smart Thermostat</h3>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Energy Saver
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-3">
            Automatically adjust your home temperature based on weather forecasts. Save up to 30% on energy bills.
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-green-600">$199</span>
              <span className="text-sm text-slate-500 line-through ml-2">$299</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-all duration-200"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-2 left-3 text-xs text-slate-400">
        Sponsored Content
      </div>
    </motion.div>
  );
}