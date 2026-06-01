import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Activity, BrainCircuit, MapPinned, RadioTower, ShieldCheck, Workflow } from "lucide-react"

function generateECGPath(bpm: number) {
  const base = 100
  const peakHeight = 42 + Math.random() * 18
  const interval = 60000 / bpm / 10

  let path = `M0 ${base}`
  let x = 0

  for (let i = 0; i < 30; i += 1) {
    path += ` L${x + interval} ${base}`
    path += ` L${x + interval * 1.4} ${base - peakHeight}`
    path += ` L${x + interval * 1.9} ${base + peakHeight}`
    path += ` L${x + interval * 2.4} ${base}`
    x += interval * 4
  }

  return path
}

function generateLeadPath(bpm: number, variance: number) {
  const base = 100
  const peak = 30 + variance
  const interval = 60000 / bpm / 12

  let path = `M0 ${base}`
  let x = 0

  for (let i = 0; i < 25; i += 1) {
    path += ` L${x + interval} ${base}`
    path += ` L${x + interval * 1.4} ${base - peak}`
    path += ` L${x + interval * 2} ${base + peak}`
    path += ` L${x + interval * 2.6} ${base}`
    x += interval * 4
  }

  return path
}

const triageScenarios = [
  {
    label: "Rural Clinic Intake",
    detail:
      "Tablet-first ECG capture, fast context collection, and clear triage guidance for teams working in low-connectivity settings.",
    accent: "text-emerald-300",
  },
  {
    label: "Offline STEMI Detection",
    detail:
      "Quantized TensorFlow Lite inference running locally on Android devices so the first decision can happen at the edge.",
    accent: "text-cyan-300",
  },
  {
    label: "Specialist Dispatch",
    detail:
      "Kafka and Redis pipelines route urgent cases to the right cardiologist with enough context to shorten response time.",
    accent: "text-rose-300",
  },
]

const architectureSteps = [
  {
    title: "Capture",
    icon: Activity,
    text: "ECG data is recorded on-device with a workflow optimized for noisy, real-world clinic conditions.",
  },
  {
    title: "Infer",
    icon: BrainCircuit,
    text: "A lightweight model evaluates the signal locally so urgent cases can be flagged even before a network hop.",
  },
  {
    title: "Route",
    icon: RadioTower,
    text: "Event-driven backend services push the case to the next available specialist or review queue.",
  },
  {
    title: "Explain",
    icon: ShieldCheck,
    text: "The UI surfaces why a case was escalated, so the result is usable by clinicians and support teams.",
  },
]

const productNotes = [
  {
    title: "Problem",
    text: "The system needed to work when clinics had limited bandwidth, limited staffing, and a short window to act.",
  },
  {
    title: "Approach",
    text: "I combined edge inference, backend routing, and a readable operator experience into one flow.",
  },
  {
    title: "Outcome",
    text: "The final shape is less about raw model accuracy and more about getting the right case to the right person faster.",
  },
]

const stackItems = ["Python", "TensorFlow Lite", "Android", "Kafka", "Redis", "Java", "React", ".NET"]

