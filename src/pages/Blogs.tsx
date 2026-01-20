// Remove Link import, you don't need it anymore
// import { Link } from "react-router-dom" 
import { blogs } from "../data/blogs"

const Blogs = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">Blogs</h1>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <a
            key={blog.slug}
            href={blog.Url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 border rounded-lg hover:bg-gray-50 transition group"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">
                {blog.title}
              </h2>
              {/* Optional: An icon to show it leaves the site */}
              <svg 
                className="w-5 h-5 text-gray-400 group-hover:text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            
            <p className="text-gray-600 mt-2">
              {blog.description}
            </p>
            
            <div className="mt-4 text-sm text-gray-400">
              Read on Medium &rarr;
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Blogs