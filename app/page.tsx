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
  }

  return (
    <div className="min-h-screen bg-cream-light">
      <Header />

      {/* Hero Section - Colorful! */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange via-cream to-teal opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-orange">Kekere</span>
              </h1>
              <p className="text-xl text-gray-800 mb-8 leading-relaxed">
                A vibrant community for Nigerian parents to share experiences, 
                ask questions, and support each other through the parenting journey. 
                Join thousands of parents today! 🇳🇬
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-orange text-white font-bold text-lg rounded-lg hover:bg-orange-dark transform hover:scale-105 transition-all shadow-lg text-center"
                >
                  Join the Community
                </Link>
                <Link
                  href="/topics"
                  className="px-8 py-4 bg-white text-orange font-bold text-lg rounded-lg hover:shadow-xl transition-all text-center border-2 border-orange"
                >
                  Browse Topics
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
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

      {/* Categories Section - Colorful Grid! */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream-light to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore <span className="text-teal">Parenting Topics</span>
            </h2>
            <p className="text-xl text-gray-600">
              Find answers and advice for every stage of your parenting journey
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
            {topics?.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.id}`}
                className="group transform hover:scale-105 transition-transform"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src={categoryImages[topic.name] || '/images/placeholder.jpg'}
                      alt={topic.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-3 left-3 right-3 font-bold text-white text-center text-lg">
                      {topic.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Questions - Colorful Cards! */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-cream-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Trending <span className="text-orange">Questions</span>
              </h2>
              <p className="text-gray-600">See what other parents are asking</p>
            </div>
            <Link
              href="/topics"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="space-y-6">
            {questions?.map((question) => (
              <div key={question.id} className="transform hover:scale-[1.02] transition-transform">
                <QuestionCard question={question} />
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors"
            >
              View All Questions
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Colorful! */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-dark text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                <span className="text-orange">K</span>
                <span className="text-teal-light">ekere</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Kekere is a vibrant community forum for Nigerian parents. 
                Share experiences and connect with others. Always consult 
                a healthcare professional for medical advice.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4 text-orange">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/topics" className="text-gray-300 hover:text-orange transition-colors flex items-center gap-2">
                    <span>→</span> Browse Topics
                  </Link>
                </li>
                <li>
                  <Link href="/ask" className="text-gray-300 hover:text-orange transition-colors flex items-center gap-2">
                    <span>→</span> Ask a Question
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-gray-300 hover:text-orange transition-colors flex items-center gap-2">
                    <span>→</span> Join Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4 text-teal-light">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-orange rounded-full flex items-center justify-center hover:bg-orange-dark transition-colors transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-teal rounded-full flex items-center justify-center hover:bg-teal-dark transition-colors transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-orange rounded-full flex items-center justify-center hover:bg-orange-dark transition-colors transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">&copy; 2026 Kekere. All rights reserved. Made with ❤️ for Nigerian parents.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}