import { useParams, Navigate } from "react-router-dom"
import { blogs } from "../data/blogs"
import ReactMarkdown from "react-markdown"

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const blog = blogs.find(b => b.slug === slug)

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-gray-600 mt-4">Blog not found.</p>
      </div>
    )
  }

  // 🔑 External blog → redirect
  if (blog.Url) {
    window.location.href = blog.Url
    return null
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">
        {blog.title}
      </h1>

      <article className="prose prose-lg max-w-none leading-relaxed">
        <ReactMarkdown>
          {blog.content}
        </ReactMarkdown>
      </article>
    </div>
  )
}

export default BlogPost
