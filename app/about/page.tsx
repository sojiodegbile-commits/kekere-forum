import Link from 'next/link'

export const metadata = {
  title: 'About Kekere',
  description: 'Learn about Kekere - A community forum for Nigerian parents to share experiences, ask questions, and support each other.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About <span className="text-orange">Kekere</span>
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p className="text-xl leading-relaxed">
              Kekere is a vibrant online community designed specifically for Nigerian parents 
              who want to share experiences, seek advice, and support each other through the 
              beautiful journey of parenthood.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p>
              We believe that parenting is a journey best traveled together. Our mission is to 
              create a safe, supportive space where Nigerian parents can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ask questions without judgment</li>
              <li>Share personal experiences and wisdom</li>
              <li>Find culturally relevant advice</li>
              <li>Build lasting connections with other parents</li>
              <li>Access reliable information on child development</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Kekere?</h2>
            <p>
              "Kekere" means "small" or "little one" in Yoruba - a term of endearment used 
              across Nigeria for our precious children. We chose this name to reflect the 
              warmth, love, and cultural pride that Nigerian parents bring to raising their 
              little ones.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-orange-light p-6 rounded-lg">
                <h3 className="font-bold text-lg text-orange mb-2">11 Topic Categories</h3>
                <p className="text-sm">From pregnancy to school years, covering every stage of your parenting journey.</p>
              </div>
              <div className="bg-teal-light p-6 rounded-lg">
                <h3 className="font-bold text-lg text-teal mb-2">Expert Community</h3>
                <p className="text-sm">Learn from experienced parents who've been through it all.</p>
              </div>
              <div className="bg-orange-light p-6 rounded-lg">
                <h3 className="font-bold text-lg text-orange mb-2">Safe Environment</h3>
                <p className="text-sm">Moderated discussions ensuring respectful, helpful interactions.</p>
              </div>
              <div className="bg-teal-light p-6 rounded-lg">
                <h3 className="font-bold text-lg text-teal mb-2">Nigerian Context</h3>
                <p className="text-sm">Advice that understands our culture, challenges, and resources.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Community Guidelines</h2>
            <p>
              Kekere thrives on mutual respect and support. We expect all members to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be kind and supportive in all interactions</li>
              <li>Share advice based on personal experience or reliable sources</li>
              <li>Respect different parenting styles and choices</li>
              <li>Protect the privacy of your family and others</li>
              <li>Report inappropriate content to moderators</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Important Disclaimer</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="text-sm">
                <strong>Medical Advice:</strong> While our community offers valuable peer support 
                and shared experiences, Kekere is not a substitute for professional medical advice. 
                Always consult qualified healthcare professionals for medical concerns about your child.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Join Our Community</h2>
            <p>
              Whether you're expecting your first child, navigating the toddler years, or 
              managing school-age challenges, you'll find a welcoming community here at Kekere.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="inline-block px-8 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-dark transition-colors text-center"
              >
                Join Kekere Today
              </Link>
              <Link
                href="/topics"
                className="inline-block px-8 py-3 bg-white text-orange border-2 border-orange font-semibold rounded-lg hover:bg-orange hover:text-white transition-colors text-center"
              >
                Browse Topics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}