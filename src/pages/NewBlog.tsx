import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { API_BASE } from "../api/blog"
import type { Blog, BlogSection } from "../types/blog"
import { readSectionImageFile, SECTION_IMAGE_SIZE_LABEL } from "../utils/sectionImage"

const CREATE_BLOG_URL = `${API_BASE}/blogs`

type BlogFormState = {
  slug: string
  title: string
  subheader: string
  description: string
  content: string
  external_url: string
  blog_type: Blog["blog_type"] | ""
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
  blog_type: "",
  status: "draft",
  tags: "",
  sections: [],
}

const readingProseClass =
  "prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-[#19252f] prose-p:leading-8 prose-p:text-[#344855] prose-li:leading-8 prose-strong:text-[#19252f] prose-a:text-[#8b5e3c] prose-code:text-[#8b5e3c]"

const preserveLineBreaks = (value: string) => value.replace(/\r\n/g, "\n").replace(/\n/g, "  \n")

const normalizeSectionsForSave = (sections: BlogSection[]): BlogSection[] =>
  sections.map((section) => ({
    ...section,
    title: section.title.trim(),
    content: section.content?.trim() ?? "",
    image_url: section.image_url?.trim() || undefined,
    image_alt: section.image_alt?.trim() || undefined,
    children: normalizeSectionsForSave(section.children ?? []),
  }))

