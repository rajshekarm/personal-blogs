import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight, LayoutGrid, X } from "lucide-react"
import { PROJECTS } from "../data/projects"
import { MediaPreview } from "../components/MediaPreview"
import { useDesktopTheme } from "../components/desktopTheme"
import type { ProjectCategory } from "../types/projects"

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  financial: "Financial",
  genai: "Gen AI",
  healthcare: "Healthcare",
  fun: "Fun",
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

const SHAPE_RADII = [
  "30px 18px 26px 14px",
  "18px 30px 14px 26px",
  "24px 22px 34px 18px",
  "34px 14px 22px 30px",
  "20px 28px 16px 32px",
]

const SHAPE_CLIPS: Record<string, string> = {
  nutriapi: "polygon(0% 10%, 8% 0%, 92% 0%, 100% 10%, 100% 90%, 92% 100%, 8% 100%, 0% 90%)",
  "ecg-triage":
    "polygon(2% 0%, 94% 0%, 100% 12%, 100% 84%, 88% 100%, 8% 100%, 0% 86%, 0% 8%)",
  "icu-event-processing":
    "polygon(0% 8%, 10% 0%, 90% 0%, 100% 10%, 100% 92%, 92% 100%, 10% 100%, 0% 90%)",
  "medical-image-analysis":
    "polygon(6% 0%, 94% 0%, 100% 8%, 100% 94%, 92% 100%, 8% 100%, 0% 94%, 0% 8%)",
  "gpu-medical-image-processing":
    "polygon(0% 14%, 12% 0%, 100% 0%, 100% 86%, 88% 100%, 0% 100%)",
  "realtime-chat":
    "polygon(10% 0%, 100% 0%, 100% 84%, 90% 100%, 0% 100%, 0% 12%)",
  "llm-cache":
    "polygon(0% 0%, 88% 0%, 100% 10%, 100% 100%, 12% 100%, 0% 90%)",
  jarvis:
    "polygon(12% 0%, 88% 0%, 100% 18%, 100% 82%, 88% 100%, 12% 100%, 0% 82%, 0% 18%)",
}

const SIZE_PRESETS: Record<string, { w: number; h: number }> = {
  nutriapi: { w: 360, h: 440 },
  "ecg-triage": { w: 380, h: 470 },
  "icu-event-processing": { w: 370, h: 460 },
  "medical-image-analysis": { w: 380, h: 470 },
  "gpu-medical-image-processing": { w: 340, h: 430 },
  "realtime-chat": { w: 330, h: 400 },
  "llm-cache": { w: 330, h: 400 },
  jarvis: { w: 340, h: 420 },
}

const CATEGORY_ORDER: ProjectCategory[] = [
  "healthcare",
  "financial",
  "genai",
  "fun",
]

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const getScale = (arenaWidth: number) => clamp(arenaWidth / 1200, 0.72, 1)

const getCardDimensions = (projectId: string, arenaWidth: number, featured: boolean) => {
  const scale = getScale(arenaWidth)
  const preset = SIZE_PRESETS[projectId] ?? { w: 320, h: 390 }
  const widthBoost = featured ? 1.18 : 0.88
  const heightBoost = featured ? 1.16 : 0.88

  return {
    w: Math.round(preset.w * scale * widthBoost),
    h: Math.round(preset.h * scale * heightBoost),
  }
}

