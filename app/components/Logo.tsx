import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mr-2">
        <path d="M10 35L5 30L10 10L15 5L25 10L30 5L35 10L30 30L25 35L15 30L10 35Z" fill="#E86A33"/>
        <path d="M20 15L25 20L20 30L15 25L20 15Z" fill="#F4A460"/>
      </svg>
      <span className="text-2xl font-bold">
        <span style={{ color: '#E86A33' }}>K</span>
        <span style={{ color: '#2D9596' }}>ekere</span>
      </span>
    </Link>
  )
}