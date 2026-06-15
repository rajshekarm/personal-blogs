import { Link } from "react-router-dom"
import { Activity, ArrowLeft, Gauge, LifeBuoy, Radar } from "lucide-react"

const focusAreas = [
  {
    title: "Throughput under load",
    text: "The system needed to absorb high message volume without dropping state or forcing risky manual intervention.",
    icon: Gauge,
  },
  {
    title: "Deterministic recovery",
    text: "When something failed, operators needed replay and recovery paths that restored state predictably instead of introducing duplicate side effects.",
    icon: LifeBuoy,
  },
  {
    title: "Operational visibility",
    text: "Observability mattered because teams had to understand backlog, flow health, and failure modes quickly when the system was under pressure.",
    icon: Radar,
  },
]

const proofPoints = [
  {
    label: "Pipeline throughput",
    value: "8,500 messages/sec",
  },
  {
    label: "Data durability",
    value: "Zero loss",
  },
  {
    label: "Design pattern",
    value: "Replay-oriented recovery",
  },
]

const stack = ["Java", "Messaging", "Distributed Systems", "Observability", "Replay", "Low Latency"]

export default function OrderFlowReliability() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.14),_transparent_28%),linear-gradient(180deg,_#07111f,_#111827)] text-slate-100">
      <section className="relative overflow-hidden border-b border-sky-200/10">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#60a5fa14_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa14_1px,transparent_1px)] bg-[size:38px_38px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_360px] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-sky-300">Anonymized Trading Systems Case Study</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Order Flow Reliability and Replay Platform
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                This project focused on the less visible side of low-latency systems: making high-volume order
                workflows easier to recover, easier to reason about, and safer to operate when conditions were not
                ideal.
              </p>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">
                The details here are intentionally generalized, but the engineering themes are the same ones I care
                about most: throughput, predictable recovery, and software that stays calm under pressure.
              </p>
            </div>

            <div className="rounded-[28px] border border-sky-200/15 bg-slate-950/60 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-300/12 text-sky-200">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Core result</p>
                  <p className="mt-1 text-xl font-semibold text-white">High throughput with safe recovery</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {proofPoints.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/6 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                    <p className="mt-1 text-base font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {focusAreas.map((area) => {
            const Icon = area.icon
            return (
              <div key={area.title} className="rounded-[28px] border border-white/8 bg-slate-950/60 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-300/12 text-sky-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">{area.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{area.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-y border-white/6 bg-slate-950/35">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-[32px] border border-white/8 bg-slate-950/65 p-7 sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Case study summary</p>
            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-300">
              <p>
                One part of the work was performance: identifying bottlenecks, reshaping the message flow, and
                improving throughput without compromising correctness.
              </p>
              <p>
                Another part was recovery. In systems that process high-volume order events, the question is not only
                whether the happy path is fast. It is whether the system can recover cleanly when a component stalls,
                restarts, or partially fails.
              </p>
              <p>
                The most useful improvements were the ones that reduced operator guesswork. Clearer flow health,
                replay-aware tooling, and safer recovery paths made the platform easier to run with confidence.
              </p>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[28px] border border-white/8 bg-slate-950/65 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Why it fits my profile</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                This is the kind of work behind a lot of my engineering interests: event-driven systems, failure-aware
                design, and building tools that make complex workflows more trustworthy for the people operating them.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-slate-950/65 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Stack</p>
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
