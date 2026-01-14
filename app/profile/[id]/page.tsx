import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Avatar from '@/app/components/ui/Avatar'
import { formatDate } from '@/app/lib/utils'
import UserBadges from '@/app/components/UserBadges'
import { calculateUserBadges } from '@/app/lib/badges'

export default async function ProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createServerSupabaseClient()

  // Get user profile
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!profile) {
    notFound()
  }

  // Get user's questions
  const { data: questions } = await supabase
    .from('questions')
    .select(`
      *,
      topics (id, name)
    `)
    .eq('user_id', params.id)
    .order('created_at', { ascending: false })
    .limit(10)

  // Get user's answers
  const { data: answers } = await supabase
    .from('answers')
    .select(`
      *,
      questions (id, title)
    `)
    .eq('user_id', params.id)
    .order('created_at', { ascending: false })
    .limit(10)

  // Count total questions and answers
  const { count: questionCount } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', params.id)

  const { count: answerCount } = await supabase
    .from('answers')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', params.id)

  // Count upvotes received on questions
  const { count: questionUpvotes } = await supabase
    .from('upvotes')
    .select('*, questions!inner(user_id)', { count: 'exact', head: true })
    .eq('questions.user_id', params.id)

  // Count upvotes received on answers
  const { count: answerUpvotes } = await supabase
    .from('upvotes')
    .select('*, answers!inner(user_id)', { count: 'exact', head: true })
    .eq('answers.user_id', params.id)

  const totalUpvotes = (questionUpvotes || 0) + (answerUpvotes || 0)

  // Calculate badges
  const badges = await calculateUserBadges(
    questionCount || 0,
    answerCount || 0,
    totalUpvotes
  )

  return (
    <div className="min-h-screen bg-cream-light py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar
              name={profile.name}
              avatarUrl={profile.avatar_url}
              size="lg"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profile.name}
              </h1>
              <p className="text-gray-600 mb-4">
                Member since {formatDate(profile.created_at)}
              </p>

              {/* Badges */}
              <div className="mb-4">
                <UserBadges badges={badges} size="md" />
              </div>

              {/* Stats */}
              <div className="flex justify-center sm:justify-start gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange">
                    {questionCount || 0}
                  </div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal">
                    {answerCount || 0}
                  </div>
                  <div className="text-sm text-gray-600">Answers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {totalUpvotes}
                  </div>
                  <div className="text-sm text-gray-600">Upvotes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Questions */}
        {questions && questions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Questions
            </h2>
            <div className="space-y-4">
              {questions.map((question) => (
                <Link
                  key={question.id}
                  href={`/questions/${question.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-orange transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {question.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-teal-light text-teal rounded-full text-xs">
                          {question.topics.name}
                        </span>
                        <span>•</span>
                        <span>{formatDate(question.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recent Answers */}
        {answers && answers.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Answers
            </h2>
            <div className="space-y-4">
              {answers.map((answer) => (
                <Link
                  key={answer.id}
                  href={`/questions/${answer.questions.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-orange transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm mb-2">
                        Answered: <span className="font-semibold text-gray-900">{answer.questions.title}</span>
                      </p>
                      <div className="text-gray-700 line-clamp-2" dangerouslySetInnerHTML={{ __html: answer.content }} />
                      <div className="mt-2 text-sm text-gray-500">
                        {formatDate(answer.created_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!questions || questions.length === 0) && (!answers || answers.length === 0) && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Activity Yet
            </h2>
            <p className="text-gray-600 mb-6">
              This user hasn't posted any questions or answers yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}