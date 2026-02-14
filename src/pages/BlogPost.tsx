import { useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import { fetchBlog } from "../api/blog"
import type { Blog, BlogSection } from "../types/blog"

const API_BASE = "http://localhost:8000/api"

type BlogEditFormState = {
  title: string
  subheader: string
  description: string
  content: string
  sections: BlogSection[]
  external_url: string
  status: Blog["status"]
  tags: string
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [showSections, setShowSections] = useState(true)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showNewSectionForm, setShowNewSectionForm] = useState(false)
  const [formState, setFormState] = useState<BlogEditFormState>({
    title: "",
    subheader: "",
    description: "",
    content: "",
    sections: [],
    external_url: "",
    status: "draft",
    tags: "",
  })
  const [newSectionDraft, setNewSectionDraft] = useState<BlogSection>({
    id: "",
    title: "",
    level: 2,
    content: "",
    children: [],
  })
  const newSectionTitleRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!slug) return

    fetchBlog(slug)
      .then((data) => {
        setBlog(data)
        setFormState({
          title: data.title,
          subheader: data.subheader ?? "",
          description: data.description,
          content: data.content ?? "",
          sections: data.sections ?? [],
          external_url: data.external_url ?? "",
          status: data.status,
          tags: data.tags?.join(", ") ?? "",
        })
      })
      .finally(() => setLoading(false))
  }, [slug])

  const updateField = <K extends keyof BlogEditFormState>(
    key: K,
    value: BlogEditFormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
  }

  const startEdit = () => {
    setError(null)
    setEditing(true)
    setShowNewSectionForm(false)
  }

  const cancelEdit = () => {
    if (!blog) {
      return
    }

    setError(null)
    setEditing(false)
    setShowNewSectionForm(false)
    setFormState({
      title: blog.title,
      subheader: blog.subheader ?? "",
      description: blog.description,
      content: blog.content ?? "",
      sections: blog.sections ?? [],
      external_url: blog.external_url ?? "",
      status: blog.status,
      tags: blog.tags?.join(", ") ?? "",
    })
    setNewSectionDraft({
      id: "",
      title: "",
      level: 2,
      content: "",
      children: [],
    })
  }

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!slug) {
      return
    }

    if (!formState.title.trim() || !formState.description.trim()) {
      setError("Title and description are required.")
      return
    }

    setSaving(true)
    setError(null)

    const tags = formState.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    const payload = {
      slug,
      title: formState.title.trim(),
      subheader: formState.subheader.trim() || undefined,
      description: formState.description.trim(),
      content: formState.content.trim() || undefined,
      external_url: formState.external_url.trim() || undefined,
      status: formState.status,
      tags: tags.length > 0 ? tags : undefined,
      sections: formState.sections,
    }

    try {
      const res = await fetch(`${API_BASE}/blogs/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Failed to update blog.")
      }

      const updated = (await res.json()) as Blog
      setBlog(updated)
      setFormState({
        title: updated.title,
        subheader: updated.subheader ?? "",
        description: updated.description,
        content: updated.content ?? "",
        sections: updated.sections ?? [],
        external_url: updated.external_url ?? "",
        status: updated.status,
        tags: updated.tags?.join(", ") ?? "",
      })
      setEditing(false)
    } catch (err) {
      console.error("Failed to update blog", err)
      setError(err instanceof Error ? err.message : "Failed to update blog.")
    } finally {
      setSaving(false)
    }
  }

  const handleAddSection = () => {
    setError(null)
    setShowSections(true)
    setShowNewSectionForm(true)
    setTimeout(() => {
      newSectionTitleRef.current?.focus()
    }, 0)
  }

  const updateNewSection = <K extends keyof BlogSection>(
    key: K,
    value: BlogSection[K]
  ) => {
    setNewSectionDraft((prev) => ({ ...prev, [key]: value }))
  }

  const appendNewSection = () => {
    if (!newSectionDraft.title.trim()) {
      setError("New section subtitle is required.")
      return
    }

    const sectionToAdd: BlogSection = {
      id: `section-${Date.now()}`,
      title: newSectionDraft.title.trim(),
      level: newSectionDraft.level,
      content: newSectionDraft.content?.trim() ?? "",
      children: [],
    }

    setFormState((prev) => {
      const next = [...prev.sections, sectionToAdd]
      return { ...prev, sections: next }
    })
    setNewSectionDraft({
      id: "",
      title: "",
      level: 2,
      content: "",
      children: [],
    })
    setShowNewSectionForm(false)
    setError(null)
  }

  const autoResizeTextarea = (element: HTMLTextAreaElement) => {
    element.style.height = "auto"
    element.style.height = `${element.scrollHeight}px`
  }

  useEffect(() => {
    if (!editing) {
      return
    }

    formState.sections.forEach((section) => {
      const node = document.getElementById(`edit-section-content-${section.id}`) as HTMLTextAreaElement | null
      if (node) {
        autoResizeTextarea(node)
      }
    })
  }, [formState.sections, editing])

  if (loading) {
    return <div className="p-20">Loading...</div>
  }

  if (!blog) {
    return <div className="p-20">Blog not found</div>
  }

  if (blog.external_url && !editing) {
    window.location.href = blog.external_url
    return null
  }

  const displayTitle = editing ? formState.title || blog.title : blog.title
  const displaySubheader = editing ? formState.subheader || blog.subheader : blog.subheader
  const displayStatus = editing ? formState.status : blog.status
  const displayTags = editing
    ? formState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : (blog.tags ?? [])
  const updatedOn = new Date(blog.updated_at).toLocaleDateString()
  const hasSections = Boolean(blog.sections && blog.sections.length > 0)

  const renderSections = (sections: BlogSection[]) => {
    return sections.map((section) => {
      const headingClass =
        section.level === 1
          ? "text-3xl font-semibold mt-10"
          : section.level === 2
            ? "text-2xl font-semibold mt-8"
            : "text-xl font-semibold mt-6"

      return (
        <section key={section.id} className="space-y-3">
          <h2 className={headingClass}>{section.title}</h2>
          {section.content && (
            <div className="prose prose-lg max-w-none leading-relaxed">
              <ReactMarkdown>{section.content}</ReactMarkdown>
            </div>
          )}
          {section.children && section.children.length > 0 && (
            <div className="pl-4 border-l border-gray-200">
              {renderSections(section.children)}
            </div>
          )}
        </section>
      )
    })
  }

  return (
    <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-20 space-y-6">
      <header className="border rounded-xl bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {editing ? "Editing Blog" : "Blog Post"}
            </p>
            <h1 className="text-4xl font-bold leading-tight">{displayTitle}</h1>
            {displaySubheader && (
              <p className="text-lg text-gray-600 leading-relaxed">{displaySubheader}</p>
            )}
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="px-2 py-1 border rounded-full">status: {displayStatus}</span>
              <span>updated: {updatedOn}</span>
              {displayTags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {editing ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 border rounded-md text-sm"
                onClick={cancelEdit}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="blog-edit-form"
                className="px-4 py-2 rounded-md bg-black text-white text-sm disabled:opacity-60"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="px-4 py-2 border rounded-md text-sm"
              onClick={startEdit}
            >
              Edit
            </button>
          )}
        </div>
      </header>

      {editing ? (
        <section className="space-y-4">
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 border rounded-md text-sm"
                onClick={handleAddSection}
              >
                + Add Section
              </button>
              <button
                type="button"
                className="px-4 py-2 border rounded-md text-sm"
                onClick={() => setShowSections((prev) => !prev)}
              >
                {showSections ? "Hide Sections" : "Sections"}
              </button>
              <button
                type="button"
                className="px-4 py-2 border rounded-md text-sm"
                onClick={() => setShowAdvanced((prev) => !prev)}
              >
                {showAdvanced ? "Hide Advanced" : "Advanced"}
              </button>
              <button
                type="button"
                className="px-4 py-2 border rounded-md text-sm"
                onClick={() => setPreviewMode((prev) => !prev)}
              >
                {previewMode ? "Hide Preview" : "Preview Content"}
              </button>
            </div>
          </div>
          <div className={`grid gap-4 ${previewMode ? "lg:grid-cols-2" : ""}`}>
            <form id="blog-edit-form" className="grid gap-4" onSubmit={handleSave}>
              <input
                className="rounded-md p-2 bg-white/80"
                value={formState.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="title"
              />
              <input
                className="rounded-md p-2 bg-white/80"
                value={formState.subheader}
                onChange={(event) => updateField("subheader", event.target.value)}
                placeholder="subheader (optional)"
              />
              <textarea
                className="rounded-md p-2 bg-white/80"
                value={formState.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="description"
                rows={2}
              />
              {showSections && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-sm text-gray-600">sections</label>
                  </div>
                  {formState.sections.length === 0 ? (
                    <p className="text-sm text-gray-500">No sections added yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {formState.sections.map((section, index) => (
                        <div key={section.id} className="grid gap-2 py-3 border-b border-gray-200/70 last:border-b-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-gray-500">Subtitle {index + 1}</span>
                            <span className="text-xs px-2 py-1 rounded bg-gray-100">Level {section.level}</span>
                          </div>
                          <p className="text-xs text-gray-500">Existing section (read-only during add).</p>
                          <p className="rounded-md p-2 bg-white/60">{section.title}</p>
                          <textarea
                            id={`edit-section-content-${section.id}`}
                            className="rounded-md p-2 bg-white/80 overflow-hidden resize-none"
                            value={section.content ?? ""}
                            readOnly
                            placeholder="section content"
                            rows={3}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {showNewSectionForm && (
                    <div className="grid gap-2 py-3 border-b border-gray-200/70">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-500">New Section</span>
                        <div className="flex items-center gap-2">
                          <select
                            className="rounded-md p-1 text-xs bg-white/80"
                            value={newSectionDraft.level}
                            onChange={(event) =>
                              updateNewSection("level", Number(event.target.value) as 1 | 2 | 3)
                            }
                          >
                            <option value={1}>Level 1</option>
                            <option value={2}>Level 2</option>
                            <option value={3}>Level 3</option>
                          </select>
                          <button
                            type="button"
                            className="px-2 py-1 text-xs rounded-md text-red-600 bg-red-50"
                            onClick={() => setShowNewSectionForm(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <input
                        ref={newSectionTitleRef}
                        className="rounded-md p-2 bg-white/80"
                        value={newSectionDraft.title}
                        onChange={(event) => updateNewSection("title", event.target.value)}
                        placeholder="Enter subtitle name"
                      />
                      <textarea
                        className="rounded-md p-2 bg-white/80 overflow-hidden resize-none"
                        value={newSectionDraft.content ?? ""}
                        onChange={(event) => updateNewSection("content", event.target.value)}
                        onInput={(event) => autoResizeTextarea(event.currentTarget)}
                        placeholder="section content"
                        rows={3}
                      />
                      <div>
                        <button
                          type="button"
                          className="px-3 py-2 rounded-md text-sm bg-black text-white"
                          onClick={appendNewSection}
                        >
                          Add This Section
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {showAdvanced && (
                <div className="grid gap-3">
                  <textarea
                    className="rounded-md p-2 min-h-40 bg-white/80"
                    value={formState.content}
                    onChange={(event) => updateField("content", event.target.value)}
                    placeholder="markdown content fallback (optional)"
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
            </form>
            {previewMode && (
              <article className="prose max-w-none">
                <ReactMarkdown>{formState.content || "_No content yet_"}</ReactMarkdown>
              </article>
            )}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </section>
      ) : (
        <section className="w-full space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">{blog.description}</p>
          {hasSections ? (
            <div className="space-y-4">{renderSections(blog.sections ?? [])}</div>
          ) : (
            <article className="prose prose-lg max-w-none leading-relaxed">
              <ReactMarkdown>{blog.content ?? ""}</ReactMarkdown>
            </article>
          )}
        </section>
      )}
    </div>
  )
}

export default BlogPost
