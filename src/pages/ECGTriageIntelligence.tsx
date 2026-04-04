import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Activity, BrainCircuit, RadioTower, MapPinned } from "lucide-react"

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

const triageScenarios = [
  {
    label: "Rural Clinic Intake",
    detail: "Tablet-first ECG capture and triage in low-bandwidth conditions.",
    accent: "text-emerald-300",
  },
  {
    label: "Offline STEMI Detection",
    detail: "Quantized TensorFlow Lite inference running directly on Android devices.",
    accent: "text-cyan-300",
  },
  {
    label: "Specialist Dispatch",
    detail: "Kafka and Redis pipelines route urgent cases to the right cardiologist fast.",
    accent: "text-rose-300",
  },
]

export default function ECGTriageIntelligence() {
  const [bpm, setBpm] = useState(78)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [probabilities, setProbabilities] = useState([0.91, 0.06, 0.03])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBpm(68 + Math.floor(Math.random() * 18))
      setScenarioIndex((prev) => (prev + 1) % triageScenarios.length)

      const urgent = 0.08 + Math.random() * 0.08
      const review = 0.04 + Math.random() * 0.05
      const stable = Math.max(0.8, 1 - urgent - review)
      setProbabilities([stable, urgent, review])
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  const ecgPath = useMemo(() => generateECGPath(bpm), [bpm])
  const activeScenario = triageScenarios[scenarioIndex]

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#12344a,transparent_28%),linear-gradient(180deg,#02070c_0%,#05111c_52%,#03080f_100%)] text-slate-100">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#7dd3fc22_1px,transparent_1px),linear-gradient(to_bottom,#7dd3fc22_1px,transparent_1px)] bg-[size:36px_36px]" />

      <section className="relative mx-auto max-w-7xl px-6 pb-14 pt-20">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">
            Healthcare Systems
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            ECG Triage Intelligence Platform
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
            A portfolio case study inspired by my Prognovex experience building
            AI-assisted ECG triage systems for rural clinics. The focus was not
            just model accuracy, but getting critical cardiac cases identified,
            prioritized, and routed in time-constrained environments.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Clinical Reach
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">1,000+ clinics</p>
            <p className="mt-2 text-sm text-slate-400">
              Designed for distributed rural deployments with constrained connectivity.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Diagnosis Time
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">Under 15 min</p>
            <p className="mt-2 text-sm text-slate-400">
              Reduced turnaround from multi-hour workflows to rapid triage decisions.
            </p>
          </div>
          <div className="rounded-2xl border border-rose-500/20 bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              System Pattern
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">Offline + Event Driven</p>
            <p className="mt-2 text-sm text-slate-400">
              On-device inference paired with Kafka and Redis backed dispatch.
            </p>
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
            <p className="text-sm uppercase tracking-[0.26em] text-cyan-300">
              What I Built
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <Activity className="text-emerald-300" />
                <h2 className="mt-4 text-lg font-semibold text-white">Signal Intake</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Captured ECG data at the edge and optimized the flow for clinic staff operating in low-resource settings.
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

            <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
                Experience Highlight
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                This work sits at the intersection of backend engineering, ML
                systems, and distributed architecture. It reflects the kind of
                problems I enjoy most: turning technically complex workflows
                into dependable products that operate under real-world
                constraints.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-7">
              <div className="flex items-center gap-3">
                <MapPinned className={activeScenario.accent} />
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Active Scenario
                </p>
              </div>
              <h2 className={`mt-4 text-2xl font-semibold ${activeScenario.accent}`}>
                {activeScenario.label}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {activeScenario.detail}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-7">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Triage Output
              </p>
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
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Python", "TensorFlow Lite", "Android", "Kafka", "Redis", "Java"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