export default function ECGTriageIntelligence() {
  const [bpm, setBpm] = useState(78)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [probabilities, setProbabilities] = useState([0.91, 0.06, 0.03])
  const [attention, setAttention] = useState([0.2, 0.4, 0.25, 0.15])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBpm(68 + Math.floor(Math.random() * 18))
      setScenarioIndex((prev) => (prev + 1) % triageScenarios.length)

      const urgent = 0.08 + Math.random() * 0.08
      const review = 0.04 + Math.random() * 0.05
      const stable = Math.max(0.8, 1 - urgent - review)
      setProbabilities([stable, urgent, review])

      const weights = Array.from({ length: 4 }, () => Math.random())
      const sum = weights.reduce((acc, value) => acc + value, 0)
      setAttention(weights.map((weight) => weight / sum))
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  const ecgPath = useMemo(() => generateECGPath(bpm), [bpm])
  const leadPaths = useMemo(() => [0, 10, 20, 5].map((variance) => generateLeadPath(bpm, variance)), [bpm])
  const activeScenario = triageScenarios[scenarioIndex]

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#12344a,transparent_28%),linear-gradient(180deg,#02070c_0%,#05111c_52%,#03080f_100%)] text-slate-100">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#7dd3fc22_1px,transparent_1px),linear-gradient(to_bottom,#7dd3fc22_1px,transparent_1px)] bg-[size:36px_36px]" />

      <section className="relative mx-auto max-w-7xl px-6 pb-14 pt-20">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Cardiac Intelligence Case Study</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            ECG Triage Intelligence Platform
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
            This page combines the triage platform and the multi-lead transformer work into a single story.
            The goal was not just to classify an ECG, but to move from raw signal to a decision that is fast,
            explainable, and useful in a real clinical workflow.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Clinical Reach</p>
            <p className="mt-3 text-3xl font-semibold text-white">1,000+ clinics</p>
            <p className="mt-2 text-sm text-slate-400">Designed for distributed rural deployments with constrained connectivity.</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Diagnosis Time</p>
            <p className="mt-3 text-3xl font-semibold text-white">Under 15 min</p>
            <p className="mt-2 text-sm text-slate-400">Reduced turnaround from multi-hour workflows to rapid triage decisions.</p>
          </div>
          <div className="rounded-2xl border border-rose-500/20 bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">System Pattern</p>
            <p className="mt-3 text-3xl font-semibold text-white">Offline + Event Driven</p>
            <p className="mt-2 text-sm text-slate-400">Local inference paired with Kafka and Redis-backed dispatch.</p>
          </div>
          <div className="rounded-2xl border border-sky-500/20 bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Model View</p>
            <p className="mt-3 text-3xl font-semibold text-white">Multi-lead attention</p>
            <p className="mt-2 text-sm text-slate-400">Used lead-wise weighting to reason about temporal and inter-lead dependencies.</p>
          </div>
        </div>
      </section>

      <section className="relative border-y border-slate-800/80 bg-slate-950/40 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between font-mono text-sm text-slate-400">
            <span>LIVE TRIAGE SIGNAL</span>
            <span>{bpm} BPM</span>
          </div>
          <div className="h-48 overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/80 p-4">
            <motion.svg key={ecgPath} viewBox="0 0 1200 200" className="h-full w-full" fill="none">
              <motion.path
                d={ecgPath}
                stroke="#22d3ee"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8 }}
              />
            </motion.svg>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8">
            <p className="text-sm uppercase tracking-[0.26em] text-cyan-300">What I built</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <Activity className="text-emerald-300" />
                <h2 className="mt-4 text-lg font-semibold text-white">Signal Intake</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Captured ECG data at the edge and shaped the experience for staff working in low-resource settings.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <BrainCircuit className="text-cyan-300" />
                <h2 className="mt-4 text-lg font-semibold text-white">Model Inference</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Used quantized TensorFlow Lite CNN models on Android tablets for offline STEMI detection.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <RadioTower className="text-rose-300" />
                <h2 className="mt-4 text-lg font-semibold text-white">Urgent Routing</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Built event-driven dispatch with Kafka and Redis to match serious cases with available cardiologists quickly.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {productNotes.map((note) => (
                <div key={note.title} className="rounded-2xl border border-cyan-500/15 bg-cyan-500/5 p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">{note.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{note.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">Experience Highlight</p>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                The work sits at the intersection of backend engineering, ML systems, and distributed architecture.
                I like problems where a technically complex workflow has to become a dependable product that works
                under pressure and still makes sense to the person using it.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-7">
              <div className="flex items-center gap-3">
                <MapPinned className={activeScenario.accent} />
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Active Scenario</p>
              </div>
              <h2 className={`mt-4 text-2xl font-semibold ${activeScenario.accent}`}>{activeScenario.label}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{activeScenario.detail}</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-7">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Triage Output</p>
              {["Stable", "Immediate Review", "Cardiologist Escalation"].map((label, index) => (
                <div key={label} className="mt-5">
                  <div className="mb-2 flex justify-between font-mono text-sm text-slate-400">
                    <span>{label}</span>
                    <span>{(probabilities[index] * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                      animate={{ width: `${probabilities[index] * 100}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-7">
              <div className="flex items-center gap-3">
                <Workflow className="text-cyan-300" />
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">How It Works</p>
              </div>
              <div className="mt-5 space-y-4">
                {architectureSteps.map((step) => {
                  const Icon = step.icon
                  return (
                    <div key={step.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-200">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{step.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.text}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-7">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stackItems.map((item) => (
                  <span key={item} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-slate-800/80 bg-slate-950/30 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Multi-Lead Transformer View</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Why the second page mattered</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                The first page explains the triage flow. This section explains the model side: how multiple leads
                are compared, weighted, and interpreted so the system can see more than one signal at a time.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                That matters because ECG analysis is not just about detecting a spike on a single trace. Different
                leads reveal different views of the same event, and a transformer-style model can learn which views
                matter more for a given pattern.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8">
              <div className="mb-4 flex items-center justify-between font-mono text-sm text-slate-400">
                <span>LIVE MULTI-LEAD STREAM</span>
                <span>{bpm} BPM</span>
              </div>
              <div className="space-y-4">
                {leadPaths.map((path, index) => (
                  <div key={`lead-${index}`} className="h-20 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
                    <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.24em] text-slate-500">
                      <span>Lead {index + 1}</span>
                      <span>inter-lead context</span>
                    </div>
                    <motion.svg viewBox="0 0 1200 200" className="h-full w-full" fill="none">
                      <motion.path
                        d={path}
                        stroke={index % 2 === 0 ? "#f43f5e" : "#22d3ee"}
                        strokeWidth={2}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                      />
                    </motion.svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/70 p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Transformer Attention Mechanism</p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                  The attention view below is a simplified way to show how the model distributes focus across leads.
                  In practice, this helps the system identify which signal paths are contributing most to the final
                  decision, making the model easier to reason about in reviews.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {attention.map((weight, index) => (
                <div key={`attention-${index}`} className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 text-center">
                  <div className="text-sm text-slate-400 mb-3 font-mono">Lead {index + 1}</div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-rose-500"
                      animate={{ width: `${weight * 100}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <div className="mt-2 text-rose-400 font-mono text-sm">{(weight * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
