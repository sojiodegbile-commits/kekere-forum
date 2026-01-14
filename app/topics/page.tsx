import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Browse Parenting Topics',
  description: 'Explore parenting topics including pregnancy, sleep, feeding, development, behavior, health, and activities. Find answers from Nigerian parents.',
  openGraph: {
    title: 'Browse Parenting Topics | Kekere',
    description: 'Explore parenting topics including pregnancy, sleep, feeding, development, and more.',
  },
}

export default async function TopicsPage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: topics } = await supabase
    .from('topics')
    .select('*')
    .order('name')

  // Get user's followed topics
  const { data: { user } } = await supabase.auth.getUser()
  let followedTopicIds: string[] = []
  
  if (user) {
    const { data: follows } = await supabase
      .from('topic_follows')
      .select('topic_id')
      .eq('user_id', user.id)
    
    followedTopicIds = follows?.map(f => f.topic_id) || []
  }

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
    <div className="min-h-screen bg-cream-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Topics
          </h1>
          <p className="text-xl text-gray-600">
            Explore discussions on all parenting topics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics?.map((topic) => {
            const isFollowing = followedTopicIds.includes(topic.id)
            
            return (
              <Link
                key={topic.id}
                href={`/topics/${topic.id}`}
                className="group relative"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
                  {/* Following Badge */}
                  {isFollowing && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal text-white text-xs font-semibold rounded-full shadow-lg">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Following
                      </span>
                    </div>
                  )}
                  
                  <div className="relative h-48">
                    <Image
                      src={categoryImages[topic.name] || '/images/placeholder.jpg'}
                      alt={topic.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {topic.name}
                    </h2>
                    <p className="text-gray-600">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}