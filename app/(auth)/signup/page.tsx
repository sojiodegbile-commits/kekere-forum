'use client'

import { useState } from 'react'
import { Card } from '@/app/components/ui/Card'
import { signUp } from '@/app/actions/auth'
import Link from 'next/link'

export default function SignupPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    const emailValue = formData.get('email') as string
    setEmail(emailValue)
    
    const result = await signUp(formData)
    
    if (result?.error) {
      setError(result.error)
    } else {
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-4 text-6xl">📧</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Check Your Email
          </h1>
          <p className="text-gray-600 mb-4">
            We've sent a confirmation email to:
          </p>
          <p className="text-primary-600 font-semibold mb-6">
            {email}
          </p>
          <p className="text-gray-600 mb-6">
            Click the link in the email to verify your account and start using Kekere!
          </p>
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create Your Account
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            style={{ backgroundColor: '#E86A33' }}
          >
            Sign Up
          </button>
        </form>
        
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  )
}