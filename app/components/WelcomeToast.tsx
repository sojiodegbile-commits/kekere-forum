'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function WelcomeToast({ userName }: { userName: string }) {
  useEffect(() => {
    // Show welcome toast
    toast.success(`Welcome, ${userName}! 🎉`, {
      duration: 5000,
      style: {
        background: '#8B9D83',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '500',
      },
    })
  }, [userName])

  return null
}