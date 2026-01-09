import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { Card } from '@/app/components/ui/Card'
import { Avatar } from '@/app/components/ui/Avatar'
import { formatDate } from '@/app/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ProfilePage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const supabase = await createServerSupabaseClient()
  
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', params.id)
    .single()
  
  if (!profile) {
    notFound()
  }
  
  // Fetch user's questions
  const { data: questions } = await supabase
    .from('questions')
    .select(`
      *,
      users(id, name, avatar_url),
      topics(name)
    `)
    .eq('user_id', params.id)
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
  
  // Fetch user's answer count
  const { count: answerCount } = await supabase
    .from('answers')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', params.id)
  
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex items-start space-x-6">
            <Avatar 
              name={profile.name} 
              src={profile.avatar_url} 
              size="lg"
            />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profile.name}
              </h1>
              <p className="text-gray-600 mb-4">
                Member since {formatDate(profile.created_at)}
              </p>
              
              <div className="flex space-x-6 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">
                    {questionsWithCounts.length}
                  </span>
                  <span className="text-gray-600 ml-1">
                    {questionsWithCounts.length === 1 ? 'question' : 'questions'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    {answerCount || 0}
                  </span>
                  <span className="text-gray-600 ml-1">
                    {answerCount === 1 ? 'answer' : 'answers'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* User's Questions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Questions
          </h2>
          
          <div className="space-y-4">
            {questionsWithCounts.length === 0 ? (
              <p className="text-gray-600 text-center py-12">
                No questions posted yet
              </p>
            ) : (
              questionsWithCounts.map((question) => (
                <Link key={question.id} href={`/questions/${question.id}`}>
                  <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <Avatar 
                        name={question.users.name} 
                        src={question.users.avatar_url} 
                        size="md"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600">
                          {question.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2 mb-3">
                          {question.content}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="font-medium">{question.users.name}</span>
                          <span>•</span>
                          <span>{formatDate(question.created_at)}</span>
                          {question.topics && (
                            <>
                              <span>•</span>
                              <span className="text-primary-600">{question.topics.name}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{question.upvote_count || 0} upvotes</span>
                          <span>•</span>
                          <span>{question.answer_count || 0} answers</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}