'use client'

import { useState } from 'react'
import { toggleBookmark } from '@/app/actions/bookmarks'

interface BookmarkButtonProps {
  questionId: string
  initialBookmarked: boolean
}

export default function BookmarkButton({ questionId, initialBookmarked }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked)
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    setLoading(true)
    const result = await toggleBookmark(questionId)
    
    if (!result.error) {
      setBookmarked(result.bookmarked!)
    }
    
    setLoading(false)
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
      title={bookmarked ? 'Remove bookmark' : 'Bookmark this question'}
    >
      {bookmarked ? (
        <>
          <svg className="w-5 h-5 text-orange fill-current" viewBox="0 0 24 24">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
          <span>Saved</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
          </svg>
          <span>Save</span>
        </>
      )}
    </button>
  )
}