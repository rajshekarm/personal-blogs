import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import type { Blog } from "../types/blog"

const API_BASE = "http://localhost:8000/api"

type BlogFormState = {
  slug: string
  title: string
  description: string
  content: string
  external_url: string
  status: Blog["status"]
  tags: string
}

const EMPTY_FORM: BlogFormState = {
  slug: "",
  title: "",
  description: "",
  content: "",
  external_url: "",
  status: "draft",
  tags: "",
}

const NewBlog = () => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState<BlogFormState>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const updateField = <K extends keyof BlogFormState>(
    key: K,
    value: BlogFormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formState.slug.trim() || !formState.title.trim() || !formState.description.trim()) {
      setError("Slug, title and description are required.")
      return
    }

    setSaving(true)
    setError(null)
    setSuccess(null)

    const tags = formState.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    const payload = {
      slug: formState.slug.trim(),
      title: formState.title.trim(),
      description: formState.description.trim(),
      status: formState.status,
      content: formState.content.trim() || undefined,
      external_url: formState.external_url.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined,
    }

    try {
      const res = await fetch(`${API_BASE}/blogs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Failed to create blog.")
      }

      setFormState(EMPTY_FORM)
      setSuccess("Blog created successfully.")
    } catch (err) {
      console.error("Failed to create blog", err)
      setError(err instanceof Error ? err.message : "Failed to create blog.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">New Blog</h1>
        <button
          type="button"
          className="px-4 py-2 border rounded-md text-sm"
          onClick={() => navigate("/blogs")}
        >
          Back to Blogs
        </button>
      </div>

      <form className="grid gap-4 p-6 border rounded-lg bg-white" onSubmit={handleSubmit}>
        <input
          className="border rounded-md p-2"
          value={formState.slug}
          onChange={(event) => updateField("slug", event.target.value)}
          placeholder="slug"
        />
        <input
          className="border rounded-md p-2"
          value={formState.title}
          onChange={(event) => updateField("title", event.target.value)}
          placeholder="title"
        />
        <textarea
          className="border rounded-md p-2"
          value={formState.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="description"
          rows={2}
        />
        <textarea
          className="border rounded-md p-2"
          value={formState.content}
          onChange={(event) => updateField("content", event.target.value)}
          placeholder="markdown content"
          rows={8}
        />
        <input
          className="border rounded-md p-2"
          value={formState.external_url}
          onChange={(event) => updateField("external_url", event.target.value)}
          placeholder="external url (optional)"
        />
        <input
          className="border rounded-md p-2"
          value={formState.tags}
          onChange={(event) => updateField("tags", event.target.value)}
          placeholder="tags (comma-separated)"
        />
        <select
          className="border rounded-md p-2"
          value={formState.status}
          onChange={(event) => updateField("status", event.target.value as Blog["status"])}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <button
          type="submit"
          className="w-fit px-5 py-2 rounded-md bg-black text-white disabled:opacity-60"
          disabled={saving}
        >
          {saving ? "Creating..." : "Create Blog"}
        </button>
      </form>

      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
      {success && <p className="text-sm text-green-700 mt-4">{success}</p>}
    </div>
  )
}

export default NewBlog
