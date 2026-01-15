'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is Kekere?",
          a: "Kekere is an online community platform for Nigerian parents to share experiences, ask questions, and support each other through the parenting journey. 'Kekere' means 'little one' in Yoruba."
        },
        {
          q: "Is Kekere free to use?",
          a: "Yes! Kekere is completely free to join and use. You can ask unlimited questions, post answers, and engage with the community at no cost."
        },
        {
          q: "How do I create an account?",
          a: "Click 'Sign Up' at the top of the page, enter your name, email, and password. You'll receive a confirmation email - click the link to verify your account and start using Kekere!"
        },
        {
          q: "Do I need an account to browse questions?",
          a: "No, you can browse questions and answers without an account. However, you need to be logged in to ask questions, post answers, upvote, bookmark, or follow topics."
        }
      ]
    },
    {
      category: "Using Kekere",
      questions: [
        {
          q: "How do I ask a question?",
          a: "Click 'Ask Question' in the header, choose a relevant topic category, write your question title and details (you can format text and add images!), then click 'Post Question'."
        },
        {
          q: "Can I add images to my questions?",
          a: "Yes! When creating a question or answer, you can upload images (up to 5MB each) to help illustrate your situation or provide context."
        },
        {
          q: "What are the topic categories?",
          a: "We have 11 categories covering all stages of parenting: Pregnancy, Newborns, Sleep, Feeding, Development, Toddlers, Discipline, Behavior, Health, School, and Activities."
        },
        {
          q: "How does upvoting work?",
          a: "Click the upvote arrow on helpful questions or answers to show appreciation. Upvotes help highlight the most useful content and contribute to user badges."
        },
        {
          q: "What are bookmarks?",
          a: "Bookmarks let you save questions you want to come back to later. Click the 'Save' button on any question, then access all your saved questions from 'My Bookmarks' in your menu."
        },
        {
          q: "Can I follow specific topics?",
          a: "Yes! Click 'Follow Topic' on any category page to keep track of topics you're most interested in. Followed topics will show a 'Following' badge."
        }
      ]
    },
    {
      category: "Community & Safety",
      questions: [
        {
          q: "What are user badges?",
          a: "Badges recognize active and helpful community members: 'Helpful Parent' (10+ answers), 'Active Member' (5+ questions), 'Community Guide' (25+ contributions), and 'Expert' (50+ upvotes)."
        },
        {
          q: "Can I edit or delete my posts?",
          a: "Yes, you can delete your own questions through the menu (three dots) on your question page. Currently, answers cannot be edited or deleted once posted."
        },
        {
          q: "How do I report inappropriate content?",
          a: "If you see content that violates our guidelines, use the report button on the post or email report@kekere.ng with details. We review all reports promptly."
        },
        {
          q: "Is the advice on Kekere reliable?",
          a: "Kekere provides peer support and shared experiences from real parents. While valuable, this is NOT professional medical advice. Always consult qualified healthcare professionals for medical concerns."
        },
        {
          q: "How is my privacy protected?",
          a: "We take privacy seriously. We don't sell your data, and you control what information you share publicly. See our Privacy Policy for full details."
        }
      ]
    },
    {
      category: "Account & Notifications",
      questions: [
        {
          q: "Will I get email notifications?",
          a: "Yes! You'll receive email notifications when someone answers your question. You can manage notification preferences in your account settings (coming soon)."
        },
        {
          q: "How do I change my profile information?",
          a: "Go to your profile page and click 'Edit Profile' to update your name, bio, or profile picture."
        },
        {
          q: "I forgot my password. What do I do?",
          a: "Click 'Forgot Password' on the login page, enter your email, and we'll send you a reset link. Check your spam folder if you don't see it within a few minutes."
        },
        {
          q: "Can I delete my account?",
          a: "Yes. Contact us at privacy@kekere.ng to request account deletion. We'll remove your personal data, though some posts may remain anonymized for community continuity."
        }
      ]
    },
    {
      category: "Technical Issues",
      questions: [
        {
          q: "The site isn't loading properly. What should I do?",
          a: "Try refreshing the page, clearing your browser cache, or using a different browser. If issues persist, contact us at hello@kekere.ng with details about your device and browser."
        },
        {
          q: "My images won't upload. Why?",
          a: "Images must be under 5MB and in JPG, PNG, or GIF format. If you're still having trouble, try resizing the image or contact support."
        },
        {
          q: "Can I use Kekere on mobile?",
          a: "Absolutely! Kekere is fully responsive and works great on phones and tablets through your mobile browser."
        },
        {
          q: "Is there a Kekere mobile app?",
          a: "Not yet, but it's on our roadmap! For now, you can use Kekere through your mobile browser for a great experience."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-cream-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about Kekere
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-orange mb-6">
                {section.category}
              </h2>
              
              <div className="space-y-4">
                {section.questions.map((faq, faqIndex) => {
                  const globalIndex = sectionIndex * 100 + faqIndex
                  const isOpen = openIndex === globalIndex
                  
                  return (
                    <div key={faqIndex} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full flex items-start justify-between text-left group"
                      >
                        <span className="text-lg font-semibold text-gray-900 group-hover:text-orange transition-colors pr-4">
                          {faq.q}
                        </span>
                        <svg
                          className={`w-6 h-6 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {isOpen && (
                        <div className="mt-3 text-gray-700 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-gradient-to-br from-orange to-teal rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg mb-6">
            Can't find what you're looking for? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-orange font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/topics"
              className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange transition-colors"
            >
              Browse Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}