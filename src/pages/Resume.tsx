import { ChevronDown, ChevronRight, FolderOpen, Target, Code2, Workflow, Database, Cpu } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useDesktopTheme } from "../components/desktopTheme"
import { useState, type ReactNode } from "react"

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

const focusItems = [
  "Healthcare software",
  "Distributed systems",
  "Real-time workflows",
  "Reliable product polish",
]

const skillGroups = [
  {
    title: "Backend",
    icon: Code2,
    items: ["Java", "C#", "Python", "TypeScript"],
  },
  {
    title: "Streaming",
    icon: Workflow,
    items: ["Kafka", "Flink", "Kinesis", "Redis"],
  },
  {
    title: "Data",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "ElasticSearch", "Docker"],
  },
  {
    title: "Systems",
    icon: Cpu,
    items: ["AWS", "Azure", "Observability", "Performance"],
  },
]

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

const FolderPanel = ({
  title,
  icon: Icon,
  children,
  isDark,
  open,
  onToggle,
}: {
  title: string
  icon: LucideIcon
  children: ReactNode
  isDark: boolean
  open: boolean
  onToggle: () => void
}) => (
  <section
    className={`overflow-hidden rounded-[1.5rem] border shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${
      isDark ? "border-slate-700/60 bg-slate-950/50" : "border-white/70 bg-white/70"
    }`}
  >
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-center gap-3 border-b px-5 py-4 text-left transition hover:bg-black/5 ${
        isDark ? "border-white/10" : "border-slate-200/80"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          isDark ? "bg-slate-900 text-cyan-200" : "bg-slate-100 text-slate-700"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Folder
        </p>
        <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
          {title}
        </h2>
      </div>
      {open ? (
        <ChevronDown className={`h-4 w-4 ${isDark ? "text-slate-300" : "text-slate-500"}`} />
      ) : (
        <ChevronRight className={`h-4 w-4 ${isDark ? "text-slate-300" : "text-slate-500"}`} />
      )}
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-out ${
        open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="p-5">{children}</div>
    </div>
  </section>
)

const ChemicalBackdrop = ({ isDark }: { isDark: boolean }) => {
  const stroke = isDark ? "rgba(148,163,184,0.22)" : "rgba(71,85,105,0.12)"
  const strokeSoft = isDark ? "rgba(103,232,249,0.18)" : "rgba(14,165,233,0.10)"
  const node = isDark ? "rgba(226,232,240,0.32)" : "rgba(51,65,85,0.20)"

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1600 1200"
      preserveAspectRatio="none"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M140 180 L260 120 L390 185 L330 305 L180 290 Z" stroke={stroke} strokeWidth="2" />
        <path d="M260 120 L320 70" stroke={strokeSoft} strokeWidth="2" />
        <path d="M390 185 L470 145" stroke={strokeSoft} strokeWidth="2" />
        <path d="M330 305 L390 360" stroke={strokeSoft} strokeWidth="2" />
        <path d="M180 290 L120 360" stroke={strokeSoft} strokeWidth="2" />

        <path d="M1120 150 L1230 100 L1360 160 L1330 290 L1190 320 L1085 245 Z" stroke={stroke} strokeWidth="2" />
        <path d="M1230 100 L1280 45" stroke={strokeSoft} strokeWidth="2" />
        <path d="M1360 160 L1420 125" stroke={strokeSoft} strokeWidth="2" />
        <path d="M1330 290 L1400 345" stroke={strokeSoft} strokeWidth="2" />
        <path d="M1190 320 L1120 380" stroke={strokeSoft} strokeWidth="2" />

        <path d="M700 760 L820 690 L950 755 L900 885 L760 910 L660 825 Z" stroke={stroke} strokeWidth="2" />
        <path d="M820 690 L865 610" stroke={strokeSoft} strokeWidth="2" />
        <path d="M950 755 L1040 725" stroke={strokeSoft} strokeWidth="2" />
        <path d="M900 885 L960 960" stroke={strokeSoft} strokeWidth="2" />
        <path d="M760 910 L700 980" stroke={strokeSoft} strokeWidth="2" />

        <circle cx="260" cy="120" r="18" fill={node} />
        <circle cx="390" cy="185" r="14" fill={node} />
        <circle cx="330" cy="305" r="16" fill={node} />
        <circle cx="1230" cy="100" r="18" fill={node} />
        <circle cx="1360" cy="160" r="14" fill={node} />
        <circle cx="1330" cy="290" r="16" fill={node} />
        <circle cx="820" cy="690" r="18" fill={node} />
        <circle cx="950" cy="755" r="14" fill={node} />
        <circle cx="900" cy="885" r="16" fill={node} />

        <path d="M470 520 C580 450, 680 450, 790 520" stroke={strokeSoft} strokeWidth="2" />
        <path d="M790 520 C900 590, 1010 590, 1120 520" stroke={strokeSoft} strokeWidth="2" />
        <circle cx="580" cy="450" r="10" fill={node} />
        <circle cx="680" cy="450" r="10" fill={node} />
        <circle cx="790" cy="520" r="10" fill={node} />
        <circle cx="900" cy="590" r="10" fill={node} />
        <circle cx="1010" cy="590" r="10" fill={node} />

        <path d="M70 680 L150 620 L235 655 L250 745 L175 800 L90 770 Z" stroke={stroke} strokeWidth="2" />
        <path d="M150 620 L180 570" stroke={strokeSoft} strokeWidth="2" />
        <path d="M235 655 L295 635" stroke={strokeSoft} strokeWidth="2" />
        <path d="M250 745 L320 790" stroke={strokeSoft} strokeWidth="2" />
        <path d="M175 800 L140 870" stroke={strokeSoft} strokeWidth="2" />
        <circle cx="150" cy="620" r="13" fill={node} />
        <circle cx="235" cy="655" r="11" fill={node} />
        <circle cx="250" cy="745" r="12" fill={node} />

        <path d="M1440 720 L1505 660 L1575 705 L1560 785 L1488 825 L1418 785 Z" stroke={stroke} strokeWidth="2" />
        <path d="M1505 660 L1540 610" stroke={strokeSoft} strokeWidth="2" />
        <path d="M1575 705 L1630 685" stroke={strokeSoft} strokeWidth="2" />
        <path d="M1560 785 L1635 835" stroke={strokeSoft} strokeWidth="2" />
        <path d="M1488 825 L1450 890" stroke={strokeSoft} strokeWidth="2" />
        <circle cx="1505" cy="660" r="13" fill={node} />
        <circle cx="1575" cy="705" r="11" fill={node} />
        <circle cx="1560" cy="785" r="12" fill={node} />

        <path d="M290 980 L370 930 L455 970 L440 1060 L360 1100 L280 1060 Z" stroke={stroke} strokeWidth="2" />
        <path d="M370 930 L410 875" stroke={strokeSoft} strokeWidth="2" />
        <path d="M455 970 L520 950" stroke={strokeSoft} strokeWidth="2" />
        <path d="M440 1060 L500 1110" stroke={strokeSoft} strokeWidth="2" />
        <path d="M360 1100 L315 1160" stroke={strokeSoft} strokeWidth="2" />
        <circle cx="370" cy="930" r="13" fill={node} />
        <circle cx="455" cy="970" r="11" fill={node} />
        <circle cx="440" cy="1060" r="12" fill={node} />

        <path d="M980 70 L1050 35 L1128 65 L1116 145 L1045 178 L972 145 Z" stroke={stroke} strokeWidth="2" />
        <path d="M1050 35 L1085 -10" stroke={strokeSoft} strokeWidth="2" />
        <path d="M1128 65 L1188 42" stroke={strokeSoft} strokeWidth="2" />
        <path d="M1116 145 L1170 190" stroke={strokeSoft} strokeWidth="2" />
        <path d="M1045 178 L1008 235" stroke={strokeSoft} strokeWidth="2" />
        <circle cx="1050" cy="35" r="13" fill={node} />
        <circle cx="1128" cy="65" r="11" fill={node} />
        <circle cx="1116" cy="145" r="12" fill={node} />
      </g>
    </svg>
  )
}

const Resume = () => {
  const { isDark } = useDesktopTheme()
  const [focusOpen, setFocusOpen] = useState(true)
  const [skillsOpen, setSkillsOpen] = useState(true)

  const pageClass = isDark
    ? "bg-[radial-gradient(circle_at_top_left,_rgba(71,85,105,0.42),_transparent_32%),linear-gradient(to_bottom,_#0b1020,_#111827)] text-slate-100"
    : "bg-[#f5f3ef] text-slate-900"
  const backdropClass = isDark
    ? "bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.22),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(148,163,184,0.14),_transparent_28%),linear-gradient(to_bottom,_#0f172a,_#111827)]"
    : "bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.8),_transparent_28%),linear-gradient(to_bottom,_#f7f5f1,_#f1f3f4)]"

  return (
    <main className={`relative min-h-[calc(100vh-64px)] overflow-hidden ${pageClass}`}>
      <div className={`pointer-events-none absolute inset-0 ${backdropClass}`} />
      <ChemicalBackdrop isDark={isDark} />

      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,14rem)] xl:items-start">
          <div className="hidden xl:block">
            <FolderPanel
              title="Focus"
              icon={Target}
              isDark={isDark}
              open={focusOpen}
              onToggle={() => setFocusOpen((value: boolean) => !value)}
            >
              <div className="grid gap-3">
                {focusItems.map((item) => (
                  <div
                    key={item}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                      isDark
                        ? "border-cyan-300/10 bg-cyan-300/6 text-slate-200"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </FolderPanel>
          </div>

          <div
            id="timeline"
            className={`relative overflow-hidden rounded-[2rem] border px-4 py-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-6 sm:py-8 lg:px-10 lg:py-12 ${
              isDark
                ? "border-slate-700/60 bg-slate-950/45"
                : "border-white/60 bg-white/55"
            }`}
          >
            <div
              className={`pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent lg:block ${
                isDark ? "via-slate-600/80" : "via-slate-300"
              }`}
            />

            <div className="space-y-5 lg:space-y-7">
              {timelineEntries.map((entry, index) => (
                <div
                  key={`${entry.year}-${entry.role}`}
                  className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] lg:items-stretch"
                >
                  <div className="lg:hidden">
                    <div
                      className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm ${
                        isDark
                          ? "border-slate-700 bg-slate-900/75 text-slate-300"
                          : "border-slate-300 bg-white/80 text-slate-500"
                      }`}
                    >
                      {entry.year}
                    </div>
                    <TimelineCard entry={entry} />
                  </div>

                  <div className="hidden lg:flex lg:flex-col lg:items-end lg:justify-center">
                    {entry.side === "left" ? <TimelineCard entry={entry} /> : null}
                  </div>

                  <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
                    <div
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full border shadow-sm ${
                        isDark ? "border-slate-700 bg-slate-950" : "border-slate-300 bg-white"
                      }`}
                    >
                      <div className={`h-2.5 w-2.5 rounded-full ${isDark ? "bg-slate-500" : "bg-slate-400"}`} />
                    </div>
                    <div className={`mt-2 text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {entry.year}
                    </div>
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

          <div className="hidden xl:block">
            <FolderPanel
              title="Skills"
              icon={FolderOpen}
              isDark={isDark}
              open={skillsOpen}
              onToggle={() => setSkillsOpen((value: boolean) => !value)}
            >
              <div className="grid gap-3">
                {skillGroups.map((group) => {
                  const GroupIcon = group.icon
                  return (
                    <div
                      key={group.title}
                      className={`rounded-2xl border p-4 ${
                        isDark
                          ? "border-slate-700/70 bg-slate-900/55"
                          : "border-slate-200/80 bg-white/80"
                      }`}
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <GroupIcon className={`h-4 w-4 ${isDark ? "text-cyan-200" : "text-slate-700"}`} />
                        <h3 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                          {group.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${
                              isDark
                                ? "border-white/10 bg-white/5 text-slate-300"
                                : "border-slate-200 bg-slate-50 text-slate-600"
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </FolderPanel>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Resume
