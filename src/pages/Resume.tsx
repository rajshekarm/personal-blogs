import { useDesktopTheme } from "../components/desktopTheme"

const timelineEntries = [
  {
    year: "2026",
    role: "Software Engineer, CareIntellect for Opera...",
    org: "GE Healthcare",
    period: "2025 - 2026",
    side: "left" as const,
    tone: "bg-[#0b86b6]",
    textTone: "text-white",
    accent: "from-cyan-400/20 to-transparent",
    summary:
      "Building healthcare software experiences with a focus on reliable workflows, clinical efficiency, and product polish.",
  },
  {
    year: "2025",
    role: "Teaching Assistant, Intro to Algorithms",
    org: "Illinois Institute of Technology",
    period: "2024 - 2025",
    side: "left" as const,
    tone: "bg-[#4b8a72]",
    textTone: "text-white",
    accent: "from-emerald-400/20 to-transparent",
    summary:
      "Supported coursework, helped students reason through algorithmic problems, and reinforced fundamentals in data structures.",
  },
  {
    year: "2025",
    role: "Computer Science",
    org: "Illinois Institute of Technology",
    period: "2023 - 2025",
    side: "right" as const,
    tone: "bg-[#bf2d3a]",
    textTone: "text-white",
    accent: "from-rose-400/20 to-transparent",
    summary:
      "Completed graduate study in Computer Science with an emphasis on systems, software engineering, and applied machine learning.",
  },
  {
    year: "2023",
    role: "Software Engineer, Founding Team",
    org: "Prognovex",
    period: "2022 - 2023",
    side: "left" as const,
    tone: "bg-[#cf3a7d]",
    textTone: "text-white",
    accent: "from-fuchsia-400/20 to-transparent",
    summary:
      "Worked on an AI-assisted ECG triage platform for distributed clinics and helped reduce diagnosis turnaround from hours to minutes.",
  },
  {
    year: "2022",
    role: "Software Engineer",
    org: "JP Morgan Chase",
    period: "2021 - 2022",
    side: "left" as const,
    tone: "bg-[#9b59c4]",
    textTone: "text-white",
    accent: "from-violet-400/20 to-transparent",
    summary:
      "Developed secure enterprise software and worked across internal services, integration points, and operational workflows.",
  },
  {
    year: "2020",
    role: "Associate Software Engineer",
    org: "SS&C Eze Software",
    period: "2018 - 2020",
    side: "left" as const,
    tone: "bg-[#1f67b4]",
    textTone: "text-white",
    accent: "from-sky-400/20 to-transparent",
    summary:
      "Built onboarding and workflow tooling with React and ASP.NET Core, improving efficiency and reducing manual effort.",
  },
]

type TimelineEntry = (typeof timelineEntries)[number]

const TimelineCard = ({ entry }: { entry: TimelineEntry }) => (
  <article
    className={`group relative overflow-hidden rounded-2xl ${entry.tone} ${entry.textTone} p-5 shadow-[0_18px_40px_rgba(15,23,42,0.14)] transition-transform duration-300 hover:-translate-y-1 sm:p-6`}
  >
    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${entry.accent}`} />
    <div className="relative">
      <p className="text-sm font-medium opacity-90">{entry.role}</p>
      <p className="mt-1 text-lg font-semibold leading-tight opacity-95">{entry.org}</p>
      <div className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
        {entry.period}
      </div>
      <p className="mt-4 max-w-md text-sm leading-6 text-white/85">{entry.summary}</p>
    </div>
  </article>
)

const Resume = () => {
  const { isDark } = useDesktopTheme()

  const pageClass = isDark
    ? "bg-[radial-gradient(circle_at_top_left,_rgba(71,85,105,0.42),_transparent_32%),linear-gradient(to_bottom,_#0b1020,_#111827)] text-slate-100"
    : "bg-[#f5f3ef] text-slate-900"
  const backdropClass = isDark
    ? "bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.22),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(148,163,184,0.14),_transparent_28%),linear-gradient(to_bottom,_#0f172a,_#111827)]"
    : "bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.8),_transparent_28%),linear-gradient(to_bottom,_#f7f5f1,_#f1f3f4)]"

  return (
    <main className={`relative min-h-[calc(100vh-64px)] overflow-hidden ${pageClass}`}>
      <div className={`pointer-events-none absolute inset-0 ${backdropClass}`} />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />

      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div
          id="timeline"
          className={`relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border px-4 py-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-6 sm:py-8 lg:px-10 lg:py-12 ${
            isDark
              ? "border-slate-700/60 bg-slate-950/45"
              : "border-white/60 bg-white/55"
          }`}
        >
          <div className={`pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent lg:block ${
            isDark ? "via-slate-600/80" : "via-slate-300"
          }`} />

          <div className="space-y-5 lg:space-y-7">
            {timelineEntries.map((entry, index) => (
              <div
                key={`${entry.year}-${entry.role}`}
                className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] lg:items-stretch"
              >
                <div className="lg:hidden">
                  <div className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm ${
                    isDark
                      ? "border-slate-700 bg-slate-900/75 text-slate-300"
                      : "border-slate-300 bg-white/80 text-slate-500"
                  }`}>
                    {entry.year}
                  </div>
                  <TimelineCard entry={entry} />
                </div>

                <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-end">
                  {entry.side === "left" ? <TimelineCard entry={entry} /> : null}
                </div>

                <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
                  <div className={`relative flex h-10 w-10 items-center justify-center rounded-full border shadow-sm ${
                    isDark ? "border-slate-700 bg-slate-950" : "border-slate-300 bg-white"
                  }`}>
                    <div className={`h-2.5 w-2.5 rounded-full ${isDark ? "bg-slate-500" : "bg-slate-400"}`} />
                  </div>
                  <div className={`mt-2 text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>{entry.year}</div>
                </div>

                <div className="hidden lg:flex lg:flex-col lg:justify-center">
                  {entry.side === "right" ? <TimelineCard entry={entry} /> : null}
                </div>

                {index === timelineEntries.length - 1 ? null : (
                  <div className="hidden lg:block lg:col-span-3">
                    <div className="mx-auto h-6 w-px bg-gradient-to-b from-slate-300 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Resume
