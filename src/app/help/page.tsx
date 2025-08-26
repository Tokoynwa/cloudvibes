import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Help & FAQ - CloudVibes Weather Support Center',
  description: 'Find answers to common weather questions, troubleshooting guides, and support resources. Get help with CloudVibes weather features and forecasts.',
  keywords: 'weather help, FAQ, troubleshooting, weather support, forecast questions, CloudVibes help',
};

export default function HelpPage() {
  const faqCategories = [
    {
      title: 'Getting Started',
      icon: '🚀',
      questions: [
        {
          q: 'How accurate are CloudVibes weather forecasts?',
          a: 'CloudVibes aggregates data from multiple reliable sources including national weather services, satellite imagery, and ground-based stations. Our forecasts achieve 95% accuracy for same-day predictions, 85% for 3-day forecasts, and 70% accuracy for 7-day forecasts.'
        },
        {
          q: 'How often is weather data updated?',
          a: 'Current conditions are updated every 10 minutes. Forecasts are refreshed every hour with the latest model runs. Severe weather alerts are updated immediately as they are issued by official weather services.'
        },
        {
          q: 'What locations does CloudVibes cover?',
          a: 'CloudVibes provides weather data for locations worldwide. We offer detailed forecasts for cities, towns, and rural areas, with coverage extending to over 3 million locations globally.'
        }
      ]
    },
    {
      title: 'Understanding Forecasts',
      icon: '🌤️',
      questions: [
        {
          q: 'What does "30% chance of rain" really mean?',
          a: 'A 30% chance of rain means there is a 30% probability that measurable precipitation (0.01 inches or more) will occur at any given point in the forecast area during the specified time period.'
        },
        {
          q: 'Why does the forecast sometimes change?',
          a: 'Weather is inherently chaotic and difficult to predict beyond a few days. Forecast changes occur as new atmospheric data becomes available and weather patterns evolve. This is normal and reflects the dynamic nature of weather systems.'
        },
        {
          q: 'What is the difference between "partly cloudy" and "partly sunny"?',
          a: 'These terms are essentially the same, describing conditions with 25-75% cloud coverage. "Partly sunny" is often used during daytime, while "partly cloudy" can refer to any time of day.'
        }
      ]
    },
    {
      title: 'Weather Safety',
      icon: '⚠️',
      questions: [
        {
          q: 'How do I prepare for severe weather?',
          a: 'Enable weather alerts on your devices, create an emergency plan, assemble emergency supplies (water, food, flashlight, radio, first aid kit), identify safe locations in your home, and stay informed through official weather sources during severe events.'
        },
        {
          q: 'When should I take weather warnings seriously?',
          a: 'Always take weather warnings seriously, especially tornado warnings, flash flood warnings, and severe thunderstorm warnings. Warnings mean dangerous weather is occurring or imminent - take immediate protective action.'
        },
        {
          q: 'What should I do during a tornado warning?',
          a: 'Go to the lowest floor of a sturdy building, move to an interior room away from windows, get under a sturdy table or cover yourself with a mattress, avoid cars and mobile homes, and stay away from large roof spans like gyms and auditoriums.'
        }
      ]
    },
    {
      title: 'Technical Issues',
      icon: '🔧',
      questions: [
        {
          q: 'The weather data seems incorrect for my location',
          a: 'First, ensure your location is set correctly. Weather can vary significantly over short distances. If the issue persists, try refreshing the page or clearing your browser cache. Contact us if problems continue.'
        },
        {
          q: 'Why is the weather different from other apps?',
          a: 'Different weather services use different data sources and forecasting models. Small variations are normal. CloudVibes strives for accuracy by using multiple authoritative sources and advanced forecasting techniques.'
        },
        {
          q: 'The website is loading slowly',
          a: 'Slow loading can be caused by network conditions or high traffic. Try refreshing the page, clearing your browser cache, or accessing the site from a different network. The issue usually resolves quickly.'
        }
      ]
    }
  ];

  const quickHelp = [
    {
      title: 'Weather Alerts Setup',
      description: 'Learn how to enable and customize weather alerts',
      link: '/help/weather-alerts',
      icon: '🚨'
    },
    {
      title: 'Reading Weather Maps',
      description: 'Guide to interpreting radar and satellite imagery',
      link: '/guides/understanding-weather-maps',
      icon: '🗺️'
    },
    {
      title: 'Forecast Accuracy',
      description: 'Understanding forecast confidence and limitations',
      link: '/help/forecast-accuracy',
      icon: '🎯'
    },
    {
      title: 'Location Services',
      description: 'Setting up automatic location detection',
      link: '/help/location-setup',
      icon: '📍'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Help & Support Center</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Find answers to common questions, troubleshooting guides, and expert weather advice
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help topics, weather terms, or questions..."
                className="w-full px-6 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Help Cards */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Quick Help Topics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickHelp.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ Sections */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-800 flex items-center">
                      <span className="mr-3 text-2xl">{category.icon}</span>
                      {category.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {category.questions.map((faq, faqIndex) => (
                        <div key={faqIndex} className="border-b border-slate-100 last:border-b-0 pb-6 last:pb-0">
                          <h4 className="font-semibold text-slate-800 mb-3">{faq.q}</h4>
                          <p className="text-slate-700 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Emergency Weather Info */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8">
              <div className="flex items-start">
                <div className="text-4xl mr-6">🚨</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-4">Emergency Weather Information</h2>
                  <p className="text-slate-700 mb-6">
                    For severe weather emergencies and life-threatening situations, do not rely solely on CloudVibes or any single weather source.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">Official Emergency Sources</h3>
                      <ul className="text-slate-700 space-y-2">
                        <li>• National Weather Service (weather.gov)</li>
                        <li>• Local emergency management agencies</li>
                        <li>• Emergency broadcast systems (EAS)</li>
                        <li>• NOAA Weather Radio</li>
                        <li>• Local news weather services</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">Emergency Actions</h3>
                      <ul className="text-slate-700 space-y-2">
                        <li>• Follow official evacuation orders immediately</li>
                        <li>• Monitor multiple information sources</li>
                        <li>• Have emergency supplies ready</li>
                        <li>• Know your safe locations and escape routes</li>
                        <li>• Stay connected with emergency contacts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Weather Education Resources */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Learn More About Weather</h2>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">📚 Weather Guides</h3>
                  <p className="text-slate-700 mb-4">
                    Comprehensive guides covering weather basics, forecasting, and meteorology.
                  </p>
                  <Link href="/guides" className="text-blue-600 hover:text-blue-700 font-medium">
                    Browse Guides →
                  </Link>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">🎓 Weather Education</h3>
                  <p className="text-slate-700 mb-4">
                    Learn about weather patterns, climate science, and atmospheric physics.
                  </p>
                  <Link href="/guides/beginners-guide" className="text-blue-600 hover:text-blue-700 font-medium">
                    Start Learning →
                  </Link>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">🛡️ Weather Safety</h3>
                  <p className="text-slate-700 mb-4">
                    Essential safety information for severe weather and emergency preparedness.
                  </p>
                  <Link href="/guides/severe-weather-safety" className="text-blue-600 hover:text-blue-700 font-medium">
                    Stay Safe →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help with weather questions, 
                technical issues, and account support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Contact Support
                </Link>
                <a
                  href="mailto:help@cloudvibes.org"
                  className="bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Email Us
                </a>
              </div>
              <p className="text-sm text-blue-200 mt-4">
                Response time: 24-48 hours for general inquiries, 12-24 hours for technical support
              </p>
            </div>
          </section>

          {/* Popular Articles */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Popular Help Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Setting up weather alerts and notifications',
                'Understanding different types of precipitation',
                'Why weather forecasts sometimes seem wrong',
                'How to read humidity and dew point',
                'Interpreting wind speed and direction',
                'Understanding heat index and wind chill'
              ].map((article, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <h3 className="font-medium text-slate-800 mb-2">{article}</h3>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>📖</span>
                    <span className="ml-2">3-5 min read</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}