const countWords = (value: string) => {
  const trimmed = value.trim()

  if (!trimmed) {
    return 0
  }

  return trimmed.split(/\s+/).length
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
  const sectionContentRefs = useRef<Record<string, HTMLTextAreaElement | null>>({})

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

    if (!formState.blog_type) {
      setError("Please choose a blog type.")
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
      blog_type: formState.blog_type,
      status: formState.status,
      content: formState.content.trim() || undefined,
      external_url: formState.external_url.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined,
      sections:
        formState.sections.length > 0
          ? normalizeSectionsForSave(formState.sections)
          : undefined,
    }

    try {
      const res = await fetch(`${CREATE_BLOG_URL}`, {
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
        image_url: "",
        image_alt: "",
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

  useEffect(() => {
    formState.sections.forEach((section) => {
      const textarea = sectionContentRefs.current[section.id]
      if (textarea) {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    })
  }, [formState.sections])

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

  const moveSection = (index: number, direction: -1 | 1) => {
    setFormState((prev) => {
      const targetIndex = index + direction

      if (targetIndex < 0 || targetIndex >= prev.sections.length) {
        return prev
      }

      const next = [...prev.sections]
      const [section] = next.splice(index, 1)
      next.splice(targetIndex, 0, section)
      return { ...prev, sections: next }
    })
  }

  const handleSectionImageSelect = async (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      setError(null)
      const imageUrl = await readSectionImageFile(file)
      setFormState((prev) => {
        const next = [...prev.sections]
        next[index] = {
          ...next[index],
          image_url: imageUrl,
          image_alt: next[index].image_alt || next[index].title,
        }
        return { ...prev, sections: next }
      })
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

  const renderSectionPreview = (sections: BlogSection[]) =>
    sections.map((section) => {
      const headingClass =
        section.level === 1
          ? "text-3xl font-semibold tracking-tight text-[#19252f]"
          : section.level === 2
            ? "text-2xl font-semibold tracking-tight text-[#19252f]"
            : "text-xl font-semibold tracking-tight text-[#19252f]"

      return (
        <section
          key={section.id}
          className="space-y-4 rounded-[28px] border border-[#ece3d7] bg-white/90 p-6 shadow-[0_14px_40px_rgba(56,39,17,0.05)]"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#f3ede4] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#76614f]">
              Level {section.level}
            </span>
          </div>
          <h2 className={headingClass}>{section.title || "Untitled section"}</h2>
          {section.image_url && (
            <figure className="overflow-hidden rounded-[24px] border border-[#e5d8c8] bg-[#f8f2ea]">
              <img
                src={section.image_url}
                alt={section.image_alt || section.title || "Section image"}
                className="h-auto w-full object-cover"
              />
            </figure>
          )}
          {section.content ? (
            <div className={readingProseClass}>
              <ReactMarkdown>{preserveLineBreaks(section.content)}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm italic text-[#7a6c61]">Start writing to preview this section.</p>
          )}
        </section>
      )
    })

  const totalSectionWords = formState.sections.reduce(
    (total, section) => total + countWords(section.content ?? ""),
    0
  )

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f6f1e8] text-[#1b2b34]">
      <section className="relative overflow-hidden border-b border-[#ddd1c0] bg-[radial-gradient(circle_at_top_right,#c88c5f24,transparent_26%),linear-gradient(135deg,#f7f1e8_0%,#efe2cf_46%,#e7ddd1_100%)]">
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#ffffff55_1px,transparent_1px),linear-gradient(to_bottom,#ffffff55_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.32em] text-[#8b5e3c]">
                Drafting Desk
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-[#19252f] sm:text-5xl">
                Build the story section by section.
              </h1>
              <p className="max-w-3xl text-base leading-7 text-[#4b5d69] sm:text-lg">
                Write in focused blocks, attach visuals where they help, and use preview mode to
                see the post as readers will experience it.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#d8cab9] bg-white/75 px-4 py-2 text-sm text-[#5d6d77]">
                {formState.sections.length} section{formState.sections.length === 1 ? "" : "s"}
              </span>
              <span className="rounded-full border border-[#d8cab9] bg-white/75 px-4 py-2 text-sm text-[#5d6d77]">
                {totalSectionWords} words
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-[#d8cab9] bg-white/80 px-4 py-2 text-sm font-medium text-[#44535d] transition hover:bg-[#f5ede3]"
              onClick={() => setPreviewMode((prev) => !prev)}
            >
              {previewMode ? "Hide Preview" : "Preview Layout"}
            </button>
            <button
              type="button"
              className="rounded-full border border-[#d8cab9] bg-white/80 px-4 py-2 text-sm font-medium text-[#44535d] transition hover:bg-[#f5ede3]"
              onClick={() => navigate("/blogs")}
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className={`grid gap-6 ${previewMode ? "xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]" : ""}`}>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="rounded-[32px] border border-[#ddd1c0] bg-white/90 p-5 shadow-[0_18px_50px_rgba(62,45,25,0.06)] sm:p-6">
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_220px]">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.28em] text-[#8b5e3c]">Title</label>
                    <input
                      className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 text-[#1b2b34] outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                      value={formState.title}
                      onChange={(event) => updateField("title", event.target.value)}
                      placeholder="What is this post about?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.28em] text-[#8b5e3c]">Blog Type</label>
                    <select
                      className="w-full rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 text-[#1b2b34] outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                      value={formState.blog_type}
                      onChange={(event) => updateField("blog_type", event.target.value as BlogFormState["blog_type"])}
                    >
                      <option value="">Select blog type</option>
                      <option value="AI">AI</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Science and Health Tech">Science and Health Tech</option>
                      <option value="Software Engineering">Software Engineering</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.28em] text-[#8b5e3c]">Description</label>
                  <textarea
                    className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 text-[#1b2b34] outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                    value={formState.description}
                    onChange={(event) => updateField("description", event.target.value)}
                    placeholder="Set the context for the reader before they dive into the sections."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-[#ddd1c0] bg-white/90 p-5 shadow-[0_18px_50px_rgba(62,45,25,0.06)] sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="rounded-full border border-[#d8cab9] bg-[#fbf8f3] px-4 py-2 text-sm font-medium text-[#44535d] transition hover:bg-white"
                  onClick={() => setShowSections((prev) => !prev)}
                >
                  {showSections ? "Hide Sections" : "Show Sections"}
                </button>
                <button
                  type="button"
                  className="rounded-full border border-[#d8cab9] bg-[#fbf8f3] px-4 py-2 text-sm font-medium text-[#44535d] transition hover:bg-white"
                  onClick={() => setShowAdvanced((prev) => !prev)}
                >
                  {showAdvanced ? "Hide Advanced" : "Advanced"}
                </button>
              </div>
            </div>

            {showSections && (
              <div className="rounded-[32px] border border-[#ddd1c0] bg-white/90 p-5 shadow-[0_18px_50px_rgba(62,45,25,0.06)] sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#8b5e3c]">Sections</p>
                    <h2 className="text-2xl font-semibold tracking-tight text-[#19252f]">
                      Shape the article in focused blocks.
                    </h2>
                    <p className="max-w-2xl text-sm leading-6 text-[#5f6f79]">
                      Give each section a clear headline, write the body in markdown, and attach an image only when it adds context.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full bg-[#19252f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#101921]"
                    onClick={handleAddSection}
                  >
                    + Add Section
                  </button>
                </div>

                {formState.sections.length === 0 ? (
                  <div className="mt-5 rounded-[28px] border border-dashed border-[#d8cab9] bg-[#fbf8f3] p-6 text-center">
                    <p className="text-lg font-medium text-[#19252f]">No sections yet.</p>
                    <p className="mt-2 text-sm leading-6 text-[#61717b]">
                      Start with one strong section, then layer in more detail as the story takes shape.
                    </p>
                    <button
                      type="button"
                      className="mt-4 rounded-full border border-[#d8cab9] bg-white px-4 py-2 text-sm font-medium text-[#44535d] transition hover:bg-[#f5ede3]"
                      onClick={handleAddSection}
                    >
                      Create your first section
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 space-y-5">
                    {formState.sections.map((section, index) => (
                      <article
                        key={section.id}
                        className="rounded-[28px] border border-[#e5d8c8] bg-[#fcfaf7] p-4 shadow-[0_10px_30px_rgba(62,45,25,0.04)] sm:p-5"
                      >
                        <div className="flex flex-col gap-3 border-b border-[#ece3d7] pb-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-[#f3ede4] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#76614f]">
                                Section {index + 1}
                              </span>
                              <span className="rounded-full border border-[#dfd2c2] bg-white px-3 py-1 text-xs text-[#5f6f79]">
                                {countWords(section.content ?? "")} words
                              </span>
                            </div>
                            <p className="text-sm leading-6 text-[#5f6f79]">
                              Lead with the key idea in the title, then use the body to unpack the detail.
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <select
                              className="rounded-full border border-[#d8cab9] bg-white px-3 py-2 text-xs text-[#44535d]"
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
                              className="rounded-full border border-[#d8cab9] bg-white px-3 py-2 text-xs text-[#44535d] disabled:opacity-40"
                              onClick={() => moveSection(index, -1)}
                              disabled={index === 0}
                            >
                              Move Up
                            </button>
                            <button
                              type="button"
                              className="rounded-full border border-[#d8cab9] bg-white px-3 py-2 text-xs text-[#44535d] disabled:opacity-40"
                              onClick={() => moveSection(index, 1)}
                              disabled={index === formState.sections.length - 1}
                            >
                              Move Down
                            </button>
                            <button
                              type="button"
                              className="rounded-full bg-red-50 px-3 py-2 text-xs text-red-600"
                              onClick={() => removeSection(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.75fr)_minmax(280px,0.75fr)]">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <label className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">
                                Section Title
                              </label>
                              <input
                                className="w-full rounded-2xl border border-[#d8cab9] bg-white px-4 py-3 text-[#1b2b34] outline-none transition focus:border-[#8b5e3c]"
                                value={section.title}
                                onChange={(event) => updateSection(index, "title", event.target.value)}
                                placeholder="Name the idea this section explores"
                                ref={(element) => {
                                  sectionTitleInputRefs.current[section.id] = element
                                }}
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-3">
                                <label className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">
                                  Section Body
                                </label>
                                <span className="text-xs text-[#7a6c61]">Markdown supported</span>
                              </div>
                              <textarea
                                className="min-h-44 w-full resize-none overflow-hidden rounded-2xl border border-[#d8cab9] bg-white px-4 py-3 text-[#1b2b34] outline-none transition focus:border-[#8b5e3c]"
                                value={section.content ?? ""}
                                onChange={(event) => updateSection(index, "content", event.target.value)}
                                onInput={(event) => autoResizeTextarea(event.currentTarget)}
                                placeholder={"Write the main content for this section.\n\nTip: use short paragraphs, bullets, or markdown headings where helpful."}
                                rows={6}
                                ref={(element) => {
                                  sectionContentRefs.current[section.id] = element
                                }}
                              />
                            </div>
                          </div>

                          <aside className="grid gap-4 rounded-[24px] border border-[#e8ddd0] bg-white/80 p-4 self-start">
                            <div className="space-y-2">
                              <p className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">
                                Visual
                              </p>
                              <p className="text-sm leading-6 text-[#60707a]">
                                Add an image when it helps explain the section, not just to fill space.
                              </p>
                            </div>

                            <label className="grid gap-2 rounded-2xl border border-dashed border-[#d8cab9] bg-[#fbf8f3] p-4 text-sm text-[#5d6d77]">
                              <span className="font-medium text-[#42535d]">Attach image from your computer</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="text-sm"
                                onChange={(event) => void handleSectionImageSelect(index, event)}
                              />
                              <span className="text-xs text-[#7a6c61]">
                                Accepts image files up to {SECTION_IMAGE_SIZE_LABEL}.
                              </span>
                            </label>

                            {section.image_url ? (
                              <div className="grid gap-3">
                                <div className="overflow-hidden rounded-[20px] border border-[#e5d8c8] bg-[#fbf8f3]">
                                  <img
                                    src={section.image_url}
                                    alt={section.image_alt || section.title || "Section image preview"}
                                    className="max-h-56 w-full object-cover"
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="w-fit rounded-full bg-red-50 px-3 py-2 text-xs text-red-600"
                                  onClick={() => {
                                    updateSection(index, "image_url", "")
                                    updateSection(index, "image_alt", "")
                                  }}
                                >
                                  Remove image
                                </button>
                              </div>
                            ) : (
                              <div className="rounded-2xl border border-dashed border-[#e5d8c8] bg-[#fbf8f3] px-4 py-5 text-sm text-[#7a6c61]">
                                No image attached yet.
                              </div>
                            )}

                            <div className="space-y-2">
                              <label className="text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">
                                Alt Text
                              </label>
                              <input
                                className="w-full rounded-2xl border border-[#d8cab9] bg-white px-4 py-3 text-[#1b2b34] outline-none transition focus:border-[#8b5e3c]"
                                value={section.image_alt ?? ""}
                                onChange={(event) => updateSection(index, "image_alt", event.target.value)}
                                placeholder="Describe the image for accessibility"
                              />
                            </div>
                          </aside>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}

            {showAdvanced && (
              <div className="grid gap-3 rounded-[32px] border border-[#ddd1c0] bg-white/90 p-5 shadow-[0_18px_50px_rgba(62,45,25,0.06)] sm:p-6">
                <input
                  className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                  value={formState.slug}
                  onChange={(event) => updateField("slug", event.target.value)}
                  placeholder="custom slug (optional)"
                />
                <input
                  className="rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                  value={formState.subheader}
                  onChange={(event) => updateField("subheader", event.target.value)}
                  placeholder="subheader (optional)"
                />
                <textarea
                  className="min-h-40 rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                  value={formState.content}
                  onChange={(event) => updateField("content", event.target.value)}
                  placeholder="markdown content (optional fallback)"
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

            <button
              type="submit"
              className="w-fit rounded-full bg-[#19252f] px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
              disabled={saving}
            >
              {saving ? "Creating..." : "Create Blog"}
            </button>
          </form>

          {previewMode && (
            <section className="rounded-[32px] border border-[#ddd1c0] bg-white/90 p-6 shadow-[0_18px_50px_rgba(62,45,25,0.06)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8b5e3c]">Reader Preview</p>
              <div className="mt-5 space-y-6">
                <div className="rounded-[28px] border border-[#ece3d7] bg-[#fcfaf7] p-6">
                  <h2 className="text-3xl font-semibold tracking-tight text-[#19252f]">
                    {formState.title || "Preview title"}
                  </h2>
                  {formState.subheader && (
                    <p className="mt-3 text-lg leading-8 text-[#4b5d69]">{formState.subheader}</p>
                  )}
                  <p className="mt-4 text-base leading-8 text-[#344855]">
                    {formState.description || "Your description will appear here."}
                  </p>
                </div>

                {formState.sections.length > 0 ? (
                  <div className="space-y-4">{renderSectionPreview(formState.sections)}</div>
                ) : (
                <article className={`rounded-[28px] border border-[#ece3d7] bg-[#fcfaf7] p-6 ${readingProseClass}`}>
                    <ReactMarkdown>{preserveLineBreaks(formState.content || "_No content yet_")}</ReactMarkdown>
                  </article>
                )}
              </div>
            </section>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-4 text-sm text-green-700">{success}</p>}
      </div>
    </main>
  )
}

export default NewBlog
