import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { QuestionCard } from '@/app/components/QuestionCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function TopicDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const supabase = await createServerSupabaseClient()
  
  const { data: topic } = await supabase
    .from('topics')
    .select('*')
    .eq('id', params.id)
    .single()
  
  if (!topic) {
    notFound()
  }
  
  const { data: questions } = await supabase
    .from('questions')
    .select(`
      *,
      users(id, name, avatar_url),
      topics(name)
    `)
    .eq('topic_id', params.id)
    .order('created_at', { ascending: false })
  
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Kekere
            </Link>
            <Link href="/topics" className="text-gray-700 hover:text-primary-600">
              ← Back to Topics
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{topic.name}</h1>
          <p className="text-lg text-gray-600">{topic.description}</p>
        </div>
        
        <div className="space-y-4">
          {questionsWithCounts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
              <p className="text-gray-600 text-lg mb-4">
                No questions yet in this topic.
              </p>
              <Link 
                href="/ask"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700"
              >
                Be the first to ask!
              </Link>
            </div>
          ) : (
            questionsWithCounts.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}