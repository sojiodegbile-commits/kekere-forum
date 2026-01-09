import Link from 'next/link'
import { Card } from './ui/Card'
import { Avatar } from './ui/Avatar'
import { formatDate } from '@/app/lib/utils'

interface QuestionCardProps {
  question: {
    id: string
    title: string
    content: string
    created_at: string
    users: {
      id: string
      name: string
      avatar_url: string | null
    }
    topics?: {
      name: string
    }
    upvote_count?: number
    answer_count?: number
  }
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow">
      <Link href={`/questions/${question.id}`}>
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
            {question.title}
          </h3>
          
          {/* Content Preview */}
          <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
            {question.content}
          </p>
          
          {/* Topic Badge */}
          {question.topics && (
            <div>
              <span 
                className="inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                style={{ backgroundColor: '#B8E6E1', color: '#1E5F5E' }}
              >
                {question.topics.name}
              </span>
            </div>
          )}
          
          {/* Bottom Row - User Info & Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-gray-100">
            {/* User Info */}
            <Link 
              href={`/profile/${question.users.id}`} 
              className="flex items-center space-x-2 hover:opacity-80"
              onClick={(e) => e.stopPropagation()}
            >
              <Avatar 
                name={question.users.name} 
                src={question.users.avatar_url} 
                size="sm"
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 min-w-0">
                <span className="font-medium text-gray-900 text-sm truncate">
                  {question.users.name}
                </span>
                <span className="hidden sm:inline text-gray-400">•</span>
                <span className="text-xs sm:text-sm text-gray-500">
                  {formatDate(question.created_at)}
                </span>
              </div>
            </Link>
            
            {/* Stats */}
            <div className="flex items-center space-x-4 text-sm">
              {question.upvote_count !== undefined && (
                <div className="flex items-center space-x-1 text-gray-600">
                  <span className="text-orange-500">❤️</span>
                  <span className="font-semibold">{question.upvote_count}</span>
                </div>
              )}
              {question.answer_count !== undefined && (
                <div className="flex items-center space-x-1 text-gray-600">
                  <span>💬</span>
                  <span className="font-semibold">{question.answer_count}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}