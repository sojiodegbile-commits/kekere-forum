import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import Link from 'next/link'
import Header from '@/app/components/Header'
import QuestionCard from '@/app/components/QuestionCard'
import { cookies } from 'next/headers'
import WelcomeToast from '@/app/components/WelcomeToast'

export const metadata = {
  title: 'Kekere - Nigerian Parenting Community',
  description: 'Join thousands of Nigerian parents sharing tips, asking questions, and supporting each other through the parenting journey.',
  openGraph: {
    title: 'Kekere - Nigerian Parenting Community',
    description: 'Join thousands of Nigerian parents sharing tips and experiences.',
    url: 'https://mykekere.com',
    siteName: 'Kekere',
    images: [
      {
        url: 'https://mykekere.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kekere - Nigerian Parenting Community',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kekere - Nigerian Parenting Community',
    description: 'Join thousands of Nigerian parents sharing tips and experiences.',
    images: ['https://mykekere.com/og-image.jpg'],
  },
}

export default async function Home() {
  const supabase = await createServerSupabaseClient()

  // Check for welcome cookie
  const cookieStore = await cookies()
  const welcomeUser = cookieStore.get('welcome_user')?.value

  const { data: topics } = await supabase
    .from('topics')
    .select('*')
    .order('name')

  const { data: questions } = await supabase
    .from('questions')
    .select(`
      *,
      topics (id, name),
      users (id, name, avatar_url),
      answers (count),
      upvotes (count)
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-gray-50">
      {welcomeUser && <WelcomeToast userName={welcomeUser} />}
      <Header />

      {/* Hero Section - Optimized for Desktop */}
      <section className="bg-gradient-to-br from-sage-light via-cream to-warm-beige-light py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/80 text-sage-dark text-sm font-semibold rounded-full shadow-sm">
              🇳🇬 Made for Nigerian Parents
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
            Your Parenting Community,<br />
            <span className="text-sage-dark">Right Here</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ask questions, share experiences, and connect with thousands of Nigerian parents navigating parenthood together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link
              href="/signup"
              className="inline-block px-8 py-3 bg-sage-dark text-white text-lg font-semibold rounded-lg hover:bg-sage transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Join Free Today
            </Link>
            <Link
              href="/topics"
              className="inline-block px-8 py-3 bg-white text-sage-dark border-2 border-sage-dark text-lg font-semibold rounded-lg hover:bg-sage-light transition-all shadow-md"
            >
              Explore Topics
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto pt-6 border-t border-gray-300">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-sage-dark mb-1">1,000+</div>
              <div className="text-xs sm:text-sm text-gray-600">Parents</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-sage-dark mb-1">500+</div>
              <div className="text-xs sm:text-sm text-gray-600">Questions</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-sage-dark mb-1">50+</div>
              <div className="text-xs sm:text-sm text-gray-600">Topics</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Explore Categories
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Find discussions on topics that matter to you
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {topics?.map((topic) => {
              const categoryConfig: Record<string, { icon: string; color: string; bgColor: string }> = {
                'Pregnancy': { icon: '🤰', color: 'text-warm-beige-dark', bgColor: 'bg-warm-beige-light' },
                'Sleep': { icon: '😴', color: 'text-blue-600', bgColor: 'bg-blue-100' },
                'Feeding': { icon: '🍼', color: 'text-sage-dark', bgColor: 'bg-sage-light' },
                'Development': { icon: '🧸', color: 'text-purple-600', bgColor: 'bg-purple-100' },
                'Behavior': { icon: '🤝', color: 'text-teal-dark', bgColor: 'bg-teal-light' },
                'Health': { icon: '❤️', color: 'text-red-600', bgColor: 'bg-red-100' },
                'Activities': { icon: '🎨', color: 'text-pink-600', bgColor: 'bg-pink-100' },
                'Discipline': { icon: '⭐', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
                'School': { icon: '🎒', color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
                'Newborns': { icon: '👶', color: 'text-warm-beige-dark', bgColor: 'bg-warm-beige-light' },
                'Toddlers': { icon: '🚼', color: 'text-sage-dark', bgColor: 'bg-sage-light' },
              }
              
              const config = categoryConfig[topic.name] || { icon: '📌', color: 'text-gray-600', bgColor: 'bg-gray-100' }
              
              return (
                <Link
                  key={topic.id}
                  href={`/topics/${topic.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 p-5 border border-gray-100">
                    <div className={`${config.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                      <span className="text-3xl">{config.icon}</span>
                    </div>
                    <h3 className={`font-bold text-base text-center ${config.color} group-hover:underline`}>
                      {topic.name}
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trending Questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Recent Discussions
          </h2>
          <div className="space-y-5">
            {questions?.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-sage-light to-warm-beige-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Ready to Join Kekere?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-10">
            Already a member? <Link href="/login" className="text-sage-dark hover:text-sage font-semibold underline">Log in</Link>
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Ask Questions</h3>
              <p className="text-gray-600 text-sm">
                Get advice and support from experienced Nigerian parents.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-warm-beige-light rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Share Wisdom</h3>
              <p className="text-gray-600 text-sm">
                Help others with your experiences and parenting insights.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Build Community</h3>
              <p className="text-gray-600 text-sm">
                Connect with parents who understand your journey.
              </p>
            </div>
          </div>

          <Link
            href="/signup"
            className="inline-block px-10 py-3 bg-sage-dark text-white text-xl font-semibold rounded-lg hover:bg-sage transition-all shadow-lg hover:shadow-xl"
          >
            Join Free Today
          </Link>
          <p className="mt-5 text-gray-600">
            Already a member? <Link href="/login" className="text-sage-dark hover:text-sage font-semibold underline">Log in</Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-5 max-w-2xl mx-auto text-sm sm:text-base">
              Kekere is a community forum for Nigerian parents. Share experiences and connect with others. 
              Always consult a healthcare professional for medical advice.
            </p>
            <div className="flex justify-center gap-6 mb-5 text-sm">
              <Link href="/about" className="text-gray-600 hover:text-sage-dark">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-sage-dark">Contact</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-sage-dark">Terms & Privacy</Link>
              <Link href="/faq" className="text-gray-600 hover:text-sage-dark">FAQ</Link>
            </div>
            <div className="flex justify-center gap-3">
              <a href="#" className="w-10 h-10 bg-sage-dark rounded-full flex items-center justify-center hover:bg-sage transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-sage-dark rounded-full flex items-center justify-center hover:bg-sage transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-sage-dark rounded-full flex items-center justify-center hover:bg-sage transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}