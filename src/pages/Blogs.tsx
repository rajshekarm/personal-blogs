import { Link } from "react-router-dom"
import { blogs } from "../data/blogs"

const Blogs = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">Blogs</h1>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            to={`/blogs/${blog.slug}`}
            className="block p-6 border rounded-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-2xl font-semibold">
              {blog.title}
            </h2>
            <p className="text-gray-600 mt-2">
              {blog.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blogs
