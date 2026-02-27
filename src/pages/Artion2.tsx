import { motion } from "framer-motion";
import { Heart, Activity } from "lucide-react";

export default function Artion() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-rose-500 overflow-hidden flex items-center justify-center">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Ambient Glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ECG Monitor Panel */}
      <div className="relative z-10 w-[95%] max-w-5xl rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-rose-500/20 shadow-2xl p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Activity className="text-rose-400" />
            <h2 className="text-xl font-semibold tracking-wide text-rose-300">
              ECG Signal Monitor
            </h2>
          </div>
          <div className="text-sm text-rose-400/70 font-mono">
            STATUS: ACTIVE
          </div>
        </div>

        {/* ECG Animation */}
        <div className="relative h-40 overflow-hidden border-t border-b border-rose-500/20">
          <motion.svg
            viewBox="0 0 1000 200"
            className="absolute w-[200%] h-full"
            fill="none"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          >
            <motion.path
              d="M0 100 L100 100 L150 40 L200 160 L250 100 L350 100 L400 60 L450 140 L500 100 L600 100 L650 50 L700 150 L750 100 L1000 100"
              stroke="#f43f5e"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>
        </div>

        {/* Content Section */}
        <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-fit"
            >
              <Heart className="w-20 h-20 text-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.9)]" />
            </motion.div>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent">
              Heartbeat Interface
            </h1>

            <p className="mt-6 text-rose-300/80 leading-relaxed">
              A creative exploration of biological rhythm translated into
              digital motion. Where emotion becomes waveform, and obsession
              becomes signal.
            </p>
          </div>

          {/* Data Card */}
          <div className="bg-black/40 rounded-xl p-6 border border-rose-500/10 backdrop-blur-md">
            <div className="space-y-4 text-sm font-mono text-rose-300/80">
              <div className="flex justify-between">
                <span>Pulse Rate</span>
                <span className="text-rose-400">072 BPM</span>
              </div>
              <div className="flex justify-between">
                <span>Rhythm</span>
                <span className="text-rose-400">Sinus Stable</span>
              </div>
              <div className="flex justify-between">
                <span>Signal Strength</span>
                <span className="text-rose-400">Optimal</span>
              </div>
              <div className="flex justify-between">
                <span>Mode</span>
                <span className="text-rose-400">Creative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
