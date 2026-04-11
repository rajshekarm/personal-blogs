import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react"
import { Link, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { fetchBlog, API_BASE } from "../api/blog"
import type { Blog, BlogSection } from "../types/blog"
import { readSectionImageFile, SECTION_IMAGE_SIZE_LABEL } from "../utils/sectionImage"

type BlogEditFormState = {
  title: string
  subheader: string
  description: string
  content: string
  sections: BlogSection[]
  external_url: string
  blog_type: Blog["blog_type"]
  status: Blog["status"]
  tags: string
}

type SectionLink = {
  id: string
  title: string
  level: BlogSection["level"]
}

const formatDate = (value?: string) => {
  const date = value ? new Date(value) : null

  if (!date || Number.isNaN(date.getTime())) {
    return "Date unavailable"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

const getSectionAnchor = (section: BlogSection) =>
  `${slugify(section.title || "section")}-${section.id}`

const flattenSections = (sections: BlogSection[]): SectionLink[] =>
  sections.flatMap((section) => [
    {
      id: getSectionAnchor(section),
      title: section.title,
      level: section.level,
    },
    ...flattenSections(section.children ?? []),
  ])

const extractWordCount = (blog: Blog) => {
  const sectionText = (blog.sections ?? [])
    .flatMap(function walk(section): string[] {
      return [section.title, section.content ?? "", ...(section.children ?? []).flatMap(walk)]
    })
    .join(" ")

  const content = [blog.title, blog.subheader ?? "", blog.description, blog.content ?? "", sectionText]
    .join(" ")
    .trim()

  if (!content) {
    return 0
  }

  return content.split(/\s+/).length
}

const readingProseClass =
  "prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-[#19252f] prose-p:leading-8 prose-p:text-[#344855] prose-li:leading-8 prose-strong:text-[#19252f] prose-a:text-[#8b5e3c] prose-code:text-[#8b5e3c]"

const normalizeSectionsForSave = (sections: BlogSection[]): BlogSection[] =>
  sections.map((section) => ({
    ...section,
    title: section.title.trim(),
    content: section.content?.trim() ?? "",
    image_url: section.image_url?.trim() || undefined,
    image_alt: section.image_alt?.trim() || undefined,
    children: normalizeSectionsForSave(section.children ?? []),
  }))

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
    blog_type: "AI",
    status: "draft",
    tags: "",
  })
  const [newSectionDraft, setNewSectionDraft] = useState<BlogSection>({
    id: "",
    title: "",
    level: 2,
    content: "",
    image_url: "",
    image_alt: "",
    children: [],
  })
  const newSectionTitleRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      setBlog(null)
      return
    }

    setLoading(true)
    setError(null)

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
          blog_type: data.blog_type,
          status: data.status,
          tags: data.tags?.join(", ") ?? "",
        })
      })
      .catch((err) => {
        console.error("Failed to fetch blog", err)
        setBlog(null)
        setError("Failed to load this blog post.")
      })
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (blog?.external_url && !editing) {
      window.location.assign(blog.external_url)
    }
  }, [blog, editing])

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
      blog_type: blog.blog_type,
      status: blog.status,
      tags: blog.tags?.join(", ") ?? "",
    })
    setNewSectionDraft({
      id: "",
      title: "",
      level: 2,
      content: "",
      image_url: "",
      image_alt: "",
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
      blog_type: formState.blog_type,
      status: formState.status,
      tags: tags.length > 0 ? tags : undefined,
      sections: normalizeSectionsForSave(formState.sections),
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
        blog_type: updated.blog_type,
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
      image_url: newSectionDraft.image_url?.trim() || undefined,
      image_alt: newSectionDraft.image_alt?.trim() || undefined,
      children: [],
    }

    setFormState((prev) => ({
      ...prev,
      sections: [...prev.sections, sectionToAdd],
    }))
    setNewSectionDraft({
      id: "",
      title: "",
      level: 2,
      content: "",
      image_url: "",
      image_alt: "",
      children: [],
    })
    setShowNewSectionForm(false)
    setError(null)
  }

  const handleNewSectionImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      setError(null)
      const imageUrl = await readSectionImageFile(file)
      setNewSectionDraft((prev) => ({
        ...prev,
        image_url: imageUrl,
        image_alt: prev.image_alt || prev.title,
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load the selected image.")
    } finally {
      event.target.value = ""
    }
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

  const displayTitle = editing ? formState.title || blog?.title : blog?.title
  const displaySubheader = editing ? formState.subheader || blog?.subheader : blog?.subheader
  const displayStatus = editing ? formState.status : blog?.status
  const displayTags = editing
    ? formState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : (blog?.tags ?? [])
  const hasSections = Boolean(blog?.sections && blog.sections.length > 0)
  const sectionLinks = useMemo(
    () => flattenSections(blog?.sections ?? []),
    [blog?.sections]
  )
  const wordCount = useMemo(() => (blog ? extractWordCount(blog) : 0), [blog])
  const readTime = Math.max(1, Math.round(wordCount / 220))

  const renderSections = (sections: BlogSection[]) => {
    return sections.map((section) => {
      const headingClass =
        section.level === 1
          ? "text-3xl font-semibold tracking-tight text-[#19252f]"
          : section.level === 2
            ? "text-2xl font-semibold tracking-tight text-[#19252f]"
            : "text-xl font-semibold tracking-tight text-[#19252f]"

      return (
        <section
          key={section.id}
          id={getSectionAnchor(section)}
          className="space-y-4 rounded-[28px] border border-[#ece3d7] bg-white/90 p-6 shadow-[0_14px_40px_rgba(56,39,17,0.05)]"
        >
          <h2 className={headingClass}>{section.title}</h2>
          {section.image_url && (
            <figure className="overflow-hidden rounded-[24px] border border-[#e5d8c8] bg-[#f8f2ea]">
              <img
                src={section.image_url}
                alt={section.image_alt || section.title}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </figure>
          )}
          {section.content && (
            <div className={readingProseClass}>
              <ReactMarkdown>{section.content}</ReactMarkdown>
            </div>
          )}
          {section.children && section.children.length > 0 && (
            <div className="space-y-4 border-l border-[#e6d8c7] pl-4">
              {renderSections(section.children)}
            </div>
          )}
        </section>
      )
    })
  }

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-[#f6f1e8] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="h-48 animate-pulse rounded-[32px] bg-white/80 shadow-[0_18px_50px_rgba(62,45,25,0.06)]" />
          <div className="h-80 animate-pulse rounded-[32px] bg-white/80 shadow-[0_18px_50px_rgba(62,45,25,0.06)]" />
        </div>
      </main>
    )
  }

  if (error && !blog) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-[#f6f1e8] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-red-200 bg-white px-6 py-12 text-center shadow-[0_18px_50px_rgba(62,45,25,0.06)]">
          <p className="text-lg font-medium text-[#19252f]">{error}</p>
          <Link
            to="/blogs"
            className="mt-6 inline-flex rounded-full border border-[#d8cab9] px-4 py-2 text-sm font-medium text-[#8b5e3c] transition hover:bg-[#f5ede3]"
          >
            Back to Blogs
          </Link>
        </div>
      </main>
    )
  }

  if (!blog) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-[#f6f1e8] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-[#ddd1c0] bg-white px-6 py-12 text-center shadow-[0_18px_50px_rgba(62,45,25,0.06)]">
          <p className="text-lg font-medium text-[#19252f]">Blog not found.</p>
        </div>
      </main>
    )
  }

  if (blog.external_url && !editing) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-[#f6f1e8] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-[#ddd1c0] bg-white px-6 py-12 text-center shadow-[0_18px_50px_rgba(62,45,25,0.06)]">
          <p className="text-lg font-medium text-[#19252f]">Redirecting to the external article...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f6f1e8] text-[#1b2b34]">
      <section className="relative overflow-hidden border-b border-[#ddd1c0] bg-[radial-gradient(circle_at_top_right,#c88c5f24,transparent_26%),linear-gradient(135deg,#f7f1e8_0%,#efe2cf_46%,#e7ddd1_100%)]">
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#ffffff55_1px,transparent_1px),linear-gradient(to_bottom,#ffffff55_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="space-y-6 rounded-[32px] border border-[#ddd1c0] bg-white/80 p-6 shadow-[0_22px_70px_rgba(62,45,25,0.08)] backdrop-blur sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4">
                <Link
                  to="/blogs"
                  className="inline-flex rounded-full border border-[#d8cab9] px-4 py-2 text-sm font-medium text-[#8b5e3c] transition hover:bg-[#f5ede3]"
                >
                  &lt;- Back to Blogs
                </Link>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8b5e3c]">
                    {editing ? "Editing Article" : "Reading View"}
                  </p>
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-[#19252f] sm:text-5xl">
                    {displayTitle}
                  </h1>
                  {displaySubheader && (
                    <p className="max-w-3xl text-lg leading-8 text-[#4b5d69]">
                      {displaySubheader}
                    </p>
                  )}
                </div>
              </div>

              {editing ? (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-[#d8cab9] px-4 py-2 text-sm text-[#44535d]"
                    onClick={cancelEdit}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="blog-edit-form"
                    className="rounded-full bg-[#19252f] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="rounded-full border border-[#d8cab9] px-4 py-2 text-sm font-medium text-[#44535d] transition hover:bg-[#f5ede3]"
                  onClick={startEdit}
                >
                  Edit Post
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-[#556772]">
              <span className="rounded-full border border-[#d8cab9] bg-[#fbf7f2] px-3 py-1 capitalize">
                {displayStatus}
              </span>
              <span className="rounded-full border border-[#d8cab9] bg-[#fbf7f2] px-3 py-1">
                {editing ? formState.blog_type : blog.blog_type}
              </span>
              <span>Updated {formatDate(blog.updated_at)}</span>
              <span>Created {formatDate(blog.created_at)}</span>
              {!editing && <span>{readTime} min read</span>}
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#f3ede4] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#76614f]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {error && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>
        </div>
      </section>

      {editing ? (
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="rounded-[32px] border border-[#ddd1c0] bg-white/90 p-5 shadow-[0_18px_50px_rgba(62,45,25,0.06)] sm:p-6">
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="rounded-full border border-[#d8cab9] px-4 py-2 text-sm text-[#44535d]"
                onClick={handleAddSection}
              >
                + Add Section
              </button>
              <button
                type="button"
                className="rounded-full border border-[#d8cab9] px-4 py-2 text-sm text-[#44535d]"
                onClick={() => setShowSections((prev) => !prev)}
              >
                {showSections ? "Hide Sections" : "Show Sections"}
              </button>
              <button
                type="button"
                className="rounded-full border border-[#d8cab9] px-4 py-2 text-sm text-[#44535d]"
                onClick={() => setShowAdvanced((prev) => !prev)}
              >
                {showAdvanced ? "Hide Advanced" : "Advanced"}
              </button>
              <button
                type="button"
                className="rounded-full border border-[#d8cab9] px-4 py-2 text-sm text-[#44535d]"
                onClick={() => setPreviewMode((prev) => !prev)}
              >
                {previewMode ? "Hide Preview" : "Preview Content"}
              </button>
            </div>

            <div className={`mt-6 grid gap-5 ${previewMode ? "xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]" : ""}`}>
              <form id="blog-edit-form" className="grid gap-4" onSubmit={handleSave}>
                <input
                  className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                  value={formState.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="title"
                />
                <select
                  className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                  value={formState.blog_type}
                  onChange={(event) => updateField("blog_type", event.target.value as Blog["blog_type"])}
                >
                  <option value="AI">AI</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Physics">Physics</option>
                  <option value="Software Engineering">Software Engineering</option>
                </select>
                <input
                  className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                  value={formState.subheader}
                  onChange={(event) => updateField("subheader", event.target.value)}
                  placeholder="subheader (optional)"
                />
                <textarea
                  className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                  value={formState.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="description"
                  rows={3}
                />
                {showSections && (
                  <div className="rounded-[28px] border border-[#ece3d7] bg-[#fcfaf7] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <label className="text-xs uppercase tracking-[0.26em] text-[#8b5e3c]">
                        Sections
                      </label>
                    </div>
                    {formState.sections.length === 0 ? (
                      <p className="mt-3 text-sm text-[#6a7880]">No sections added yet.</p>
                    ) : (
                      <div className="mt-4 space-y-3">
                        {formState.sections.map((section, index) => (
                          <div key={section.id} className="grid gap-2 rounded-2xl border border-[#ece3d7] bg-white p-4">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs uppercase tracking-[0.2em] text-[#8b5e3c]">
                                Subtitle {index + 1}
                              </span>
                              <span className="rounded-full bg-[#f3ede4] px-3 py-1 text-xs text-[#76614f]">
                                Level {section.level}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-[#19252f]">{section.title}</p>
                            <textarea
                              id={`edit-section-content-${section.id}`}
                              className="rounded-2xl border border-[#e5d8c8] bg-[#fbf8f3] px-4 py-3 text-sm text-[#465862]"
                              value={section.content ?? ""}
                              readOnly
                              placeholder="section content"
                              rows={3}
                            />
                            {section.image_url && (
                              <div className="overflow-hidden rounded-2xl border border-[#e5d8c8] bg-[#fbf8f3]">
                                <img
                                  src={section.image_url}
                                  alt={section.image_alt || section.title}
                                  className="h-auto max-h-64 w-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {showNewSectionForm && (
                      <div className="mt-4 grid gap-3 rounded-2xl border border-[#e5d8c8] bg-white p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-[#8b5e3c]">
                            New Section
                          </span>
                          <div className="flex items-center gap-2">
                            <select
                              className="rounded-full border border-[#d8cab9] bg-[#fbf8f3] px-3 py-2 text-xs"
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
                              className="rounded-full bg-red-50 px-3 py-2 text-xs text-red-600"
                              onClick={() => setShowNewSectionForm(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                        <input
                          ref={newSectionTitleRef}
                          className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                          value={newSectionDraft.title}
                          onChange={(event) => updateNewSection("title", event.target.value)}
                          placeholder="Enter subtitle name"
                        />
                        <textarea
                          className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                          value={newSectionDraft.content ?? ""}
                          onChange={(event) => updateNewSection("content", event.target.value)}
                          onInput={(event) => autoResizeTextarea(event.currentTarget)}
                          placeholder="section content"
                          rows={3}
                        />
                        <label className="grid gap-2 rounded-2xl border border-dashed border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 text-sm text-[#5a6770]">
                          <span>Attach image from your computer</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="text-sm"
                            onChange={(event) => void handleNewSectionImageSelect(event)}
                          />
                          <span className="text-xs text-[#7c6c5d]">
                            Accepts image files up to {SECTION_IMAGE_SIZE_LABEL}.
                          </span>
                        </label>
                        {newSectionDraft.image_url && (
                          <div className="grid gap-2 rounded-2xl border border-[#e5d8c8] bg-[#fbf8f3] p-3">
                            <img
                              src={newSectionDraft.image_url}
                              alt={newSectionDraft.image_alt || newSectionDraft.title || "Section image preview"}
                              className="h-auto max-h-64 w-full rounded-2xl object-cover"
                            />
                            <button
                              type="button"
                              className="w-fit rounded-full bg-red-50 px-3 py-2 text-xs text-red-600"
                              onClick={() => {
                                updateNewSection("image_url", "")
                                updateNewSection("image_alt", "")
                              }}
                            >
                              Remove image
                            </button>
                          </div>
                        )}
                        <input
                          className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                          value={newSectionDraft.image_alt ?? ""}
                          onChange={(event) => updateNewSection("image_alt", event.target.value)}
                          placeholder="image alt text (optional)"
                        />
                        <div>
                          <button
                            type="button"
                            className="rounded-full bg-[#19252f] px-4 py-2 text-sm font-medium text-white"
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
                  <div className="grid gap-3 rounded-[28px] border border-[#ece3d7] bg-[#fcfaf7] p-4">
                    <textarea
                      className="min-h-44 rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                      value={formState.content}
                      onChange={(event) => updateField("content", event.target.value)}
                      placeholder="markdown content fallback (optional)"
                      rows={6}
                    />
                    <input
                      className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                      value={formState.external_url}
                      onChange={(event) => updateField("external_url", event.target.value)}
                      placeholder="external url (optional)"
                    />
                    <input
                      className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                      value={formState.tags}
                      onChange={(event) => updateField("tags", event.target.value)}
                      placeholder="tags (comma-separated)"
                    />
                    <select
                      className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
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
                <article className="rounded-[28px] border border-[#ece3d7] bg-white p-6 shadow-[0_18px_50px_rgba(62,45,25,0.06)]">
                  <div className={readingProseClass}>
                    <ReactMarkdown>{formState.content || "_No content yet_"}</ReactMarkdown>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div className={`grid gap-8 ${hasSections ? "xl:grid-cols-[minmax(0,1fr)_280px]" : ""}`}>
            <article className="space-y-6">
              <div className="rounded-[32px] border border-[#e8ddd0] bg-white/90 p-6 shadow-[0_18px_50px_rgba(62,45,25,0.06)] sm:p-8">
                <p className="text-lg leading-8 text-[#344855]">{blog.description}</p>
              </div>

              {hasSections ? (
                <div className="space-y-4">{renderSections(blog.sections ?? [])}</div>
              ) : (
                <div className="rounded-[32px] border border-[#e8ddd0] bg-white/90 p-6 shadow-[0_18px_50px_rgba(62,45,25,0.06)] sm:p-8">
                  <article className={readingProseClass}>
                    <ReactMarkdown>{blog.content ?? ""}</ReactMarkdown>
                  </article>
                </div>
              )}
            </article>

            {hasSections && sectionLinks.length > 0 && (
              <aside className="xl:sticky xl:top-24 xl:h-fit">
                <div className="rounded-[28px] border border-[#e8ddd0] bg-white/90 p-5 shadow-[0_18px_50px_rgba(62,45,25,0.06)]">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#8b5e3c]">
                    On This Page
                  </p>
                  <nav className="mt-4 space-y-2">
                    {sectionLinks.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`block rounded-2xl px-3 py-2 text-sm text-[#44535d] transition hover:bg-[#f5ede3] hover:text-[#8b5e3c] ${
                          section.level === 3 ? "ml-4" : section.level === 2 ? "ml-2" : ""
                        }`}
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </section>
      )}
    </main>
  )
}

export default BlogPost
