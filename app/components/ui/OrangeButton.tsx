'use client'

import Link from 'next/link'

interface OrangeButtonProps {
  href?: string
  children: React.ReactNode
  className?: string
}

export function OrangeButton({ href, children, className = '' }: OrangeButtonProps) {
  const buttonClass = `text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-base ${className}`
  
  const button = (
    <button 
      className={buttonClass}
      style={{ backgroundColor: '#E86A33' }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D55E2A'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E86A33'}
    >
      {children}
    </button>
  )
  
  if (href) {
    return <Link href={href}>{button}</Link>
  }
  
  return button
}