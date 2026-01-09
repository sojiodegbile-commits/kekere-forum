import { createServerSupabaseClient } from './lib/supabase/server'
import { Header } from './components/Header'
import { OrangeButton } from './components/ui/OrangeButton'
import { QuestionCard } from './components/QuestionCard'
import Link from 'next/link'
import Image from 'next/image'

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: questions } = await supabase
    .from('questions')
    .select(`
      *,
      users(id, name, avatar_url),
      topics(name)
    `)
    .order('created_at', { ascending: false })
    .limit(3)
  
  const questionsWithCounts = await Promise.all(
    (questions || []).map(async (q) => {
      const { count: answerCount } = await supabase
        .from('answers')
        .select('*', { count: 'exact', head: true })
        .eq('question_id', q.id)
      
      const { count: upvoteCount } = await supabase
        .from('upvotes')
        .select('*', { count: 'exact', head: true })
        .eq('question_id', q.id)
      
      return {
        ...q,
        answer_count: answerCount || 0,
        upvote_count: upvoteCount || 0,
      }
    })
  )
  
  const { data: topics } = await supabase
    .from('topics')
    .select('*')
    .order('name')
  
  const categoryImages: Record<string, string> = {
    'Pregnancy': '/images/pregnancy.jpg',
    'Sleep': '/images/sleep.jpg',
    'Feeding': '/images/feeding.jpg',
    'Development': '/images/development.jpg',
    'Behavior': '/images/behavior.jpg',
    'Health': '/images/health.jpg',
    'Activities': '/images/activities.jpg'
  }
  
  const categoryLabels: Record<string, string> = {
    'Pregnancy': 'Pregnancy &\nFertility',
    'Sleep': 'Sleep & Routines',
    'Feeding': 'Feeding & Nutrition',
    'Development': 'Development',
    'Behavior': 'Behavior',
    'Health': 'Mental Health\n& Support',
    'Activities': 'General Parenting'
  }
  
  const allCategories = (topics || []).map(t => ({
    id: t.id,
    name: t.name,
    image: categoryImages[t.name] || '/images/activities.jpg',
    label: categoryLabels[t.name] || t.name
  }))
  
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FBF8F3 0%, #E8F4F8 100%)' }}>
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE8CC 50%, #B8E6E1 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Join Thousands Sharing Parenting Tips and Experiences
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Ask questions, share stories, and connect with a supportive community.
              </p>
              <div className="flex flex-wrap gap-4">
                <OrangeButton href="/signup" className="font-bold px-8 py-3.5 text-lg shadow-md">
                  Sign Up Free
                </OrangeButton>
                <Link href="/topics">
                  <button className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3.5 rounded-lg font-semibold text-lg transition-colors border-2 border-gray-300 shadow-md">
                    Browse Questions
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-96 h-96">
                <Image 
                  src="/images/hero-family.jpg"
                  alt="Happy Nigerian family - parents with children"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-10">
          Explore Categories
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {allCategories.slice(0, 7).map((category) => (
            <Link key={category.id} href={`/topics/${category.id}`}>
              <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all border border-gray-100 cursor-pointer">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <Image 
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight whitespace-pre-line">
                  {category.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Questions */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-10">
          Trending Questions
        </h2>
        
        <div className="space-y-6">
          {questionsWithCounts && questionsWithCounts.length > 0 ? (
            questionsWithCounts.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <p className="text-gray-600 text-lg">
                No questions yet. Be the first to ask!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Ready to Join Section */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to join Kekere?
          </h2>
          <p className="text-lg text-gray-600">
            Already a member? <Link href="/login" style={{ color: '#2D9596' }} className="font-semibold hover:underline">Log in</Link>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div className="text-center">
            <div 
              className="text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
              style={{ backgroundColor: '#E86A33' }}
            >
              1
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3">Ask Questions</h3>
            <p className="text-gray-600 leading-relaxed">
              Post your parenting questions and get advice from the community.
            </p>
          </div>
          
          <div className="text-center">
            <div 
              className="text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
              style={{ backgroundColor: '#E86A33' }}
            >
              2
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3">Share Experiences</h3>
            <p className="text-gray-600 leading-relaxed">
              Offer advice, tips, of your own stories to help others.
            </p>
          </div>
          
          <div className="text-center">
            <div 
              className="text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
              style={{ backgroundColor: '#E86A33' }}
            >
              3
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3">Discover Community</h3>
            <p className="text-gray-600 leading-relaxed">
              Explore categories, search questions, and find discussions relevant to you.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <OrangeButton href="/signup" className="font-bold px-12 py-4 text-xl shadow-lg">
            Sign Up Free
          </OrangeButton>
          <p className="mt-6 text-gray-600">
            Already a member? <Link href="/login" style={{ color: '#2D9596' }} className="font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-10 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 text-sm italic mb-6 max-w-3xl mx-auto">
              Kekere is a community forum for Nigerian parents. Share experiences and connect with others. Always consult a healthcare professional for medical advice.
            </p>
            <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600 mb-8">
              <Link href="/about" className="hover:text-gray-900">About</Link>
              <span className="text-gray-300">|</span>
              <Link href="/contact" className="hover:text-gray-900">Contact</Link>
              <span className="text-gray-300">|</span>
              <Link href="/terms" className="hover:text-gray-900">Terms & Privacy</Link>
              <span className="text-gray-300">|</span>
              <Link href="/faq" className="hover:text-gray-900">FAQ</Link>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)' }}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}