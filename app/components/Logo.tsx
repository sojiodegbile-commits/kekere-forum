import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <span className="text-3xl group-hover:scale-110 transition-transform">👶</span>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-sage group-hover:text-sage-dark transition-colors">
          Kekere
        </span>
        <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
          Nigerian Parents Community
        </span>
      </div>
    </Link>
  )
}