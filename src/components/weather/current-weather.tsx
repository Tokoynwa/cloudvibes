'use client';

import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Gauge, 
  Eye, 
  Sun,
  RefreshCw,
  MapPin,
  Calendar,
  Cloud,
  Compass,
  Activity
} from 'lucide-react';
import { WeatherIcon } from '@/components/ui/weather-icon';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useWeatherStore } from '@/lib/store/weather-store';
import { formatTemperature, formatWindSpeed, formatPressure, getWindDirection, getUVIndexLevel } from '@/lib/utils';
import { format } from 'date-fns';

interface CurrentWeatherProps {
  onRefresh?: () => void;
}

export function CurrentWeather({ onRefresh }: CurrentWeatherProps) {
  const { currentWeather, currentLocation, units, isLoading, error, lastUpdated } = useWeatherStore();

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-8 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 animate-pulse" />
        <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <LoadingSpinner size="lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-30 animate-pulse" />
          </div>
          <span className="text-slate-700 font-medium text-lg">Loading weather data...</span>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50 backdrop-blur-xl border border-red-200/20 rounded-3xl p-4 sm:p-8 text-center shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 via-orange-400/10 to-yellow-400/10" />
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <p className="text-red-700 font-semibold text-lg mb-2">Unable to load weather data</p>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          {onRefresh && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRefresh}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Try Again
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  if (!currentWeather || !currentLocation) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-4 sm:p-8 text-center shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-400/10 via-blue-400/10 to-purple-400/10" />
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-400 to-blue-400 rounded-full flex items-center justify-center">
            <Cloud className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-700 font-semibold text-lg mb-2">No weather data available</p>
          <p className="text-gray-500">Please select a location to view weather</p>
        </div>
      </motion.div>
    );
  }

  const uvLevel = getUVIndexLevel(currentWeather.current.uvIndex);

  const getWeatherGradient = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return 'from-yellow-400 via-orange-400 to-red-400';
    }
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'from-slate-400 via-slate-500 to-slate-600';
    }
    if (conditionLower.includes('snow')) {
      return 'from-blue-100 via-blue-200 to-blue-300';
    }
    if (conditionLower.includes('cloud')) {
      return 'from-slate-300 via-slate-400 to-slate-500';
    }
    if (conditionLower.includes('thunder')) {
      return 'from-purple-500 via-indigo-600 to-gray-700';
    }
    return 'from-blue-400 via-blue-500 to-blue-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden bg-gradient-to-br from-white/80 via-white/40 to-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
      
      {/* Header */}
      <div className={`relative z-10 bg-gradient-to-r ${getWeatherGradient(currentWeather.current.condition)} text-white p-4 sm:p-8`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight">{currentLocation.name}</h2>
                {currentLocation.region && (
                  <p className="text-white/80 text-xs sm:text-sm font-medium">{currentLocation.region}, {currentLocation.country}</p>
                )}
              </div>
            </motion.div>
            {onRefresh && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={onRefresh}
                className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-200"
                disabled={isLoading}
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </motion.button>
            )}
          </div>
          
          {lastUpdated && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-2 mt-3 sm:mt-4 text-white/70 text-xs sm:text-sm bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 w-fit"
            >
              <Calendar className="w-4 h-4" />
              <span>Updated {format(new Date(lastUpdated), 'MMM d, h:mm a')}</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Weather Info */}
      <div className="relative z-10 p-4 sm:p-8">
        {/* Hero Weather Display */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Main Temperature */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="relative mb-6"
          >
            <div className="text-8xl sm:text-9xl font-black bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent leading-none mb-2">
              {formatTemperature(currentWeather.current.temperature, units.temperature)}
            </div>
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-40 animate-pulse" />
                <WeatherIcon 
                  condition={currentWeather.current.condition} 
                  icon={currentWeather.current.icon}
                  size="xl"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Weather Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <div className="text-slate-800 capitalize text-2xl sm:text-3xl font-bold mb-2">
              {currentWeather.current.description}
            </div>
            <div className="text-slate-600 text-lg sm:text-xl font-medium">
              Feels like {formatTemperature(currentWeather.current.feelsLike, units.temperature)}
            </div>
          </motion.div>

          {/* Key Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center items-center space-x-6 sm:space-x-8 mb-6"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                {currentWeather.current.humidity}%
              </div>
              <div className="text-slate-600 text-sm font-medium">Humidity</div>
            </div>
            <div className="w-px h-12 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">
                {formatWindSpeed(currentWeather.current.windSpeed, units.wind)}
              </div>
              <div className="text-slate-600 text-sm font-medium">Wind</div>
            </div>
            <div className="w-px h-12 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                {currentWeather.current.uvIndex}
              </div>
              <div className="text-slate-600 text-sm font-medium">UV Index</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Weather Details Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
        >
          <WeatherDetail
            icon={<Droplets className="w-6 h-6 text-blue-500" />}
            label="Humidity"
            value={`${currentWeather.current.humidity}%`}
            gradient="from-blue-500 to-cyan-500"
            delay={0.9}
          />
          
          <WeatherDetail
            icon={<Wind className="w-6 h-6 text-green-500" />}
            label="Wind"
            value={`${formatWindSpeed(currentWeather.current.windSpeed, units.wind)}`}
            subtitle={getWindDirection(currentWeather.current.windDirection)}
            gradient="from-green-500 to-emerald-500"
            delay={1.0}
          />
          
          <WeatherDetail
            icon={<Gauge className="w-6 h-6 text-purple-500" />}
            label="Pressure"
            value={formatPressure(currentWeather.current.pressure, units.pressure)}
            gradient="from-purple-500 to-indigo-500"
            delay={1.1}
          />
          
          <WeatherDetail
            icon={<Eye className="w-6 h-6 text-slate-500" />}
            label="Visibility"
            value={`${currentWeather.current.visibility} km`}
            gradient="from-slate-500 to-gray-500"
            delay={1.2}
          />
          
          {currentWeather.current.uvIndex > 0 && (
            <WeatherDetail
              icon={<Sun className="w-6 h-6 text-orange-500" />}
              label="UV Index"
              value={`${currentWeather.current.uvIndex}`}
              subtitle={uvLevel.level}
              gradient="from-orange-500 to-red-500"
              delay={1.3}
            />
          )}
          
          {currentWeather.current.windGust && (
            <WeatherDetail
              icon={<Activity className="w-6 h-6 text-red-500" />}
              label="Wind Gust"
              value={formatWindSpeed(currentWeather.current.windGust, units.wind)}
              gradient="from-red-500 to-pink-500"
              delay={1.4}
            />
          )}
          
          <WeatherDetail
            icon={<Cloud className="w-6 h-6 text-indigo-500" />}
            label="Cloud Cover"
            value={`${currentWeather.current.cloudCover}%`}
            gradient="from-indigo-500 to-blue-500"
            delay={1.5}
          />
          
          <WeatherDetail
            icon={<Compass className="w-6 h-6 text-teal-500" />}
            label="Wind Direction"
            value={`${currentWeather.current.windDirection}°`}
            subtitle={getWindDirection(currentWeather.current.windDirection)}
            gradient="from-teal-500 to-cyan-500"
            delay={1.6}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  gradient: string;
  delay: number;
}

function WeatherDetail({ icon, label, value, subtitle, gradient, delay }: WeatherDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group relative overflow-hidden bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/30 rounded-2xl p-3 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Icon with animated background */}
      <div className="relative mb-2 sm:mb-3">
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
        <div className={`relative w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
          <div className="text-white scale-75 sm:scale-100">
            {icon}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div>
        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
          {label}
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-800 mb-1">
          {value}
        </div>
        {subtitle && (
          <div className="text-xs sm:text-sm text-slate-600 font-medium">
            {subtitle}
          </div>
        )}
      </div>
      
      {/* Animated border */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`} style={{ padding: '1px' }}>
        <div className="w-full h-full bg-white/80 rounded-2xl" />
      </div>
    </motion.div>
  );
}