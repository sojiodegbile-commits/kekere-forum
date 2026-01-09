'use client'

import { useState } from 'react'
import { Card } from './ui/Card'
import { Avatar } from './ui/Avatar'
import { Button } from './ui/Button'
import { formatDate } from '@/app/lib/utils'
import { toggleUpvote } from '@/app/actions/votes'

interface AnswerCardProps {
  answer: {
    id: string
    content: string
    created_at: string
    users: {
      id: string
      name: string
      avatar_url: string | null
    }
    upvote_count?: number
    has_upvoted?: boolean
  }
  currentUserId?: string
}

export function AnswerCard({ answer, currentUserId }: AnswerCardProps) {
  const [upvoteCount, setUpvoteCount] = useState(answer.upvote_count || 0)
  const [hasUpvoted, setHasUpvoted] = useState(answer.has_upvoted || false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleUpvote() {
    if (!currentUserId || isLoading) return
    
    setIsLoading(true)
    
    // Optimistic update
    setHasUpvoted(!hasUpvoted)
    setUpvoteCount(prev => hasUpvoted ? prev - 1 : prev + 1)
    
    try {
      await toggleUpvote({ answerId: answer.id })
    } catch (error) {
      // Revert on error
      setHasUpvoted(hasUpvoted)
      setUpvoteCount(answer.upvote_count || 0)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-start space-x-4">
        <Avatar 
          name={answer.users.name} 
          src={answer.users.avatar_url} 
          size="md"
        />
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-medium text-gray-900">{answer.users.name}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">{formatDate(answer.created_at)}</span>
            </div>
          </div>
          
          <p className="text-gray-700 whitespace-pre-wrap mb-4">
            {answer.content}
          </p>
          
          <div className="flex items-center space-x-4">
            <Button
              variant={hasUpvoted ? 'primary' : 'ghost'}
              size="sm"
              onClick={handleUpvote}
              disabled={!currentUserId || isLoading}
            >
              ↑ {upvoteCount}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}