import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchBlogs } from "../api/blog"
import type { Blog } from "../types/blog"

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | Blog["status"]>("all")

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

  useEffect(() => {
    const handleFocus = () => {
      void loadBlogs()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void loadBlogs()
      }
    }

    window.addEventListener("focus", handleFocus)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("focus", handleFocus)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [loadBlogs])

  const openCreateWindow = () => {
    window.open("/blogs/new", "_blank", "noopener,noreferrer")
  }

  const visibleBlogs = blogs
    .filter((blog) => {
      if (statusFilter === "all") {
        return true
      }
      return blog.status === statusFilter
    })
    .filter((blog) => {
      if (!query.trim()) {
        return true
      }
      const search = query.toLowerCase()
      return (
        blog.title.toLowerCase().includes(search) ||
        blog.description.toLowerCase().includes(search) ||
        (blog.subheader ?? "").toLowerCase().includes(search) ||
        (blog.tags ?? []).join(" ").toLowerCase().includes(search)
      )
    })
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Blogs</h1>
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-black text-white"
          onClick={openCreateWindow}
        >
          Add Blog
        </button>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <input
          type="search"
          className="border rounded-md p-2"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title, tags, or description"
        />
        <select
          className="border rounded-md p-2"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as "all" | Blog["status"])}
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <section>
        {loading ? (
          <div>Loading blogs...</div>
        ) : visibleBlogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {visibleBlogs.map((blog) => (
              <Link
                key={blog.slug}
                to={`/blogs/${blog.slug}`}
                className="block p-5 border rounded-lg bg-white hover:bg-gray-50 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold hover:text-blue-600">{blog.title}</h2>
                  <span className="text-xs px-2 py-1 border rounded-full text-gray-600">
                    {blog.status}
                  </span>
                </div>
                {blog.subheader && <p className="text-gray-700">{blog.subheader}</p>}
                <p className="text-gray-600">{blog.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {(blog.tags ?? []).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Blogs
