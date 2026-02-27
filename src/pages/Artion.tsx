import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Artion() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-rose-500 flex items-center justify-center">
      {/* Background Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ECG Moving Line */}
      <div className="absolute bottom-1/3 w-full overflow-hidden">
        <div className="w-[200%] animate-[ecgMove_6s_linear_infinite]">
          <svg
            viewBox="0 0 1000 200"
            className="w-full h-40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 100 L100 100 L150 40 L200 160 L250 100 L350 100 L400 60 L450 140 L500 100 L1000 100"
              stroke="#f43f5e"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center"
        >
          <Heart className="w-20 h-20 text-rose-500 drop-shadow-[0_0_25px_rgba(244,63,94,0.9)]" />
        </motion.div>

        <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent">
          My Heart Beats in Code
        </h1>

        <p className="mt-6 text-lg md:text-xl text-rose-300 leading-relaxed">
          An obsession with rhythm. With pulse. With the silent poetry of ECG
          waves translating emotion into signal.
        </p>
      </motion.div>

      {/* Keyframes (works in Vite) */}
      <style>
        {`@keyframes ecgMove {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }`}
      </style>
    </div>
  );
}