import { Resend } from 'resend'
import { AnswerNotificationEmail } from '@/app/emails/AnswerNotification'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAnswerNotification({
  to,
  questionTitle,
  answerPreview,
  answererName,
  questionUrl,
}: {
  to: string
  questionTitle: string
  answerPreview: string
  answererName: string
  questionUrl: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Kekere <onboarding@resend.dev>', // Will use Resend's default domain for now
      to: [to],
      subject: `New answer to your question: "${questionTitle}"`,
      react: AnswerNotificationEmail({
        questionTitle,
        answerPreview,
        answererName,
        questionUrl,
      }),
    })

    if (error) {
      console.error('Error sending email:', error)
      return { error }
    }

    return { data }
  } catch (error) {
    console.error('Error sending email:', error)
    return { error }
  }
}