const DNABackdrop = ({ isDark }: { isDark: boolean }) => {
  const stroke = isDark ? "rgba(125,211,252,0.22)" : "rgba(37,99,235,0.14)"
  const strokeSoft = isDark ? "rgba(244,114,182,0.16)" : "rgba(168,85,247,0.10)"
  const node = isDark ? "rgba(226,232,240,0.28)" : "rgba(51,65,85,0.20)"

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1600 1100"
      preserveAspectRatio="none"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M340 80 C480 180, 480 280, 340 380 C200 480, 200 580, 340 680 C480 780, 480 880, 340 980" stroke={stroke} strokeWidth="3" />
        <path d="M420 80 C280 180, 280 280, 420 380 C560 480, 560 580, 420 680 C280 780, 280 880, 420 980" stroke={strokeSoft} strokeWidth="3" />
        <path d="M1220 80 C1080 180, 1080 280, 1220 380 C1360 480, 1360 580, 1220 680 C1080 780, 1080 880, 1220 980" stroke={stroke} strokeWidth="3" />
        <path d="M1300 80 C1440 180, 1440 280, 1300 380 C1160 480, 1160 580, 1300 680 C1440 780, 1440 880, 1300 980" stroke={strokeSoft} strokeWidth="3" />

        {[
          [330, 130, 420, 130],
          [310, 220, 440, 220],
          [310, 310, 440, 310],
          [330, 400, 420, 400],
          [330, 490, 420, 490],
          [310, 580, 440, 580],
          [310, 670, 440, 670],
          [330, 760, 420, 760],
          [330, 850, 420, 850],
          [310, 940, 440, 940],
          [1210, 130, 1300, 130],
          [1190, 220, 1320, 220],
          [1190, 310, 1320, 310],
          [1210, 400, 1300, 400],
          [1210, 490, 1300, 490],
          [1190, 580, 1320, 580],
          [1190, 670, 1320, 670],
          [1210, 760, 1300, 760],
          [1210, 850, 1300, 850],
          [1190, 940, 1320, 940],
        ].map(([x1, y1, x2, y2], index) => (
          <g key={`${x1}-${y1}`}>
            <path
              d={`M${x1} ${y1} L${x2} ${y2}`}
              stroke={index % 2 === 0 ? stroke : strokeSoft}
              strokeWidth="2"
            />
            <circle cx={x1} cy={y1} r="10" fill={node} />
            <circle cx={x2} cy={y2} r="10" fill={node} />
          </g>
        ))}

        <path d="M560 210 C640 150, 700 150, 780 210 C860 270, 920 270, 1000 210" stroke={strokeSoft} strokeWidth="2" />
        <path d="M560 760 C640 700, 700 700, 780 760 C860 820, 920 820, 1000 760" stroke={strokeSoft} strokeWidth="2" />
        <circle cx="560" cy="210" r="9" fill={node} />
        <circle cx="780" cy="210" r="9" fill={node} />
        <circle cx="1000" cy="210" r="9" fill={node} />
        <circle cx="560" cy="760" r="9" fill={node} />
        <circle cx="780" cy="760" r="9" fill={node} />
        <circle cx="1000" cy="760" r="9" fill={node} />
      </g>
    </svg>
  )
}

