import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    title: "2025 Real Estate Market Trends",
    excerpt: "Discover the key trends shaping the housing market this year, from interest rate shifts to emerging neighborhood hotspots and sustainable living preferences.",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80",
    date: "Mar 15, 2025",
    author: "Alex Thompson",
    slug: "market-trends-2025",
    category: "Market Insights",
    readTime: "5 min read",
  },
  {
    title: "A Complete Guide to First-Time Home Buying",
    excerpt: "Everything you need to know before making your first property purchase, from budgeting and mortgages to home inspections and closing the deal.",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    date: "Feb 28, 2025",
    author: "Maria Garcia",
    slug: "first-time-home-buying-guide",
    category: "Buying Guide",
    readTime: "8 min read",
  },
  {
    title: "Smart Renovations That Boost Property Value",
    excerpt: "Strategic home improvements that deliver the highest return on investment, from kitchen updates to curb appeal enhancements and energy-efficient upgrades.",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    date: "Feb 10, 2025",
    author: "David Park",
    slug: "maximizing-property-value",
    category: "Investment",
    readTime: "6 min read",
  },
  {
    title: "Top Neighborhoods for Young Professionals",
    excerpt: "Discover the most vibrant and affordable neighborhoods across the country that offer the perfect blend of career opportunities, culture, and community.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    date: "Jan 25, 2025",
    author: "Sarah Mitchell",
    slug: "neighborhoods-young-professionals",
    category: "Location Guides",
    readTime: "7 min read",
  },
  {
    title: "Understanding Mortgage Options in 2025",
    excerpt: "A comprehensive breakdown of current mortgage products, interest rate trends, and financing strategies for homebuyers at every stage.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    date: "Jan 12, 2025",
    author: "James Rodriguez",
    slug: "mortgage-options-2025",
    category: "Finance",
    readTime: "10 min read",
  },
  {
    title: "The Rise of Smart Homes: What Buyers Want",
    excerpt: "How smart home technology is reshaping buyer preferences and adding value to modern properties across the real estate market.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    date: "Dec 20, 2024",
    author: "Emily Chen",
    slug: "smart-home-trends",
    category: "Market Insights",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-navy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white">Our Blog</h1>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Expert insights, market analysis, and advice from our real estate professionals
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="card bg-white rounded-box border border-gray-light overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                  <figure className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge bg-navy text-white text-xs border-none">{post.category}</span>
                    </div>
                  </figure>
                  <div className="p-5 flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-xs text-gray">
                      <span>{post.date}</span>
                      <span>&middot;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-heading text-lg text-navy group-hover:text-gold transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-3 mt-2 pt-3 border-t border-gray-light">
                      <p className="text-xs font-medium text-navy">{post.author}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
