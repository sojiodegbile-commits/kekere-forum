'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/app/lib/supabase/server'

export async function createQuestion(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to ask a question' }
  }
  
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const topicId = formData.get('topic_id') as string
  const imageUrlsJson = formData.get('image_urls') as string
  
  // Parse image URLs
  let imageUrls: string[] = []
  if (imageUrlsJson) {
    try {
      imageUrls = JSON.parse(imageUrlsJson)
    } catch (e) {
      // If parsing fails, ignore images
    }
  }
  
  const { data, error } = await supabase
    .from('questions')
    .insert({
      title,
      content,
      topic_id: topicId,
      user_id: user.id,
      image_urls: imageUrls.length > 0 ? imageUrls : null,
    })
    .select()
    .single()
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/')
  redirect(`/questions/${data.id}`)
}

export async function reportContent(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to report content' }
  }
  
  const targetType = formData.get('targetType') as 'question' | 'answer'
  const targetId = formData.get('targetId') as string
  const reason = formData.get('reason') as string
  
  const { error } = await supabase
    .from('reports')
    .insert({
      user_id: user.id,
      target_type: targetType,
      target_id: targetId,
      reason,
    })
  
  if (error) {
    return { error: error.message }
  }
  
  return { success: true }
}

export async function deleteQuestion(questionId: string) {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in' }
  }
  
  // Verify user owns the question
  const { data: question } = await supabase
    .from('questions')
    .select('user_id')
    .eq('id', questionId)
    .single()
  
  if (question?.user_id !== user.id) {
    return { error: 'You can only delete your own questions' }
  }
  
  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', questionId)
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/')
  redirect('/')
}