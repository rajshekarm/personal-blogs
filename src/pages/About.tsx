import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight, FolderKanban, FolderOpen, TerminalSquare } from "lucide-react"
import { useDesktopTheme } from "../components/desktopTheme"

const desktopProjectItems = [
  { to: "/projects", label: "Projects", note: "Main hub", featured: true },
  { to: "/projects/ecg-triage-intelligence", label: "ECG Triage", note: "Health AI" },
  { to: "/projects", label: "Medical AI", note: "Research" },
  { to: "/projects", label: "GPU Engine", note: "CUDA" },
]

const About = () => {
  const { isDark } = useDesktopTheme()
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [terminalPosition, setTerminalPosition] = useState({ x: 0, y: 0 })
  const dragStateRef = useRef<{
    active: boolean
    startX: number
    startY: number
    originX: number
    originY: number
  }>({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  })
  const terminalAreaRef = useRef<HTMLDivElement | null>(null)
  const terminalCardRef = useRef<HTMLDivElement | null>(null)

  const shellCardClass = isDark
    ? "border-slate-700/70 bg-slate-950/45"
    : "border-slate-300/70 bg-[#dfe6ea]/90"
  const terminalSurfaceClass = isDark
    ? "border-slate-800/80 bg-[#0b1220] text-slate-100"
    : "border-slate-200/70 bg-[#0f172a] text-white"
  const panelSurfaceClass = isDark
    ? "border-white/10 bg-white/5"
    : "border-white/10 bg-white/6"
  const mutedTextClass = isDark ? "text-slate-300" : "text-white/65"
  const accentTextClass = isDark ? "text-cyan-200" : "text-cyan-200"
  const desktopLabelClass = isDark ? "text-slate-300" : "text-slate-500"

  useEffect(() => {
    if (!isTerminalOpen) {
      return
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragStateRef.current.active || !terminalAreaRef.current) {
        return
      }

      const area = terminalAreaRef.current.getBoundingClientRect()
      const card = terminalCardRef.current?.getBoundingClientRect()
      const bounds = dragStateRef.current
      const nextX = event.clientX - bounds.startX + bounds.originX
      const nextY = event.clientY - bounds.startY + bounds.originY
      const cardWidth = card?.width ?? 400
      const cardHeight = card?.height ?? 760
      const maxX = Math.max(0, area.width - cardWidth)
      const maxY = Math.max(0, area.height - cardHeight)

      setTerminalPosition({
        x: Math.min(Math.max(0, nextX), maxX),
        y: Math.min(Math.max(0, nextY), maxY),
      })
    }

    const handlePointerUp = () => {
      dragStateRef.current.active = false
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [isTerminalOpen])

  return (
    <section className="relative min-h-[calc(100vh-6rem)] px-4 pb-8 pt-6 md:px-6 md:pt-8">
      <div className="pointer-events-none absolute left-[-3rem] top-20 hidden h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl motion-safe:animate-pulse md:block" />
      <div className="pointer-events-none absolute right-[28%] top-28 hidden h-56 w-56 rounded-full bg-sky-300/10 blur-3xl motion-safe:animate-pulse md:block" />
      <div
        className={`pointer-events-none absolute inset-0 opacity-[0.16] ${
          isDark
            ? "bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(103,232,249,0.06),_transparent_28%)] [background-image:radial-gradient(rgba(148,163,184,0.10)_1px,transparent_1px)] [background-size:24px_24px]"
            : "bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.55),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(125,211,252,0.06),_transparent_28%)] [background-image:radial-gradient(rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:24px_24px]"
        }`}
      />

      <div className="relative z-0 grid min-h-[calc(100vh-10rem)] gap-6 md:grid-cols-[minmax(280px,400px)_minmax(320px,340px)_minmax(0,1fr)] md:items-start md:gap-8 lg:gap-10">
        <div ref={terminalAreaRef} className="order-1 relative z-10 min-h-[640px]">
          <div
            ref={terminalCardRef}
            className={`absolute left-0 top-0 w-full max-w-[400px] overflow-hidden rounded-[28px] border p-3 shadow-2xl backdrop-blur-sm ${shellCardClass} transition-transform`}
            style={{ transform: `translate3d(${terminalPosition.x}px, ${terminalPosition.y}px, 0)` }}
          >
            {isTerminalOpen ? (
              <div className={`rounded-[22px] shadow-inner ${terminalSurfaceClass}`}>
                <div
                  className={`flex cursor-move items-center justify-between border-b px-4 py-3 ${isDark ? "border-white/10" : "border-white/10"}`}
                  onPointerDown={(event) => {
                    dragStateRef.current = {
                      active: true,
                      startX: event.clientX,
                      startY: event.clientY,
                      originX: terminalPosition.x,
                      originY: terminalPosition.y,
                    }
                    ;(event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                      <TerminalSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${accentTextClass}/80`}>
                        Terminal
                      </p>
                      <p className={`text-xs ${mutedTextClass}`}>rjshekar@portfolio:~</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsTerminalOpen(false)}
                      className="h-3 w-3 rounded-full bg-emerald-400/80 transition hover:scale-110"
                      aria-label="Minimize terminal"
                      title="Minimize terminal"
                      onPointerDown={(event) => event.stopPropagation()}
                    />
                    <button
                      type="button"
                      onClick={() => setIsTerminalOpen(false)}
                      className="h-3 w-3 rounded-full bg-amber-300/80 transition hover:scale-110"
                      aria-label="Minimize terminal"
                      title="Minimize terminal"
                      onPointerDown={(event) => event.stopPropagation()}
                    />
                    <button
                      type="button"
                      onClick={() => setIsTerminalOpen(false)}
                      className="h-3 w-3 rounded-full bg-rose-400/80 transition hover:scale-110"
                      aria-label="Close terminal"
                      title="Close terminal"
                      onPointerDown={(event) => event.stopPropagation()}
                    />
                  </div>
                </div>

                <div className="space-y-4 px-4 py-4">
                  <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                    <div className={`rounded-2xl border p-4 ${panelSurfaceClass}`}>
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${accentTextClass}/80`}>
                        Shell output
                      </p>
                      <div className="mt-4 space-y-3 text-sm leading-6 text-white/82">
                        <p>
                          <span className="text-emerald-300">user@portfolio</span>:
                          <span className="text-sky-200">~</span>$ ls focus
                        </p>
                        <p className="text-white/90">distributed systems healthcare software streaming platforms</p>
                        <p>
                          <span className="text-emerald-300">user@portfolio</span>:
                          <span className="text-sky-200">~</span>$ cat current_focus.md
                        </p>
                        <p className="text-white/70">Building reliable backend systems, real-time workflows, and useful products.</p>
                      </div>
                    </div>

                    <div className={`rounded-2xl border p-4 ${panelSurfaceClass}`}>
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${accentTextClass}/80`}>
                        Activity
                      </p>
                      <div className="mt-4 space-y-3">
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                          <p className="text-xs uppercase tracking-[0.25em] text-white/45">Role</p>
                          <p className="mt-1 text-sm font-semibold text-white">Backend Engineer</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                          <p className="text-xs uppercase tracking-[0.25em] text-white/45">Systems</p>
                          <p className="mt-1 text-sm font-semibold text-white">Distributed + Cloud</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs uppercase tracking-[0.25em] text-white/45">AI Signal</p>
                              <p className="mt-1 text-sm font-semibold text-white">Inference + routing</p>
                            </div>
                            <span className="inline-flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)]" />
                              <span className="h-2 w-2 rounded-full bg-cyan-300/70 motion-safe:animate-pulse" />
                              <span className="h-2 w-2 rounded-full bg-cyan-300/40 motion-safe:animate-pulse" />
                            </span>
                          </div>
                          <p className="mt-2 text-[11px] text-white/60">Learning, searching, and optimizing in the background.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-2xl border p-4 ${panelSurfaceClass}`}>
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${accentTextClass}/80`}>
                      Quick focus
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                        <p className="text-xs uppercase tracking-[0.25em] text-white/45">Focus</p>
                        <p className="mt-1 text-sm font-semibold text-white">Backend + systems</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                        <p className="text-xs uppercase tracking-[0.25em] text-white/45">Stack</p>
                        <p className="mt-1 text-sm font-semibold text-white">C#, .NET, React, AWS</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                        <p className="text-xs uppercase tracking-[0.25em] text-white/45">Goal</p>
                        <p className="mt-1 text-sm font-semibold text-white">Build useful products</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 bg-slate-900/95 px-4 py-4">
                  <div className={`mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] ${accentTextClass}/80`}>
                    <FolderKanban className="h-3.5 w-3.5" />
                    <span>Project folders</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                    {[
                      {
                        to: "/projects",
                        label: "Projects",
                        note: "All work",
                        featured: true,
                      },
                      {
                        to: "/projects/ecg-triage-intelligence",
                        label: "ECG Triage",
                        note: "Health AI",
                      },
                      {
                        to: "/projects",
                        label: "Medical AI",
                        note: "Research",
                      },
                      {
                        to: "/projects",
                        label: "GPU Engine",
                        note: "CUDA",
                      },
                    ].map((item) => (
                      <Link
                        key={`${item.to}-${item.label}`}
                        to={item.to}
                        className={`group rounded-xl border px-3 py-3 text-left transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/10 ${
                          item.featured
                            ? "border-cyan-300/55 bg-cyan-300/12 shadow-[0_0_0_1px_rgba(103,232,249,0.14)]"
                            : "border-white/10 bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                              item.featured
                                ? "bg-cyan-300/20 text-cyan-100 group-hover:bg-cyan-300/30"
                                : "bg-amber-300/15 text-amber-200 group-hover:bg-amber-300/25"
                            }`}
                          >
                            <FolderOpen className="h-4 w-4" />
                          </span>
                          <div>
                            <span className="block text-sm font-semibold text-white/90">{item.label}</span>
                            <span className="mt-1 block text-xs text-white/55">{item.note}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsTerminalOpen(true)}
                className="inline-flex w-full items-center justify-between rounded-[22px] border border-white/60 bg-white/70 px-4 py-3 text-left text-slate-700 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/85"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900/90 text-white">
                    <TerminalSquare className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">Terminal</span>
                    <span className="block text-xs text-slate-500">Click to restore to desktop</span>
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(248,113,113,0.45)]" />
                  <span className="text-xs font-medium text-slate-500">closed</span>
                </span>
              </button>
            )}
          </div>
        </div>

        <div
          className={`order-2 mx-auto w-full max-w-[320px] rounded-[18px] border p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-sm md:mt-6 ${
            isDark ? "border-slate-700/70 bg-slate-950/75 text-slate-100" : "border-white/60 bg-[#faf9f7]/95 text-slate-900"
          }`}
        >
          <div className="mx-auto mb-8 h-42 w-42 overflow-hidden rounded-full">
            <img
              src="/profile.png"
              alt="Profile"
              className="mt-2 h-48 w-48 scale-110 object-cover object-[50%_20%]"
            />
          </div>

          <h2 className={`text-xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-gray-900"}`}>
            Rajashekar
            <br />
            Mudigonda
          </h2>

          <div className="mx-auto my-4 h-[2px] w-8 bg-[#2F5D62]" />

          <p className={`text-xs tracking-[0.3em] ${isDark ? "text-slate-400" : "text-gray-600"}`}>
            BACKEND ENGINEER
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/rajshekarmudigonda/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-[#2F5D62] hover:text-[#2F5D62]"
            >
              <span className="pb-1 font-bold">in</span>
            </a>

            <a
              href="https://github.com/rajshekarm"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-[#2F5D62] hover:text-[#2F5D62]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
          </div>
        </div>

        <div className="order-3 max-w-2xl md:ml-auto md:mr-4 md:pt-2 lg:mr-10">
          <div
            className={`overflow-hidden rounded-[24px] border p-8 shadow-[0_18px_50px_rgba(15,23,42,0.1)] backdrop-blur-md ${
              isDark ? "border-slate-700/70 bg-slate-950/70 text-slate-100" : "border-white/70 bg-white/78 text-slate-900"
            }`}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Home.md
                </p>
                <h1 className={`mt-2 text-4xl font-bold tracking-tight md:text-5xl ${isDark ? "text-slate-50" : "text-gray-900"}`}>
                  Hi, I'm Rajashekar.
                </h1>
              </div>
              <div
                className={`hidden h-11 w-11 items-center justify-center rounded-full border md:flex ${
                  isDark ? "border-slate-700 bg-slate-900/70 text-slate-200" : "border-slate-200 bg-white/80 text-slate-500"
                }`}
              >
                <TerminalSquare className="h-5 w-5" />
              </div>
            </div>

            <p className={`max-w-2xl text-base leading-relaxed ${isDark ? "text-slate-300" : "text-gray-700"}`}>
              Backend engineer focused on healthcare software, distributed systems, and real-time products that need to be reliable as well as practical.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className={`rounded-2xl border p-4 ${isDark ? "border-slate-700/70 bg-slate-900/55" : "border-slate-200/80 bg-white/85"}`}>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Current focus
                </p>
                <p className={`mt-2 text-sm font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  Healthcare workflows, streaming pipelines, product polish
                </p>
              </div>

              <div className={`rounded-2xl border p-4 ${isDark ? "border-slate-700/70 bg-slate-900/55" : "border-slate-200/80 bg-white/85"}`}>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Core stack
                </p>
                <p className={`mt-2 text-sm font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  Kafka, Flink, .NET, React, AWS
                </p>
              </div>

              <div className={`rounded-2xl border p-4 ${isDark ? "border-slate-700/70 bg-slate-900/55" : "border-slate-200/80 bg-white/85"}`}>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Open to
                </p>
                <p className={`mt-2 text-sm font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  Backend, platform, and data-heavy roles
                </p>
              </div>

              <div className={`rounded-2xl border p-4 ${isDark ? "border-slate-700/70 bg-slate-900/55" : "border-slate-200/80 bg-white/85"}`}>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Next stop
                </p>
                <p className={`mt-2 text-sm font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  Browse projects or open the resume
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 md:gap-4">
              <Link
                to="/projects"
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition ${
                  isDark
                    ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200"
                    : "bg-[#3576c0] text-white hover:bg-[#042030]"
                }`}
              >
                Projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                to="/resume"
                className={`rounded-full border px-6 py-3 font-medium transition ${
                  isDark
                    ? "border-slate-600 bg-slate-900/45 text-slate-100 hover:bg-slate-800/80"
                    : "border-gray-800 text-gray-900 hover:bg-gray-100"
                }`}
              >
                Resume
              </Link>
            </div>
          </div>
        </div>

      </div>

      {!isTerminalOpen ? (
        <div className="absolute bottom-8 left-6 z-20 hidden flex-col gap-3 xl:flex">
          <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${desktopLabelClass}`}>Desktop</p>
          <div className="grid w-full max-w-[320px] grid-cols-2 gap-3">
            {desktopProjectItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`group flex flex-col items-center gap-2 rounded-2xl border px-4 py-4 text-center shadow-lg backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cyan-300/50 ${
                  item.featured
                    ? `col-span-2 border-cyan-300/55 ${
                        isDark
                          ? "bg-slate-900/80 text-slate-100 hover:bg-slate-800/90"
                          : "bg-white/78 text-slate-800 hover:bg-white/86"
                      }`
                    : `${shellCardClass} ${isDark ? "text-slate-100" : "text-slate-800"}`
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex shrink-0 items-center justify-center rounded-xl transition ${
                      item.featured
                        ? "h-14 w-14 bg-cyan-400/18 text-cyan-700 group-hover:bg-cyan-400/24"
                        : "h-12 w-12 bg-cyan-400/15 text-cyan-700 group-hover:bg-cyan-400/20"
                    }`}
                  >
                    <FolderKanban className={item.featured ? "h-6 w-6" : "h-5 w-5"} />
                  </span>
                  <div className="text-left">
                    <span className="block text-sm font-semibold leading-tight">{item.label}</span>
                    <span className={`mt-1 block text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {item.note}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default About
