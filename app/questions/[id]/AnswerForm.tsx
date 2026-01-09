'use client'

import { useState } from 'react'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { createAnswer } from '@/app/actions/answers'

export default function AnswerForm({ questionId }: { questionId: string }) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData()
    formData.append('content', content)
    formData.append('questionId', questionId)
    
    await createAnswer(formData)
    setContent('')
    setIsSubmitting(false)
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Your Answer
      </h3>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minLength={10}
          rows={6}
          placeholder="Share your experience or advice..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
        />
        
        <Button 
          type="submit" 
          disabled={isSubmitting || content.length < 10}
        >
          {isSubmitting ? 'Posting...' : 'Post Answer'}
        </Button>
      </form>
    </Card>
  )
}