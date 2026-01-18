import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createServerSupabaseClient()
    
    // Exchange code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(new URL('/login?error=confirmation_failed', requestUrl.origin))
    }
    
    // Create user profile if it doesn't exist
    if (data.user) {
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()
      
      if (!existingUser) {
        const userName = data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User'
        
        await supabase.from('users').insert({
          id: data.user.id,
          name: userName,
          avatar_url: data.user.user_metadata?.avatar_url || null,
        })
        
        // Set welcome cookie for new users
        const cookieStore = await cookies()
        cookieStore.set('welcome_user', userName, { 
          maxAge: 10, // Cookie expires in 10 seconds
          path: '/' 
        })
      }
    }
  }

  // Redirect to home page after successful confirmation
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}