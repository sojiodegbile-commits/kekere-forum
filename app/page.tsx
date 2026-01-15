import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/app/components/Header'
import QuestionCard from '@/app/components/QuestionCard'

export default async function Home() {
  const supabase = await createServerSupabaseClient()

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

  const categoryImages: Record<string, string> = {
    'Pregnancy': '/images/pregnancy.jpg',
    'Sleep': '/images/sleep.jpg',
    'Feeding': '/images/feeding.jpg',
    'Development': '/images/development.jpg',
    'Behavior': '/images/behavior.jpg',
    'Health': '/images/health.jpg',
    'Activities': '/images/activities.jpg',
    'Discipline': '/images/discipline.jpg',
    'School': '/images/school.jpg',
    'Newborns': '/images/newborns.jpg',
    'Toddlers': '/images/toddlers.jpg',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-light via-cream to-orange-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Join Thousands Sharing Parenting Tips and Experiences
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Ask questions, share stories, and connect with a supportive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="inline-block px-8 py-4 bg-orange text-white text-lg font-semibold rounded-lg hover:bg-orange-dark transition-colors text-center shadow-lg"
                >
                  Sign Up Free
                </Link>
                <Link
                  href="/topics"
                  className="inline-block px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center border-2 border-gray-300"
                >
                  Browse Questions
                </Link>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-family.jpg"
                alt="Nigerian family"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-xl text-gray-600">
              Find discussions on topics that matter to you
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {topics?.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <div className="relative h-32">
                    <Image
                      src={categoryImages[topic.name] || '/images/placeholder.jpg'}
                      alt={topic.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900">
                      {topic.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Questions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Trending Questions
          </h2>
          <div className="space-y-6">
            {questions?.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to join Kekere?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Already a member? <Link href="/login" className="text-teal hover:text-teal-dark font-semibold">Log in</Link>
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Ask Questions</h3>
              <p className="text-gray-600">
                Post your parenting questions and get advice from the community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Share Experiences</h3>
              <p className="text-gray-600">
                Offer advice, tips, or your own stories to help others.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Discover Community</h3>
              <p className="text-gray-600">
                Explore categories, search questions, and find discussions relevant to you.
              </p>
            </div>
          </div>

          <Link
            href="/signup"
            className="inline-block px-10 py-4 bg-orange text-white text-xl font-semibold rounded-lg hover:bg-orange-dark transition-colors shadow-lg"
          >
            Sign Up Free
          </Link>
          <p className="mt-6 text-gray-600">
            Already a member? <Link href="/login" className="text-teal hover:text-teal-dark font-semibold">Log in</Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              Kekere is a community forum for Nigerian parents. Share experiences and connect with others. 
              Always consult a healthcare professional for medical advice.
            </p>
            <div className="flex justify-center gap-6 mb-6">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">Terms & Privacy</Link>
              <Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link>
            </div>
            <div className="flex justify-center gap-4">
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
          </div>
        </div>
      </footer>
    </div>
  )
}