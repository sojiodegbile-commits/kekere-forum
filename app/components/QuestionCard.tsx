import Link from 'next/link'
import Avatar from './ui/Avatar'
import { formatDate } from '@/app/lib/utils'

interface QuestionCardProps {
  question: {
    id: string
    title: string
    content: string
    created_at: string
    topics: {
      id: string
      name: string
    }
    users: {
      id: string
      name: string
      avatar_url: string | null
    }
    answers: { count: number }[]
    upvotes: { count: number }[]
  }
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const answerCount = question.answers?.length || 0
  const upvoteCount = question.upvotes?.length || 0

  return (
    <Link href={`/questions/${question.id}`}>
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
            <span>{answerCount} {answerCount === 1 ? 'answer' : 'answers'}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span>{upvoteCount} {upvoteCount === 1 ? 'upvote' : 'upvotes'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}