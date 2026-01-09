'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/Button'
import { toggleUpvote } from '@/app/actions/votes'

export default function UpvoteButton({ 
  questionId,
  initialCount,
  initialUpvoted,
  isLoggedIn 
}: { 
  questionId: string
  initialCount: number
  initialUpvoted: boolean
  isLoggedIn: boolean
}) {
  const [upvoteCount, setUpvoteCount] = useState(initialCount)
  const [hasUpvoted, setHasUpvoted] = useState(initialUpvoted)
  const [isLoading, setIsLoading] = useState(false)

  async function handleUpvote() {
    if (!isLoggedIn || isLoading) return
    
    setIsLoading(true)
    
    // Optimistic update
    setHasUpvoted(!hasUpvoted)
    setUpvoteCount(prev => hasUpvoted ? prev - 1 : prev + 1)
    
    try {
      await toggleUpvote({ questionId })
    } catch (error) {
      // Revert on error
      setHasUpvoted(hasUpvoted)
      setUpvoteCount(initialCount)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={hasUpvoted ? 'primary' : 'ghost'}
      size="sm"
      onClick={handleUpvote}
      disabled={!isLoggedIn || isLoading}
    >
      ↑ {upvoteCount} {upvoteCount === 1 ? 'upvote' : 'upvotes'}
    </Button>
  )
}