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
          {topics?.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="relative h-48">
                  <Image
                    src={categoryImages[topic.name] || '/images/placeholder.jpg'}
                    alt={topic.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
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
          ))}
        </div>
      </div>
    </div>
  )
}