'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/app/lib/supabase/server'

export async function toggleUpvote({ 
  questionId, 
  answerId 
}: { 
  questionId?: string
  answerId?: string
}) {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to upvote' }
  }
  
  const { data: existing } = await supabase
    .from('upvotes')
    .select('*')
    .eq('user_id', user.id)
    .eq(questionId ? 'question_id' : 'answer_id', questionId || answerId)
    .maybeSingle()
  
  if (existing) {
    await supabase
      .from('upvotes')
      .delete()
      .eq('id', existing.id)
  } else {
    await supabase
      .from('upvotes')
      .insert({
        user_id: user.id,
        question_id: questionId || null,
        answer_id: answerId || null,
      })
  }
  
  if (questionId) {
    revalidatePath(`/questions/${questionId}`)
  }
  
  return { success: true }
}