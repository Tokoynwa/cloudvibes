import type { Metadata } from 'next';
import Link from 'next/link';
import { SocialShare } from '@/components/social-share';

export const metadata: Metadata = {
  title: 'Weather News & Blog - Latest Weather Updates | CloudVibes',
  description: 'Stay updated with latest weather news, seasonal forecasts, climate updates, and meteorological insights. Expert weather analysis and trending weather stories.',
  keywords: 'weather news, weather blog, seasonal forecasts, climate updates, meteorology news, weather trends, weather analysis',
};

export default function BlogPage() {
  const featuredPost = {
    id: 'winter-2025-forecast',
    title: 'Winter 2025 Forecast: What to Expect This Season',
    excerpt: 'Our meteorological team analyzes weather patterns to bring you the most accurate winter forecast for 2025, including temperature trends, snowfall predictions, and regional variations.',
    date: '2025-01-15',
    author: 'CloudVibes Weather Team',
    category: 'Seasonal Forecast',
    readTime: '8 min read',
    image: '/blog/winter-2025-forecast.jpg',
    tags: ['winter', 'forecast', 'snow', 'seasonal', 'climate']
  };

  const blogPosts = [
    {
      id: 'extreme-weather-preparedness',
      title: 'Extreme Weather Preparedness: Essential Guide for 2025',
      excerpt: 'Learn how to prepare for severe weather events including hurricanes, tornadoes, floods, and heat waves. Complete safety checklist and emergency planning tips.',
      date: '2025-01-12',
      author: 'Sarah Johnson, Meteorologist',
      category: 'Safety',
      readTime: '12 min read',
      tags: ['safety', 'preparedness', 'severe weather', 'emergency']
    },
    {
      id: 'climate-change-local-weather',
      title: 'How Climate Change is Affecting Your Local Weather Patterns',
      excerpt: 'Discover how global climate change is impacting regional weather patterns and what it means for your daily weather experiences.',
      date: '2025-01-10',
      author: 'Dr. Michael Chen',
      category: 'Climate Science',
      readTime: '15 min read',
      tags: ['climate change', 'weather patterns', 'science', 'environment']
    },
    {
      id: 'weather-technology-2025',
      title: 'Revolutionary Weather Technology: AI and Forecasting in 2025',
      excerpt: 'Explore how artificial intelligence and machine learning are transforming weather prediction accuracy and the future of meteorological science.',
      date: '2025-01-08',
      author: 'Tech Team',
      category: 'Technology',
      readTime: '10 min read',
      tags: ['AI', 'technology', 'forecasting', 'innovation']
    },
    {
      id: 'spring-gardening-weather',
      title: 'Perfect Weather Timing for Spring Gardening Success',
      excerpt: 'Master the art of timing your spring gardening activities with weather patterns. When to plant, when to protect, and how weather affects your garden.',
      date: '2025-01-05',
      author: 'Garden Weather Expert',
      category: 'Lifestyle',
      readTime: '7 min read',
      tags: ['gardening', 'spring', 'planting', 'lifestyle']
    },
    {
      id: 'weather-photography-tips',
      title: '10 Pro Tips for Stunning Weather Photography',
      excerpt: 'Capture breathtaking weather phenomena with these professional photography tips. From storm chasing to rainbow shots, master weather photography.',
      date: '2025-01-03',
      author: 'Photography Team',
      category: 'Photography',
      readTime: '9 min read',
      tags: ['photography', 'weather photography', 'tips', 'storms']
    },
    {
      id: 'weather-apps-comparison',
      title: 'Best Weather Apps 2025: Complete Feature Comparison',
      excerpt: 'Compare the top weather applications and platforms. Features, accuracy, design, and which weather app is right for your needs.',
      date: '2025-01-01',
      author: 'App Review Team',
      category: 'Reviews',
      readTime: '11 min read',
      tags: ['apps', 'reviews', 'comparison', 'mobile']
    }
  ];

  const categories = [
    'All Posts', 'Seasonal Forecast', 'Safety', 'Climate Science', 'Technology', 
    'Lifestyle', 'Photography', 'Reviews', 'News'
  ];

  const trendingTags = [
    '#WeatherForecast', '#ClimateChange', '#SevereWeather', '#WeatherSafety',
    '#Meteorology', '#WeatherNews', '#SeasonalForecast', '#WeatherTech',
    '#WeatherPhotography', '#StormChasing', '#WeatherAlerts', '#ClimateScience'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Weather News & Blog</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stay informed with the latest weather insights, seasonal forecasts, and meteorological news from our expert team
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured Article
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                {featuredPost.category}
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
            <p className="text-blue-100 text-lg mb-6">{featuredPost.excerpt}</p>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-6 text-blue-200 text-sm mb-4 md:mb-0">
                <span>By {featuredPost.author}</span>
                <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Read Article
                </Link>
                <SocialShare
                  url={`https://cloudvibes.org/blog/${featuredPost.id}`}
                  title={featuredPost.title}
                  description={featuredPost.excerpt}
                  hashtags={featuredPost.tags}
                  className="hidden md:flex"
                />
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 relative">
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-slate-800 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 text-slate-600">
                    📰
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">By {post.author}</span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Read More →
                    </Link>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Trending Hashtags */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Trending Weather Topics</h2>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
              <div className="flex flex-wrap gap-3">
                {trendingTags.map((tag, index) => (
                  <button
                    key={index}
                    className="bg-white border border-slate-200 hover:border-blue-300 text-slate-700 px-4 py-2 rounded-full transition-colors hover:shadow-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <p className="text-slate-600 mt-4">
                Click on any hashtag to explore related weather content and join the conversation on social media
              </p>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-semibold mb-4">Stay Updated with Weather News</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get the latest weather insights, seasonal forecasts, and breaking weather news delivered directly to your inbox every week.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500"
              />
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-3">
              Join 25,000+ weather enthusiasts • Unsubscribe anytime • No spam guaranteed
            </p>
          </section>

          {/* Social Media Promotion */}
          <section className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Follow CloudVibes Weather</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="text-3xl mb-3">🐦</div>
                <h3 className="font-semibold text-slate-800 mb-2">Twitter @CloudVibes</h3>
                <p className="text-slate-600 text-sm mb-4">Real-time weather updates, alerts, and quick forecasts</p>
                <div className="text-xs text-slate-500">
                  Use hashtags: #CloudVibesWeather #WeatherAlert #ForecastUpdate
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="text-3xl mb-3">📘</div>
                <h3 className="font-semibold text-slate-800 mb-2">Facebook CloudVibes</h3>
                <p className="text-slate-600 text-sm mb-4">Detailed weather discussions and community insights</p>
                <div className="text-xs text-slate-500">
                  Share posts with: #WeatherNews #LocalWeather #WeatherTips
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="text-3xl mb-3">📹</div>
                <h3 className="font-semibold text-slate-800 mb-2">YouTube Channel</h3>
                <p className="text-slate-600 text-sm mb-4">Weather explainer videos and forecast analysis</p>
                <div className="text-xs text-slate-500">
                  Tag videos: #WeatherExplained #ForecastAnalysis #WeatherEducation
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}