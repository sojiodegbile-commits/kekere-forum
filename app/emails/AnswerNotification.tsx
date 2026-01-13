import * as React from 'react'

interface AnswerNotificationEmailProps {
  questionTitle: string
  answerPreview: string
  answererName: string
  questionUrl: string
}

export const AnswerNotificationEmail: React.FC<AnswerNotificationEmailProps> = ({
  questionTitle,
  answerPreview,
  answererName,
  questionUrl,
}) => (
  <html>
    <head>
      <style>
        {`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #E86A33 0%, #2D9596 100%);
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: white;
          }
          .logo-k {
            color: #FBF8F3;
          }
          .content {
            background: white;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-top: none;
          }
          .question-title {
            font-size: 20px;
            font-weight: bold;
            color: #1f2937;
            margin: 20px 0 10px 0;
          }
          .answer-preview {
            background: #f9fafb;
            padding: 15px;
            border-left: 4px solid #2D9596;
            margin: 20px 0;
            font-style: italic;
            color: #4b5563;
          }
          .answerer {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            background: #E86A33;
            color: white;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
        `}
      </style>
    </head>
    <body>
      <div className="header">
        <div className="logo">
          <span className="logo-k">K</span>ekere
        </div>
      </div>
      <div className="content">
        <h1 style={{ color: '#2D9596', fontSize: '24px' }}>🎉 Someone answered your question!</h1>
        
        <p style={{ fontSize: '16px', color: '#4b5563' }}>
          Great news! Your question on Kekere just received a new answer from the community.
        </p>

        <div className="question-title">"{questionTitle}"</div>
        
        <div className="answerer">Answered by {answererName}</div>

        <div className="answer-preview">
          {answerPreview}...
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href={questionUrl} className="button">
            View Full Answer
          </a>
        </div>

        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '30px' }}>
          Continue the conversation and thank {answererName} for their helpful response!
        </p>
      </div>
      
      <div className="footer">
        <p>You're receiving this because you asked a question on Kekere.</p>
        <p>Kekere - Nigerian Parenting Community</p>
        <p>
          <a href="https://kekere-forum.vercel.app" style={{ color: '#E86A33', textDecoration: 'none' }}>
            Visit Kekere
          </a>
        </p>
      </div>
    </body>
  </html>
)