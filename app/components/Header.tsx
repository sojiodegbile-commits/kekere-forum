import Link from 'next/link'
import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import Logo from './Logo'
import UserMenu from './UserMenu'

export default async function Header() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-sage font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/topics"
              className="text-gray-700 hover:text-sage font-medium transition-colors"
            >
              Categories
            </Link>
            {user && (
              <Link
                href="/bookmarks"
                className="text-gray-700 hover:text-sage font-medium transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
                Bookmarks
              </Link>
            )}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form action="/search" method="get" className="w-full">
              <div className="relative">
                <input
                  type="text"
                  name="q"
                  placeholder="Search questions..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/ask"
                  className="hidden sm:inline-block px-6 py-2 bg-sage text-white font-semibold rounded-lg hover:bg-sage-dark transition-colors"
                >
                  Ask Question
                </Link>
                <Link
                  href="/ask"
                  className="sm:hidden px-4 py-2 bg-sage text-white font-semibold rounded-lg hover:bg-sage-dark transition-colors"
                >
                  Ask
                </Link>
                <UserMenu user={user} />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-sage transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2 bg-sage text-white font-semibold rounded-lg hover:bg-sage-dark transition-colors whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-center gap-6 mb-3">
            <Link
              href="/"
              className="text-gray-700 hover:text-sage font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/topics"
              className="text-gray-700 hover:text-sage font-medium transition-colors"
            >
              Categories
            </Link>
            {user && (
              <Link
                href="/bookmarks"
                className="text-gray-700 hover:text-sage font-medium transition-colors"
              >
                Bookmarks
              </Link>
            )}
          </div>
          
          {/* Mobile Search */}
          <form action="/search" method="get">
            <div className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search questions..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>
        </div>
      </nav>
    </header>
  )
}