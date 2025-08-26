import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - CloudVibes',
  description: 'CloudVibes Privacy Policy - How we collect, use, and protect your data',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 backdrop-blur-[2px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
          <p className="text-sm text-slate-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Information We Collect</h2>
              <p className="mb-3">
                CloudVibes collects information to provide better weather services to our users:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Location Data:</strong> We may request your location to provide accurate local weather forecasts.</li>
                <li><strong>Usage Information:</strong> We collect information about how you use our website.</li>
                <li><strong>Device Information:</strong> We may collect information about your device and browser.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Third-Party Services</h2>
              <p className="mb-3">
                Our website uses third-party services that may collect information:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Google AdSense:</strong> We use Google AdSense to display advertisements. Google may place and read cookies on your browser and use web beacons to collect information for ad serving purposes.</li>
                <li><strong>Weather APIs:</strong> We use weather data services to provide accurate forecasts.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Cookies and Tracking</h2>
              <p className="mb-3">
                Third parties may be placing and reading cookies on your browser, or using web beacons or IP addresses to collect information as a result of ad serving on our website.
              </p>
              <p className="mb-3">
                For more information about how Google uses data when you use our site, please visit: 
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline ml-1">
                  How Google uses data when you use our partners' sites or apps
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Data Usage</h2>
              <p className="mb-3">
                We use collected information to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide accurate weather forecasts based on your location</li>
                <li>Improve our services and user experience</li>
                <li>Display relevant advertisements through Google AdSense</li>
                <li>Analyze website usage and performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Data Sharing</h2>
              <p className="mb-3">
                We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy. We may share information with:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Service providers who assist in operating our website</li>
                <li>Google AdSense for advertising purposes</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Your Rights</h2>
              <p className="mb-3">
                You have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Opt out of personalized advertising</li>
                <li>Request information about data we collect</li>
                <li>Request deletion of your data</li>
                <li>Disable location services in your browser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Children's Privacy</h2>
              <p>
                Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us through our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify users of any changes by posting the new privacy policy on this page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}