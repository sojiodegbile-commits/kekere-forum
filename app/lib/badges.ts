export type BadgeType = 'helpful_parent' | 'active_member' | 'community_guide' | 'expert'

export interface Badge {
  type: BadgeType
  name: string
  description: string
  icon: string
  color: string
}

export const BADGES: Record<BadgeType, Badge> = {
  helpful_parent: {
    type: 'helpful_parent',
    name: 'Helpful Parent',
    description: '10+ helpful answers',
    icon: '🥇',
    color: 'text-yellow-600 bg-yellow-50',
  },
  active_member: {
    type: 'active_member',
    name: 'Active Member',
    description: '5+ questions posted',
    icon: '🌟',
    color: 'text-blue-600 bg-blue-50',
  },
  community_guide: {
    type: 'community_guide',
    name: 'Community Guide',
    description: '25+ total contributions',
    icon: '💬',
    color: 'text-purple-600 bg-purple-50',
  },
  expert: {
    type: 'expert',
    name: 'Expert',
    description: '50+ upvotes received',
    icon: '🎯',
    color: 'text-orange bg-orange-light',
  },
}

export async function calculateUserBadges(
  questionCount: number,
  answerCount: number,
  upvotesReceived: number
): Promise<Badge[]> {
  const badges: Badge[] = []

  // Helpful Parent: 10+ answers
  if (answerCount >= 10) {
    badges.push(BADGES.helpful_parent)
  }

  // Active Member: 5+ questions
  if (questionCount >= 5) {
    badges.push(BADGES.active_member)
  }

  // Community Guide: 25+ total contributions
  if (questionCount + answerCount >= 25) {
    badges.push(BADGES.community_guide)
  }

  // Expert: 50+ upvotes
  if (upvotesReceived >= 50) {
    badges.push(BADGES.expert)
  }

  return badges
}