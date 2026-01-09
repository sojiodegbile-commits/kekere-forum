import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { createQuestion } from '@/app/actions/questions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AskPage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  const { data: topics } = await supabase
    .from('topics')
    .select('*')
    .order('name')
  
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Ask a Question</h1>
        <p className="text-gray-600 mb-8">
          Get advice and support from the community
        </p>
        
        <Card className="p-8">
          <form action={createQuestion} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Question Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                maxLength={200}
                placeholder="What's your question?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Be specific and concise
              </p>
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Details
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={8}
                placeholder="Provide more context about your question..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Include relevant details that will help others answer
              </p>
            </div>
            
            <div>
              <label htmlFor="topicId" className="block text-sm font-medium text-gray-700 mb-1">
                Topic
              </label>
              <select
                id="topicId"
                name="topicId"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a topic...</option>
                {topics?.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
            
            <Button type="submit" size="lg">
              Post Question
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}