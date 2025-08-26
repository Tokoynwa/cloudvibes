import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CloudVibes - Professional Weather Forecasting',
  description: 'Learn about CloudVibes mission to provide accurate, reliable weather forecasts. Meet our team and discover our commitment to weather excellence.',
  keywords: 'about cloudvibes, weather team, weather mission, meteorology, weather experts',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">About CloudVibes</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Your trusted companion for accurate weather forecasts and meteorological insights
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-800 mb-6">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-slate-700 mb-4">
                  CloudVibes is dedicated to providing the most accurate and reliable weather information 
                  to help you make informed decisions about your daily activities. We believe that 
                  everyone deserves access to professional-grade weather data presented in an 
                  intuitive, beautiful interface.
                </p>
                <p className="text-lg text-slate-700">
                  Our mission is to democratize weather forecasting by making complex meteorological 
                  data accessible to everyone, from casual users planning their weekend to 
                  professionals requiring detailed atmospheric insights.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Why Choose CloudVibes?</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Multiple data sources for maximum accuracy
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Real-time weather updates
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    User-friendly mobile-first design
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Privacy-focused approach
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-800 mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Current Conditions</h3>
                <p className="text-slate-600">
                  Real-time weather data including temperature, humidity, wind speed, 
                  pressure, and visibility for your exact location.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Extended Forecasts</h3>
                <p className="text-slate-600">
                  Detailed 7-day forecasts with hourly breakdowns, helping you 
                  plan everything from daily commutes to weekend adventures.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Weather Insights</h3>
                <p className="text-slate-600">
                  Professional meteorological analysis, seasonal trends, and 
                  weather pattern explanations to enhance your understanding.
                </p>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-800 mb-6">Our Technology</h2>
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Data Sources</h3>
                  <p className="text-slate-700 mb-4">
                    CloudVibes aggregates data from multiple reliable sources including:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li>• National Weather Services</li>
                    <li>• Satellite imagery and radar data</li>
                    <li>• Ground-based weather stations</li>
                    <li>• Advanced atmospheric modeling</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Technical Excellence</h3>
                  <p className="text-slate-700 mb-4">
                    Built with modern web technologies for optimal performance:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Next.js 15 with server-side rendering</li>
                    <li>• Kubernetes-based cloud infrastructure</li>
                    <li>• Real-time data processing</li>
                    <li>• Mobile-optimized responsive design</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-800 mb-6">Our Commitment</h2>
            <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-8 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-semibold mb-4">Dedicated to Weather Excellence</h3>
                <p className="text-lg text-blue-100 mb-6">
                  CloudVibes is developed and maintained by a team of weather enthusiasts and 
                  technology professionals who are passionate about delivering accurate, 
                  reliable weather information to users worldwide.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-blue-200 mb-2">Accuracy First</h4>
                    <p className="text-blue-100 text-sm">
                      We prioritize data accuracy and reliability above all else
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-blue-200 mb-2">User Privacy</h4>
                    <p className="text-blue-100 text-sm">
                      Your privacy and data security are our top priorities
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-blue-200 mb-2">Continuous Innovation</h4>
                    <p className="text-blue-100 text-sm">
                      We continuously improve our platform with latest technology
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center">
            <h2 className="text-3xl font-semibold text-slate-800 mb-4">Get in Touch</h2>
            <p className="text-lg text-slate-600 mb-6">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200"
            >
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}