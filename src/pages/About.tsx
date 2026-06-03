import { ArrowUpRight, BrainCircuit, Code2, FolderOpen, Mail, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { useMemo, useState } from "react"
import { useDesktopTheme } from "../components/desktopTheme"

type FolderId = "backend" | "machine-learning" | "applied-ai"

type SkillFolder = {
  id: FolderId
  label: string
  icon: typeof Code2
  summary: string
  accent: string
  sections: Array<{
    title: string
    items: string[]
  }>
}

const skillFolders: SkillFolder[] = [
  {
    id: "backend",
    label: "Backend Engineering",
    icon: Code2,
    summary: "Programming languages, distributed systems, and the infrastructure I use to build dependable services.",
    accent: "#5992C6",
    sections: [
      {
        title: "Programming languages",
        items: ["TypeScript", "Java", "Python", "SQL"],
      },
      {
        title: "Backend systems",
        items: ["Node.js", "REST APIs", "Kafka", "Flink", "Microservices"],
      },
      {
        title: "Other technologies",
        items: ["AWS", "Docker", "Linux", "Git"],
      },
    ],
  },
  {
    id: "machine-learning",
    label: "Machine Learning",
    icon: BrainCircuit,
    summary: "Practical ML work focused on experimentation, model selection, and useful outcomes.",
    accent: "#8cb9df",
    sections: [
      {
        title: "Core ML",
        items: ["Supervised learning", "Feature engineering", "Model evaluation", "Experiment tracking"],
      },
      {
        title: "Deep learning",
        items: ["Neural networks", "Representation learning", "PyTorch", "TensorFlow"],
      },
      {
        title: "Applied focus",
        items: ["Recommendation support", "Prediction workflows", "Data-driven automation"],
      },
    ],
  },
  {
    id: "applied-ai",
    label: "Applied AI",
    icon: Sparkles,
    summary: "AI only when it adds real product value and keeps the experience clear.",
    accent: "#bdd6ea",
    sections: [
      {
        title: "Practical use",
        items: ["Assistive workflows", "Decision support", "Workflow automation"],
      },
      {
        title: "Product mindset",
        items: ["Clear UX", "Useful outputs", "Human-in-the-loop design"],
      },
      {
        title: "Working style",
        items: ["Selective use", "Measure impact", "Keep it maintainable"],
      },
    ],
  },
]

const About = () => {
  const { isDark } = useDesktopTheme()
  const [activeFolder, setActiveFolder] = useState<FolderId | null>(null)

  const mutedTextClass = isDark ? "text-slate-300" : "text-slate-600"
  const subtleTextClass = isDark ? "text-slate-400" : "text-slate-500"
  const activeFolderData = useMemo(
    () => skillFolders.find((folder) => folder.id === activeFolder) ?? null,
    [activeFolder]
  )

  return (
    <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden px-4 pb-8 pt-6 md:px-6 md:pt-8">
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(148,163,184,0.10)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute left-[-2rem] top-20 hidden h-64 w-64 rounded-full bg-[#5992C6]/12 blur-3xl md:block" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] max-w-[1420px] gap-12 lg:grid-cols-[minmax(260px,300px)_minmax(400px,1fr)] lg:items-start">
        <div className="flex justify-center pt-2 lg:justify-start">
          <div className="max-w-[340px] text-center lg:text-left">
            <div
              className={`relative mx-auto mb-7 h-[20.5rem] w-[15.75rem] overflow-hidden rounded-[1.75rem] shadow-[0_30px_70px_rgba(0,0,0,0.24)] lg:mx-0 lg:w-[16.75rem] ${
                isDark ? "bg-white/5" : "bg-white/50"
              }`}
            >
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="h-full w-full object-cover object-[50%_18%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.12))]" />
            </div>

            <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${subtleTextClass}`}>Backend Engineer</p>
            <h1 className={`mt-4 font-sans text-[2.2rem] font-light leading-[0.95] tracking-[-0.05em] md:text-[2.55rem] ${isDark ? "text-slate-50" : "text-slate-900"}`}>
              Rajashekar
              <br />
              Mudigonda
            </h1>
            <div className="mt-5 h-[2px] w-9 bg-[#5992C6]/80 lg:mx-0" />

            <p className={`mt-5 text-[0.92rem] leading-7 ${mutedTextClass}`}>
              I build reliable backend systems and software that stays readable, maintainable, and calm under pressure.
            </p>
            <p className={`mt-4 text-[0.68rem] uppercase tracking-[0.24em] ${subtleTextClass}`}>
              Backend systems, software engineering, selective ML
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href="https://www.linkedin.com/in/rajshekarmudigonda/"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
                  isDark
                    ? "border-white/15 text-slate-200 hover:border-[#5992C6]/55 hover:text-[#dbeaf4]"
                    : "border-slate-300 text-slate-700 hover:border-slate-500 hover:text-slate-900"
                }`}
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <span className="pb-1 font-bold">in</span>
              </a>
              <a
                href="https://github.com/rajshekarm"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
                  isDark
                    ? "border-white/15 text-slate-200 hover:border-[#5992C6]/55 hover:text-[#dbeaf4]"
                    : "border-slate-300 text-slate-700 hover:border-slate-500 hover:text-slate-900"
                }`}
                aria-label="GitHub"
                title="GitHub"
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
              <Link
                to="/contact"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
                  isDark
                    ? "border-white/15 text-slate-200 hover:border-[#5992C6]/55 hover:text-[#dbeaf4]"
                    : "border-slate-300 text-slate-700 hover:border-slate-500 hover:text-slate-900"
                }`}
                aria-label="Contact"
                title="Contact"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-2 lg:pt-12">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
            <div>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${subtleTextClass}`}>Home.md</p>
              <h2
                className={`mt-4 max-w-3xl font-sans text-[1.85rem] font-light leading-[1] tracking-[-0.04em] md:text-[2.2rem] lg:text-[2.55rem] ${isDark ? "text-slate-50" : "text-slate-900"}`}
              >
                Backend systems.
                <br />
                Thoughtful software.
                <br />
                Selective ML.
              </h2>

              <p className={`mt-5 max-w-2xl text-[0.88rem] leading-7 ${mutedTextClass}`}>
                I enjoy building reliable software that feels clear, stable, and useful. Most of my work is in backend engineering and system design, with machine learning used selectively when it improves the product.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/projects"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-medium transition ${
                    isDark
                      ? "bg-[#5992C6] text-slate-950 hover:bg-[#7aa9d5]"
                      : "bg-slate-900/90 text-white hover:bg-slate-800"
                  }`}
                >
                  Projects
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/resume"
                  className={`rounded-full border px-5 py-2.5 text-[0.95rem] font-medium transition ${
                    isDark
                      ? "border-white/15 bg-white/6 text-slate-100 hover:bg-white/10"
                      : "border-slate-300 bg-white/18 text-slate-900 hover:bg-white/30"
                  }`}
                >
                  Resume
                </Link>
              </div>
            </div>

            <div className="p-0">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.34em] ${subtleTextClass}`}>Skill folders</p>
                  <p className={`mt-1 text-[0.72rem] leading-snug ${mutedTextClass}`}>Open a folder to explore the stack.</p>
                </div>
                <div className={`rounded-full px-3 py-1 text-[0.67rem] uppercase tracking-[0.24em] ${isDark ? "bg-white/6 text-slate-300" : "bg-white/60 text-slate-500"}`}>
                  Desktop
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {skillFolders.map((folder) => {
                  const Icon = folder.icon
                  const active = folder.id === activeFolder

                  return (
                    <button
                      key={folder.id}
                      type="button"
                      onClick={() => setActiveFolder((current) => (current === folder.id ? null : folder.id))}
                      className={`group relative flex min-h-[7.5rem] flex-col justify-end rounded-[1.2rem] px-3 pb-3 pt-7 text-left transition duration-300 hover:-translate-y-1 ${
                        active
                          ? isDark
                            ? "bg-[#5992C6]/18 shadow-[0_14px_30px_rgba(89,146,198,0.16)]"
                            : "bg-slate-900/8 shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                          : isDark
                            ? "bg-white/5 hover:bg-white/8"
                            : "bg-white/55 hover:bg-white/75"
                      }`}
                    >
                      <span
                        className={`absolute left-3 top-2 h-3.5 w-9 rounded-t-[0.7rem] transition ${
                          active
                            ? isDark
                              ? "bg-[#5992C6]/28"
                              : "bg-slate-900/8"
                            : isDark
                              ? "bg-white/8 group-hover:bg-[#5992C6]/14"
                              : "bg-white/80"
                        }`}
                      />
                      <Icon className={`h-4 w-4 ${active ? "text-[#dbeaf4]" : isDark ? "text-[#9fc0db]" : "text-slate-700"}`} />
                      <span className={`mt-3 text-sm font-medium leading-tight ${isDark ? "text-slate-50" : "text-slate-900"}`}>
                        {folder.label}
                      </span>
                      <span className={`mt-1 text-[0.62rem] uppercase tracking-[0.18em] ${subtleTextClass}`}>
                        Open
                      </span>
                    </button>
                  )
                })}
              </div>

              <div
                className={`mt-4 overflow-hidden rounded-[1.5rem] transition-[max-height,opacity,transform] duration-500 ease-out ${
                  activeFolderData
                    ? isDark
                      ? "max-h-[36rem] bg-[#08111f]/72 opacity-100 shadow-[0_20px_45px_rgba(0,0,0,0.16)]"
                      : "max-h-[36rem] bg-white/80 opacity-100 shadow-[0_20px_45px_rgba(15,23,42,0.08)]"
                    : "max-h-0 opacity-0 translate-y-2"
                }`}
              >
                {activeFolderData ? (
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          isDark ? "bg-[#5992C6]/14 text-[#dbeaf4]" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <FolderOpen className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                    <p className={`text-[0.9rem] font-semibold ${isDark ? "text-slate-50" : "text-slate-900"}`}>{activeFolderData.label}</p>
                    <p className={`mt-1 text-[0.68rem] leading-5 ${mutedTextClass}`}>{activeFolderData.summary}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {activeFolderData.sections.map((section) => (
                    <div key={section.title} className={`rounded-[1.1rem] p-3 ${isDark ? "bg-white/4" : "bg-white/70"}`}>
                        <p className={`text-[0.62rem] uppercase tracking-[0.24em] ${subtleTextClass}`}>{section.title}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {section.items.map((item) => (
                            <span
                              key={item}
                              className={`rounded-full px-3 py-1 text-[0.68rem] transition ${
                                isDark
                                  ? "bg-white/6 text-slate-100"
                                  : "bg-white text-slate-700"
                                }`}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={`px-1 py-8 text-center ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Click a folder to open it.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
