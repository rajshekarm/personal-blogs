import { useState } from "react"
import { Link } from "react-router-dom"
import { PROJECTS } from "../data/projects"
import { useDesktopTheme } from "../components/desktopTheme"
import type { ProjectCategory } from "../types/projects"

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  financial: "Financial",
  genai: "Gen AI",
  healthcare: "Healthcare",
  fun: "Fun",
}

const AI_BADGES: Record<string, string[]> = {
  "ecg-triage": ["AI", "Edge", "Health"],
  "medical-image-analysis": ["AI", "CV", "Research"],
  "gpu-medical-image-processing": ["AI", "CUDA", "Compute"],
  "llm-cache": ["AI", "LLM", "Infra"],
}

const PROJECT_STYLES: Record<
  string,
  { tint: string; accent: string; border: string }
> = {
  nutriapi: {
    tint: "from-emerald-400/14 via-white/10 to-white/6",
    accent: "from-emerald-300/12 to-transparent",
    border: "border-emerald-200/30",
  },
  "ecg-triage": {
    tint: "from-rose-400/14 via-white/10 to-white/6",
    accent: "from-rose-300/12 to-transparent",
    border: "border-rose-200/30",
  },
  "medical-image-analysis": {
    tint: "from-fuchsia-400/14 via-white/10 to-white/6",
    accent: "from-fuchsia-300/12 to-transparent",
    border: "border-fuchsia-200/30",
  },
  "gpu-medical-image-processing": {
    tint: "from-violet-400/14 via-white/10 to-white/6",
    accent: "from-violet-300/12 to-transparent",
    border: "border-violet-200/30",
  },
  "realtime-chat": {
    tint: "from-sky-400/14 via-white/10 to-white/6",
    accent: "from-sky-300/12 to-transparent",
    border: "border-sky-200/30",
  },
  "llm-cache": {
    tint: "from-cyan-400/14 via-white/10 to-white/6",
    accent: "from-cyan-300/12 to-transparent",
    border: "border-cyan-200/30",
  },
  jarvis: {
    tint: "from-orange-400/14 via-white/10 to-white/6",
    accent: "from-orange-300/12 to-transparent",
    border: "border-orange-200/30",
  },
}

const Projects = () => {
  const { isDark } = useDesktopTheme()
  const categories = Array.from(new Set(PROJECTS.map((p) => p.category)))

  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>(categories[0])

  const visibleProjects = PROJECTS.filter(
    (project) => project.category === activeCategory
  )

  return (
    <main className={`min-h-[calc(100vh-64px)] px-4 py-10 font-sans sm:px-6 sm:py-16 ${
      isDark
        ? "bg-[radial-gradient(circle_at_top,_rgba(51,65,85,0.35),_transparent_34%),linear-gradient(180deg,_#0b1020,_#111827)] text-slate-100"
        : "bg-[#eef1f3] text-slate-900"
    }`}>
      <div className="mb-12 text-center">
        <h1 className={`text-4xl font-bold ${isDark ? "text-slate-50" : "text-slate-950"}`}>Projects</h1>
        <p className={`mx-auto mt-4 max-w-xl ${isDark ? "text-slate-300" : "text-gray-700"}`}>
          Selected projects across finance, GenAI, healthcare, and experiments.
        </p>
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCategory === category
                ? isDark
                  ? "bg-slate-100 text-slate-900 shadow-md"
                  : "bg-slate-950 text-white shadow-md"
                : isDark
                  ? "bg-slate-900/70 text-slate-200 hover:bg-slate-800/90"
                  : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-5xl space-y-6 md:space-y-8">
        {visibleProjects.map((project) => {
          const style = PROJECT_STYLES[project.id] ?? {
            tint: "from-white/14 via-white/10 to-white/6",
            accent: "from-white/12 to-transparent",
            border: "border-white/30",
          }

          return (
            <article
              key={project.id}
              className={`relative overflow-hidden rounded-[1.75rem] border p-6 shadow-[0_18px_42px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8 ${
                isDark
                  ? `border-slate-700/60 bg-slate-950/55 text-slate-100 ${style.border}`
                  : `bg-white/18 text-slate-900 ${style.border}`
              }`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.tint}`} />
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.accent}`} />

              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {CATEGORY_LABELS[project.category]}
                    </p>
                    <h2 className={`mt-2 text-2xl font-semibold leading-tight sm:text-3xl ${isDark ? "text-slate-50" : "text-slate-950"}`}>
                      {project.title}
                    </h2>
                    <p className={`mt-4 max-w-2xl text-sm leading-6 sm:text-base ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
                          isDark
                            ? "border-slate-700/80 bg-slate-900/55 text-slate-200 hover:border-slate-500 hover:bg-slate-800/80"
                            : "border-slate-300/80 bg-white/35 text-slate-700 hover:border-slate-400 hover:bg-white/55"
                        }`}
                        aria-label="View on GitHub"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <ul className={`mt-6 space-y-3 text-sm leading-6 sm:text-base ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? "bg-slate-400/70" : "bg-slate-500/65"}`} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur ${
                        isDark
                          ? "border-slate-700/70 bg-slate-900/55 text-slate-200"
                          : "border-white/40 bg-white/35 text-slate-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {AI_BADGES[project.id] && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {AI_BADGES[project.id].map((badge) => (
                      <span
                        key={badge}
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] ${
                          isDark
                            ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                            : "border-cyan-200 bg-cyan-50 text-cyan-700"
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {project.link && (
                  <div className="mt-7">
                    {project.link.external ? (
                      <a
                        href={project.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center rounded-full border px-5 py-3 text-sm font-semibold transition ${
                          isDark
                            ? "border-slate-700/80 bg-slate-900/55 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
                            : "border-slate-300/80 bg-white/35 text-slate-800 hover:border-slate-400 hover:bg-white/55"
                        }`}
                      >
                        {project.link.label}
                      </a>
                    ) : (
                      <Link
                        to={project.link.href}
                        className={`inline-flex items-center rounded-full border px-5 py-3 text-sm font-semibold transition ${
                          isDark
                            ? "border-slate-700/80 bg-slate-900/55 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
                            : "border-slate-300/80 bg-white/35 text-slate-800 hover:border-slate-400 hover:bg-white/55"
                        }`}
                      >
                        {project.link.label}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}

export default Projects
