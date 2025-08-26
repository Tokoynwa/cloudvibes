import type { Metadata } from 'next';
import { SocialShare } from '@/components/social-share';

export const metadata: Metadata = {
  title: 'Weather Widgets - Embed CloudVibes Weather on Your Site',
  description: 'Free weather widgets for your website, blog, or application. Easy-to-embed weather forecasts, current conditions, and weather maps from CloudVibes.',
  keywords: 'weather widgets, embed weather, weather API, weather for websites, free weather widgets, weather integration',
};

export default function WidgetsPage() {
  const widgets = [
    {
      id: 'current-weather',
      name: 'Current Weather Widget',
      description: 'Display current temperature, conditions, and basic weather info',
      size: '300x200',
      features: ['Current temperature', 'Weather condition', 'Wind speed', 'Humidity'],
      code: `<iframe src="https://cloudvibes.org/widget/current?location=new-york" width="300" height="200" frameborder="0"></iframe>`
    },
    {
      id: 'forecast-widget',
      name: '5-Day Forecast Widget',
      description: 'Show a 5-day weather forecast with highs, lows, and conditions',
      size: '400x300',
      features: ['5-day forecast', 'High/low temperatures', 'Weather icons', 'Precipitation chance'],
      code: `<iframe src="https://cloudvibes.org/widget/forecast?location=new-york&days=5" width="400" height="300" frameborder="0"></iframe>`
    },
    {
      id: 'compact-widget',
      name: 'Compact Weather Widget',
      description: 'Minimal weather display perfect for sidebars and small spaces',
      size: '250x150',
      features: ['Temperature', 'Weather icon', 'Location name', 'Minimal design'],
      code: `<iframe src="https://cloudvibes.org/widget/compact?location=new-york" width="250" height="150" frameborder="0"></iframe>`
    },
    {
      id: 'detailed-widget',
      name: 'Detailed Weather Widget',
      description: 'Comprehensive weather information with multiple metrics',
      size: '500x400',
      features: ['Current conditions', 'Extended forecast', 'Weather maps', 'Multiple metrics'],
      code: `<iframe src="https://cloudvibes.org/widget/detailed?location=new-york" width="500" height="400" frameborder="0"></iframe>`
    }
  ];

  const customizationOptions = [
    { name: 'Location', param: 'location', example: 'new-york', description: 'City or location name' },
    { name: 'Units', param: 'units', example: 'metric', description: 'metric (°C) or imperial (°F)' },
    { name: 'Theme', param: 'theme', example: 'light', description: 'light, dark, or auto' },
    { name: 'Language', param: 'lang', example: 'en', description: 'Language code (en, es, fr, de, etc.)' },
    { name: 'Background', param: 'bg', example: 'transparent', description: 'Background color or transparent' },
  ];

  const integrationSteps = [
    {
      step: 1,
      title: 'Choose Your Widget',
      description: 'Select the weather widget that best fits your website design and space requirements.',
      icon: '🎯'
    },
    {
      step: 2,
      title: 'Customize Settings',
      description: 'Configure location, theme, units, and other options to match your site.',
      icon: '⚙️'
    },
    {
      step: 3,
      title: 'Copy the Code',
      description: 'Copy the generated HTML code and paste it into your website or blog.',
      icon: '📋'
    },
    {
      step: 4,
      title: 'Publish & Share',
      description: 'Your weather widget is now live! Share your site to increase weather-related traffic.',
      icon: '🚀'
    }
  ];

  const useCases = [
    {
      title: 'Travel Blogs',
      description: 'Help readers plan their trips with current weather conditions and forecasts',
      icon: '✈️',
      example: 'Perfect for destination guides and travel itineraries'
    },
    {
      title: 'Local Businesses',
      description: 'Keep customers informed about weather conditions affecting your services',
      icon: '🏪',
      example: 'Great for outdoor services, restaurants, and event venues'
    },
    {
      title: 'News Websites',
      description: 'Provide readers with local weather information alongside your content',
      icon: '📰',
      example: 'Enhance local news coverage with weather updates'
    },
    {
      title: 'Educational Sites',
      description: 'Teach students about weather patterns and meteorological concepts',
      icon: '🎓',
      example: 'Perfect for schools and educational resources'
    },
    {
      title: 'Event Websites',
      description: 'Help attendees prepare for weather conditions at outdoor events',
      icon: '🎪',
      example: 'Essential for festivals, sports events, and outdoor gatherings'
    },
    {
      title: 'Community Portals',
      description: 'Serve local weather information to community members',
      icon: '🏘️',
      example: 'Great for city websites and community bulletin boards'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Free Weather Widgets</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Embed professional weather forecasts on your website, blog, or application. 
              Free, customizable, and easy to integrate.
            </p>
          </div>

          {/* Integration Steps */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-slate-800 mb-8 text-center">How to Add Weather to Your Site</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {integrationSteps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Widget Gallery */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-slate-800 mb-8">Available Weather Widgets</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {widgets.map((widget) => (
                <div key={widget.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  {/* Widget Preview */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center">
                    <div className="text-6xl mb-4">🌤️</div>
                    <div className="text-slate-600 text-sm">{widget.size} pixels</div>
                    <div className="text-slate-800 font-medium">Preview: {widget.name}</div>
                  </div>
                  
                  {/* Widget Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{widget.name}</h3>
                    <p className="text-slate-600 mb-4">{widget.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-slate-800 mb-2">Features:</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {widget.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-slate-800 mb-2">Embed Code:</h4>
                      <div className="bg-slate-100 rounded-lg p-3 text-sm font-mono text-slate-800 overflow-x-auto">
                        {widget.code}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        Copy Code
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Customize →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Customization Options */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-slate-800 mb-8">Customization Options</h2>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
              <p className="text-slate-700 mb-6">
                Customize your weather widgets by adding URL parameters to match your website's design and requirements:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-800">Parameter</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-800">Example</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-800">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customizationOptions.map((option, index) => (
                      <tr key={index} className="border-b border-slate-100">
                        <td className="py-3 px-4 font-mono text-sm text-blue-600">{option.param}</td>
                        <td className="py-3 px-4 font-mono text-sm text-slate-600">{option.example}</td>
                        <td className="py-3 px-4 text-sm text-slate-700">{option.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Example with parameters:</h4>
                <code className="text-sm text-slate-700">
                  https://cloudvibes.org/widget/current?location=london&units=metric&theme=dark&lang=en
                </code>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-slate-800 mb-8">Perfect for Your Website</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                  <div className="text-3xl mb-3">{useCase.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{useCase.title}</h3>
                  <p className="text-slate-600 mb-3">{useCase.description}</p>
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    💡 {useCase.example}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Benefits */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-slate-800 mb-8">Why Choose CloudVibes Widgets?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">🚀 Performance Benefits</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Fast loading with optimized code
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Mobile-responsive design
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    CDN-hosted for global speed
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                    Minimal impact on your site's performance
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">📊 SEO & Traffic Benefits</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Increase time spent on your site
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Attract weather-related search traffic
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Improve user engagement metrics
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                    Build backlinks from weather searches
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Social Sharing & Promotion */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-semibold mb-4">Share Your Weather-Enhanced Site</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Once you've added CloudVibes weather widgets to your site, share it on social media to attract more visitors interested in weather information.
              </p>
              
              <div className="mb-6">
                <SocialShare
                  url="https://cloudvibes.org/widgets"
                  title="Free Weather Widgets for Your Website - CloudVibes"
                  description="Add professional weather forecasts to your website with free, customizable widgets from CloudVibes"
                  hashtags={['WeatherWidgets', 'WebDevelopment', 'FreeWeather', 'WebsiteTools']}
                  className="justify-center"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2">🐦 Twitter</h4>
                  <p className="text-blue-100 text-sm">Share with #WeatherWidgets #WebDev</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">📘 Facebook</h4>
                  <p className="text-blue-100 text-sm">Post in web development groups</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💼 LinkedIn</h4>
                  <p className="text-blue-100 text-sm">Share with professional networks</p>
                </div>
              </div>
            </div>
          </section>

          {/* Support & API */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Need Help?</h3>
              <p className="text-slate-600 mb-4">
                Our support team is here to help you integrate weather widgets successfully.
              </p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Widget customization assistance</li>
                <li>• Technical integration support</li>
                <li>• Custom widget development</li>
                <li>• Performance optimization tips</li>
              </ul>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Contact Support
              </button>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Advanced Integration</h3>
              <p className="text-slate-600 mb-4">
                For developers who need more control and customization options.
              </p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• RESTful Weather API</li>
                <li>• JSON data format</li>
                <li>• Real-time updates</li>
                <li>• Custom styling options</li>
              </ul>
              <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                View API Docs
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}