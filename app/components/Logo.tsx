import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <span className="text-3xl group-hover:scale-110 transition-transform">👶</span>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold text-sage group-hover:text-sage-dark transition-colors">
          Kekere
        </span>
        <span className="text-[10px] text-gray-500 mt-0.5 hidden sm:block">
          Nigerian Parents Community
        </span>
      </div>
    </Link>
  )
}