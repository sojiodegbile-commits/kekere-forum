import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  
  // Log all parameters to see what we're receiving
  console.log('Reset password callback params:', Object.fromEntries(requestUrl.searchParams))
  
  const token_hash = requestUrl.searchParams.get('token_hash')
  const token = requestUrl.searchParams.get('token')
  const type = requestUrl.searchParams.get('type')
  const code = requestUrl.searchParams.get('code')

  const supabase = await createServerSupabaseClient()

  // Try different token formats
  if (code) {
    // Handle authorization code
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${requestUrl.origin}/reset-password`)
    }
    console.error('Code exchange error:', error)
  } else if (token_hash && type === 'recovery') {
    // Handle token_hash
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: 'recovery',
    })
    
    if (!error) {
      return NextResponse.redirect(`${requestUrl.origin}/reset-password`)
    }
    console.error('Token hash error:', error)
  } else if (token && type === 'recovery') {
    // Handle plain token
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'recovery',
    })
    
    if (!error) {
      return NextResponse.redirect(`${requestUrl.origin}/reset-password`)
    }
    console.error('Token error:', error)
  }

  // If all attempts fail, redirect to login with error
  return NextResponse.redirect(`${requestUrl.origin}/login?error=Invalid or expired reset link`)
}