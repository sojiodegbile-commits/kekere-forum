import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { Card } from '@/app/components/ui/Card'
import { Avatar } from '@/app/components/ui/Avatar'
import { Button } from '@/app/components/ui/Button'
import { AnswerCard } from '@/app/components/AnswerCard'
import { formatDate } from '@/app/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AnswerForm from './AnswerForm'
import UpvoteButton from './UpvoteButton'
import QuestionActions from './QuestionActions'

export default async function QuestionPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: question } = await supabase
    .from('questions')
    .select(`
      *,
      users(id, name, avatar_url),
      topics(id, name)
    `)
    .eq('id', params.id)
    .single()
  
  if (!question) {
    notFound()
  }
  
  // Fetch upvote count and user's upvote status
  const { count: upvoteCount } = await supabase
    .from('upvotes')
    .select('*', { count: 'exact', head: true })
    .eq('question_id', params.id)
  
  let hasUpvoted = false
  if (user) {
    const { data: userUpvote } = await supabase
      .from('upvotes')
      .select('*')
      .eq('question_id', params.id)
      .eq('user_id', user.id)
      .maybeSingle()
    
    hasUpvoted = !!userUpvote
  }
  
  const { data: answers } = await supabase
    .from('answers')
    .select(`
      *,
      users(id, name, avatar_url)
    `)
    .eq('question_id', params.id)
    .order('created_at', { ascending: false })
  
  // Fetch answer upvote counts and user's upvote status
  const answersWithData = await Promise.all(
    (answers || []).map(async (answer) => {
      const { count } = await supabase
        .from('upvotes')
        .select('*', { count: 'exact', head: true })
        .eq('answer_id', answer.id)
      
      let hasUpvoted = false
      if (user) {
        const { data: userUpvote } = await supabase
          .from('upvotes')
          .select('*')
          .eq('answer_id', answer.id)
          .eq('user_id', user.id)
          .maybeSingle()
        
        hasUpvoted = !!userUpvote
      }
      
      return {
        ...answer,
        upvote_count: count || 0,
        has_upvoted: hasUpvoted,
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <Avatar 
              name={question.users.name} 
              src={question.users.avatar_url} 
              size="lg"
            />
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <span className="font-medium text-gray-900">{question.users.name}</span>
                <span>•</span>
                <span>{formatDate(question.created_at)}</span>
                {question.topics && (
                  <>
                    <span>•</span>
                    <span className="text-primary-600">{question.topics.name}</span>
                  </>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {question.title}
              </h1>
              
              <p className="text-gray-700 whitespace-pre-wrap mb-6">
                {question.content}
              </p>
              
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-4">
                  <UpvoteButton 
                    questionId={question.id}
                    initialCount={upvoteCount || 0}
                    initialUpvoted={hasUpvoted}
                    isLoggedIn={!!user}
                  />
                </div>
                
                <QuestionActions 
                  questionId={question.id}
                  isOwner={user?.id === question.user_id}
                />
              </div>
            </div>
          </div>
        </Card>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {answersWithData?.length || 0} {answersWithData?.length === 1 ? 'Answer' : 'Answers'}
          </h2>
          
          <div className="space-y-4">
            {answersWithData && answersWithData.length > 0 ? (
              answersWithData.map((answer) => (
                <AnswerCard 
                  key={answer.id} 
                  answer={answer}
                  currentUserId={user?.id}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-12">
                No answers yet. Be the first to help!
              </p>
            )}
          </div>
        </div>
        
        {user ? (
          <AnswerForm questionId={question.id} />
        ) : (
          <Card className="p-6 text-center">
            <p className="text-gray-600 mb-4">
              Log in to post an answer
            </p>
            <Link href="/login">
              <Button>Log In</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
}