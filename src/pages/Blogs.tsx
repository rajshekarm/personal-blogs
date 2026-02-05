import { useEffect, useState } from "react"
import { fetchBlogs } from "../api/blog"
import type { Blog } from "../types/blog"
import { Link } from "react-router-dom"

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
      .then(setBlogs)
      .catch((err) => {
        console.error("Failed to fetch blogs", err)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="p-20">Loading blogs...</div>
  }

  if (blogs.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-10">Blogs</h1>
        <p className="text-gray-500">No blogs found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">Blogs</h1>

      <div className="space-y-6">
        {blogs.map((blog) => {
          const isExternal = !!blog.external_url

          const Card = (
            <div className="block p-6 border rounded-lg hover:bg-gray-50 transition group">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold group-hover:text-blue-600">
                  {blog.title}
                </h2>

                {isExternal && (
                  <span className="text-xs text-gray-400">Medium ↗</span>
                )}
              </div>

              <p className="text-gray-600 mt-2">
                {blog.description}
              </p>

              <div className="mt-4 text-sm text-gray-400">
                {isExternal ? "Read on Medium →" : "Read more →"}
              </div>
            </div>
          )

          return isExternal ? (
            <a
              key={blog.slug}
              href={blog.external_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {Card}
            </a>
          ) : (
            <Link
              key={blog.slug}
              to={`/blogs/${blog.slug}`}
            >
              {Card}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Blogs
