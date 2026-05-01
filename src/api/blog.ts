import type { Blog, BlogSection } from "../types/blog"

export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"

type RawBlog = Omit<Partial<Blog>, "blog_type"> & {
  blog_type?: string
}

const normalizeSection = (section: Partial<BlogSection>): BlogSection => ({
  id: section.id ?? `section-${Math.random().toString(36).slice(2, 10)}`,
  title: section.title ?? "Untitled Section",
  level:
    section.level === 1 || section.level === 2 || section.level === 3
      ? section.level
      : 2,
  content: section.content ?? "",
  image_url: section.image_url ?? undefined,
  image_alt: section.image_alt ?? undefined,
  children: Array.isArray(section.children)
    ? section.children.map(normalizeSection)
    : [],
})

const normalizeBlog = (blog: RawBlog): Blog => ({
  id: blog.id ?? "",
  slug: blog.slug ?? "",
  title: blog.title ?? "Untitled Post",
  subheader: blog.subheader ?? undefined,
  description: blog.description ?? "",
  content: blog.content ?? undefined,
  external_url: blog.external_url ?? undefined,
  blog_type:
    blog.blog_type === "Physics"
      ? "Science and Health Tech"
      : blog.blog_type === "Hardware" ||
          blog.blog_type === "Science and Health Tech" ||
          blog.blog_type === "Software Engineering"
        ? blog.blog_type
        : "AI",
  status: blog.status === "draft" ? "draft" : "published",
  tags: Array.isArray(blog.tags) ? blog.tags.filter(Boolean) : [],
  sections: Array.isArray(blog.sections)
    ? blog.sections.map(normalizeSection)
    : [],
  created_at: blog.created_at ?? "",
  updated_at: blog.updated_at ?? blog.created_at ?? "",
})

export async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch(`${API_BASE}/blogs`)
  if (!res.ok) {
    throw new Error("Failed to fetch blogs")
  }
  const data = (await res.json()) as RawBlog[]
  return Array.isArray(data) ? data.map(normalizeBlog) : []
}

export async function fetchBlog(slug: string): Promise<Blog> {
  const res = await fetch(`${API_BASE}/blogs/${slug}`)
  if (!res.ok) {
    throw new Error("Blog not found")
  }
  const data = (await res.json()) as RawBlog
  return normalizeBlog(data)
}
