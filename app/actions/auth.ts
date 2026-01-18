'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/app/lib/supabase/server'

export async function signUp(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mykekere.com'}/auth/callback`,
      data: {
        name: name
      }
    }
  })
  
  if (error) {
    return { error: error.message }
  }
  
  // Check if email confirmation is required
  if (data.user && !data.session) {
    // Email confirmation required - user created but not logged in yet
    return { success: true, emailSent: true }
  }
  
  // User logged in successfully (Google OAuth or if confirmation is disabled)
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signIn(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}