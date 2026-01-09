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
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <Link href={`/profile/${question.users.id}`} className="cursor-pointer">
          <Avatar 
            name={question.users.name} 
            src={question.users.avatar_url} 
            size="md"
          />
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link href={`/questions/${question.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer">
              {question.title}
            </h3>
          </Link>
          <p className="text-gray-600 line-clamp-2 mb-3">
            {question.content}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <Link href={`/profile/${question.users.id}`} className="font-medium hover:text-primary-600 cursor-pointer">
              {question.users.name}
            </Link>
            <span>•</span>
            <span>{formatDate(question.created_at)}</span>
            {question.topics && (
              <>
                <span>•</span>
                <span className="text-primary-600">{question.topics.name}</span>
              </>
            )}
            {question.upvote_count !== undefined && (
              <>
                <span>•</span>
                <span>{question.upvote_count} upvotes</span>
              </>
            )}
            {question.answer_count !== undefined && (
              <>
                <span>•</span>
                <span>{question.answer_count} answers</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}