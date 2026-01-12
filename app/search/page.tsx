import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import Link from 'next/link'
import Avatar from '@/app/components/ui/Avatar'
import { formatDate } from '@/app/lib/utils'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; topic?: string; sort?: string }
}) {
  const supabase = await createServerSupabaseClient()
  const query = searchParams.q || ''
  const topicFilter = searchParams.topic || ''
  const sortBy = searchParams.sort || 'recent'

  // Get all topics for filter dropdown
  const { data: topics } = await supabase
    .from('topics')
    .select('*')
    .order('name')

  // Build search query
  let questionsQuery = supabase
    .from('questions')
    .select(`
      *,
      topics (id, name),
      users (id, name, avatar_url)
    `)

  // Apply search filter
  if (query) {
    questionsQuery = questionsQuery.or(`title.ilike.%${query}%,content.ilike.%${query}%`)
  }

  // Apply topic filter
  if (topicFilter) {
    questionsQuery = questionsQuery.eq('topic_id', topicFilter)
  }

  // Apply sorting
  questionsQuery = questionsQuery.order('created_at', { ascending: false })

  const { data: questions } = await questionsQuery

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
    <div className="min-h-screen bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600">
              Found {questionsWithCounts?.length || 0} results for "{query}"
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <form className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search questions..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
              />
            </div>

            {/* Topic Filter */}
            <div className="w-full sm:w-48">
              <select
                name="topic"
                defaultValue={topicFilter}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
              >
                <option value="">All Topics</option>
                {topics?.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="w-full sm:w-48">
              <select
                name="sort"
                defaultValue={sortBy}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-orange text-white font-semibold rounded-lg hover:bg-orange-dark transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {questionsWithCounts && questionsWithCounts.length > 0 ? (
          <div className="space-y-4">
            {questionsWithCounts.map((question) => (
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
                    {question.content}
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
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No results found
            </h2>
            <p className="text-gray-600 mb-6">
              {query
                ? `No questions match "${query}". Try different keywords.`
                : 'Start searching to find questions from the community.'}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-dark transition-colors"
            >
              Browse All Questions
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}