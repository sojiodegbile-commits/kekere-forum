'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/Button'
import { deleteQuestion } from '@/app/actions/questions'

export default function QuestionActions({ 
  questionId,
  isOwner 
}: { 
  questionId: string
  isOwner: boolean
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  if (!isOwner) return null

  async function handleDelete() {
    setIsDeleting(true)
    await deleteQuestion(questionId)
  }

  return (
    <div className="flex items-center space-x-3 mt-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting}
      >
        🗑️ Delete
      </Button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-xl font-bold mb-4">Delete Question?</h3>
            <p className="text-gray-600 mb-6">
              This will permanently delete your question and all answers. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}