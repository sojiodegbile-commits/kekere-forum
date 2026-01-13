'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/app/lib/supabase/server'
import { sendAnswerNotification } from '@/app/lib/email'

export async function createAnswer(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to answer questions' }
  }

  const content = formData.get('content') as string
  const questionId = formData.get('question_id') as string

  if (!content || !questionId) {
    return { error: 'Missing required fields' }
  }

  // Create the answer
  const { data: answer, error } = await supabase
    .from('answers')
    .insert({
      content,
      question_id: questionId,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Get question details and question author's email
  const { data: question } = await supabase
    .from('questions')
    .select(`
      title,
      user_id,
      users!inner (
        email,
        name
      )
    `)
    .eq('id', questionId)
    .single()

  // Get answerer's name
  const { data: answerer } = await supabase
    .from('users')
    .select('name')
    .eq('id', user.id)
    .single()

  // Send email notification (only if answerer is not the question author)
  if (question && question.user_id !== user.id) {
    const questionAuthorEmail = (question.users as any).email
    const questionAuthorName = (question.users as any).name
    const answererName = answerer?.name || 'A community member'

    // Strip HTML tags for preview
    const plainTextPreview = content.replace(/<[^>]*>/g, '').substring(0, 150)

    const questionUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kekere-forum.vercel.app'}/questions/${questionId}`

    // Send email (don't wait for it, fire and forget)
    sendAnswerNotification({
      to: questionAuthorEmail,
      questionTitle: question.title,
      answerPreview: plainTextPreview,
      answererName,
      questionUrl,
    }).catch(err => console.error('Failed to send notification:', err))
  }

  revalidatePath(`/questions/${questionId}`)
  return { success: true }
}