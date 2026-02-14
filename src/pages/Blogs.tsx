import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchBlogs } from "../api/blog"
import type { Blog } from "../types/blog"

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBlogs = useCallback(async () => {
    setError(null)
    try {
      const data = await fetchBlogs()
      setBlogs(data)
    } catch (err) {
      console.error("Failed to fetch blogs", err)
      setError("Failed to fetch blogs.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBlogs()
  }, [loadBlogs])

  const openCreateWindow = () => {
    window.open("/blogs/new", "_blank", "noopener,noreferrer")
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-8">
      <section className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Blogs</h1>
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-black text-white"
          onClick={openCreateWindow}
        >
          Add Blog
        </button>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <section>
        {loading ? (
          <div>Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                to={`/blogs/${blog.slug}`}
                className="block p-6 border rounded-lg bg-white hover:bg-gray-50 transition"
              >
                <h2 className="text-2xl font-semibold hover:text-blue-600">{blog.title}</h2>
                <p className="text-gray-600 mt-2">{blog.description}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Blogs
