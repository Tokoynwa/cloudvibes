import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Complete Beginner\'s Guide to Weather - CloudVibes Weather Education',
  description: 'Learn weather basics from scratch. Understanding weather patterns, forecasts, and meteorology fundamentals for beginners.',
  keywords: 'weather basics, meteorology for beginners, weather education, weather patterns, forecast reading',
};

export default function BeginnersGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-blue-600">Guides</Link>
            <span>/</span>
            <span>Beginner's Guide</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              Featured Guide
            </span>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Complete Beginner's Guide to Weather</h1>
            <div className="flex items-center space-x-4 text-slate-600 mb-6">
              <span>15 min read</span>
              <span>•</span>
              <span>Beginner Level</span>
              <span>•</span>
              <span>Updated January 2025</span>
            </div>
            <p className="text-xl text-slate-600">
              Everything you need to know to start understanding weather patterns, reading forecasts, 
              and making informed decisions about your daily activities.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <a href="#weather-basics" className="text-blue-600 hover:text-blue-700 hover:underline">
                1. Weather vs Climate
              </a>
              <a href="#weather-elements" className="text-blue-600 hover:text-blue-700 hover:underline">
                2. Key Weather Elements
              </a>
              <a href="#reading-forecasts" className="text-blue-600 hover:text-blue-700 hover:underline">
                3. Reading Weather Forecasts
              </a>
              <a href="#weather-maps" className="text-blue-600 hover:text-blue-700 hover:underline">
                4. Understanding Weather Maps
              </a>
              <a href="#weather-safety" className="text-blue-600 hover:text-blue-700 hover:underline">
                5. Weather Safety Basics
              </a>
              <a href="#next-steps" className="text-blue-600 hover:text-blue-700 hover:underline">
                6. Your Next Steps
              </a>
            </div>
          </div>

          {/* Content Sections */}
          <article className="prose prose-lg max-w-none">
            
            {/* Section 1 */}
            <section id="weather-basics" className="mb-12">
              <h2 className="text-3xl font-semibold text-slate-800 mb-6">1. Weather vs Climate: The Foundation</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                <p className="text-slate-700 text-lg">
                  <strong>Quick Definition:</strong> Weather is what you experience day-to-day. Climate is the long-term average of weather patterns over many years.
                </p>
              </div>

              <p className="text-slate-700 mb-4">
                Understanding this distinction is crucial for weather literacy. When someone says "It's cold today, so much for global warming," 
                they're confusing weather (today's conditions) with climate (long-term patterns).
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">🌤️ Weather Examples</h3>
                  <ul className="text-slate-700 space-y-2">
                    <li>• Today's temperature: 75°F</li>
                    <li>• This afternoon's thunderstorm</li>
                    <li>• Tomorrow's wind speed</li>
                    <li>• This week's humidity levels</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">🌍 Climate Examples</h3>
                  <ul className="text-slate-700 space-y-2">
                    <li>• Average July temperature over 30 years</li>
                    <li>• Seasonal rainfall patterns</li>
                    <li>• Regional temperature trends</li>
                    <li>• Long-term weather shifts</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="weather-elements" className="mb-12">
              <h2 className="text-3xl font-semibold text-slate-800 mb-6">2. Key Weather Elements You Need to Know</h2>
              
              <p className="text-slate-700 mb-6">
                Weather consists of several measurable elements that work together to create the conditions you experience:
              </p>

              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">🌡️ Temperature</h3>
                  <p className="text-slate-700 mb-3">
                    More than just hot or cold - understanding temperature helps you plan clothing, activities, and energy usage.
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600">
                      <strong>Pro Tip:</strong> Pay attention to "feels like" temperature, which factors in wind chill or heat index 
                      to show how the temperature actually feels to your body.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">💧 Humidity</h3>
                  <p className="text-slate-700 mb-3">
                    The amount of moisture in the air affects comfort, health, and weather development. High humidity makes 
                    hot weather feel hotter and can lead to thunderstorm development.
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600">
                      <strong>Understanding Humidity:</strong> 30-50% is comfortable, over 60% feels muggy, under 30% can feel dry and cause static.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">💨 Wind</h3>
                  <p className="text-slate-700 mb-3">
                    Wind speed and direction influence temperature sensation, precipitation patterns, and outdoor activity safety.
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600">
                      <strong>Wind Speed Guide:</strong> 0-7 mph (calm), 8-18 mph (light breeze), 19-31 mph (moderate wind), 32+ mph (strong wind).
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">🌧️ Precipitation</h3>
                  <p className="text-slate-700 mb-3">
                    Rain, snow, sleet, and hail. Understanding precipitation probability helps you plan outdoor activities and transportation.
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600">
                      <strong>Precipitation Probability:</strong> 30% chance means there's a 30% probability of rain in your area during the forecast period.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="reading-forecasts" className="mb-12">
              <h2 className="text-3xl font-semibold text-slate-800 mb-6">3. How to Read Weather Forecasts Like a Pro</h2>
              
              <p className="text-slate-700 mb-6">
                Weather forecasts contain more information than just "sunny" or "rainy." Learning to decode forecast details 
                helps you make better daily decisions.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">📱 Reading a Typical Forecast</h3>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-2">☀️</div>
                    <div className="text-2xl font-bold text-slate-800">78°F / 65°F</div>
                    <div className="text-slate-600">Mostly Sunny</div>
                    <div className="text-sm text-slate-500">10% chance of rain</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Wind:</span> SW 8 mph
                    </div>
                    <div>
                      <span className="text-slate-600">Humidity:</span> 45%
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-slate-700">
                  <p><strong>High/Low:</strong> 78°F is the expected maximum, 65°F is the overnight low</p>
                  <p><strong>"Mostly Sunny":</strong> Expect sunshine with some clouds, good weather for outdoor activities</p>
                  <p><strong>10% Rain Chance:</strong> Very low probability, you likely won't need an umbrella</p>
                  <p><strong>SW 8 mph Wind:</strong> Light breeze from the southwest, pleasant conditions</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                <h4 className="font-semibold text-slate-800 mb-2">🎯 Forecast Accuracy Tips</h4>
                <ul className="text-slate-700 space-y-2">
                  <li>• Today's forecast: 95% accurate</li>
                  <li>• 3-day forecast: 85% accurate</li>
                  <li>• 7-day forecast: 70% accurate</li>
                  <li>• Beyond 7 days: Use for general trends only</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section id="weather-maps" className="mb-12">
              <h2 className="text-3xl font-semibold text-slate-800 mb-6">4. Understanding Weather Maps and Radar</h2>
              
              <p className="text-slate-700 mb-6">
                Weather maps and radar images provide visual representations of current and future weather conditions. 
                Learning to read these tools gives you deeper weather insights.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">🗺️ Weather Map Symbols</h3>
                  <div className="space-y-3 text-slate-700">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-blue-500 rounded mr-3"></span>
                      <span>Blue areas: Cold air masses</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-red-500 rounded mr-3"></span>
                      <span>Red areas: Warm air masses</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-2 bg-blue-600 mr-3"></span>
                      <span>Blue lines: Cold fronts</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-2 bg-red-600 mr-3"></span>
                      <span>Red lines: Warm fronts</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">📡 Radar Basics</h3>
                  <div className="space-y-3 text-slate-700">
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded mr-3"></span>
                      <span>Green: Light rain</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-yellow-500 rounded mr-3"></span>
                      <span>Yellow: Moderate rain</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-red-500 rounded mr-3"></span>
                      <span>Red: Heavy rain</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-purple-500 rounded mr-3"></span>
                      <span>Purple: Very heavy rain/hail</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="weather-safety" className="mb-12">
              <h2 className="text-3xl font-semibold text-slate-800 mb-6">5. Essential Weather Safety for Beginners</h2>
              
              <p className="text-slate-700 mb-6">
                Understanding weather hazards and safety measures protects you and your family from dangerous weather conditions.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">⚠️ Severe Weather Warnings</h3>
                  <div className="space-y-4 text-slate-700">
                    <div>
                      <h4 className="font-semibold">Weather Watch</h4>
                      <p className="text-sm">Conditions are favorable for severe weather. Stay alert.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Weather Warning</h4>
                      <p className="text-sm">Severe weather is occurring or imminent. Take action now.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Weather Advisory</h4>
                      <p className="text-sm">Weather may cause inconvenience. Use caution.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">✅ Safety Checklist</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                      Enable weather alerts on your phone
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                      Know your local warning systems
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                      Have emergency supplies ready
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                      Plan safe locations in your home
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                      Stay informed during severe weather
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="next-steps" className="mb-12">
              <h2 className="text-3xl font-semibold text-slate-800 mb-6">6. Your Weather Learning Journey Continues</h2>
              
              <p className="text-slate-700 mb-6">
                Congratulations! You now have the foundation to understand weather better. Here's how to continue expanding your weather knowledge:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">📚 Intermediate Topics</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• Seasonal weather patterns</li>
                    <li>• Advanced forecast reading</li>
                    <li>• Weather instruments</li>
                    <li>• Regional climate differences</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">🔬 Advanced Learning</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• Meteorological science</li>
                    <li>• Atmospheric physics</li>
                    <li>• Weather modeling</li>
                    <li>• Climate change impacts</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">🛠️ Practical Skills</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• Home weather station setup</li>
                    <li>• Photography weather conditions</li>
                    <li>• Garden weather planning</li>
                    <li>• Weather-based decision making</li>
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Explore More Weather Topics?</h2>
            <p className="text-blue-100 mb-6">
              Continue your weather education with our comprehensive guide library
            </p>
            <Link
              href="/guides"
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Browse All Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}