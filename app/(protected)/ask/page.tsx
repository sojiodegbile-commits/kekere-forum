'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createQuestion } from '@/app/actions/questions'
import RichTextEditor from '@/app/components/RichTextEditor'
import ImageUpload from '@/app/components/ImageUpload'

const topics = [
  { id: '1', name: 'Pregnancy' },
  { id: '2', name: 'Sleep' },
  { id: '3', name: 'Feeding' },
  { id: '4', name: 'Development' },
  { id: '5', name: 'Behavior' },
  { id: '6', name: 'Health' },
  { id: '7', name: 'Activities' },
  { id: '8', name: 'Discipline' },
  { id: '9', name: 'School' },
  { id: '10', name: 'Newborns' },
  { id: '11', name: 'Toddlers' },
]

export default function AskQuestionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [topicId, setTopicId] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])

  function handleImageUploaded(url: string) {
    setImageUrls([...imageUrls, url])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('topic_id', topicId)
    formData.append('image_urls', JSON.stringify(imageUrls))

    const result = await createQuestion(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-cream-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ask a Question
          </h1>
          <p className="text-gray-600 mb-8">
            Get advice from the Kekere community
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                Question Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g., How do I get my baby to sleep through the night?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
              />
            </div>

            {/* Topic */}
            <div>
              <label htmlFor="topic" className="block text-sm font-semibold text-gray-900 mb-2">
                Topic *
              </label>
              <select
                id="topic"
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
              >
                <option value="">Select a topic</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Content with Rich Text Editor */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Question Details *
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Describe your question in detail. Use formatting to make it clear..."
              />
            </div>

            {/* Image Upload */}
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              currentImages={imageUrls}
            />

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Posting...' : 'Post Question'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}