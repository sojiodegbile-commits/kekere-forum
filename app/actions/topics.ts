'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/app/lib/supabase/server'

export async function toggleFollowTopic(topicId: string) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to follow topics' }
  }

  // Check if already following
  const { data: existing } = await supabase
    .from('topic_follows')
    .select('id')
    .eq('user_id', user.id)
    .eq('topic_id', topicId)
    .single()

  if (existing) {
    // Unfollow
    const { error } = await supabase
      .from('topic_follows')
      .delete()
      .eq('id', existing.id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath(`/topics/${topicId}`)
    revalidatePath('/')
    return { following: false }
  } else {
    // Follow
    const { error } = await supabase
      .from('topic_follows')
      .insert({
        user_id: user.id,
        topic_id: topicId,
      })

    if (error) {
      return { error: error.message }
    }

    revalidatePath(`/topics/${topicId}`)
    revalidatePath('/')
    return { following: true }
  }
}