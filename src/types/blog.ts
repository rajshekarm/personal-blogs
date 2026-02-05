export type Blog = {
  id: string
  slug: string
  title: string
  description: string

  content?: string
  external_url?: string

  status: "draft" | "published"
  tags?: string[]

  created_at: string
  updated_at: string
}