const Projects = () => {
  const { isDark } = useDesktopTheme()
  const arenaRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const [arenaWidth, setArenaWidth] = useState(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("healthcare")
  const [orbitAngle, setOrbitAngle] = useState(0)

  const visibleProjects = useMemo(
    () =>
      PROJECTS.filter((project) => project.category === activeCategory).sort(
        (a, b) => Number(!!b.featured) - Number(!!a.featured)
      ),
    [activeCategory]
  )

  const categoryCounts = useMemo(
    () =>
      CATEGORY_ORDER.reduce<Record<ProjectCategory, number>>(
        (counts, category) => ({
          ...counts,
          [category]: PROJECTS.filter((project) => project.category === category).length,
        }),
        {} as Record<ProjectCategory, number>
      ),
    []
  )

  const selectedProject = useMemo(
    () => PROJECTS.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId]
  )

  const featuredProject = useMemo(
    () => visibleProjects.find((project) => project.featured) ?? visibleProjects[0] ?? null,
    [visibleProjects]
  )

  const orbitProjects = useMemo(
    () => visibleProjects.filter((project) => project.id !== featuredProject?.id),
    [visibleProjects, featuredProject]
  )

  const arenaHeight = useMemo(
    () => Math.max(860, Math.round(arenaWidth * 0.82)),
    [arenaWidth]
  )

  useEffect(() => {
    const element = arenaRef.current
    if (!element) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) {
        return
      }
      setArenaWidth(Math.floor(entry.contentRect.width))
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setSelectedProjectId(null)
  }, [activeCategory])

  useEffect(() => {
    let lastFrame = performance.now()

    const animate = (now: number) => {
      const dt = Math.min(0.032, (now - lastFrame) / 1000)
      lastFrame = now
      setOrbitAngle((value) => value + dt * 0.22)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!selectedProjectId) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProjectId(null)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [selectedProjectId])

  return (
    <main
      className={`min-h-[calc(100vh-64px)] overflow-x-hidden px-4 py-8 font-sans sm:px-6 sm:py-10 ${
        isDark
          ? "bg-[radial-gradient(circle_at_top,_rgba(51,65,85,0.35),_transparent_34%),linear-gradient(180deg,_#0b1020,_#111827)] text-slate-100"
          : "bg-[#eef1f3] text-slate-900"
      }`}
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${
              isDark
                ? "border-slate-700/70 bg-slate-950/55 text-slate-300"
                : "border-slate-200 bg-white/75 text-slate-500"
            }`}
            >
            <LayoutGrid className="h-3.5 w-3.5" />
            Selected work
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORY_ORDER.map((category) => {
              const active = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? isDark
                        ? "border-cyan-300/40 bg-cyan-300/12 text-cyan-50"
                        : "border-slate-950 bg-slate-950 text-white"
                      : isDark
                        ? "border-slate-700/70 bg-slate-900/70 text-slate-300 hover:border-slate-500 hover:bg-slate-800/90"
                        : "border-slate-200 bg-white/80 text-slate-600 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <span>{CATEGORY_LABELS[category]}</span>
                  <span
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[0.7rem] font-semibold ${
                      active
                        ? "bg-white/15 text-inherit"
                        : isDark
                          ? "bg-slate-800 text-slate-300"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {categoryCounts[category]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div
          ref={arenaRef}
          className={`relative w-full overflow-hidden rounded-[32px] border shadow-[0_28px_100px_rgba(15,23,42,0.12)] ${
            isDark
              ? "border-slate-700/70 bg-slate-950/55"
              : "border-white/70 bg-white/55"
          }`}
          style={{ height: arenaHeight }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProjectId(null)
            }
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.10),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.08),_transparent_32%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
          <DNABackdrop isDark={isDark} />
          {arenaWidth > 0 && featuredProject && (
            <>
              <div
                className={`pointer-events-none absolute left-1/2 top-1/2 rounded-full border ${
                  isDark ? "border-cyan-300/20" : "border-slate-900/10"
                }`}
                style={{
                  width: Math.min(arenaWidth * 0.58, arenaHeight * 0.58),
                  height: Math.min(arenaWidth * 0.58, arenaHeight * 0.58),
                  transform: "translate(-50%, -50%)",
                }}
              />
              <div
                className={`pointer-events-none absolute left-1/2 top-1/2 rounded-full border ${
                  isDark ? "border-cyan-300/12" : "border-slate-900/8"
                }`}
                style={{
                  width: Math.min(arenaWidth * 0.78, arenaHeight * 0.78),
                  height: Math.min(arenaWidth * 0.78, arenaHeight * 0.78),
                  transform: "translate(-50%, -50%)",
                }}
              />

              {(() => {
                const featuredStyle = PROJECT_STYLES[featuredProject.id] ?? {
                  tint: "from-white/14 via-white/10 to-white/6",
                  accent: "from-white/12 to-transparent",
                  border: "border-white/30",
                }
                const featuredSize = getCardDimensions(featuredProject.id, arenaWidth, true)
                const centerLeft = arenaWidth / 2 - featuredSize.w / 2
                const centerTop = arenaHeight / 2 - featuredSize.h / 2
                const featuredHovered = hoveredId === featuredProject.id
                const anyHover = hoveredId !== null

                return (
                  <article
                    key={featuredProject.id}
                    role="button"
                    tabIndex={0}
                    className={`group absolute overflow-hidden border backdrop-blur-xl transition-[transform,box-shadow,filter,opacity] duration-1200 ease-out ${
                      isDark
                        ? `border-slate-700/60 bg-slate-950/72 text-slate-100 ${featuredStyle.border}`
                        : `border-white/80 bg-white/76 text-slate-900 ${featuredStyle.border}`
                    }`}
                    style={{
                      width: featuredSize.w,
                      height: featuredSize.h,
                      left: centerLeft,
                      top: centerTop,
                      borderRadius: 36,
                      boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
                      transform: `translate3d(0,0,0) scale(${featuredHovered ? 1.11 : 1})`,
                      zIndex: featuredHovered ? 60 : 40,
                      opacity: anyHover && !featuredHovered ? 0.9 : 1,
                    }}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse" || event.pointerType === "pen") {
                        setHoveredId(featuredProject.id)
                      }
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse" || event.pointerType === "pen") {
                        setHoveredId(null)
                      }
                    }}
                    onClick={() => {
                      if (featuredProject.media) {
                        setSelectedProjectId(featuredProject.id)
                      }
                    }}
                    onPointerUp={(event) => {
                      if (event.pointerType === "touch" && featuredProject.media) {
                        event.preventDefault()
                        setSelectedProjectId(featuredProject.id)
                      }
                    }}
                    onKeyDown={(event) => {
                      if ((event.key === "Enter" || event.key === " ") && featuredProject.media) {
                        event.preventDefault()
                        setSelectedProjectId(featuredProject.id)
                      }
                    }}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${featuredStyle.tint}`}
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${featuredStyle.accent}`}
                    />

                    <div className="relative flex h-full flex-col p-4 sm:p-6">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <p
                            className={`text-[0.62rem] font-semibold uppercase tracking-[0.28em] ${
                              isDark ? "text-slate-400" : "text-slate-500"
                            }`}
                          >
                            {featuredProject.category}
                          </p>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] ${
                              isDark
                                ? "border-cyan-300/30 bg-cyan-300/12 text-cyan-100"
                                : "border-slate-950 bg-slate-950 text-white"
                            }`}
                          >
                            Pinned
                          </span>
                        </div>
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            isDark ? "bg-cyan-300/70" : "bg-slate-500/70"
                          }`}
                        />
                      </div>

                      <div
                        className={`overflow-hidden rounded-[28px] border transition-transform duration-1200 ease-out ${
                          featuredHovered ? "scale-[1.1]" : "scale-100"
                        } ${
                          isDark
                            ? "border-slate-700/70 bg-slate-950/70"
                            : "border-slate-200/80 bg-white"
                        }`}
                        >
                          <div
                            className="aspect-[16/10] transition-transform duration-1200 ease-out"
                            style={{ transform: `scale(${featuredHovered ? 1.18 : 1})` }}
                          >
                            <div className="relative h-full w-full">
                              <MediaPreview media={featuredProject.media} />
                              <div
                                className={`absolute bottom-3 right-3 rounded-full border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] shadow-sm transition ${
                                  isDark
                                    ? "border-white/10 bg-slate-950/80 text-slate-100"
                                    : "border-slate-200/80 bg-white/88 text-slate-700"
                                }`}
                              >
                                View details
                              </div>
                            </div>
                          </div>
                      </div>

                      <div className="mt-4 flex min-h-0 flex-1 flex-col">
                        <h2
                          className={`text-xl font-semibold leading-tight transition-all duration-700 ${
                            isDark ? "text-slate-50" : "text-slate-950"
                          }`}
                          style={{ opacity: featuredHovered ? 0.98 : 1 }}
                        >
                          {featuredProject.title}
                        </h2>

                        <p
                          className={`mt-2 text-sm leading-6 transition-all duration-700 ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          {featuredProject.summary}
                        </p>

                        <div className="mt-auto pt-4">
                          {featuredProject.github ? (
                            <a
                              href={featuredProject.github}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                isDark
                                  ? "border-cyan-300/30 bg-cyan-300/12 text-cyan-50 hover:border-cyan-300/50 hover:bg-cyan-300/18"
                                  : "border-slate-950 bg-slate-950 text-white hover:bg-slate-800"
                              }`}
                            >
                              <span>GitHub details</span>
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          ) : (
                            <span
                              className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${
                                isDark
                                  ? "border-white/10 bg-white/5 text-slate-300"
                                  : "border-slate-200 bg-white/70 text-slate-500"
                              }`}
                            >
                              Details coming soon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })()}

              {orbitProjects.map((project, index) => {
                const style = PROJECT_STYLES[project.id] ?? {
                  tint: "from-white/14 via-white/10 to-white/6",
                  accent: "from-white/12 to-transparent",
                  border: "border-white/30",
                }
                const orbitSize = getCardDimensions(project.id, arenaWidth, false)
                const orbitCount = Math.max(1, orbitProjects.length)
                const step = (Math.PI * 2) / orbitCount
                const angle = orbitAngle + index * step - Math.PI / 2
                const orbitRadiusX = Math.max(160, Math.min(arenaWidth * 0.34, arenaWidth / 2 - 180))
                const orbitRadiusY = Math.max(130, Math.min(arenaHeight * 0.26, arenaHeight / 2 - 180))
                const left =
                  arenaWidth / 2 + Math.cos(angle) * orbitRadiusX - orbitSize.w / 2
                const top =
                  arenaHeight / 2 + Math.sin(angle) * orbitRadiusY - orbitSize.h / 2
                const isHovered = hoveredId === project.id
                const dimmed = hoveredId !== null && !isHovered

                return (
                  <article
                    key={project.id}
                    role="button"
                    tabIndex={0}
                    className={`group absolute overflow-hidden border backdrop-blur-xl transition-[transform,box-shadow,filter,opacity] duration-700 ease-out ${
                      isDark
                        ? `border-slate-700/60 bg-slate-950/68 text-slate-100 ${style.border}`
                        : `border-white/80 bg-white/72 text-slate-900 ${style.border}`
                    }`}
                    style={{
                      width: orbitSize.w,
                      height: orbitSize.h,
                      left,
                      top,
                      borderRadius: SHAPE_RADII[index % SHAPE_RADII.length],
                      clipPath:
                        SHAPE_CLIPS[project.id] ??
                        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                      boxShadow: "0 18px 48px rgba(15,23,42,0.12)",
                      transform: `translate3d(0,0,0) scale(${isHovered ? 1.08 : 1})`,
                      transformOrigin: "center center",
                      zIndex: isHovered ? 55 : 20,
                      opacity: dimmed ? 0.82 : 1,
                      filter: dimmed ? "saturate(0.82) brightness(0.92)" : "none",
                    }}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse" || event.pointerType === "pen") {
                        setHoveredId(project.id)
                      }
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse" || event.pointerType === "pen") {
                        setHoveredId(null)
                      }
                    }}
                    onClick={() => {
                      if (project.media) {
                        setSelectedProjectId(project.id)
                      }
                    }}
                    onPointerUp={(event) => {
                      if (event.pointerType === "touch" && project.media) {
                        event.preventDefault()
                        setSelectedProjectId(project.id)
                      }
                    }}
                    onKeyDown={(event) => {
                      if ((event.key === "Enter" || event.key === " ") && project.media) {
                        event.preventDefault()
                        setSelectedProjectId(project.id)
                      }
                    }}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.tint}`}
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.accent}`}
                    />

                    <div className="relative flex h-full flex-col p-4 sm:p-5">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p
                          className={`text-[0.62rem] font-semibold uppercase tracking-[0.28em] ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {project.category}
                        </p>
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            isDark ? "bg-cyan-300/70" : "bg-slate-500/70"
                          }`}
                        />
                      </div>

                      <div
                        className={`overflow-hidden rounded-[24px] border transition-transform duration-700 ease-out ${
                          isHovered ? "scale-[1.12]" : "scale-100"
                        } ${
                          isDark
                            ? "border-slate-700/70 bg-slate-950/70"
                            : "border-slate-200/80 bg-white"
                        }`}
                        >
                          <div
                            className="aspect-[16/10] transition-transform duration-700 ease-out"
                            style={{ transform: `scale(${isHovered ? 1.16 : 1})` }}
                          >
                            <div className="relative h-full w-full">
                              <MediaPreview media={project.media} />
                              <div
                                className={`absolute bottom-3 right-3 rounded-full border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] shadow-sm transition ${
                                  isDark
                                    ? "border-white/10 bg-slate-950/80 text-slate-100"
                                    : "border-slate-200/80 bg-white/88 text-slate-700"
                                }`}
                              >
                                Open card
                              </div>
                            </div>
                          </div>
                      </div>

                      <div className="mt-4 flex min-h-0 flex-1 flex-col">
                        <h2
                          className={`text-lg font-semibold leading-tight transition-all duration-700 ${
                            isDark ? "text-slate-50" : "text-slate-950"
                          }`}
                        >
                          {project.title}
                        </h2>

                        <p
                          className={`mt-2 text-sm leading-6 transition-all duration-700 ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          {project.summary}
                        </p>

                        <div className="mt-auto pt-4">
                          {project.github ? (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                isDark
                                  ? "border-cyan-300/30 bg-cyan-300/12 text-cyan-50 hover:border-cyan-300/50 hover:bg-cyan-300/18"
                                  : "border-slate-950 bg-slate-950 text-white hover:bg-slate-800"
                              }`}
                            >
                              <span>GitHub details</span>
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          ) : project.link ? (
                            project.link.external ? (
                              <a
                                href={project.link.href}
                                target="_blank"
                                rel="noreferrer"
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                  isDark
                                    ? "border-cyan-300/30 bg-cyan-300/12 text-cyan-50 hover:border-cyan-300/50 hover:bg-cyan-300/18"
                                    : "border-slate-950 bg-slate-950 text-white hover:bg-slate-800"
                                }`}
                              >
                                <span>{project.link.label}</span>
                                <ArrowUpRight className="h-4 w-4" />
                              </a>
                            ) : (
                              <Link
                                to={project.link.href}
                                onClick={(event) => event.stopPropagation()}
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                  isDark
                                    ? "border-cyan-300/30 bg-cyan-300/12 text-cyan-50 hover:border-cyan-300/50 hover:bg-cyan-300/18"
                                    : "border-slate-950 bg-slate-950 text-white hover:bg-slate-800"
                                }`}
                              >
                                <span>{project.link.label}</span>
                                <ArrowUpRight className="h-4 w-4" />
                              </Link>
                            )
                          ) : (
                            <span
                              className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${
                                isDark
                                  ? "border-white/10 bg-white/5 text-slate-300"
                                  : "border-slate-200 bg-white/70 text-slate-500"
                              }`}
                            >
                              Details coming soon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </>
          )}

        </div>

        {selectedProject?.media && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/88 px-4 py-6 backdrop-blur-md"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedProjectId(null)
              }
            }}
          >
            <div
              className={`relative flex h-[min(84vh,920px)] w-[min(94vw,1320px)] flex-col overflow-hidden rounded-[28px] border shadow-[0_40px_120px_rgba(0,0,0,0.45)] ${
                isDark
                  ? "border-slate-700/70 bg-slate-950/95"
                  : "border-slate-200/80 bg-white/95"
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedProjectId(null)}
                className={`absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
                  isDark
                    ? "border-white/10 bg-white/10 text-white hover:bg-white/16"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                aria-label="Close image viewer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="min-h-0 bg-black">
                  <img
                    src={selectedProject.media.src}
                    alt={selectedProject.title}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className={`flex flex-col justify-between p-5 sm:p-6 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  <div>
                    <p className={`text-[0.7rem] font-semibold uppercase tracking-[0.28em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {CATEGORY_LABELS[selectedProject.category]}
                    </p>
                    <h2 className="mt-3 text-xl font-semibold leading-tight">
                      {selectedProject.title}
                    </h2>
                    <p className={`mt-4 text-sm leading-7 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      {selectedProject.summary}
                    </p>
                  </div>

                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition ${
                        isDark
                          ? "border-cyan-300/30 bg-cyan-300/12 text-cyan-50 hover:border-cyan-300/50 hover:bg-cyan-300/18"
                          : "border-slate-950 bg-slate-950 text-white hover:bg-slate-800"
                      }`}
                    >
                      <span>GitHub details</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Projects
