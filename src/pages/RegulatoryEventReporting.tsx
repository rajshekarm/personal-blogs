import { Link } from "react-router-dom"
import { ArrowLeft, GitCompareArrows, Layers3, RefreshCcw, ShieldCheck } from "lucide-react"

const architectureSteps = [
  {
    title: "Ingest and normalize",
    text: "Order lifecycle events arrived from multiple upstream sources and had to be normalized into one dependable internal shape before any reporting logic could begin.",
    icon: Layers3,
  },
  {
    title: "Sequence and reconcile",
    text: "The core work was not just moving data, but handling the realities of production streams: late records, duplicates, and out-of-order events that still had to resolve into a correct final timeline.",
    icon: GitCompareArrows,
  },
  {
    title: "Generate compliant outputs",
    text: "Once the event history was made consistent, the pipeline produced reporting-ready outputs that downstream teams could validate and submit with less manual cleanup.",
    icon: ShieldCheck,
  },
  {
    title: "Replay safely",
    text: "Recovery paths were designed so failed windows could be replayed deterministically, reducing the need for one-off scripts or risky manual reconstruction.",
    icon: RefreshCcw,
  },
]

const outcomeNotes = [
  {
    label: "Scale",
    value: "Millions of daily events",
    text: "The system had to stay correct even when the simple case was no longer the common case.",
  },
  {
    label: "Reliability",
    value: "Replay-first recovery",
    text: "Operational recovery was treated as part of the design, not an afterthought once incidents happened.",
  },
  {
    label: "Focus",
    value: "Correctness over shortcuts",
    text: "The hardest problems were around event ordering, reconciliation, and making outputs trustworthy.",
  },
]

const stack = ["Java", "SQL", "Event Processing", "Distributed Systems", "Reconciliation", "Recovery"]

export default function RegulatoryEventReporting() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.14),_transparent_26%),linear-gradient(180deg,_#0b1020,_#111827)] text-slate-100">
      <section className="relative overflow-hidden border-b border-amber-200/10">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#f59e0b14_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b14_1px,transparent_1px)] bg-[size:38px_38px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Anonymized Capital Markets Case Study</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Regulatory Event Reporting Pipeline
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                This work was part of a large-scale reporting system for market events. The problem was not just
                moving data from one place to another. It was making sure that millions of events, arriving with
                real-world messiness, could be sequenced, reconciled, and turned into dependable reporting outputs.
              </p>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">
                The case study is intentionally anonymized and focuses on the system patterns I worked on rather than
                proprietary implementation details.
              </p>
            </div>

            <div className="rounded-[28px] border border-amber-200/15 bg-slate-950/60 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300">What mattered most</p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-white/6 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Correct event histories</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Late and duplicate records had to be resolved into one reliable reporting timeline.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/6 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Recovery without guesswork</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Replay and regeneration needed to be safe enough that operators could trust them under pressure.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/6 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Less manual cleanup</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    The best outcome was a system that reduced last-minute intervention instead of depending on it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {outcomeNotes.map((note) => (
            <div key={note.label} className="rounded-[28px] border border-white/8 bg-slate-950/55 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-amber-300">{note.label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{note.value}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{note.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/6 bg-slate-950/35">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-amber-300">System Walkthrough</p>
            <div className="mt-8 space-y-5">
              {architectureSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="rounded-[28px] border border-white/8 bg-slate-950/65 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/12 text-amber-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">{step.title}</h2>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{step.text}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[28px] border border-white/8 bg-slate-950/65 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-amber-300">What I learned</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                A lot of backend work is really about preserving trust. If the system cannot explain how an output was
                produced, or cannot recover cleanly after failure, the technical design is not finished yet.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-slate-950/65 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-amber-300">Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
