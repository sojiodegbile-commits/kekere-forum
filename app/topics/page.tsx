import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import Link from 'next/link'

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

  // Emoji-based category configuration (matching homepage)
  const categoryConfig: Record<string, { icon: string; color: string; bgColor: string; description: string }> = {
    'Pregnancy': { 
      icon: '🤰', 
      color: 'text-warm-beige-dark', 
      bgColor: 'bg-warm-beige-light',
      description: 'Prenatal care, pregnancy journey, and preparing for baby'
    },
    'Sleep': { 
      icon: '😴', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-100',
      description: 'Sleep training, bedtime routines, and solving sleep issues'
    },
    'Feeding': { 
      icon: '🍼', 
      color: 'text-sage-dark', 
      bgColor: 'bg-sage-light',
      description: 'Breastfeeding, formula feeding, weaning, and nutrition'
    },
    'Development': { 
      icon: '🧸', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-100',
      description: 'Milestones, growth tracking, and child development'
    },
    'Behavior': { 
      icon: '🤝', 
      color: 'text-teal-dark', 
      bgColor: 'bg-teal-light',
      description: 'Understanding behavior, tantrums, and social skills'
    },
    'Health': { 
      icon: '❤️', 
      color: 'text-red-600', 
      bgColor: 'bg-red-100',
      description: 'Medical concerns, vaccinations, and wellness'
    },
    'Activities': { 
      icon: '🎨', 
      color: 'text-pink-600', 
      bgColor: 'bg-pink-100',
      description: 'Play ideas, learning activities, and creative fun'
    },
    'Discipline': { 
      icon: '⭐', 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-100',
      description: 'Positive parenting, setting boundaries, and managing behavior'
    },
    'School': { 
      icon: '🎒', 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-100',
      description: 'Education, school readiness, and learning support'
    },
    'Newborns': { 
      icon: '👶', 
      color: 'text-warm-beige-dark', 
      bgColor: 'bg-warm-beige-light',
      description: '0-3 months care, newborn essentials, and early parenting'
    },
    'Toddlers': { 
      icon: '🚼', 
      color: 'text-sage-dark', 
      bgColor: 'bg-sage-light',
      description: '1-3 years parenting, toddler challenges, and development'
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Topics
          </h1>
          <p className="text-xl text-gray-600">
            Explore discussions on all parenting topics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics?.map((topic) => {
            const isFollowing = followedTopicIds.includes(topic.id)
            const config = categoryConfig[topic.name] || { 
              icon: '📌', 
              color: 'text-gray-600', 
              bgColor: 'bg-gray-100',
              description: topic.description || 'Parenting discussions and advice'
            }
            
            return (
              <Link
                key={topic.id}
                href={`/topics/${topic.id}`}
                className="group relative"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 p-6 border border-gray-100">
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
                  
                  {/* Emoji Icon */}
                  <div className={`${config.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                    <span className="text-5xl">{config.icon}</span>
                  </div>
                  
                  {/* Topic Info */}
                  <div className="text-center">
                    <h2 className={`text-2xl font-bold mb-3 ${config.color} group-hover:underline`}>
                      {topic.name}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {config.description}
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