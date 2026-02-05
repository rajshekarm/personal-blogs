import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { fetchBlog } from "../api/blog"
import type { Blog } from "../types/blog"

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    fetchBlog(slug)
      .then(setBlog)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div className="p-20">Loading...</div>
  }

  if (!blog) {
    return <div className="p-20">Blog not found</div>
  }

  if (blog.external_url) {
    window.location.href = blog.external_url
    return null
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">
        {blog.title}
      </h1>

      <article className="prose prose-lg max-w-none leading-relaxed">
        <ReactMarkdown>
          {blog.content ?? ""}
        </ReactMarkdown>
      </article>
    </div>
  )
}

export default BlogPost
