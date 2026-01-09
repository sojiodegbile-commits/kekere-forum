import { Card } from '@/app/components/ui/Card'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Forgot Password?
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email and we'll send you a reset link
        </p>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="your.email@example.com"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            style={{ backgroundColor: '#E86A33' }}
          >
            Send Reset Link
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-primary-600 hover:text-primary-700">
            ← Back to login
          </Link>
        </div>
      </Card>
    </div>
  )
}