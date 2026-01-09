import Link from 'next/link'
import { Logo } from './Logo'
import { OrangeButton } from './ui/OrangeButton'
import { UserMenu } from './UserMenu'
import { createServerSupabaseClient } from '@/app/lib/supabase/server'

export async function Header() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile = null
  if (user) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium text-base">
              Home
            </Link>
            <Link href="/topics" className="text-gray-900 hover:text-gray-900 font-semibold text-base">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium text-base">
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user && profile ? (
              <>
                <Link href="/ask" className="hidden sm:block">
                  <OrangeButton className="text-sm sm:text-base px-4 sm:px-6">Ask Question</OrangeButton>
                </Link>
                <UserMenu user={profile} />
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block">
                  <button className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 py-2 font-medium text-sm sm:text-base">
                    Login
                  </button>
                </Link>
                <Link href="/signup" className="hidden sm:block">
                  <button className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 py-2 font-medium text-sm sm:text-base">
                    Sign Up
                  </button>
                </Link>
                <Link href="/signup">
                  <OrangeButton className="text-xs sm:text-base px-3 sm:px-6 py-2 whitespace-nowrap">
                    Join Now
                  </OrangeButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}