import { useCallback, useEffect, useMemo, useState } from "react"
import { BookOpenText, CalendarDays, Clock3, Search, SlidersHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import { fetchBlogs } from "../api/blog"
import type { Blog } from "../types/blog"

const topicOrder = ["AI", "Software Engineering", "Hardware", "Physics"] as const

type Topic = (typeof topicOrder)[number]

const topicDefinitions: Record<Topic, { title: string; summary: string; keywords: string[] }> = {
  AI: {
    title: "AI",
    summary: "What I’m learning about models, inference, and building with AI.",
    keywords: ["All", "GPU", "AI inference", "LLM", "agents", "transformer", "computer vision"],
  },
  Hardware: {
    title: "Hardware",
    summary: "Projects that touch sensors, devices, and the physical world.",
    keywords: ["All", "PCB", "embedded", "sensor", "signal processing", "electronics", "ECG"],
  },
  Physics: {
    title: "Physics",
    summary: "Notes on mechanics, waves, and ideas from the physical world.",
    keywords: ["All", "quantum", "waves", "mechanics", "energy", "field theory"],
  },
  "Software Engineering": {
    title: "Software Engineering",
    summary: "The systems, APIs, and product code I keep building and fixing.",
    keywords: ["All", "backend", "API", "system design", "database", "testing", "devops"],
  },
}

const formatDate = (value?: string) => {
  const date = value ? new Date(value) : null

  if (!date || Number.isNaN(date.getTime())) {
    return "Recently added"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

const getSortableDate = (blog: Blog) => {
  const timestamp = Date.parse(blog.updated_at || blog.created_at || "")
  return Number.isNaN(timestamp) ? 0 : timestamp
}

const extractWordCount = (blog: Blog) => {
  const sectionText = (blog.sections ?? [])
    .flatMap(function walk(section): string[] {
      return [section.title, section.content ?? "", ...(section.children ?? []).flatMap(walk)]
    })
    .join(" ")

  const content = [
    blog.title,
    blog.subheader ?? "",
    blog.description,
    blog.content ?? "",
    ...(blog.tags ?? []),
    sectionText,
  ]
    .join(" ")
    .trim()

  if (!content) {
    return 0
  }

  return content.split(/\s+/).length
}

const getReadTime = (blog: Blog) => Math.max(1, Math.round(extractWordCount(blog) / 220))

const countSections = (sections: Blog["sections"] = []): number =>
  sections.reduce((count, section) => count + 1 + countSections(section.children ?? []), 0)

const getSectionCount = (blog: Blog) => countSections(blog.sections ?? [])

const statusStyles: Record<Blog["status"], string> = {
  published: "border-emerald-200 bg-emerald-50 text-emerald-700",
  draft: "border-amber-200 bg-amber-50 text-amber-700",
}

const buildSearchableText = (blog: Blog) =>
  [
    blog.title,
    blog.subheader ?? "",
    blog.description,
    blog.content ?? "",
    ...(blog.tags ?? []),
    ...(blog.sections ?? []).flatMap(function walk(section): string[] {
      return [section.title, section.content ?? "", ...(section.children ?? []).flatMap(walk)]
    }),
  ]
    .join(" ")
    .toLowerCase()

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | Blog["status"]>("all")
  const [activeTopic, setActiveTopic] = useState<Topic>("AI")
  const [activeKeyword, setActiveKeyword] = useState("All")

  const loadBlogs = useCallback(async () => {
    setError(null)
    try {
      const data = await fetchBlogs()
      setBlogs(data)
    } catch (err) {
      console.error("Failed to fetch blogs", err)
      setError("Failed to fetch blogs.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadBlogs()
  }, [loadBlogs])

  useEffect(() => {
    const handleFocus = () => {
      void loadBlogs()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void loadBlogs()
      }
    }

    window.addEventListener("focus", handleFocus)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("focus", handleFocus)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [loadBlogs])

  const openCreateWindow = () => {
    window.open("/blogs/new", "_blank", "noopener,noreferrer")
  }

  const visibleBlogs = blogs
    .filter((blog) => {
      if (statusFilter === "all") {
        return true
      }
      return blog.status === statusFilter
    })
    .filter((blog) => {
      if (!query.trim()) {
        return true
      }

      const search = query.toLowerCase()

      return (
        blog.title.toLowerCase().includes(search) ||
        blog.description.toLowerCase().includes(search) ||
        (blog.subheader ?? "").toLowerCase().includes(search) ||
        (blog.tags ?? []).join(" ").toLowerCase().includes(search)
      )
    })
    .sort((a, b) => getSortableDate(b) - getSortableDate(a))

  const groupedBlogs = useMemo(() => {
    const groups: Record<Topic, Blog[]> = {
      AI: [],
      Hardware: [],
      Physics: [],
      "Software Engineering": [],
    }

    visibleBlogs.forEach((blog) => {
      groups[blog.blog_type].push(blog)
    })

    return groups
  }, [visibleBlogs])

  const activeTopicKeywords = topicDefinitions[activeTopic].keywords
  const activeBlogs = groupedBlogs[activeTopic].filter((blog) => {
    if (activeKeyword === "All") {
      return true
    }

    return buildSearchableText(blog).includes(activeKeyword.toLowerCase())
  })

  useEffect(() => {
    setActiveKeyword("All")
  }, [activeTopic])

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f6f1e8] text-[#1b2b34]">
      <section className="mx-auto max-w-5xl px-4 py-2 sm:px-6 sm:py-3">
        <div className="rounded-xl border border-[#ddd1c0] bg-white/80 p-2.5 shadow-[0_8px_20px_rgba(62,45,25,0.04)] backdrop-blur-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="grid flex-1 gap-2 md:grid-cols-[minmax(0,1fr)_170px]">
              <label className="grid gap-2">
                <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#8b5e3c]">
                  <Search className="h-3 w-3" />
                  Search
                </span>
                <input
                  id="blog-search"
                  type="search"
                  className="w-full rounded-lg border border-[#d8cab9] bg-[#fbf8f3] px-3 py-1.5 text-xs outline-none transition placeholder:text-[#8a8176] focus:border-[#8b5e3c] focus:bg-white"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search titles, tags, or notes"
                />
              </label>
              <label className="grid gap-2">
                <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#8b5e3c]">
                  <SlidersHorizontal className="h-3 w-3" />
                  Filter
                </span>
                <select
                  id="blog-status"
                  className="w-full rounded-lg border border-[#d8cab9] bg-[#fbf8f3] px-3 py-1.5 text-xs outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as "all" | Blog["status"])}
                >
                  <option value="all">All posts</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-[#67757f]">
              <span>{visibleBlogs.length} result{visibleBlogs.length === 1 ? "" : "s"}</span>
              {query.trim() && (
                <button
                  type="button"
                  className="rounded-full border border-[#d8cab9] bg-[#fbf8f3] px-2 py-0.5 text-[0.65rem] font-medium text-[#6b5b4d] transition hover:bg-white"
                  onClick={() => setQuery("")}
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[#18222b] px-3 py-1 text-[0.7rem] font-medium text-white transition hover:bg-[#0f171e]"
                onClick={openCreateWindow}
              >
                <BookOpenText className="h-3 w-3" />
                New Post
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16">
        {loading ? (
          <div className="space-y-4">
            <div className="h-32 animate-pulse rounded-[28px] bg-white/80 shadow-[0_14px_40px_rgba(62,45,25,0.05)]" />
            <div className="h-28 animate-pulse rounded-[28px] bg-white/80 shadow-[0_14px_40px_rgba(62,45,25,0.05)]" />
            <div className="h-28 animate-pulse rounded-[28px] bg-white/80 shadow-[0_14px_40px_rgba(62,45,25,0.05)]" />
          </div>
        ) : visibleBlogs.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[#d6c5b2] bg-white/70 px-6 py-12 text-center shadow-[0_14px_40px_rgba(62,45,25,0.05)]">
            <p className="text-base font-medium text-[#18222b]">No blogs found.</p>
            <p className="mt-2 text-sm text-[#6a7880]">
              Try another search term or switch the filter.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5 rounded-xl border border-[#e2d7c9] bg-white/75 p-1 shadow-[0_8px_20px_rgba(62,45,25,0.04)]">
              {topicOrder.map((topic) => {
                const count = groupedBlogs[topic].length
                const isActive = activeTopic === topic

                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setActiveTopic(topic)}
                    className={`flex-1 rounded-lg px-2.5 py-2 text-left transition ${
                      isActive
                        ? "bg-[#18222b] text-white shadow-[0_6px_14px_rgba(24,34,43,0.16)]"
                        : "bg-transparent text-[#4f606b] hover:bg-[#f7f1e8]"
                    }`}
                  >
                    <span className="block text-[0.72rem] font-semibold sm:text-sm">{topicDefinitions[topic].title}</span>
                    <span className={`mt-0.5 block text-[0.62rem] ${isActive ? "text-slate-300" : "text-[#7a8791]"}`}>
                      {count} post{count === 1 ? "" : "s"}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold tracking-tight text-[#18222b] sm:text-base">
                {topicDefinitions[activeTopic].title}
              </h2>
              <span className="rounded-full border border-[#d8cab9] bg-white/70 px-2 py-0.5 text-[0.65rem] text-[#5c6b75]">
                {activeBlogs.length} post{activeBlogs.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeTopicKeywords.map((keyword) => {
                const isActive = activeKeyword === keyword

                return (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => setActiveKeyword(keyword)}
                    className={`rounded-full border px-2 py-0.5 text-[0.65rem] transition ${
                      isActive
                        ? "border-[#18222b] bg-[#18222b] text-white"
                        : "border-[#d8cab9] bg-white/80 text-[#5c6b75] hover:bg-[#f7f1e8]"
                    }`}
                  >
                    {keyword}
                  </button>
                )
              })}
            </div>

            <div className="space-y-3">
              {activeBlogs.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#d6c5b2] bg-white/70 px-4 py-8 text-center shadow-[0_8px_20px_rgba(62,45,25,0.04)]">
                  <p className="text-sm font-medium text-[#18222b]">No posts in this group yet.</p>
                  <p className="mt-1.5 text-xs text-[#6a7880]">
                    Try another tab or adjust the search and filter controls.
                  </p>
                </div>
              ) : (
                activeBlogs.map((blog, index) => (
                  <Link
                    key={blog.slug}
                    to={`/blogs/${blog.slug}`}
                    className={`group block rounded-[20px] border bg-white/90 p-3.5 shadow-[0_8px_20px_rgba(62,45,25,0.05)] transition hover:-translate-y-0.5 hover:bg-white ${
                      index === 0 ? "border-[#cdb99f]" : "border-[#e2d7c9] hover:border-[#cdb99f]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#8b5e3c]">
                      {index === 0 && (
                        <span className="rounded-full border border-[#d8cab9] bg-[#fbf7f2] px-1.5 py-0.5">
                          Lead
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-2.5 w-2.5" />
                        {formatDate(blog.updated_at)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-2.5 w-2.5" />
                        {getReadTime(blog)} min read
                      </span>
                      <span
                        className={`rounded-full border px-1.5 py-0.5 normal-case tracking-normal ${statusStyles[blog.status]}`}
                      >
                        {blog.status}
                      </span>
                    </div>

                    <div className="mt-2 space-y-2">
                      <h3
                        className={`font-semibold tracking-tight text-[#18222b] transition group-hover:text-[#8b5e3c] ${
                          index === 0 ? "text-lg sm:text-xl" : "text-sm sm:text-base"
                        }`}
                      >
                        {blog.title}
                      </h3>
                      {blog.subheader && (
                        <p className="max-w-3xl text-[0.72rem] leading-5 text-[#4f606b] sm:text-xs">
                          {blog.subheader}
                        </p>
                      )}
                      <p className="max-w-3xl text-[0.72rem] leading-5 text-[#5f707a] sm:text-xs">{blog.description}</p>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {(blog.tags ?? []).slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#f3ede4] px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.12em] text-[#76614f]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-2.5 flex items-center justify-between border-t border-[#efe5d8] pt-2.5 text-[0.68rem] font-medium text-[#8b5e3c]">
                      <span>
                        {getSectionCount(blog)} section{getSectionCount(blog) === 1 ? "" : "s"}
                      </span>
                      <span className="transition group-hover:translate-x-1">Read article -&gt;</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default Blogs
