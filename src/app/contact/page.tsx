import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact CloudVibes - Weather Support & Feedback',
  description: 'Get in touch with CloudVibes team. Contact us for weather support, feedback, partnerships, or technical assistance.',
  keywords: 'contact cloudvibes, weather support, feedback, customer service, weather help',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact CloudVibes</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're here to help with weather questions, technical support, or feedback
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="weather-question">Weather Question</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="data-accuracy">Weather Data Accuracy</option>
                    <option value="privacy-concern">Privacy Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                    placeholder="Please describe your question, concern, or feedback in detail..."
                  ></textarea>
                </div>

                {/* Priority Level */}
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="normal">Normal - Standard request</option>
                    <option value="high">High - Important issue</option>
                    <option value="urgent">Urgent - Critical problem</option>
                  </select>
                </div>

                {/* Privacy Consent */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    name="privacy-consent"
                    required
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="privacy-consent" className="text-sm text-slate-600">
                    I agree to the <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a> and 
                    consent to CloudVibes processing my personal data to respond to this inquiry. *
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>

                <p className="text-sm text-slate-500 text-center">
                  We typically respond within 24-48 hours during business days.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Other Ways to Reach Us</h2>
              
              {/* Contact Methods */}
              <div className="space-y-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Response Times</h3>
                  <div className="space-y-2 text-slate-600">
                    <p>• <strong>General Inquiries:</strong> 24-48 hours</p>
                    <p>• <strong>Technical Support:</strong> 12-24 hours</p>
                    <p>• <strong>Data Accuracy Issues:</strong> 4-8 hours</p>
                    <p>• <strong>Privacy Concerns:</strong> 24 hours</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Business Information</h3>
                  <div className="space-y-2 text-slate-600">
                    <p><strong>Service:</strong> CloudVibes Weather Platform</p>
                    <p><strong>Website:</strong> cloudvibes.org</p>
                    <p><strong>Support Hours:</strong> 9 AM - 6 PM (UTC)</p>
                    <p><strong>Languages:</strong> English</p>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Quick Help</h3>
                <div className="space-y-3">
                  <a 
                    href="/help" 
                    className="block p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                  >
                    <span className="font-medium text-slate-800">Help & FAQ</span>
                    <p className="text-sm text-slate-600">Common questions and troubleshooting</p>
                  </a>
                  <a 
                    href="/privacy" 
                    className="block p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                  >
                    <span className="font-medium text-slate-800">Privacy Policy</span>
                    <p className="text-sm text-slate-600">How we handle your data and privacy</p>
                  </a>
                  <a 
                    href="/terms" 
                    className="block p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                  >
                    <span className="font-medium text-slate-800">Terms of Service</span>
                    <p className="text-sm text-slate-600">Usage terms and conditions</p>
                  </a>
                </div>
              </div>

              {/* Emergency Weather Info */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">⚠️ Emergency Weather Information</h3>
                <p className="text-sm text-slate-600 mb-3">
                  For severe weather emergencies, do not rely solely on CloudVibes. Always consult:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Your national weather service</li>
                  <li>• Local emergency services</li>
                  <li>• Official government weather alerts</li>
                  <li>• Emergency broadcast systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}