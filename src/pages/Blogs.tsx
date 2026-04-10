import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchBlogs } from "../api/blog"
import type { Blog } from "../types/blog"

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
      return [
        section.title,
        section.content ?? "",
        ...(section.children ?? []).flatMap(walk),
      ]
    })
    .join(" ")

  const content = [
    blog.title,
    blog.subheader ?? "",
    blog.description,
    blog.content ?? "",
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
  sections.reduce(
    (count, section) => count + 1 + countSections(section.children ?? []),
    0
  )

const getSectionCount = (blog: Blog) => countSections(blog.sections ?? [])

const getUniqueTagCount = (blogs: Blog[]) =>
  new Set(blogs.flatMap((blog) => blog.tags ?? []).map((tag) => tag.toLowerCase())).size

const getTopTheme = (blogs: Blog[]) => {
  const counts = new Map<string, number>()

  blogs.forEach((blog) => {
    ;(blog.tags ?? []).forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    })
  })

  const [topTheme] = [...counts.entries()].sort((a, b) => b[1] - a[1])
  return topTheme?.[0] ?? "Backend, AI, and hardware software systems"
}

const statusStyles: Record<Blog["status"], string> = {
  published: "border-emerald-200 bg-emerald-50 text-emerald-700",
  draft: "border-amber-200 bg-amber-50 text-amber-700",
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | Blog["status"]>("all")

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

  const publishedCount = blogs.filter((blog) => blog.status === "published").length
  const draftCount = blogs.filter((blog) => blog.status === "draft").length
  const latestBlog = blogs
    .slice()
    .sort((a, b) => getSortableDate(b) - getSortableDate(a))[0]
  const uniqueTagCount = getUniqueTagCount(blogs)
  const topTheme = getTopTheme(blogs)
  const topThemeLabel =
    topTheme === "Backend, AI, and hardware software systems"
      ? "Backend, AI, hardware"
      : topTheme
  const topicsLabel = uniqueTagCount === 0 ? "No tagged topics yet" : uniqueTagCount.toString().padStart(2, "0")
  const featuredBlog = visibleBlogs.find((blog) => blog.status === "published") ?? visibleBlogs[0] ?? null
  const supportingBlogs = featuredBlog
    ? visibleBlogs.filter((blog) => blog.slug !== featuredBlog.slug)
    : []

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f6f1e8] text-[#1b2b34]">
      <section className="relative overflow-hidden border-b border-[#d8cfc1] bg-[radial-gradient(circle_at_top_right,#c88c5f24,transparent_24%),linear-gradient(135deg,#f7f1e8_0%,#efe2cf_48%,#e6ddd0_100%)]">
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#ffffff55_1px,transparent_1px),linear-gradient(to_bottom,#ffffff55_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-8">
          <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
            <div className="space-y-3">
              <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[#8b5e3c] sm:text-[0.7rem]">
                Notes, Systems, Experiments
              </p>
              <h1 className="max-w-[16ch] text-2xl font-semibold tracking-tight text-[#18222b] sm:max-w-[17ch] sm:text-3xl lg:max-w-[18ch] lg:text-[2.65rem] lg:leading-[1.05]">
                Technical notes on backend systems, AI builds, and applied engineering.
              </h1>
              <p className="max-w-xl text-sm leading-6 text-[#475865] sm:text-base">
                Project breakdowns, system design notes, and in-progress thinking around software, hardware-adjacent engineering, and how things behave when they leave the whiteboard.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-full bg-[#18222b] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0f171e]"
                  onClick={openCreateWindow}
                >
                  New Post
                </button>
                <span className="rounded-full border border-[#d3c4b0] bg-white/70 px-4 py-2.5 text-sm text-[#5c6b75]">
                  {publishedCount} published
                </span>
                <span className="rounded-full border border-[#d3c4b0] bg-white/70 px-4 py-2.5 text-sm text-[#5c6b75]">
                  {draftCount} drafts
                </span>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#d6c5b2] bg-white/80 p-4 shadow-[0_20px_60px_rgba(62,45,25,0.08)] backdrop-blur sm:p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.26em] text-[#8b5e3c] sm:text-[0.7rem]">
                Writing Desk
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <p className="text-[0.8rem] text-[#7b6a58]">Latest update</p>
                  <p className="mt-1.5 text-lg font-semibold text-[#18222b]">
                    {latestBlog ? formatDate(latestBlog.updated_at) : "No entries yet"}
                  </p>
                  {latestBlog && (
                    <p className="mt-0.5 text-sm leading-5 text-[#5e6d77]">{latestBlog.title}</p>
                  )}
                </div>
                <div>
                  <p className="text-[0.8rem] text-[#7b6a58]">Searchable topics</p>
                  <p className="mt-1.5 text-lg font-semibold text-[#18222b]">
                    {topicsLabel}
                  </p>
                </div>
                <div>
                  <p className="text-[0.8rem] text-[#7b6a58]">Current focus</p>
                  <p className="mt-1.5 text-lg font-semibold text-[#18222b]">
                    {topThemeLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="rounded-[24px] border border-[#ddd1c0] bg-white/80 p-4 shadow-[0_18px_50px_rgba(62,45,25,0.06)] backdrop-blur sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="space-y-2">
              <label htmlFor="blog-search" className="text-xs uppercase tracking-[0.26em] text-[#8b5e3c]">
                Search
              </label>
              <input
                id="blog-search"
                type="search"
                className="w-full rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 text-sm outline-none transition placeholder:text-[#8a8176] focus:border-[#8b5e3c] focus:bg-white"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, tags, description, or subheader"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="blog-status" className="text-xs uppercase tracking-[0.26em] text-[#8b5e3c]">
                Filter
              </label>
              <select
                id="blog-status"
                className="w-full rounded-2xl border border-[#d8cab9] bg-[#fbf8f3] px-4 py-3 text-sm outline-none transition focus:border-[#8b5e3c] focus:bg-white"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as "all" | Blog["status"])}
              >
                <option value="all">All statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#67757f]">
              <span>{visibleBlogs.length} result{visibleBlogs.length === 1 ? "" : "s"}</span>
              {query.trim() && (
                <button
                  type="button"
                  className="rounded-full border border-[#d8cab9] bg-[#fbf8f3] px-3 py-1.5 text-xs font-medium text-[#6b5b4d] transition hover:bg-white"
                  onClick={() => setQuery("")}
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
          {error && (
            <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16">
        {loading ? (
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="min-h-[280px] animate-pulse rounded-[32px] bg-white/80 shadow-[0_18px_50px_rgba(62,45,25,0.06)]" />
            <div className="grid gap-5">
              <div className="min-h-[180px] animate-pulse rounded-[28px] bg-white/80 shadow-[0_18px_50px_rgba(62,45,25,0.06)]" />
              <div className="min-h-[180px] animate-pulse rounded-[28px] bg-white/80 shadow-[0_18px_50px_rgba(62,45,25,0.06)]" />
            </div>
          </div>
        ) : visibleBlogs.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-[#d6c5b2] bg-white/70 px-6 py-16 text-center shadow-[0_18px_50px_rgba(62,45,25,0.06)]">
            <p className="text-lg font-medium text-[#18222b]">No blogs found.</p>
            <p className="mt-2 text-sm text-[#6a7880]">
              Try another search term or switch the status filter.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {featuredBlog && (
              <Link
                to={`/blogs/${featuredBlog.slug}`}
                className="group block overflow-hidden rounded-[32px] border border-[#243746]/10 bg-[#102230] text-white shadow-[0_24px_80px_rgba(16,34,48,0.22)] transition hover:-translate-y-1"
              >
                <div className="grid gap-6 px-6 py-7 sm:px-8 sm:py-8 lg:grid-cols-[1.35fr_0.65fr]">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                        Featured note
                      </span>
                      <span>{formatDate(featuredBlog.updated_at)}</span>
                      <span>{getReadTime(featuredBlog)} min read</span>
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 capitalize">
                        {featuredBlog.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-3xl font-semibold tracking-tight sm:text-[2.4rem]">
                        {featuredBlog.title}
                      </h2>
                      {featuredBlog.subheader && (
                        <p className="max-w-2xl text-lg leading-7 text-slate-200">
                          {featuredBlog.subheader}
                        </p>
                      )}
                      <p className="max-w-2xl text-base leading-7 text-slate-300">
                        {featuredBlog.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(featuredBlog.tags ?? []).slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <div className="space-y-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                        Article Snapshot
                      </p>
                      <div className="grid gap-3">
                        <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Read time</p>
                          <p className="mt-2 text-2xl font-semibold text-white">{getReadTime(featuredBlog)} min</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Sections</p>
                          <p className="mt-2 text-2xl font-semibold text-white">
                            {getSectionCount(featuredBlog).toString().padStart(2, "0")}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Themes</p>
                          <p className="mt-2 text-2xl font-semibold text-white">
                            {(featuredBlog.tags ?? []).length.toString().padStart(2, "0")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex items-center justify-between text-sm text-slate-200">
                      <span>Open article</span>
                      <span className="transition group-hover:translate-x-1">-&gt;</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {supportingBlogs.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                {supportingBlogs.map((blog) => (
                  <Link
                    key={blog.slug}
                    to={`/blogs/${blog.slug}`}
                    className="group flex h-full flex-col rounded-[28px] border border-[#ddd1c0] bg-white/90 p-6 shadow-[0_18px_50px_rgba(62,45,25,0.06)] transition hover:-translate-y-1 hover:border-[#c6b39b]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#8b5e3c]">
                          <span>{formatDate(blog.updated_at)}</span>
                          <span>{getReadTime(blog)} min read</span>
                          <span className={`rounded-full border px-2 py-1 normal-case tracking-normal ${statusStyles[blog.status]}`}>
                            {blog.status}
                          </span>
                        </div>
                        <h2 className="text-2xl font-semibold leading-tight text-[#18222b] transition group-hover:text-[#8b5e3c]">
                          {blog.title}
                        </h2>
                      </div>
                    </div>
                    {blog.subheader && (
                      <p className="mt-4 text-base leading-7 text-[#475865]">
                        {blog.subheader}
                      </p>
                    )}
                    <p className="mt-4 text-sm leading-7 text-[#5e6d77]">
                      {blog.description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#6b7a83]">
                      <span>{getSectionCount(blog)} section{getSectionCount(blog) === 1 ? "" : "s"}</span>
                      <span>{(blog.tags ?? []).length} theme{(blog.tags ?? []).length === 1 ? "" : "s"}</span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {(blog.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#f3ede4] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#76614f]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-6 text-sm font-medium text-[#8b5e3c]">
                      Read article -&gt;
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default Blogs
