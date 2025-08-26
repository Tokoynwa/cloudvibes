'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Footer() {
  const footerSections = [
    {
      title: 'Weather Services',
      links: [
        { name: 'Current Weather', href: '/' },
        { name: 'Weather Forecasts', href: '/' },
        { name: 'Weather Maps', href: '/' },
        { name: 'Weather Alerts', href: '/' },
      ]
    },
    {
      title: 'Learn & Support',
      links: [
        { name: 'Weather Guides', href: '/guides' },
        { name: 'Help & FAQ', href: '/help' },
        { name: 'Weather Education', href: '/guides/beginners-guide' },
        { name: 'Weather Safety', href: '/guides/severe-weather-safety' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About CloudVibes', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Weather Blog', href: '/blog' },
        { name: 'Weather Widgets', href: '/widgets' },
        { name: 'Weather Glossary', href: '/guides/weather-glossary' },
        { name: 'API Documentation', href: '/developers' },
      ]
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="relative z-10 mt-16 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-blue-200 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold text-white mb-3">Stay Weather Informed</h3>
            <p className="text-blue-200 text-sm mb-4">
              Get weekly weather tips and updates delivered to your inbox
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Copyright and Brand */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="font-bold text-lg">CloudVibes</span>
              </div>
              <div className="text-blue-200 text-sm">
                © {new Date().getFullYear()} CloudVibes. All rights reserved.
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <span className="text-blue-200 text-sm">Follow us:</span>
                <div className="flex space-x-3">
                  <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                    <span className="sr-only">YouTube</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center space-x-4">
                <a 
                  href="https://policies.google.com/technologies/partner-sites" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white text-sm transition-colors duration-200"
                >
                  How Google uses data
                </a>
              </div>
            </div>
          </div>

          {/* Data Attribution */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-blue-200">
              Weather data provided by Open-Meteo, OpenWeatherMap, and National Weather Services
            </p>
            <p className="text-xs text-blue-200 mt-1">
              CloudVibes is committed to providing accurate weather information for your daily planning needs
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}