'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Image from 'next/image'

interface ImageUploadProps {
  onImageUploaded: (url: string) => void
  currentImages?: string[]
}

export default function ImageUpload({ onImageUploaded, currentImages = [] }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)
      setError('')

      if (!event.target.files || event.target.files.length === 0) {
        return
      }

      const file = event.target.files[0]

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        setUploading(false)
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB')
        setUploading(false)
        return
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('question-images')
        .upload(fileName, file)

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('question-images')
        .getPublicUrl(fileName)

      onImageUploaded(publicUrl)
      setUploading(false)
    } catch (error: any) {
      setError(error.message)
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Add Image (Optional)
        </label>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{uploading ? 'Uploading...' : 'Choose Image'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <span className="text-sm text-gray-500">Max 5MB - JPG, PNG, GIF</span>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {currentImages.map((url, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}