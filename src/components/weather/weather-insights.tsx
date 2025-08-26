'use client';

import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Umbrella, 
  Sun, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useWeatherStore } from '@/lib/store/weather-store';

export function WeatherInsights() {
  const { currentWeather } = useWeatherStore();

  if (!currentWeather) return null;

  const current = currentWeather.current;
  const forecast = currentWeather.forecast;

  // Generate intelligent insights based on weather data
  const generateInsights = () => {
    const insights = [];

    // Temperature insights
    if (current.temperature > 25) {
      insights.push({
        icon: <Sun className="w-5 h-5 text-orange-500" />,
        title: "Hot Weather Alert",
        description: "Stay hydrated and seek shade during peak hours (11 AM - 4 PM)",
        type: "warning",
        action: "Drink water regularly"
      });
    } else if (current.temperature < 5) {
      insights.push({
        icon: <Thermometer className="w-5 h-5 text-blue-500" />,
        title: "Cold Weather Advisory",
        description: "Dress warmly and protect exposed skin from frostbite",
        type: "info",
        action: "Layer up and wear gloves"
      });
    }

    // Precipitation insights
    if (forecast[0]?.precipitation.probability > 70) {
      insights.push({
        icon: <Umbrella className="w-5 h-5 text-blue-500" />,
        title: "Rain Expected",
        description: `${forecast[0].precipitation.probability}% chance of rain today`,
        type: "warning",
        action: "Bring an umbrella"
      });
    }

    // Wind insights
    if (current.windSpeed > 30) {
      insights.push({
        icon: <Wind className="w-5 h-5 text-gray-500" />,
        title: "Windy Conditions",
        description: "Strong winds may affect outdoor activities and driving",
        type: "warning",
        action: "Secure loose objects"
      });
    }

    // UV insights
    if (current.uvIndex > 6) {
      insights.push({
        icon: <Sun className="w-5 h-5 text-red-500" />,
        title: "High UV Index",
        description: "UV radiation is high. Use sunscreen and protective clothing",
        type: "danger",
        action: "Apply SPF 30+ sunscreen"
      });
    }

    // Humidity insights
    if (current.humidity > 80) {
      insights.push({
        icon: <Droplets className="w-5 h-5 text-blue-500" />,
        title: "High Humidity",
        description: "It may feel warmer than the actual temperature",
        type: "info",
        action: "Stay cool and dry"
      });
    }

    // Visibility insights
    if (current.visibility < 5) {
      insights.push({
        icon: <Eye className="w-5 h-5 text-yellow-500" />,
        title: "Poor Visibility",
        description: "Fog or haze may affect driving conditions",
        type: "warning",
        action: "Drive carefully with lights on"
      });
    }

    // Air quality insights (simulated)
    const aqi = Math.floor(Math.random() * 150) + 50;
    if (aqi > 100) {
      insights.push({
        icon: <Activity className="w-5 h-5 text-red-500" />,
        title: "Poor Air Quality",
        description: `AQI: ${aqi}. Consider limiting outdoor activities`,
        type: "warning",
        action: "Stay indoors if sensitive"
      });
    }

    // Weekly trend insights
    if (forecast.length > 3) {
      const tempTrend = forecast.slice(1, 4).map(day => day.temperature.max);
      const avgTemp = tempTrend.reduce((a, b) => a + b, 0) / tempTrend.length;
      
      if (avgTemp > current.temperature + 5) {
        insights.push({
          icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
          title: "Temperature Rising",
          description: "Expect warmer weather in the coming days",
          type: "info",
          action: "Plan for lighter clothing"
        });
      } else if (avgTemp < current.temperature - 5) {
        insights.push({
          icon: <TrendingDown className="w-5 h-5 text-blue-500" />,
          title: "Temperature Dropping",
          description: "Cooler weather ahead, plan accordingly",
          type: "info",
          action: "Prepare warmer clothing"
        });
      }
    }

    // Outdoor activity recommendations
    const isGoodWeather = current.temperature > 15 && current.temperature < 28 && 
                         forecast[0]?.precipitation.probability < 30 && 
                         current.windSpeed < 20;
    
    if (isGoodWeather) {
      insights.push({
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        title: "Perfect Outdoor Weather",
        description: "Great conditions for outdoor activities and exercise",
        type: "success",
        action: "Enjoy the outdoors!"
      });
    }

    return insights.slice(0, 6); // Limit to 6 insights
  };

  const insights = generateInsights();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'from-yellow-500/20 to-orange-500/20 border-yellow-200';
      case 'danger': return 'from-red-500/20 to-pink-500/20 border-red-200';
      case 'info': return 'from-blue-500/20 to-cyan-500/20 border-blue-200';
      case 'success': return 'from-green-500/20 to-emerald-500/20 border-green-200';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-200';
    }
  };

  if (insights.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="relative overflow-hidden bg-gradient-to-br from-white/80 via-white/40 to-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300"
    >
      {/* Header */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
      
      <div className="relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-center space-x-3 mb-6"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Weather Insights</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                transition: { duration: 0.2 }
              }}
              className={`group relative overflow-hidden bg-gradient-to-br ${getTypeColor(insight.type)} backdrop-blur-sm border rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {/* Icon */}
              <div className="flex items-start space-x-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
                  {insight.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 text-sm mb-1 group-hover:text-blue-700 transition-colors">
                    {insight.title}
                  </h4>
                </div>
              </div>

              {/* Content */}
              <div className="mb-3">
                <p className="text-sm text-slate-600 leading-relaxed mb-2">
                  {insight.description}
                </p>
                <div className="inline-flex items-center space-x-2 text-xs bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="font-medium text-slate-700">💡 {insight.action}</span>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Additional Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-white/30"
        >
          <h4 className="font-bold text-slate-800 text-lg mb-3 flex items-center space-x-2">
            <span>🎯</span>
            <span>Smart Weather Tips</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 text-sm text-slate-700">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>Check weather before planning outdoor activities</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-700">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Layer clothing for temperature changes</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-700">
              <div className="w-2 h-2 bg-orange-400 rounded-full" />
              <span>Stay hydrated in hot weather</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-700">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>Monitor air quality for outdoor exercise</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}