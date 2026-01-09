import { createServerSupabaseClient } from './lib/supabase/server'
import { Header } from './components/Header'
import { OrangeButton } from './components/ui/OrangeButton'
import { QuestionCard } from './components/QuestionCard'
import Link from 'next/link'
import Image from 'next/image'

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
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
    'Sleep': '/images/sleep.jpg',
    'Feeding': '/images/feeding.jpg',
    'Development': '/images/development.jpg',
    'Behavior': '/images/behavior.jpg',
    'Health': '/images/health.jpg',
    'Activities': '/images/activities.jpg'
  }
  
  const categoryLabels: Record<string, string> = {
    'Sleep': 'Sleep & Routines',
    'Feeding': 'Feeding & Nutrition',
    'Development': 'Development',
    'Behavior': 'Behavior',
    'Health': 'Mental Health\n& Support',
    'Activities': 'General Parenting'
  }
  
  const allCategories = [
    { id: 'pregnancy', name: 'Pregnancy', image: '/images/pregnancy.jpg', label: 'Pregnancy &\nFertility' },
    ...(topics || []).map(t => ({
      id: t.id,
      name: t.name,
      image: categoryImages[t.name] || '/images/activities.jpg',
      label: categoryLabels[t.name] || t.name
    }))
  ]
  
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {allCategories.slice(0, 6).map((category) => (
            <Link key={category.id} href={category.id === 'pregnancy' ? '/topics' : `/topics/${category.id}`}>
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
              Kekere: a community forum. Custom mKoats percond ayperiences and yurions only, if 1 red medical advice.
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
            <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors text-xl font-bold">
              f
            </a>
            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity text-xl" style={{ background: 'linear-gradient(45deg, #833AB4, #FD1D1D, #F77737)' }}>
              📷
            </a>
            <a href="#" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors text-xl">
              🐦
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}