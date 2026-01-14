import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Avatar from '@/app/components/ui/Avatar'
import { formatDate } from '@/app/lib/utils'

export default async function BookmarksPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user's bookmarked questions
  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select(`
      *,
      questions (
        *,
        topics (id, name),
        users (id, name, avatar_url)
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-cream-light py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📚 My Bookmarks
          </h1>
          <p className="text-gray-600">
            Questions you've saved for later
          </p>
        </div>

        {bookmarks && bookmarks.length > 0 ? (
          <div className="space-y-4">
            {bookmarks.map((bookmark: any) => {
              const question = bookmark.questions
              return (
                <Link key={bookmark.id} href={`/questions/${question.id}`}>
                  <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-teal-light text-teal text-sm font-medium rounded-full">
                        {question.topics.name}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {question.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {question.content.replace(/<[^>]*>/g, '')}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={question.users.name}
                          avatarUrl={question.users.avatar_url}
                          size="sm"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {question.users.name}
                          </span>
                          <p className="text-xs text-gray-500">
                            {formatDate(question.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Saved {formatDate(bookmark.created_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Bookmarks Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start bookmarking questions to save them for later!
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-dark transition-colors"
            >
              Browse Questions
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}