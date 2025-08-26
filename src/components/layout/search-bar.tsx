'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Loader2, X } from 'lucide-react';
import { useLocationSearch, useGeolocation } from '@/lib/hooks/use-weather';
import { useWeatherStore } from '@/lib/store/weather-store';
import { debounce } from '@/lib/utils';
import { SearchLocation } from '@/lib/types/weather';

interface SearchBarProps {
  onLocationSelect: (location: SearchLocation) => void;
}

export function SearchBar({ onLocationSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { searchResults, isSearching, searchLocations, clearSearch } = useLocationSearch();
  const { getCurrentLocation } = useGeolocation();
  const { currentLocation } = useWeatherStore();

  const debouncedSearch = useCallback(
    debounce((query: string) => searchLocations(query), 300),
    [searchLocations]
  );

  useEffect(() => {
    if (query.trim().length > 1) {
      debouncedSearch(query);
      setIsOpen(true);
    } else {
      clearSearch();
      setIsOpen(false);
    }
  }, [query, debouncedSearch, clearSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (location: SearchLocation) => {
    onLocationSelect(location);
    setQuery('');
    setIsOpen(false);
    clearSearch();
  };

  const handleCurrentLocationClick = async () => {
    const location = await getCurrentLocation();
    if (location) {
      onLocationSelect({
        name: location.name,
        country: location.country,
        region: location.region,
        latitude: location.latitude,
        longitude: location.longitude
      });
    }
    setQuery('');
    setIsOpen(false);
  };

  const clearQuery = () => {
    setQuery('');
    setIsOpen(false);
    clearSearch();
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white/70" />
        </div>
        
        <motion.input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 1 && setIsOpen(true)}
          placeholder="Search city..."
          whileFocus={{ scale: 1.02 }}
          className="block w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/70 text-sm sm:text-base font-medium shadow-lg hover:bg-white/20 transition-all duration-200"
        />
        
        {query && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearQuery}
            className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-white/70 hover:text-white transition-colors"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 max-h-80 overflow-y-auto"
          >
            {/* Current Location Option */}
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCurrentLocationClick}
              className="w-full px-6 py-4 text-left hover:bg-blue-50/50 flex items-center space-x-4 border-b border-white/20 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-blue-600">Use Current Location</div>
                {currentLocation && (
                  <div className="text-sm text-slate-600">{currentLocation.name}</div>
                )}
              </div>
            </motion.button>

            {/* Loading State */}
            {isSearching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-8 text-center"
              >
                <div className="relative mx-auto w-8 h-8 mb-3">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-30 animate-pulse" />
                </div>
                <p className="text-slate-600 font-medium">Searching locations...</p>
              </motion.div>
            )}

            {/* Search Results */}
            {!isSearching && searchResults.length > 0 && (
              <div className="py-2">
                {searchResults.map((location, index) => (
                  <motion.button
                    key={`${location.latitude}-${location.longitude}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.02, 
                      backgroundColor: 'rgba(148, 163, 184, 0.1)',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLocationSelect(location)}
                    className="group w-full px-6 py-4 text-left hover:bg-slate-50/50 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {location.flag ? (
                          <div className="text-2xl">{location.flag}</div>
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-r from-slate-400 to-slate-500 rounded-lg flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {location.name}
                        </div>
                        <div className="text-sm text-slate-600 flex items-center space-x-2">
                          <span>{location.region && `${location.region}, `}{location.country}</span>
                          {location.population && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              {(location.population / 1000000).toFixed(1)}M
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <MapPin className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </motion.button>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isSearching && query.trim().length > 1 && searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-8 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-slate-400 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <p className="text-slate-600 font-medium mb-1">No locations found</p>
                <p className="text-sm text-slate-500">Try a different search term</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}