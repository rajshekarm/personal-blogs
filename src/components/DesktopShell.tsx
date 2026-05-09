import { Link, useLocation } from "react-router-dom"
import {
  AppWindow,
  BadgeInfo,
  BatteryMedium,
  BookOpen,
  Clock3,
  FolderKanban,
  Gamepad2,
  MessageSquare,
  Moon,
  NotebookText,
  TerminalSquare,
  Wifi,
  Workflow,
  SunMedium,
} from "lucide-react"
import type { ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"
import { DesktopThemeProvider } from "./desktopTheme"

const appItems = [
  { to: "/", label: "About", icon: BadgeInfo },
  { to: "/resume", label: "Resume", icon: NotebookText },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/contact", label: "Contact", icon: MessageSquare },
  { to: "/blogs", label: "Blogs", icon: BookOpen },
  { to: "/games", label: "Games", icon: Gamepad2 },
  { to: "/artion", label: "Artion", icon: Workflow },
  { to: "/artionNextGen", label: "artionNextGen", icon: AppWindow },
]

const techRibbonItems = [
  "Java",
  "C#",
  "Python",
  "Streaming",
  "Flink",
  "Kinesis",
  "React",
  "Kafka",
  "Distributed Systems",
  "Cloud",
]

const DesktopShell = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation()
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light"
    }

    const storedTheme = window.localStorage.getItem("desktop-theme")
    return storedTheme === "dark" ? "dark" : "light"
  })

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })

  useEffect(() => {
    window.localStorage.setItem("desktop-theme", theme)
  }, [theme])

  const isDark = theme === "dark"

  const shellClass = useMemo(
    () =>
      isDark
        ? "bg-[radial-gradient(circle_at_top_left,_rgba(87,87,87,0.55),_transparent_26%),linear-gradient(180deg,_#0b1020,_#1f2937)] text-slate-100"
        : "bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.96),_transparent_28%),linear-gradient(180deg,_#f1f5f7,_#dbe4ea)] text-slate-900",
    [isDark]
  )

  const headerClass = useMemo(
    () =>
      isDark
        ? "border-slate-800/70 bg-slate-950/60 text-slate-100"
        : "border-white/55 bg-white/64 text-slate-900",
    [isDark]
  )

  const chipClass = useMemo(
    () =>
      isDark
        ? "border-slate-700 bg-slate-900/55 text-slate-200"
        : "border-slate-200 bg-white/72 text-slate-600",
    [isDark]
  )

  const dockClass = useMemo(
    () =>
      isDark
        ? "border-slate-800/80 bg-slate-950/92 text-white shadow-[0_-12px_40px_rgba(0,0,0,0.36)]"
        : "border-slate-700/65 bg-slate-950/92 text-white shadow-[0_-12px_40px_rgba(15,23,42,0.24)]",
    [isDark]
  )

  const ribbonClass = useMemo(
    () =>
      isDark
        ? "border-slate-700/60 bg-slate-950/60 text-slate-200"
        : "border-slate-300/70 bg-white/55 text-slate-500",
    [isDark]
  )

  const windowTitle =
    pathname === "/resume"
      ? "Resume"
      : pathname === "/projects"
        ? "Projects"
        : pathname === "/contact"
          ? "Contact"
          : pathname === "/blogs"
            ? "Blogs"
            : pathname.startsWith("/blogs/")
              ? "Blog"
              : pathname === "/games"
                ? "Games"
                : pathname === "/artion"
                  ? "Artion"
                  : pathname === "/artionNextGen"
                    ? "artionNextGen"
                    : pathname === "/projects/ecg-triage-intelligence"
                      ? "ECG Triage"
                      : "App"

  return (
    <DesktopThemeProvider value={{ theme, isDark }}>
      <main className={`${shellClass} min-h-screen overflow-hidden font-sans transition-colors duration-300`}>
        <header className={`fixed inset-x-0 top-0 z-50 border-b px-3 py-2.5 backdrop-blur-xl sm:px-4 ${headerClass}`}>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {pathname !== "/" && (
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  to="/"
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition hover:-translate-y-0.5 ${
                    isDark ? "border-white/10 bg-white/6 text-white/65 hover:bg-rose-500/90" : "border-white/80 bg-white/70 text-slate-500 hover:bg-rose-500 hover:text-white"
                  }`}
                  aria-label="Close to home"
                  title="Close to home"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-current" />
                </Link>
                <Link
                  to="/"
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition hover:-translate-y-0.5 ${
                    isDark ? "border-white/10 bg-white/6 text-white/65 hover:bg-amber-400/90" : "border-white/80 bg-white/70 text-slate-500 hover:bg-amber-400 hover:text-white"
                  }`}
                  aria-label="Minimize to home"
                  title="Minimize to home"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-current" />
                </Link>
                <Link
                  to="/"
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition hover:-translate-y-0.5 ${
                    isDark ? "border-white/10 bg-white/6 text-white/65 hover:bg-emerald-500/90" : "border-white/80 bg-white/70 text-slate-500 hover:bg-emerald-500 hover:text-white"
                  }`}
                  aria-label="Send to home"
                  title="Send to home"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-current" />
                </Link>
                <span className={`ml-2 rounded-full px-3 py-1 text-xs font-medium backdrop-blur ${chipClass}`}>
                  {windowTitle}
                </span>
              </div>
            )}

            <div className="hidden flex-col sm:flex">
              <p className={`text-sm font-semibold leading-none ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                Rajashekar OS
              </p>
              <p className={`text-[11px] ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                portfolio desktop
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2.5 ${isDark ? "text-slate-200" : "text-slate-600"}`}>
            <div className={`hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium sm:flex ${chipClass}`}>
              <Wifi className="h-3.5 w-3.5" />
              Wi-Fi
            </div>
            <div className={`hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium sm:flex ${chipClass}`}>
              <BatteryMedium className="h-3.5 w-3.5" />
              86%
            </div>
            <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${chipClass}`}>
              <Clock3 className="h-3.5 w-3.5" />
              {currentTime}
            </div>
          </div>
          </div>
        </header>

        <div className={`fixed inset-x-0 top-[56px] z-30 hidden border-y px-4 py-1.5 backdrop-blur-md md:block ${ribbonClass}`}>
          <div className="relative overflow-hidden">
            <div className={`pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r ${isDark ? "from-slate-950/90 to-transparent" : "from-white/90 to-transparent"}`} />
            <div className={`pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l ${isDark ? "from-slate-950/90 to-transparent" : "from-white/90 to-transparent"}`} />
            <div className={`flex w-max items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.32em] ${isDark ? "text-slate-300" : "text-slate-500"} [animation:tech-ribbon-scroll_36s_linear_infinite] motion-reduce:animate-none`}>
              {techRibbonItems.concat(techRibbonItems).map((item, index) => (
                <span key={`${item}-${index}`} className="whitespace-nowrap">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-24 pb-24">{children}</div>

        <button
          type="button"
          onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
          className={`fixed bottom-24 right-5 z-40 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 md:bottom-28 ${
            isDark
              ? "border-slate-700 bg-slate-950/80 text-slate-100"
              : "border-white/70 bg-white/80 text-slate-700"
          }`}
          aria-label="Toggle desktop theme"
          title="Toggle desktop theme"
        >
          {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDark ? "Light mode" : "Dark mode"}
        </button>

        <nav className={`fixed inset-x-0 bottom-0 z-40 border-t px-3 py-3 backdrop-blur-md ${dockClass}`}>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="hidden items-center gap-3 lg:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                <TerminalSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">Rajashekar OS</p>
                <p className="text-xs text-white/55">Click an app to open a page</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {appItems.map((item) => {
                const Icon = item.icon
                const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to)

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`group relative flex min-w-[88px] flex-col items-center gap-1 rounded-xl border px-3 py-2 text-center transition hover:-translate-y-0.5 ${
                      active
                        ? "border-cyan-300/60 bg-white/14 shadow-[0_0_0_1px_rgba(103,232,249,0.14)]"
                        : "border-white/10 bg-white/5 hover:border-cyan-300/40 hover:bg-white/10"
                    }`}
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${active ? "bg-cyan-300/18 text-cyan-100" : "bg-white/10 text-cyan-200 group-hover:bg-cyan-300/15"}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-[11px] font-medium text-white/90">{item.label}</span>
                    {active && <span className="absolute -bottom-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </main>
    </DesktopThemeProvider>
  )
}

export default DesktopShell
