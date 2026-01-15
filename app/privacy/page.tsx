export const metadata = {
  title: 'Terms & Privacy Policy - Kekere',
  description: 'Privacy Policy and Terms of Service for Kekere parenting community',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Terms of Service & Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: January 2026</p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            
            {/* TERMS OF SERVICE */}
            <section>
              <h2 className="text-3xl font-bold text-orange mb-4">Terms of Service</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. Acceptance of Terms</h3>
              <p>
                By accessing and using Kekere ("the Platform"), you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. User Accounts</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 18 years old to create an account</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must provide accurate and complete information</li>
                <li>One person may not maintain multiple accounts</li>
                <li>You are responsible for all activity under your account</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. User Content</h3>
              <p><strong>You agree that:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You own or have rights to all content you post</li>
                <li>Your content does not violate any laws or third-party rights</li>
                <li>You grant Kekere a license to display and distribute your content</li>
                <li>You will not post harmful, offensive, or inappropriate content</li>
                <li>You will not impersonate others or post misleading information</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">4. Prohibited Activities</h3>
              <p>Users may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Post spam, advertisements, or promotional content without permission</li>
                <li>Harass, bully, or threaten other users</li>
                <li>Share personal information of others without consent</li>
                <li>Attempt to hack, exploit, or damage the platform</li>
                <li>Use automated tools to scrape or collect data</li>
                <li>Provide medical advice if not qualified to do so</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">5. Medical Disclaimer</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="font-semibold">
                  Kekere is NOT a medical service. Content shared on this platform is for informational 
                  purposes only and should not be considered professional medical advice. Always consult 
                  qualified healthcare professionals for medical concerns.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">6. Content Moderation</h3>
              <p>
                Kekere reserves the right to remove content or suspend accounts that violate these terms. 
                We may moderate content to ensure community safety, but we are not responsible for all 
                user-generated content.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">7. Limitation of Liability</h3>
              <p>
                Kekere provides the platform "as is" without warranties. We are not liable for damages 
                arising from platform use, user content, or reliance on information shared by community members.
              </p>
            </section>

            {/* PRIVACY POLICY */}
            <section className="mt-12 pt-8 border-t-2 border-gray-200">
              <h2 className="text-3xl font-bold text-teal mb-4">Privacy Policy</h2>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. Information We Collect</h3>
              
              <p><strong>Account Information:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Name and email address</li>
                <li>Profile information you choose to provide</li>
                <li>Account preferences and settings</li>
              </ul>

              <p><strong>Content You Create:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Questions, answers, and comments you post</li>
                <li>Images you upload</li>
                <li>Upvotes and bookmarks</li>
              </ul>

              <p><strong>Usage Data:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pages you visit and features you use</li>
                <li>Device and browser information</li>
                <li>IP address and location data</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. How We Use Your Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and improve our services</li>
                <li>To communicate with you about your account</li>
                <li>To send notifications about activity on your content</li>
                <li>To prevent fraud and ensure platform security</li>
                <li>To analyze usage patterns and improve user experience</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. Information Sharing</h3>
              <p><strong>We do NOT sell your personal information.</strong></p>
              <p>We may share information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Companies that help us operate the platform (hosting, email, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
                <li><strong>Public Content:</strong> Questions, answers, and profile information you choose to make public</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">4. Data Security</h3>
              <p>
                We implement security measures to protect your data, including encryption, secure servers, 
                and access controls. However, no system is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">5. Your Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Export your content</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">6. Cookies and Tracking</h3>
              <p>
                We use cookies and similar technologies to improve your experience, remember your preferences, 
                and analyze platform usage. You can control cookies through your browser settings.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">7. Children's Privacy</h3>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p>
                  Kekere is not intended for children under 18. We do not knowingly collect information 
                  from minors. If you believe a child has provided information, please contact us immediately.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">8. Data Retention</h3>
              <p>
                We retain your information as long as your account is active or as needed to provide services. 
                You may request deletion at any time, though some information may be retained for legal compliance.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">9. International Users</h3>
              <p>
                Your information may be stored and processed in any country where we operate. By using Kekere, 
                you consent to the transfer of information outside Nigeria.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">10. Changes to This Policy</h3>
              <p>
                We may update this policy from time to time. Significant changes will be communicated via 
                email or platform notification. Continued use after changes constitutes acceptance.
              </p>
            </section>

            {/* CONTACT */}
            <section className="mt-12 pt-8 border-t-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p>
                For questions about these Terms or Privacy Policy, or to exercise your rights, contact us at:
              </p>
              <div className="bg-teal-light p-6 rounded-lg mt-4">
                <p className="font-semibold">Email: <a href="mailto:privacy@kekere.ng" className="text-teal hover:text-teal-dark">privacy@kekere.ng</a></p>
                <p className="font-semibold mt-2">Legal: <a href="mailto:legal@kekere.ng" className="text-teal hover:text-teal-dark">legal@kekere.ng</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}