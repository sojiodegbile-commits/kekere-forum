interface MiniBadgeProps {
  icon: string
  title: string
}

export default function MiniBadge({ icon, title }: MiniBadgeProps) {
  return (
    <span
      className="inline-flex items-center text-xs"
      title={title}
    >
      {icon}
    </span>
  )
}