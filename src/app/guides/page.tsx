import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Weather Guides & Tips - CloudVibes Weather Learning Center',
  description: 'Comprehensive weather guides, tips, and educational articles. Learn about meteorology, weather patterns, forecasting, and how to read weather data.',
  keywords: 'weather guides, meteorology tips, weather patterns, weather education, forecasting guide, weather safety',
};

export default function GuidesPage() {
  const guides = [
    {
      id: 'understanding-weather-maps',
      title: 'Understanding Weather Maps',
      description: 'Learn how to read and interpret weather maps, radar imagery, and satellite data for better weather understanding.',
      category: 'Basics',
      readTime: '8 min read',
      difficulty: 'Beginner',
    },
    {
      id: 'reading-forecasts',
      title: 'How to Read Weather Forecasts',
      description: 'Master the art of interpreting weather forecasts, understanding probability, and making informed decisions.',
      category: 'Basics',
      readTime: '6 min read',
      difficulty: 'Beginner',
    },
    {
      id: 'severe-weather-safety',
      title: 'Severe Weather Safety Guide',
      description: 'Essential safety tips and preparation strategies for thunderstorms, tornadoes, hurricanes, and other severe weather.',
      category: 'Safety',
      readTime: '12 min read',
      difficulty: 'Intermediate',
    },
    {
      id: 'seasonal-weather-patterns',
      title: 'Seasonal Weather Patterns',
      description: 'Understand how seasons affect weather patterns and what to expect throughout the year in different regions.',
      category: 'Patterns',
      readTime: '10 min read',
      difficulty: 'Intermediate',
    },
    {
      id: 'weather-instruments',
      title: 'Weather Instruments & Measurements',
      description: 'Explore the tools meteorologists use to measure weather conditions and how these instruments work.',
      category: 'Science',
      readTime: '15 min read',
      difficulty: 'Advanced',
    },
    {
      id: 'climate-vs-weather',
      title: 'Climate vs Weather: Key Differences',
      description: 'Learn the crucial distinctions between climate and weather, and why this understanding matters.',
      category: 'Science',
      readTime: '7 min read',
      difficulty: 'Beginner',
    },
  ];

  const categories = ['All', 'Basics', 'Safety', 'Patterns', 'Science'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Weather Guides & Learning Center</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Expand your weather knowledge with our comprehensive guides, tips, and educational resources
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Guide */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-12">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                Featured Guide
              </span>
              <h2 className="text-3xl font-bold mb-4">Complete Beginner's Guide to Weather</h2>
              <p className="text-blue-100 text-lg mb-6">
                Start your weather learning journey with our comprehensive beginner's guide covering everything 
                from basic concepts to reading your first weather forecast.
              </p>
              <Link
                href="/guides/beginners-guide"
                className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Start Learning →
              </Link>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {guides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors overflow-hidden shadow-sm hover:shadow-md">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {guide.category}
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <span>{guide.readTime}</span>
                      <span>•</span>
                      <span>{guide.difficulty}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{guide.title}</h3>
                  <p className="text-slate-600 mb-4">{guide.description}</p>
                  <Link
                    href={`/guides/${guide.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read Guide
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Weather Tips Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-800 mb-6">Quick Weather Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">📱 Weather App Tips</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Check hourly forecasts for more accurate planning
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Pay attention to "feels like" temperature
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Enable weather alerts for severe conditions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Check multiple sources for important decisions
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">⚠️ Weather Safety</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></span>
                    Have an emergency weather plan
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></span>
                    Keep emergency supplies ready
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></span>
                    Know your local warning systems
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></span>
                    Stay informed during severe weather
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Weather Glossary Preview */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-800 mb-6">Weather Terms</h2>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
              <p className="text-slate-700 mb-6">
                Understanding weather terminology helps you better interpret forecasts and weather information.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Barometric Pressure</h4>
                  <p className="text-sm text-slate-600">Atmospheric pressure that affects weather patterns</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Dew Point</h4>
                  <p className="text-sm text-slate-600">Temperature at which air becomes saturated</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Wind Chill</h4>
                  <p className="text-sm text-slate-600">How cold air feels due to wind speed</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Heat Index</h4>
                  <p className="text-sm text-slate-600">How hot air feels with humidity factored in</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/guides/weather-glossary"
                  className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Complete Glossary
                </Link>
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="text-center bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">Stay Weather Wise</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get weekly weather tips, seasonal guides, and educational content delivered to your inbox
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500"
              />
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-3">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}