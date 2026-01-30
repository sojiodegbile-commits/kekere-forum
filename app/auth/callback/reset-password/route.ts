import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')

  const supabase = await createServerSupabaseClient()

  // Try to exchange code for session (if code exists)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Successfully exchanged code - redirect to reset password page
      return NextResponse.redirect(new URL('/reset-password', requestUrl.origin))
    }
  }

  // Try to verify OTP token (if token_hash exists)
  if (token_hash && type === 'recovery') {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: 'recovery',
    })
    
    if (!error) {
      // Successfully verified - redirect to reset password page
      return NextResponse.redirect(new URL('/reset-password', requestUrl.origin))
    }
  }

  // If everything fails, redirect to login with error
  return NextResponse.redirect(new URL('/login?error=Invalid reset link', requestUrl.origin))
}