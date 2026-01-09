'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/app/lib/supabase/server'

export async function createAnswer(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to post an answer' }
  }
  
  const content = formData.get('content') as string
  const questionId = formData.get('questionId') as string
  
  const { error } = await supabase
    .from('answers')
    .insert({
      content,
      question_id: questionId,
      user_id: user.id,
    })
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath(`/questions/${questionId}`)
  return { success: true }
}