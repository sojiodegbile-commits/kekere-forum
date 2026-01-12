import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase.auth.exchangeCodeForSession(code)
    
    // Create user profile if it doesn't exist
    if (data.user) {
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()
      
      if (!existingUser) {
        await supabase.from('users').insert({
          id: data.user.id,
          name: data.user.user_metadata?.name || 'User',
          avatar_url: null,
        })
      }
    }
  }

  // Redirect to home page after confirmation
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}