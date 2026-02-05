import type { Blog } from "../types/blog"

const API_BASE = "http://localhost:8000/api"

export async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch(`${API_BASE}/blogs/`)
  if (!res.ok) {
    throw new Error("Failed to fetch blogs")
  }
  return res.json()
}

export async function fetchBlog(slug: string): Promise<Blog> {
  const res = await fetch(`${API_BASE}/blogs/${slug}`)
  if (!res.ok) {
    throw new Error("Blog not found")
  }
  return res.json()
}
