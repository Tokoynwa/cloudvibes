'use client';

import { motion } from 'framer-motion';
import { WeatherIcon } from '@/components/ui/weather-icon';
import { useWeatherStore } from '@/lib/store/weather-store';
import { formatTemperature } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { Droplets, Wind, Sun, Moon, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

export function Forecast() {
  const { currentWeather, units } = useWeatherStore();

  if (!currentWeather?.forecast) {
    return null;
  }

  const forecast = currentWeather.forecast.slice(0, 7); // Show 7 days

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="relative overflow-hidden bg-gradient-to-br from-white/80 via-white/40 to-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
      
      <div className="relative z-10 p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-3 mb-6 text-center sm:text-left"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">7-Day Forecast</h3>
        </motion.div>
      
        {/* Desktop/Tablet Layout */}
        <div className="hidden sm:block">
          <div className="space-y-3">
            {forecast.map((day, index) => {
              const isToday = index === 0;
              return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                className={`group relative overflow-hidden ${
                  isToday 
                    ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border-2 border-blue-400/30' 
                    : 'bg-gradient-to-r from-white/60 via-white/40 to-white/20 border border-white/30'
                } backdrop-blur-sm rounded-2xl p-4 hover:shadow-xl transition-all duration-300`}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-6 flex-1">
                  {/* Day Label */}
                  <div className={`w-20 text-center ${
                    isToday 
                      ? 'text-blue-600 font-bold text-lg' 
                      : 'text-slate-600 font-semibold'
                  }`}>
                    {index === 0 ? 'Today' : format(parseISO(day.date), 'EEE')}
                    {isToday && (
                      <div className="text-xs text-blue-500 font-medium mt-1">
                        {format(parseISO(day.date), 'MMM d')}
                      </div>
                    )}
                  </div>
                  
                  {/* Weather Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                    <WeatherIcon 
                      condition={day.condition}
                      icon={day.icon}
                      size="lg"
                    />
                  </motion.div>
                  
                  {/* Weather Details */}
                  <div className="flex-1">
                    <div className="text-base font-semibold text-slate-800 capitalize mb-2">
                      {day.description}
                    </div>
                    <div className="flex items-center space-x-6">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm rounded-lg px-3 py-1"
                      >
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-700">{day.precipitation.probability}%</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 bg-green-500/10 backdrop-blur-sm rounded-lg px-3 py-1"
                      >
                        <Wind className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-700">{Math.round(day.windSpeed)} km/h</span>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Temperature Range */}
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="text-center"
                    >
                      <div className="flex items-center space-x-1 text-slate-500 mb-1">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-sm font-medium">Low</span>
                      </div>
                      <div className="text-lg font-bold text-slate-600">
                        {formatTemperature(day.temperature.min, units.temperature)}
                      </div>
                    </motion.div>
                    
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
                    
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="text-center"
                    >
                      <div className="flex items-center space-x-1 text-slate-500 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">High</span>
                      </div>
                      <div className="text-xl font-bold text-slate-800">
                        {formatTemperature(day.temperature.max, units.temperature)}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              </motion.div>
            );})}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-1 gap-3">
            {forecast.map((day, index) => {
              const isToday = index === 0;
              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className={`${
                    isToday 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-400/40' 
                      : 'bg-white/70 border border-white/40'
                  } backdrop-blur-sm rounded-2xl p-4 shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`font-bold text-lg ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>
                        {index === 0 ? 'Today' : format(parseISO(day.date), 'EEE')}
                      </div>
                      <WeatherIcon 
                        condition={day.condition}
                        icon={day.icon}
                        size="md"
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-800">
                        {formatTemperature(day.temperature.max, units.temperature)}
                      </div>
                      <div className="text-sm text-slate-600">
                        L: {formatTemperature(day.temperature.min, units.temperature)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-slate-700 capitalize text-sm font-medium mb-2">
                    {day.description}
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Droplets className="w-3 h-3" />
                      <span>{day.precipitation.probability}%</span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <Wind className="w-3 h-3" />
                      <span>{Math.round(day.windSpeed)} km/h</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      
        {/* Enhanced Hourly Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 pt-8 border-t border-white/20"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">Today&apos;s Hourly Forecast</h4>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {Array.from({ length: 12 }, (_, i) => {
              const hour = new Date();
              hour.setHours(hour.getHours() + i);
              const isNight = hour.getHours() >= 18 || hour.getHours() <= 6;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.1, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="flex-shrink-0 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-sm border border-white/30 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[100px]"
                >
                  <div className="text-center">
                    <div className="text-sm font-semibold text-slate-600 mb-3">
                      {format(hour, 'HH:mm')}
                    </div>
                    
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-20" />
                      <div className="relative w-12 h-12 mx-auto bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                        {isNight ? (
                          <Moon className="w-6 h-6 text-slate-600" />
                        ) : (
                          <Sun className="w-6 h-6 text-yellow-500" />
                        )}
                      </div>
                    </div>
                    
                    <div className="text-lg font-bold text-slate-800 mb-2">
                      {Math.round(20 + Math.random() * 10)}°C
                    </div>
                    
                    <div className="flex items-center justify-center space-x-1 text-blue-600">
                      <Droplets className="w-3 h-3" />
                      <span className="text-xs font-medium">{Math.round(Math.random() * 100)}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Add scrollbar hide utility
const scrollbarStyles = `
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = scrollbarStyles;
  document.head.appendChild(styleElement);
}