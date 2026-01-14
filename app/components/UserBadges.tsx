import { Badge } from '@/app/lib/badges'

interface UserBadgesProps {
  badges: Badge[]
  size?: 'sm' | 'md' | 'lg'
}

export default function UserBadges({ badges, size = 'md' }: UserBadgesProps) {
  if (badges.length === 0) return null

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  }

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <div
          key={badge.type}
          className={`inline-flex items-center gap-1 ${badge.color} ${sizeClasses[size]} rounded-full font-medium`}
          title={badge.description}
        >
          <span>{badge.icon}</span>
          <span>{badge.name}</span>
        </div>
      ))}
    </div>
  )
}