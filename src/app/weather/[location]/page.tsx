import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: { location: string };
};

// Popular locations for demonstration
const popularLocations = [
  'new-york', 'los-angeles', 'chicago', 'houston', 'phoenix', 'philadelphia',
  'san-antonio', 'san-diego', 'dallas', 'san-jose', 'austin', 'jacksonville',
  'london', 'paris', 'tokyo', 'sydney', 'toronto', 'vancouver', 'berlin',
  'madrid', 'rome', 'amsterdam', 'stockholm', 'oslo', 'copenhagen'
];

const locationData: { [key: string]: { name: string; region: string; country: string; coordinates: { lat: number; lng: number }; timezone: string; } } = {
  'new-york': { name: 'New York', region: 'New York', country: 'United States', coordinates: { lat: 40.7128, lng: -74.0060 }, timezone: 'America/New_York' },
  'los-angeles': { name: 'Los Angeles', region: 'California', country: 'United States', coordinates: { lat: 34.0522, lng: -118.2437 }, timezone: 'America/Los_Angeles' },
  'chicago': { name: 'Chicago', region: 'Illinois', country: 'United States', coordinates: { lat: 41.8781, lng: -87.6298 }, timezone: 'America/Chicago' },
  'houston': { name: 'Houston', region: 'Texas', country: 'United States', coordinates: { lat: 29.7604, lng: -95.3698 }, timezone: 'America/Chicago' },
  'london': { name: 'London', region: 'England', country: 'United Kingdom', coordinates: { lat: 51.5074, lng: -0.1278 }, timezone: 'Europe/London' },
  'paris': { name: 'Paris', region: 'Île-de-France', country: 'France', coordinates: { lat: 48.8566, lng: 2.3522 }, timezone: 'Europe/Paris' },
  'tokyo': { name: 'Tokyo', region: 'Tokyo', country: 'Japan', coordinates: { lat: 35.6762, lng: 139.6503 }, timezone: 'Asia/Tokyo' },
  'sydney': { name: 'Sydney', region: 'New South Wales', country: 'Australia', coordinates: { lat: -33.8688, lng: 151.2093 }, timezone: 'Australia/Sydney' },
  'toronto': { name: 'Toronto', region: 'Ontario', country: 'Canada', coordinates: { lat: 43.6532, lng: -79.3832 }, timezone: 'America/Toronto' },
  'berlin': { name: 'Berlin', region: 'Berlin', country: 'Germany', coordinates: { lat: 52.5200, lng: 13.4050 }, timezone: 'Europe/Berlin' },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = locationData[params.location];
  
  if (!location) {
    return {
      title: 'Location Not Found - CloudVibes Weather',
      description: 'Weather location not found. Search for weather in your city.',
    };
  }

  return {
    title: `${location.name} Weather Forecast - Current Conditions & 7-Day Outlook | CloudVibes`,
    description: `Get accurate weather forecasts for ${location.name}, ${location.region}. Current conditions, hourly and 7-day weather outlook, temperature, precipitation, and more.`,
    keywords: `${location.name} weather, ${location.name} forecast, ${location.name} temperature, ${location.region} weather, weather ${location.country}`,
    openGraph: {
      title: `${location.name} Weather Forecast - CloudVibes`,
      description: `Current weather conditions and forecasts for ${location.name}, ${location.region}.`,
      url: `https://cloudvibes.org/weather/${params.location}`,
    },
  };
}

