export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kekere',
    description: 'Nigerian Parenting Community Forum',
    url: 'https://kekere-forum.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kekere-forum.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      suppressHydrationWarning
    />
  )
}