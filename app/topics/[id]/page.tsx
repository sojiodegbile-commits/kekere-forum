import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Avatar from '@/app/components/ui/Avatar'
import { formatDate } from '@/app/lib/utils'
import FollowTopicButton from '@/app/components/FollowTopicButton'

export const metadata = {
  title: 'Browse Topic',
  description: 'Explore questions in this parenting topic',
}

export default async function TopicDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createServerSupabaseClient()

  // Get topic
  const { data: topic } = await supabase
    .from('topics')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!topic) {
    notFound()
  }

  // Check if user is following this topic
  let isFollowing = false
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data: follow } = await supabase
      .from('topic_follows')
      .select('id')
      .eq('user_id', user.id)
      .eq('topic_id', topic.id)
      .single()
    isFollowing = !!follow
  }

  // Get questions for this topic
  const { data: questions } = await supabase
    .from('questions')
    .select(`
      *,
      topics (id, name),
      users (id, name, avatar_url)
    `)
    .eq('topic_id', params.id)
    .order('created_at', { ascending: false })

  // Get counts for each question
  const questionsWithCounts = await Promise.all(
    (questions || []).map(async (question) => {
      const { count: answerCount } = await supabase
        .from('answers')
        .select('*', { count: 'exact', head: true })
        .eq('question_id', question.id)

      const { count: upvoteCount } = await supabase
        .from('upvotes')
        .select('*', { count: 'exact', head: true })
        .eq('question_id', question.id)

      return {
        ...question,
        answerCount: answerCount || 0,
        upvoteCount: upvoteCount || 0,
      }
    })
  )

  return (
    <div className="min-h-screen bg-cream-light py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-orange hover:text-orange-dark">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/topics" className="text-orange hover:text-orange-dark">
            Topics
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{topic.name}</span>
        </div>

        {/* Topic Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {topic.name}
              </h1>
              <p className="text-xl text-gray-600">
                {topic.description}
              </p>
            </div>
            {user && (
              <div className="flex-shrink-0">
                <FollowTopicButton
                  topicId={topic.id}
                  initialFollowing={isFollowing}
                />
              </div>
            )}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questionsWithCounts && questionsWithCounts.length > 0 ? (
            questionsWithCounts.map((question) => (
              <Link key={question.id} href={`/questions/${question.id}`}>
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer">
                  {/* Topic Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-teal-light text-teal text-sm font-medium rounded-full">
                      {question.topics.name}
                    </span>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {question.title}
                  </h3>

                  {/* Question Content Preview */}
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
                    {question.content.replace(/<[^>]*>/g, '')}
                  </p>

                  {/* User Info Row */}
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar
                      name={question.users.name}
                      avatarUrl={question.users.avatar_url}
                      size="sm"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {question.users.name}
                      </span>
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {formatDate(question.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{question.answerCount} {question.answerCount === 1 ? 'answer' : 'answers'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      <span>{question.upvoteCount} {question.upvoteCount === 1 ? 'upvote' : 'upvotes'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">💭</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No questions yet
              </h2>
              <p className="text-gray-600 mb-6">
                Be the first to ask a question in this topic!
              </p>
              <Link
                href="/ask"
                className="inline-block px-6 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-dark transition-colors"
              >
                Ask a Question
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}