'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="relative z-10 mt-16 border-t border-white/20 bg-white/5 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/70 text-sm">
            © {new Date().getFullYear()} CloudVibes. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/privacy" 
              className="text-white/70 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            
            <a 
              href="https://policies.google.com/technologies/partner-sites" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white text-sm transition-colors duration-200"
            >
              How Google uses data
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-white/50">
          Weather data provided by Open-Meteo and OpenWeatherMap APIs
        </div>
      </div>
    </motion.footer>
  );
}