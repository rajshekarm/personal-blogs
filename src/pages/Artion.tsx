import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, BrainCircuit, Cpu } from "lucide-react";

function generateECGPath(bpm: number) {
  const base = 100;
  const peakHeight = 40 + Math.random() * 30;
  const interval = 60000 / bpm / 10;

  let path = `M0 ${base}`;
  let x = 0;

  for (let i = 0; i < 30; i++) {
    path += ` L${x + interval} ${base}`;
    path += ` L${x + interval * 1.5} ${base - peakHeight}`;
    path += ` L${x + interval * 2} ${base + peakHeight}`;
    path += ` L${x + interval * 2.5} ${base}`;
    x += interval * 4;
  }

  return path;
}

export default function Artion() {
  const [bpm, setBpm] = useState(72);
  const [prob, setProb] = useState([0.92, 0.05, 0.03]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBpm = 65 + Math.floor(Math.random() * 20);
      setBpm(newBpm);

      const normal = 0.85 + Math.random() * 0.1;
      const arr1 = Math.random() * 0.1;
      const arr2 = 1 - normal - arr1;
      setProb([normal, arr1, arr2]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const ecgPath = useMemo(() => generateECGPath(bpm), [bpm]);

  const layers = [3, 5, 5, 3]; // simple NN structure

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-zinc-200 overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* HERO */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
          ECG Deep Learning Systems
        </h1>
        <p className="mt-6 text-zinc-400 max-w-3xl leading-relaxed">
          Transforming cardiac waveforms into intelligent predictions using signal processing and neural networks.
        </p>
      </section>

      {/* LIVE ECG */}
      <section className="px-6 py-10 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between text-sm text-zinc-500 mb-4 font-mono">
            <span>LIVE ECG STREAM</span>
            <span>{bpm} BPM</span>
          </div>
          <div className="h-48 overflow-hidden relative">
            <motion.svg key={ecgPath} viewBox="0 0 1200 200" className="w-full h-full" fill="none">
              <motion.path
                d={ecgPath}
                stroke="#f43f5e"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
            </motion.svg>
          </div>
        </div>
      </section>

      {/* NEURAL NETWORK VISUALIZATION */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-12 text-center">
          Neural Network Architecture
        </h2>

        <div className="flex justify-center items-center gap-16">
          {layers.map((neurons, layerIndex) => (
            <div key={layerIndex} className="flex flex-col gap-6">
              {Array.from({ length: neurons }).map((_, neuronIndex) => (
                <motion.div
                  key={neuronIndex}
                  className="w-6 h-6 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: neuronIndex * 0.2 + layerIndex * 0.3,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ML PIPELINE */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {["Raw Signal", "Features", "Neural Net", "Prediction"].map((step, i) => (
            <div key={step} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              {i === 0 && <Activity className="mx-auto mb-3 text-rose-400" />}
              {i === 1 && <Cpu className="mx-auto mb-3 text-rose-400" />}
              {i === 2 && <BrainCircuit className="mx-auto mb-3 text-rose-400" />}
              {i === 3 && <Activity className="mx-auto mb-3 text-rose-400" />}
              <h3 className="font-semibold text-lg">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* OUTPUT PROBABILITIES */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-zinc-300">Model Output</h2>
        {["Normal", "Arrhythmia A", "Arrhythmia B"].map((label, i) => (
          <div key={label} className="mb-6">
            <div className="flex justify-between text-sm mb-2 font-mono text-zinc-400">
              <span>{label}</span>
              <span>{(prob[i] * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-rose-500"
                animate={{ width: `${prob[i] * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </section>

      <footer className="text-center py-10 border-t border-zinc-800 text-zinc-600 text-sm">
        Deep learning for cardiac intelligence.
      </footer>
    </div>
  );
}
