import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Weather Forecasts by Location - Find Weather Anywhere | CloudVibes',
  description: 'Get accurate weather forecasts for cities worldwide. Search weather conditions, 7-day forecasts, and current conditions for any location.',
  keywords: 'weather by location, city weather, global weather forecasts, weather search, local weather conditions',
};

export default function WeatherLocationsPage() {
  const regions = [
    {
      name: 'North America',
      locations: [
        { name: 'New York', slug: 'new-york', country: 'USA', temp: 18, condition: '⛅' },
        { name: 'Los Angeles', slug: 'los-angeles', country: 'USA', temp: 24, condition: '☀️' },
        { name: 'Chicago', slug: 'chicago', country: 'USA', temp: 15, condition: '☁️' },
        { name: 'Houston', slug: 'houston', country: 'USA', temp: 28, condition: '☀️' },
        { name: 'Toronto', slug: 'toronto', country: 'Canada', temp: 12, condition: '🌦️' },
        { name: 'Vancouver', slug: 'vancouver', country: 'Canada', temp: 16, condition: '☁️' },
      ]
    },
    {
      name: 'Europe',
      locations: [
        { name: 'London', slug: 'london', country: 'UK', temp: 14, condition: '☁️' },
        { name: 'Paris', slug: 'paris', country: 'France', temp: 19, condition: '⛅' },
        { name: 'Berlin', slug: 'berlin', country: 'Germany', temp: 17, condition: '🌦️' },
        { name: 'Madrid', slug: 'madrid', country: 'Spain', temp: 25, condition: '☀️' },
        { name: 'Rome', slug: 'rome', country: 'Italy', temp: 23, condition: '☀️' },
        { name: 'Amsterdam', slug: 'amsterdam', country: 'Netherlands', temp: 16, condition: '☁️' },
      ]
    },
    {
      name: 'Asia Pacific',
      locations: [
        { name: 'Tokyo', slug: 'tokyo', country: 'Japan', temp: 21, condition: '⛅' },
        { name: 'Sydney', slug: 'sydney', country: 'Australia', temp: 22, condition: '☀️' },
        { name: 'Singapore', slug: 'singapore', country: 'Singapore', temp: 30, condition: '🌦️' },
        { name: 'Bangkok', slug: 'bangkok', country: 'Thailand', temp: 32, condition: '☀️' },
        { name: 'Seoul', slug: 'seoul', country: 'South Korea', temp: 18, condition: '☁️' },
        { name: 'Mumbai', slug: 'mumbai', country: 'India', temp: 29, condition: '⛅' },
      ]
    }
  ];

  const popularSearches = [
    'weather tomorrow', 'weekend forecast', 'rain today', 'temperature now',
    'weather alerts', 'humidity levels', '10 day forecast', 'sunrise sunset'
  ];

  const weatherFeatures = [
    {
      icon: '🌡️',
      title: 'Current Conditions',
      description: 'Real-time temperature, humidity, wind speed, and atmospheric pressure'
    },
    {
      icon: '📅',
      title: '7-Day Forecasts',
      description: 'Detailed week-ahead forecasts with daily highs, lows, and precipitation'
    },
    {
      icon: '⏰',
      title: 'Hourly Updates',
      description: 'Hour-by-hour weather changes for precise planning'
    },
    {
      icon: '🚨',
      title: 'Weather Alerts',
      description: 'Severe weather warnings and advisory notifications'
    },
    {
      icon: '🗺️',
      title: 'Weather Maps',
      description: 'Interactive radar, satellite, and precipitation maps'
    },
    {
      icon: '📊',
      title: 'Historical Data',
      description: 'Past weather patterns and climate information'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Weather Forecasts by Location</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get accurate weather information for cities around the world. Current conditions, forecasts, and weather insights.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a city or location..."
                className="w-full px-6 py-4 pl-12 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
            
            {/* Popular Searches */}
            <div className="mt-4">
              <p className="text-sm text-slate-600 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Weather Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Comprehensive Weather Information</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weatherFeatures.map((feature, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Regional Weather */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-8 text-center">Weather by Region</h2>
            <div className="space-y-12">
              {regions.map((region, regionIndex) => (
                <div key={regionIndex}>
                  <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    {region.name}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {region.locations.map((location, locationIndex) => (
                      <Link
                        key={locationIndex}
                        href={`/weather/${location.slug}`}
                        className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all group"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {location.name}
                            </h4>
                            <p className="text-sm text-slate-500">{location.country}</p>
                          </div>
                          <div className="text-3xl">{location.condition}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-slate-800">{location.temp}°C</div>
                          <div className="text-blue-600 group-hover:text-blue-700 text-sm font-medium">
                            View Forecast →
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Location Request Form */}
          <section className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Can't Find Your Location?</h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                We're constantly expanding our weather coverage. Let us know which locations you'd like to see added.
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="text"
                  placeholder="Enter city or location name"
                  className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
                  Request Location
                </button>
              </div>
              <p className="text-sm text-slate-500 mt-3">
                We'll notify you when weather data becomes available for your requested location.
              </p>
            </div>
          </section>

          {/* Weather Tips */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-slate-800 mb-8 text-center">Weather Planning Tips</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">📅 Planning Your Week</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Check 7-day forecasts for upcoming events and activities
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Monitor precipitation probability for outdoor plans
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Pay attention to temperature trends and dress accordingly
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Set weather alerts for severe weather warnings
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">🌍 Travel Weather</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Compare weather between departure and destination cities
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Check seasonal weather patterns for your travel dates
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Monitor time zone differences and local weather conditions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Review weather advisories for your travel route
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">Stay Weather Prepared</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get personalized weather updates and alerts for your favorite locations. Never be caught off guard by changing weather conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/guides/beginners-guide"
                className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Learn About Weather
              </Link>
              <Link
                href="/help"
                className="bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Get Help & Support
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}