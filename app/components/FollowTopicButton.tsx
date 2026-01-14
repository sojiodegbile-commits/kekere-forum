'use client'

import { useState } from 'react'
import { toggleFollowTopic } from '@/app/actions/topics'

interface FollowTopicButtonProps {
  topicId: string
  initialFollowing: boolean
}

export default function FollowTopicButton({ topicId, initialFollowing }: FollowTopicButtonProps) {
  const [following, setFollowing] = useState(initialFollowing)
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    setLoading(true)
    const result = await toggleFollowTopic(topicId)
    
    if (!result.error) {
      setFollowing(result.following!)
    }
    
    setLoading(false)
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-colors disabled:opacity-50 ${
        following
          ? 'bg-teal text-white hover:bg-teal-dark'
          : 'bg-white text-teal border-2 border-teal hover:bg-teal hover:text-white'
      }`}
    >
      {following ? (
        <>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <span>Following</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
          </svg>
          <span>Follow Topic</span>
        </>
      )}
    </button>
  )
}