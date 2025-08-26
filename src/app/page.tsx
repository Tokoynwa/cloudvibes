'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CurrentWeather } from '@/components/weather/current-weather';
import { Forecast } from '@/components/weather/forecast';
import { WeatherInsights } from '@/components/weather/weather-insights';
import { NativeAd } from '@/components/ads/ad-banner';
import { AdSenseHeader, AdSenseInContent, AdSenseFooter, AdSenseMobile } from '@/components/ads/google-adsense';
import { AdSenseTest } from '@/components/ads/adsense-test';
import { useCurrentWeather, useGeolocation, useWeatherRefresh, useAutoRefresh } from '@/lib/hooks/use-weather';
import { useWeatherStore } from '@/lib/store/weather-store';
import { SearchLocation } from '@/lib/types/weather';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { detectUserLocation } from '@/lib/utils/location-detection';
import { MapPin, Wind, Droplets, AlertTriangle } from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { currentLocation, setCurrentLocation } = useWeatherStore();
  const { getCurrentLocation } = useGeolocation();
  const { refreshWeather } = useWeatherRefresh();
  
  // Auto-refresh weather data every 5 minutes
  useAutoRefresh();
  
  // Fetch weather data when location changes
  useCurrentWeather(
    currentLocation?.latitude, 
    currentLocation?.longitude
  );

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get user's location on first load with enhanced detection
  useEffect(() => {
    if (mounted && !currentLocation) {
      const initializeLocation = async () => {
        try {
          // Try enhanced location detection first
          console.log('Trying enhanced location detection...');
          const detectedLocation = await detectUserLocation();
          console.log('Enhanced location result:', detectedLocation);
          
          if (detectedLocation && detectedLocation.latitude && detectedLocation.longitude) {
            const location = {
              name: detectedLocation.city || detectedLocation.region || 'Current Location',
              country: detectedLocation.country || '',
              region: detectedLocation.region || '',
              latitude: detectedLocation.latitude,
              longitude: detectedLocation.longitude,
              timezone: detectedLocation.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
              localTime: new Date().toISOString()
            };
            console.log('Setting enhanced location:', location);
            setCurrentLocation(location);
            return;
          }
        } catch (error) {
          console.warn('Enhanced location detection failed:', error);
        }

        // Fallback to geolocation API
        console.log('Falling back to geolocation API...');
        try {
          const location = await getCurrentLocation();
          if (location) {
            console.log('Geolocation result:', location);
          }
        } catch (geoError) {
          console.error('Geolocation also failed:', geoError);
          // Set a default location if everything fails
          console.log('Setting default location (New York)');
          setCurrentLocation({
            name: 'New York',
            country: 'United States',
            region: 'New York',
            latitude: 40.7128,
            longitude: -74.0060,
            timezone: 'America/New_York',
            localTime: new Date().toISOString()
          });
        }
      };
      
      initializeLocation();
    }
  }, [mounted, currentLocation, getCurrentLocation, setCurrentLocation]);

  // Show loading during SSR/hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <div className="relative">
            <LoadingSpinner size="lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-40 animate-pulse" />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-2xl font-bold text-white"
          >
            CloudVibes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-2 text-blue-200"
          >
            Loading the best weather experience...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const handleLocationSelect = (location: SearchLocation) => {
    setCurrentLocation({
      name: location.name,
      country: location.country,
      region: location.region,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      localTime: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-slow-float" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-slow-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-slow-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-slow-float" style={{ animationDelay: '6s' }} />
      </div>
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]" />
      
      <div className="relative z-10">
        <Header onLocationSelect={handleLocationSelect} />
        
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Current Weather - Primary Focus */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative z-20"
            >
              <CurrentWeather onRefresh={refreshWeather} />
            </motion.div>

            {/* 7-Day Forecast - Secondary Focus */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative z-15"
            >
              <Forecast />
            </motion.div>
            
            {/* Google AdSense Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <AdSenseHeader />
            </motion.div>
            
            {/* Mobile Ad */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <AdSenseMobile />
            </motion.div>

            {/* Weather Insights */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <WeatherInsights />
            </motion.div>
          
            {/* Google AdSense In-Content Ad */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <AdSenseInContent />
            </motion.div>
            
            {/* Native Ad Integration */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <NativeAd />
            </motion.div>

            {/* Additional Features - Reduced Prominence */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12 opacity-75"
            >
              {/* Weather Map Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative overflow-hidden bg-gradient-to-br from-white/80 via-white/40 to-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 p-4 sm:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">Weather Map</h3>
                  </div>
                  <div className="h-32 sm:h-48 bg-gradient-to-br from-slate-100/80 to-slate-200/60 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <p className="text-slate-700 font-semibold text-sm sm:text-base">Interactive Map</p>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1">Coming soon</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Air Quality Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative overflow-hidden bg-gradient-to-br from-white/80 via-white/40 to-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 p-4 sm:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">Air Quality</h3>
                  </div>
                  <div className="h-32 sm:h-48 bg-gradient-to-br from-slate-100/80 to-slate-200/60 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <p className="text-slate-700 font-semibold text-sm sm:text-base">Air Quality Index</p>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1">Coming soon</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Weather Alerts Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative overflow-hidden bg-gradient-to-br from-white/80 via-white/40 to-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 sm:col-span-2 lg:col-span-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 p-4 sm:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">Weather Alerts</h3>
                  </div>
                  <div className="h-32 sm:h-48 bg-gradient-to-br from-slate-100/80 to-slate-200/60 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <p className="text-slate-700 font-semibold text-sm sm:text-base">All Clear</p>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1">No active alerts</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </main>
        
        {/* Google AdSense Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <AdSenseFooter />
        </motion.div>
        
        {/* Footer with Privacy Policy Links */}
        <Footer />
        
        {/* AdSense Integration Test Component - Set showTest={false} to hide */}
        <AdSenseTest showTest={false} />
      </div>
    </div>
  );
}

// Add custom CSS for slow floating animation
const styles = `
@keyframes slow-float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(1deg);
  }
  66% {
    transform: translateY(10px) rotate(-1deg);
  }
}

.animate-slow-float {
  animation: slow-float 8s ease-in-out infinite;
}
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}