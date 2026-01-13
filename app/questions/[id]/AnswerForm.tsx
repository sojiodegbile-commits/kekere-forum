'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createAnswer } from '@/app/actions/answers'
import RichTextEditor from '@/app/components/RichTextEditor'

export default function AnswerForm({ questionId }: { questionId: string }) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('content', content)
    formData.append('question_id', questionId)

    const result = await createAnswer(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setContent('')
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Your Answer
        </label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Share your advice, experience, or thoughts..."
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="px-6 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {loading ? 'Posting...' : 'Post Answer'}
      </button>
    </form>
  )
}