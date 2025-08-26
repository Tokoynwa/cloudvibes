import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - CloudVibes Weather Platform',
  description: 'Read CloudVibes terms of service, usage conditions, and legal agreements for our weather forecasting platform and services.',
  keywords: 'terms of service, legal agreement, weather service terms, CloudVibes terms, usage policy',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-slate-600">
              Last updated: January 2025
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Navigation</h2>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <a href="#acceptance" className="text-blue-600 hover:text-blue-700 hover:underline">1. Acceptance of Terms</a>
              <a href="#service-description" className="text-blue-600 hover:text-blue-700 hover:underline">2. Service Description</a>
              <a href="#user-responsibilities" className="text-blue-600 hover:text-blue-700 hover:underline">3. User Responsibilities</a>
              <a href="#weather-data-disclaimer" className="text-blue-600 hover:text-blue-700 hover:underline">4. Weather Data Disclaimer</a>
              <a href="#limitation-of-liability" className="text-blue-600 hover:text-blue-700 hover:underline">5. Limitation of Liability</a>
              <a href="#privacy-and-data" className="text-blue-600 hover:text-blue-700 hover:underline">6. Privacy and Data</a>
              <a href="#intellectual-property" className="text-blue-600 hover:text-blue-700 hover:underline">7. Intellectual Property</a>
              <a href="#prohibited-uses" className="text-blue-600 hover:text-blue-700 hover:underline">8. Prohibited Uses</a>
              <a href="#modifications" className="text-blue-600 hover:text-blue-700 hover:underline">9. Terms Modifications</a>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            
            {/* Section 1 */}
            <section id="acceptance" className="border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-700 mb-4">
                By accessing and using CloudVibes weather services ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p className="text-slate-700">
                If you do not agree to abide by the above, please do not use this service. CloudVibes reserves the right to modify these terms at any time without prior notice.
              </p>
            </section>

            {/* Section 2 */}
            <section id="service-description" className="border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Service Description</h2>
              <p className="text-slate-700 mb-4">
                CloudVibes provides weather forecasting information and related meteorological services through our website and associated platforms. Our services include but are not limited to:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Current weather conditions and forecasts</li>
                <li>Weather maps and radar imagery</li>
                <li>Historical weather data</li>
                <li>Weather alerts and notifications</li>
                <li>Educational weather content and guides</li>
              </ul>
              <p className="text-slate-700">
                CloudVibes aggregates weather data from multiple third-party sources and presents it in an accessible format. We do not generate original weather observations or forecasts.
              </p>
            </section>

            {/* Section 3 */}
            <section id="user-responsibilities" className="border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. User Responsibilities</h2>
              <p className="text-slate-700 mb-4">By using CloudVibes, you agree to:</p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Use the service in compliance with all applicable laws and regulations</li>
                <li>Not attempt to gain unauthorized access to our systems or data</li>
                <li>Not use automated systems to extract large amounts of data without permission</li>
                <li>Respect the intellectual property rights of CloudVibes and third parties</li>
                <li>Use weather information responsibly and not rely solely on our service for critical decisions</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800">
                  <strong>Important:</strong> Users are responsible for verifying weather information through official sources for critical or safety-related decisions.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="weather-data-disclaimer" className="border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Weather Data Disclaimer</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-4">
                <p className="text-red-800 font-semibold mb-2">CRITICAL WEATHER INFORMATION DISCLAIMER</p>
                <p className="text-red-700">
                  Weather forecasting is inherently uncertain. CloudVibes weather information is provided for general informational purposes only and should not be the sole basis for decisions that could affect safety, property, or life.
                </p>
              </div>
              <p className="text-slate-700 mb-4">
                <strong>Weather Data Limitations:</strong>
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Forecasts become less accurate with time and may change without notice</li>
                <li>Local weather conditions can vary significantly from general area forecasts</li>
                <li>Severe weather events may develop rapidly and unpredictably</li>
                <li>Historical data may contain gaps or inaccuracies</li>
                <li>Real-time data may be delayed or temporarily unavailable</li>
              </ul>
              <p className="text-slate-700">
                <strong>Official Weather Sources:</strong> For critical weather decisions, emergency preparedness, or severe weather warnings, always consult official government weather services such as the National Weather Service, local emergency management agencies, and official meteorological organizations in your region.
              </p>
            </section>

            {/* Section 5 */}
            <section id="limitation-of-liability" className="border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Limitation of Liability</h2>
              <p className="text-slate-700 mb-4">
                CloudVibes provides weather information "as is" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p className="text-slate-700 mb-4">
                <strong>Liability Limitations:</strong>
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>CloudVibes shall not be liable for any direct, indirect, incidental, special, or consequential damages</li>
                <li>We are not responsible for decisions made based on weather information provided through our service</li>
                <li>Our liability is limited to the maximum extent permitted by applicable law</li>
                <li>We do not guarantee the accuracy, completeness, or timeliness of weather data</li>
                <li>Service interruptions, data errors, or system failures do not constitute grounds for liability claims</li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
                <p className="text-gray-700">
                  <strong>User Assumption of Risk:</strong> By using CloudVibes, you acknowledge that weather information carries inherent uncertainties and assume full responsibility for how you use this information.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="privacy-and-data" className="border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Privacy and Data Protection</h2>
              <p className="text-slate-700 mb-4">
                CloudVibes is committed to protecting user privacy and handling personal data responsibly. Our data practices are governed by our comprehensive Privacy Policy.
              </p>
              <p className="text-slate-700 mb-4">
                <strong>Data Collection and Use:</strong>
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>We collect minimal personal information necessary to provide weather services</li>
                <li>Location data is used solely to provide relevant weather information</li>
                <li>Usage analytics help us improve service quality and user experience</li>
                <li>We do not sell personal data to third parties</li>
                <li>Cookies and similar technologies are used to enhance functionality</li>
              </ul>
              <p className="text-slate-700">
                For complete details about data collection, processing, and your privacy rights, please review our <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link>.
              </p>
            </section>

            {/* Section 7 */}
            <section id="intellectual-property" className="border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Intellectual Property Rights</h2>
              <p className="text-slate-700 mb-4">
                CloudVibes respects intellectual property rights and expects users to do the same.
              </p>
              <p className="text-slate-700 mb-4">
                <strong>CloudVibes Content:</strong>
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>The CloudVibes website, design, code, and original content are protected by copyright</li>
                <li>CloudVibes trademarks, logos, and brand elements are proprietary</li>
                <li>Users may not reproduce, distribute, or create derivative works without permission</li>
                <li>Limited personal use of weather data and content is permitted</li>
              </ul>
              <p className="text-slate-700 mb-4">
                <strong>Third-Party Content:</strong>
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2">
                <li>Weather data is sourced from government agencies and licensed providers</li>
                <li>Third-party content remains the property of respective owners</li>
                <li>Users must comply with applicable terms of use for source data</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="prohibited-uses" className="border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Prohibited Uses</h2>
              <p className="text-slate-700 mb-4">
                The following activities are strictly prohibited when using CloudVibes:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Technical Violations</h3>
                  <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                    <li>Attempting to hack or breach system security</li>
                    <li>Excessive automated requests that burden servers</li>
                    <li>Reverse engineering or data scraping</li>
                    <li>Distributing malware or harmful code</li>
                    <li>Circumventing access controls or restrictions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Content Violations</h3>
                  <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                    <li>Republishing content without proper attribution</li>
                    <li>Using weather data for illegal activities</li>
                    <li>Misrepresenting CloudVibes forecasts or data</li>
                    <li>Creating competing commercial weather services</li>
                    <li>Violating third-party intellectual property rights</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section id="modifications" className="border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. Terms Modifications and Updates</h2>
              <p className="text-slate-700 mb-4">
                CloudVibes reserves the right to modify these Terms of Service at any time to reflect changes in our services, legal requirements, or business practices.
              </p>
              <p className="text-slate-700 mb-4">
                <strong>Notification of Changes:</strong>
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Significant changes will be posted prominently on our website</li>
                <li>Users will be notified of material changes via email when possible</li>
                <li>Continued use of the service constitutes acceptance of updated terms</li>
                <li>Users who disagree with changes should discontinue use of the service</li>
              </ul>
              <p className="text-slate-700">
                We encourage users to periodically review these terms to stay informed of our policies and your obligations.
              </p>
            </section>

            {/* Section 10 */}
            <section id="governing-law">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">10. Governing Law and Dispute Resolution</h2>
              <p className="text-slate-700 mb-4">
                These Terms of Service are governed by applicable laws and regulations. Any disputes arising from the use of CloudVibes services will be resolved through appropriate legal channels.
              </p>
              <p className="text-slate-700 mb-4">
                <strong>Contact Information:</strong>
              </p>
              <p className="text-slate-700">
                If you have questions about these Terms of Service or need to report violations, please contact us through our <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">Contact page</Link> or email us directly.
              </p>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Related Legal Information</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/privacy" className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <h3 className="font-semibold text-slate-800 mb-2">Privacy Policy</h3>
                <p className="text-sm text-slate-600">Learn how we collect, use, and protect your personal information</p>
              </Link>
              <Link href="/help" className="bg-green-50 border border-green-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                <h3 className="font-semibold text-slate-800 mb-2">Help & Support</h3>
                <p className="text-sm text-slate-600">Find answers to common questions and get technical support</p>
              </Link>
              <Link href="/contact" className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                <h3 className="font-semibold text-slate-800 mb-2">Contact Us</h3>
                <p className="text-sm text-slate-600">Get in touch with questions about our terms or services</p>
              </Link>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">
              By using CloudVibes, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Last updated: January 2025 | CloudVibes Weather Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}