import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/app/lib/utils'
import Avatar from '@/app/components/ui/Avatar'
import AnswerForm from './AnswerForm'
import UpvoteButton from './UpvoteButton'
import QuestionActions from './QuestionActions'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()
  const { data: question } = await supabase
    .from('questions')
    .select('title, content, topics(name)')
    .eq('id', params.id)
    .single()

  if (!question) {
    return {
      title: 'Question Not Found',
    }
  }

  return {
    title: question.title,
    description: question.content.substring(0, 155),
    openGraph: {
      title: question.title,
      description: question.content.substring(0, 155),
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: question.title,
      description: question.content.substring(0, 155),
    },
  }
}

export default async function QuestionPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: question } = await supabase
    .from('questions')
    .select(`
      *,
      topics (id, name),
      users (id, name, avatar_url)
    `)
    .eq('id', params.id)
    .single()

  if (!question) {
    notFound()
  }

  const { count: upvoteCount } = await supabase
    .from('upvotes')
    .select('*', { count: 'exact', head: true })
    .eq('question_id', question.id)

  let hasUpvoted = false
  if (user) {
    const { data: userUpvote } = await supabase
      .from('upvotes')
      .select('id')
      .eq('question_id', question.id)
      .eq('user_id', user.id)
      .single()
    hasUpvoted = !!userUpvote
  }

  const { data: answers } = await supabase
    .from('answers')
    .select(`
      *,
      users (id, name, avatar_url)
    `)
    .eq('question_id', question.id)
    .order('created_at', { ascending: false })

  const answersWithVotes = await Promise.all(
    (answers || []).map(async (answer) => {
      const { count: answerUpvotes } = await supabase
        .from('upvotes')
        .select('*', { count: 'exact', head: true })
        .eq('answer_id', answer.id)

      let answerHasUpvoted = false
      if (user) {
        const { data: userAnswerUpvote } = await supabase
          .from('upvotes')
          .select('id')
          .eq('answer_id', answer.id)
          .eq('user_id', user.id)
          .single()
        answerHasUpvoted = !!userAnswerUpvote
      }

      return {
        ...answer,
        upvoteCount: answerUpvotes || 0,
        hasUpvoted: answerHasUpvoted,
      }
    })
  )

  return (
    <div className="min-h-screen bg-cream-light py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-orange hover:text-orange-dark">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link
            href={`/topics/${question.topics.id}`}
            className="text-orange hover:text-orange-dark"
          >
            {question.topics.name}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-4">
            <Link
              href={`/topics/${question.topics.id}`}
              className="inline-block px-3 py-1 bg-teal-light text-teal text-sm font-medium rounded-full hover:bg-teal hover:text-white transition-colors"
            >
              {question.topics.name}
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {question.title}
          </h1>

          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 whitespace-pre-wrap">{question.content}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Avatar
                name={question.users.name}
                avatarUrl={question.users.avatar_url}
                size="md"
              />
              <div>
                <Link
                  href={`/profile/${question.users.id}`}
                  className="font-medium text-gray-900 hover:text-orange"
                >
                  {question.users.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {formatDate(question.created_at)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <UpvoteButton
                targetId={question.id}
                targetType="question"
                initialCount={upvoteCount || 0}
                initialHasUpvoted={hasUpvoted}
              />
              {user && user.id === question.user_id && (
                <QuestionActions questionId={question.id} />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {answersWithVotes.length} {answersWithVotes.length === 1 ? 'Answer' : 'Answers'}
          </h2>

          {user ? (
            <div className="mb-8">
              <AnswerForm questionId={question.id} />
            </div>
          ) : (
            <div className="mb-8 p-4 bg-cream-light rounded-lg text-center">
              <p className="text-gray-600 mb-4">
                Please log in to post an answer
              </p>
              <Link
                href="/login"
                className="inline-block px-6 py-2 bg-orange text-white font-semibold rounded-lg hover:bg-orange-dark transition-colors"
              >
                Log In
              </Link>
            </div>
          )}

          <div className="space-y-6">
            {answersWithVotes.map((answer) => (
              <div
                key={answer.id}
                className="border-t border-gray-200 pt-6 first:border-t-0 first:pt-0"
              >
                <div className="prose max-w-none mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{answer.content}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={answer.users.name}
                      avatarUrl={answer.users.avatar_url}
                      size="sm"
                    />
                    <div>
                      <Link
                        href={`/profile/${answer.users.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-orange"
                      >
                        {answer.users.name}
                      </Link>
                      <p className="text-xs text-gray-500">
                        {formatDate(answer.created_at)}
                      </p>
                    </div>
                  </div>
                  <UpvoteButton
                    targetId={answer.id}
                    targetType="answer"
                    initialCount={answer.upvoteCount}
                    initialHasUpvoted={answer.hasUpvoted}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}