export default function LocationWeatherPage({ params }: Props) {
  const location = locationData[params.location];

  if (!location) {
    notFound();
  }

  // Mock weather data - in a real app, this would come from an API
  const currentWeather = {
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    windDirection: 'SW',
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    feelsLike: 25,
    lastUpdated: new Date().toLocaleTimeString(),
  };

  const weeklyForecast = [
    { day: 'Today', high: 25, low: 18, condition: 'Partly Cloudy', precipitation: 20, icon: '⛅' },
    { day: 'Tomorrow', high: 27, low: 19, condition: 'Sunny', precipitation: 5, icon: '☀️' },
    { day: 'Wednesday', high: 24, low: 16, condition: 'Cloudy', precipitation: 40, icon: '☁️' },
    { day: 'Thursday', high: 21, low: 14, condition: 'Light Rain', precipitation: 70, icon: '🌦️' },
    { day: 'Friday', high: 23, low: 15, condition: 'Partly Cloudy', precipitation: 25, icon: '⛅' },
    { day: 'Saturday', high: 26, low: 17, condition: 'Sunny', precipitation: 10, icon: '☀️' },
    { day: 'Sunday', high: 28, low: 20, condition: 'Sunny', precipitation: 5, icon: '☀️' },
  ];

  const hourlyForecast = [
    { time: '12 PM', temp: 22, condition: '⛅', precipitation: 20 },
    { time: '1 PM', temp: 23, condition: '⛅', precipitation: 15 },
    { time: '2 PM', temp: 24, condition: '☀️', precipitation: 10 },
    { time: '3 PM', temp: 25, condition: '☀️', precipitation: 5 },
    { time: '4 PM', temp: 24, condition: '⛅', precipitation: 10 },
    { time: '5 PM', temp: 23, condition: '⛅', precipitation: 15 },
    { time: '6 PM', temp: 22, condition: '☁️', precipitation: 25 },
    { time: '7 PM', temp: 21, condition: '☁️', precipitation: 30 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-white/70 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/weather" className="hover:text-white">Weather</Link>
          <span>/</span>
          <span className="text-white">{location.name}</span>
        </nav>

        {/* Location Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{location.name} Weather</h1>
              <p className="text-xl text-slate-600">{location.region}, {location.country}</p>
              <p className="text-sm text-slate-500 mt-1">
                Last updated: {currentWeather.lastUpdated} ({location.timezone})
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm mt-4 md:mt-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Live Data</span>
            </div>
          </div>

          {/* Current Weather */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-5xl font-bold text-slate-900 mb-2">{currentWeather.temperature}°C</div>
                    <div className="text-xl text-slate-700">{currentWeather.condition}</div>
                    <div className="text-sm text-slate-600">Feels like {currentWeather.feelsLike}°C</div>
                  </div>
                  <div className="text-6xl">⛅</div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl mb-1">💧</div>
                    <div className="text-sm text-slate-600">Humidity</div>
                    <div className="font-semibold text-slate-800">{currentWeather.humidity}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">💨</div>
                    <div className="text-sm text-slate-600">Wind</div>
                    <div className="font-semibold text-slate-800">{currentWeather.windSpeed} km/h {currentWeather.windDirection}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🌡️</div>
                    <div className="text-sm text-slate-600">Pressure</div>
                    <div className="font-semibold text-slate-800">{currentWeather.pressure} hPa</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">👁️</div>
                    <div className="text-sm text-slate-600">Visibility</div>
                    <div className="font-semibold text-slate-800">{currentWeather.visibility} km</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-800 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    📱 Set Weather Alerts
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    📊 View Weather Maps
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    📈 Historical Data
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    🔄 Compare Cities
                  </button>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <h3 className="font-semibold text-slate-800 mb-2">☀️ UV Index</h3>
                <div className="text-2xl font-bold text-orange-600 mb-1">{currentWeather.uvIndex}</div>
                <div className="text-sm text-orange-700">High - Use sun protection</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Hourly Forecast</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="flex-shrink-0 bg-white rounded-xl border border-slate-200 p-4 min-w-[120px] text-center">
                <div className="text-sm font-medium text-slate-600 mb-2">{hour.time}</div>
                <div className="text-2xl mb-2">{hour.condition}</div>
                <div className="text-lg font-semibold text-slate-800 mb-1">{hour.temp}°</div>
                <div className="text-xs text-blue-600">{hour.precipitation}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">7-Day Forecast</h2>
          <div className="space-y-4">
            {weeklyForecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="text-2xl">{day.icon}</div>
                  <div>
                    <div className="font-semibold text-slate-800">{day.day}</div>
                    <div className="text-sm text-slate-600">{day.condition}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-sm text-blue-600">{day.precipitation}%</div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-800">{day.high}°</div>
                    <div className="text-sm text-slate-500">{day.low}°</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Insights */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Weather Insights</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-xl">🌡️</div>
                <div>
                  <div className="font-semibold text-slate-800">Temperature Trend</div>
                  <div className="text-sm text-slate-600">Temperatures will rise by 3-5°C over the next few days with mostly sunny conditions.</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-xl">💧</div>
                <div>
                  <div className="font-semibold text-slate-800">Precipitation Outlook</div>
                  <div className="text-sm text-slate-600">Light rain expected Thursday, but generally dry conditions this week.</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-xl">💨</div>
                <div>
                  <div className="font-semibold text-slate-800">Wind Conditions</div>
                  <div className="text-sm text-slate-600">Moderate southwest winds will continue, providing comfortable conditions.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Local Weather Tips</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="font-semibold text-slate-800 mb-2">👕 What to Wear</div>
                <div className="text-sm text-slate-600">Light layers recommended. You may want a light jacket for evening hours.</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="font-semibold text-slate-800 mb-2">🚗 Driving Conditions</div>
                <div className="text-sm text-slate-600">Good visibility and dry roads. Thursday may have wet conditions.</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="font-semibold text-slate-800 mb-2">🌱 Garden & Plants</div>
                <div className="text-sm text-slate-600">Good conditions for outdoor activities. Natural rainfall expected Thursday.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Locations */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Weather in Nearby Cities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularLocations.slice(0, 8).filter(loc => loc !== params.location).slice(0, 4).map((loc) => {
              const nearbyLocation = locationData[loc];
              if (!nearbyLocation) return null;
              
              return (
                <Link
                  key={loc}
                  href={`/weather/${loc}`}
                  className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="font-semibold text-slate-800 mb-1">{nearbyLocation.name}</div>
                  <div className="text-sm text-slate-600 mb-3">{nearbyLocation.region}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-slate-800">
                      {Math.floor(Math.random() * 15) + 15}°C
                    </div>
                    <div className="text-xl">
                      {['☀️', '⛅', '☁️', '🌦️'][Math.floor(Math.random() * 4)]}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/weather"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Explore More Cities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}