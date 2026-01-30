import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const token = requestUrl.searchParams.get('token')
  const type = requestUrl.searchParams.get('type')

  if (token && type === 'recovery') {
    const supabase = await createServerSupabaseClient()

    // Exchange token for session
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'recovery',
    })

    if (!error) {
      // Redirect to password reset page
      return NextResponse.redirect(`${requestUrl.origin}/reset-password`)
    }
  }

  // If error or no token, redirect to login
  return NextResponse.redirect(`${requestUrl.origin}/login?error=Invalid or expired reset link`)
}