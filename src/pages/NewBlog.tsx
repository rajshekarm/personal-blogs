import { useEffect, useRef, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import type { Blog, BlogSection } from "../types/blog"

const API_BASE = "http://localhost:8000/api"

type BlogFormState = {
  slug: string
  title: string
  subheader: string
  description: string
  content: string
  external_url: string
  status: Blog["status"]
  tags: string
  sections: BlogSection[]
}

const EMPTY_FORM: BlogFormState = {
  slug: "",
  title: "",
  subheader: "",
  description: "",
  content: "",
  external_url: "",
  status: "draft",
  tags: "",
  sections: [],
}

const NewBlog = () => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState<BlogFormState>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [showSections, setShowSections] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [pendingFocusSectionId, setPendingFocusSectionId] = useState<string | null>(null)
  const sectionTitleInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const updateField = <K extends keyof BlogFormState>(
    key: K,
    value: BlogFormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
  }

  const toSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formState.title.trim() || !formState.description.trim()) {
      setError("Title and description are required.")
      return
    }

    setSaving(true)
    setError(null)
    setSuccess(null)

    const slug = formState.slug.trim() || toSlug(formState.title)
    if (!slug) {
      setSaving(false)
      setError("Slug is required. Provide a title or set a custom slug in Advanced.")
      return
    }

    const tags = formState.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    const payload = {
      slug,
      title: formState.title.trim(),
      subheader: formState.subheader.trim() || undefined,
      description: formState.description.trim(),
      status: formState.status,
      content: formState.content.trim() || undefined,
      external_url: formState.external_url.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined,
      sections: formState.sections.length > 0 ? formState.sections : undefined,
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

  const handleAddSection = () => {
    setError(null)
    setShowSections(true)

    const sectionId = `section-${Date.now()}`
    const nextSections: BlogSection[] = [
      ...formState.sections,
      {
        id: sectionId,
        title: "",
        level: 2,
        content: "",
        children: [],
      },
    ]

    setFormState((prev) => ({
      ...prev,
      sections: nextSections,
    }))
    setPendingFocusSectionId(sectionId)
  }

  useEffect(() => {
    if (!pendingFocusSectionId) {
      return
    }

    const input = sectionTitleInputRefs.current[pendingFocusSectionId]
    if (input) {
      input.focus()
      setPendingFocusSectionId(null)
    }
  }, [formState.sections, pendingFocusSectionId])

  const updateSection = <K extends keyof BlogSection>(
    index: number,
    key: K,
    value: BlogSection[K]
  ) => {
    setFormState((prev) => {
      const next = [...prev.sections]
      next[index] = { ...next[index], [key]: value }
      return { ...prev, sections: next }
    })
  }

  const removeSection = (index: number) => {
    setFormState((prev) => {
      const next = prev.sections.filter((_, i) => i !== index)
      return { ...prev, sections: next }
    })
  }

  const autoResizeTextarea = (element: HTMLTextAreaElement) => {
    element.style.height = "auto"
    element.style.height = `${element.scrollHeight}px`
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">New Blog</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-4 py-2 border rounded-md text-sm"
            onClick={() => setPreviewMode((prev) => !prev)}
          >
            {previewMode ? "Hide Preview" : "Preview Content"}
          </button>
          <button
            type="button"
            className="px-4 py-2 border rounded-md text-sm"
            onClick={() => navigate("/blogs")}
          >
            Back to Blogs
          </button>
        </div>
      </div>

      <div className={`grid gap-6 ${previewMode ? "xl:grid-cols-2" : ""}`}>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            className="rounded-md p-2 bg-white/80"
            value={formState.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="title"
          />
          <textarea
            className="rounded-md p-2 bg-white/80"
            value={formState.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="description"
            rows={2}
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-1 rounded-md text-sm bg-white/80"
              onClick={() => setShowSections((prev) => !prev)}
            >
              {showSections ? "Hide Sections" : "Sections"}
            </button>
            <button
              type="button"
              className="px-3 py-1 rounded-md text-sm bg-white/80"
              onClick={() => setShowAdvanced((prev) => !prev)}
            >
              {showAdvanced ? "Hide Advanced" : "Advanced"}
            </button>
          </div>

          {showSections && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label className="text-sm text-gray-600">sections</label>
                <button
                  type="button"
                  className="px-3 py-1 rounded-md text-sm bg-white/80"
                  onClick={handleAddSection}
                >
                  + Add Section
                </button>
              </div>
              {formState.sections.length === 0 ? (
                <p className="text-sm text-gray-500">No sections added yet.</p>
              ) : (
                <div className="space-y-3">
                  {formState.sections.map((section, index) => (
                    <div key={section.id} className="grid gap-2 py-3 border-b border-gray-200/70 last:border-b-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-500">Subtitle {index + 1}</span>
                        <div className="flex items-center gap-2">
                          <select
                            className="rounded-md p-1 text-xs bg-white/80"
                            value={section.level}
                            onChange={(event) =>
                              updateSection(index, "level", Number(event.target.value) as 1 | 2 | 3)
                            }
                          >
                            <option value={1}>Level 1</option>
                            <option value={2}>Level 2</option>
                            <option value={3}>Level 3</option>
                          </select>
                          <button
                            type="button"
                            className="px-2 py-1 text-xs rounded-md text-red-600 bg-red-50"
                            onClick={() => removeSection(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Type subtitle name and content for this section.</p>
                      <input
                        className="rounded-md p-2 bg-white/80"
                        value={section.title}
                        onChange={(event) => updateSection(index, "title", event.target.value)}
                        placeholder="Enter subtitle name"
                        ref={(element) => {
                          sectionTitleInputRefs.current[section.id] = element
                        }}
                      />
                      <textarea
                        className="rounded-md p-2 bg-white/80 overflow-hidden resize-none"
                        value={section.content ?? ""}
                        onChange={(event) => updateSection(index, "content", event.target.value)}
                        onInput={(event) => autoResizeTextarea(event.currentTarget)}
                        placeholder="section content"
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {showAdvanced && (
            <div className="grid gap-3 py-2">
              <input
                className="rounded-md p-2 bg-white/80"
                value={formState.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                placeholder="custom slug (optional)"
              />
              <input
                className="rounded-md p-2 bg-white/80"
                value={formState.subheader}
                onChange={(event) => updateField("subheader", event.target.value)}
                placeholder="subheader (optional)"
              />
              <textarea
                className="rounded-md p-2 min-h-40 bg-white/80"
                value={formState.content}
                onChange={(event) => updateField("content", event.target.value)}
                placeholder="markdown content (optional fallback)"
                rows={6}
              />
              <input
                className="rounded-md p-2 bg-white/80"
                value={formState.external_url}
                onChange={(event) => updateField("external_url", event.target.value)}
                placeholder="external url (optional)"
              />
              <input
                className="rounded-md p-2 bg-white/80"
                value={formState.tags}
                onChange={(event) => updateField("tags", event.target.value)}
                placeholder="tags (comma-separated)"
              />
              <select
                className="rounded-md p-2 bg-white/80"
                value={formState.status}
                onChange={(event) => updateField("status", event.target.value as Blog["status"])}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-fit px-5 py-2 rounded-md bg-black text-white disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Creating..." : "Create Blog"}
          </button>
        </form>

        {previewMode && (
          <section className="p-6 rounded-lg bg-white/70">
            <h2 className="text-xl font-semibold mb-3">{formState.title || "Preview"}</h2>
            {formState.subheader && <p className="text-gray-600 mb-4">{formState.subheader}</p>}
            <article className="prose max-w-none">
              <ReactMarkdown>{formState.content || "_No content yet_"}</ReactMarkdown>
            </article>
          </section>
        )}
      </div>

      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
      {success && <p className="text-sm text-green-700 mt-4">{success}</p>}
    </div>
  )
}

export default NewBlog
