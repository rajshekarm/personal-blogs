import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

// --- Multi-Lead ECG Generator ---
function generateLeadPath(bpm: number, variance: number) {
  const base = 100;
  const peak = 30 + variance;
  const interval = 60000 / bpm / 12;

  let path = `M0 ${base}`;
  let x = 0;

  for (let i = 0; i < 25; i++) {
    path += ` L${x + interval} ${base}`;
    path += ` L${x + interval * 1.4} ${base - peak}`;
    path += ` L${x + interval * 2} ${base + peak}`;
    path += ` L${x + interval * 2.6} ${base}`;
    x += interval * 4;
  }

  return path;
}

export default function MultiLeadTransformerLab() {
  const [bpm, setBpm] = useState(72);
  const [attention, setAttention] = useState([0.2, 0.4, 0.25, 0.15]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(65 + Math.floor(Math.random() * 25));

      const weights = Array.from({ length: 4 }, () => Math.random());
      const sum = weights.reduce((a, b) => a + b, 0);
      setAttention(weights.map((w) => w / sum));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const leads = useMemo(() => {
    return [0, 10, 20, 5].map((v) => generateLeadPath(bpm, v));
  }, [bpm]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-zinc-200 overflow-hidden">
      {/* Lab Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Header */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
          Multi-Lead ECG Transformer System
        </h1>
        <p className="mt-6 text-zinc-400 max-w-3xl leading-relaxed">
          Leveraging multi-lead cardiac signals with attention-based deep learning
          architectures to capture temporal and inter-lead dependencies.
        </p>
      </section>

      {/* Multi-Lead ECG Streams */}
      <section className="px-6 py-12 border-y border-zinc-800 space-y-6">
        <div className="max-w-7xl mx-auto text-sm text-zinc-500 font-mono mb-4">
          LIVE MULTI-LEAD STREAM — {bpm} BPM
        </div>

        {leads.map((path, index) => (
          <div key={index} className="h-24 overflow-hidden">
            <motion.svg viewBox="0 0 1200 200" className="w-full h-full" fill="none">
              <motion.path
                d={path}
                stroke="#f43f5e"
                strokeWidth={2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
            </motion.svg>
          </div>
        ))}
      </section>

      {/* Transformer Visualization */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Transformer Attention Mechanism
        </h2>

        <div className="grid md:grid-cols-4 gap-10 text-center">
          {attention.map((weight, i) => (
            <div key={i} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <div className="text-sm text-zinc-400 mb-3 font-mono">
                Lead {i + 1}
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-rose-500"
                  animate={{ width: `${weight * 100}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <div className="mt-2 text-rose-400 font-mono text-sm">
                {(weight * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="px-6 pb-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
          Multi-Lead Encoding
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
          Self-Attention Blocks
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
          Clinical Prediction Output
        </div>
      </section>

      <footer className="text-center py-10 border-t border-zinc-800 text-zinc-600 text-sm">
        Modeling inter-lead dependencies with Transformer architectures for cardiac intelligence.
      </footer>
    </div>
  );
}
