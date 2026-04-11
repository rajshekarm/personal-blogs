export type BlogSection = {
  id: string
  title: string
  level: 1 | 2 | 3
  content?: string
  image_url?: string
  image_alt?: string
  children?: BlogSection[]
}

export type Blog = {
  id: string
  slug: string
  title: string
  subheader?: string
  description: string

  content?: string
  external_url?: string

  blog_type: "AI" | "Hardware" | "Physics" | "Software Engineering"
  status: "draft" | "published"
  tags?: string[]
  sections?: BlogSection[]

  created_at: string
  updated_at: string
}
