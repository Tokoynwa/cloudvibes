'use client';

import { motion } from 'framer-motion';
import { Cloud, Settings, Sparkles } from 'lucide-react';
import { SearchBar } from './search-bar';
import { SearchLocation } from '@/lib/types/weather';

interface HeaderProps {
  onLocationSelect: (location: SearchLocation) => void;
  onSettingsClick?: () => void;
}

export function Header({ onLocationSelect, onSettingsClick }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-2xl border-b border-white/20 sticky top-0 z-40 shadow-lg"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2 sm:space-x-4"
          >
            <motion.div
              whileHover={{ 
                rotate: 360, 
                scale: 1.1,
                transition: { duration: 0.6 }
              }}
              className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl"
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 animate-pulse" />
              <div className="relative z-10 flex items-center justify-center">
                <Cloud className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 animate-pulse" />
              </div>
            </motion.div>
            <div className="hidden sm:block">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl sm:text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent tracking-tight"
              >
                CloudVibes
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs sm:text-sm text-white/70 font-medium -mt-1"
              >
                Your Personal Weather Experience
              </motion.p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex-1 max-w-sm sm:max-w-lg mx-2 sm:mx-8"
          >
            <SearchBar onLocationSelect={onLocationSelect} />
          </motion.div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-2"
          >
            {onSettingsClick && (
              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 180,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
                onClick={onSettingsClick}
                className="p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 shadow-lg"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}