export type BlogSection = {
  id: string
  title: string
  level: 1 | 2 | 3
  content?: string
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

  status: "draft" | "published"
  tags?: string[]
  sections?: BlogSection[]

  created_at: string
  updated_at: string
}
