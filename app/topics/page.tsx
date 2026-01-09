import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { Card } from '@/app/components/ui/Card'
import Link from 'next/link'

export default async function TopicsPage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: topics } = await supabase
    .from('topics')
    .select('*')
    .order('name')
  
  const topicsWithCounts = await Promise.all(
    (topics || []).map(async (t) => {
      const { count } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('topic_id', t.id)
      
      return {
        ...t,
        question_count: count || 0,
      }
    })
  )
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Kekere
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Browse Topics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicsWithCounts.map((topic) => (
            <Link key={topic.id} href={`/topics/${topic.id}`}>
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {topic.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {topic.description}
                </p>
                <p className="text-sm text-gray-500">
                  {topic.question_count} questions
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}