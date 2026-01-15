import Link from 'next/link'

export const metadata = {
  title: 'Contact Us - Kekere',
  description: 'Get in touch with the Kekere team. We\'d love to hear from you!',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p className="text-xl leading-relaxed">
              We'd love to hear from you! Whether you have questions, feedback, or need support, 
              the Kekere team is here to help.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Get in Touch</h2>
            
            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-orange-light p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-8 h-8 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
                </div>
                <p className="text-gray-700 mb-2">For all inquiries and support:</p>
                <a href="mailto:hello@mykekere.com" className="text-orange font-semibold hover:text-orange-dark text-lg">
                  hello@mykekere.com
                </a>
              </div>

              <div className="bg-teal-light p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900">Community Support</h3>
                </div>
                <p className="text-gray-700 mb-2">Get help from our community:</p>
                <Link href="/topics" className="text-teal font-semibold hover:text-teal-dark text-lg">
                  Browse Forums →
                </Link>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What We Can Help With</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="border-l-4 border-orange p-4">
                <h3 className="font-bold text-gray-900 mb-2">General Inquiries</h3>
                <p className="text-sm text-gray-600">Questions about Kekere, features, or how to use the platform</p>
              </div>
              
              <div className="border-l-4 border-teal p-4">
                <h3 className="font-bold text-gray-900 mb-2">Technical Support</h3>
                <p className="text-sm text-gray-600">Help with account issues, bugs, or technical problems</p>
              </div>
              
              <div className="border-l-4 border-orange p-4">
                <h3 className="font-bold text-gray-900 mb-2">Report Content</h3>
                <p className="text-sm text-gray-600">Flag inappropriate content or violations of community guidelines</p>
              </div>
              
              <div className="border-l-4 border-teal p-4">
                <h3 className="font-bold text-gray-900 mb-2">Business & Partnerships</h3>
                <p className="text-sm text-gray-600">Advertising, collaborations, or partnership opportunities</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Report Inappropriate Content</h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-6 my-6">
              <p className="text-gray-700 mb-3">
                If you encounter content that violates our community guidelines, please report it immediately:
              </p>
              <a href="mailto:hello@mykekere.com?subject=Content Report" className="text-red-600 font-semibold hover:text-red-700 text-lg">
                hello@mykekere.com
              </a>
              <p className="text-sm text-gray-600 mt-2">Please include: the question/answer URL, reason for report, and any relevant details</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Business Inquiries</h2>
            <p className="mb-3">
              Interested in partnerships, advertising, or business collaborations?
            </p>
            <a href="mailto:hello@mykekere.com?subject=Business Inquiry" className="text-orange font-semibold hover:text-orange-dark text-lg">
              hello@mykekere.com
            </a>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Social Media</h2>
            <p className="mb-4">
              Follow us on social media for updates, tips, and community highlights:
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Response Time</h2>
            <p>
              We aim to respond to all inquiries within 24-48 hours during business days. 
              For urgent matters, please mark your email subject as "URGENT" to prioritize your request.
            </p>

            <div className="bg-teal-light p-6 rounded-lg mt-8">
              <p className="text-center text-gray-900">
                <strong>Thank you for being part of the Kekere community!</strong><br />
                We appreciate your support in making this a safe and helpful space for all Nigerian parents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}