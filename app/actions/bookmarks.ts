'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/app/lib/supabase/server'

export async function toggleBookmark(questionId: string) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to bookmark' }
  }

  // Check if already bookmarked
  const { data: existing } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('question_id', questionId)
    .single()

  if (existing) {
    // Remove bookmark
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', existing.id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath(`/questions/${questionId}`)
    revalidatePath('/bookmarks')
    return { bookmarked: false }
  } else {
    // Add bookmark
    const { error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: user.id,
        question_id: questionId,
      })

    if (error) {
      return { error: error.message }
    }

    revalidatePath(`/questions/${questionId}`)
    revalidatePath('/bookmarks')
    return { bookmarked: true }
  }
}