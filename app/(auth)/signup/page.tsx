'use server'

import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  // Try to sign up - Supabase will handle duplicate email check
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    // Check if it's a duplicate user error
    if (error.message.includes('already registered') || error.message.includes('already been registered')) {
      return { 
        error: 'An account with this email already exists. Please log in instead.' 
      }
    }
    return { error: error.message }
  }

  return { emailSent: true }
}

export async function signIn(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/')
}

export async function signOut() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/')
}