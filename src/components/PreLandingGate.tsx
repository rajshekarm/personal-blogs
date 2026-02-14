import { useEffect, useMemo, useState } from "react"
import type { FormEvent } from "react"

const NAME = "Rajashekar Mudigonda"
const STORAGE_KEY = "site_unlocked_v1"
const REVEAL_INTERVAL_MS = 130

const toBinaryBytes = (text: string) =>
  Array.from(new TextEncoder().encode(text)).map((byte) =>
    byte.toString(2).padStart(8, "0"),
  )

type PreLandingGateProps = {
  onUnlock: () => void
}

const PreLandingGate = ({ onUnlock }: PreLandingGateProps) => {
  const binaryBytes = useMemo(() => toBinaryBytes(NAME), [])
  const acceptedLetters = useMemo(
    () => new Set(NAME.toLowerCase().split("").filter((char) => char !== " ")),
    [],
  )
  const [revealedCount, setRevealedCount] = useState(0)
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [waitingDots, setWaitingDots] = useState(".")

  const revealComplete = revealedCount >= binaryBytes.length

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      onUnlock()
      return
    }

    if (revealComplete) {
      return
    }

    const timer = window.setTimeout(() => {
      setRevealedCount((prev) => Math.min(prev + 1, binaryBytes.length))
    }, REVEAL_INTERVAL_MS)

    return () => window.clearTimeout(timer)
  }, [binaryBytes.length, onUnlock, revealComplete, revealedCount])

  useEffect(() => {
    if (!revealComplete) {
      setWaitingDots(".")
      return
    }

    const timer = window.setInterval(() => {
      setWaitingDots((prev) => (prev.length >= 3 ? "." : `${prev}.`))
    }, 450)

    return () => window.clearInterval(timer)
  }, [revealComplete])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!input.trim()) {
      setError("Enter one decoded letter to continue.")
      return
    }

    if (acceptedLetters.has(input.trim().charAt(0).toLowerCase())) {
      sessionStorage.setItem(STORAGE_KEY, "true")
      onUnlock()
      return
    }

    setError("That letter is not from the decoded name bytes. Try again.")
  }

  return (
    <main className="min-h-screen bg-[#071218] text-[#ecf2f7] flex items-center justify-center px-6 py-10">
      <section className="w-full max-w-3xl rounded-2xl border border-[#1d3f50] bg-[#0c1c25] p-6 md:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.55)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[#7ec8ec]">
          Entry Protocol
        </p>
        <h1 className="mt-3 text-2xl md:text-3xl font-semibold">
          Decode To Enter
        </h1>
        <p className="mt-3 text-sm text-[#a7bbc8]">
          Loading identity stream. Decode one byte correctly to unlock this
          portfolio.
        </p>

        <div className="mt-6 rounded-lg border border-[#1f4458] bg-[#07151d] p-4">
          <div className="flex flex-wrap gap-2 font-mono text-sm">
            {binaryBytes.slice(0, revealedCount).map((byte, idx) => (
              <span
                key={`${byte}-${idx}`}
                className={
                  "rounded-md border border-[#255266] bg-[#0d212c] px-2 py-1 text-[#d8e9f2]"
                }
              >
                {byte}
              </span>
            ))}
            {!revealComplete && (
              <span className="inline-block self-center animate-pulse text-[#7ec8ec]">
                loading...
              </span>
            )}
            {revealComplete && (
              <span className="inline-block self-center text-[#7ec8ec]">
                waiting{waitingDots}
              </span>
            )}
          </div>
        </div>

        {revealComplete && (
          <form onSubmit={handleSubmit} className="mt-6">
            <label htmlFor="decoded-byte" className="block text-sm text-[#c5d8e2]">
              Decode any one byte above and enter the matching letter from
              <span className="font-semibold text-[#8af5c0]">
                {" "}
                Rajashekar Mudigonda
              </span>
              .
            </label>
            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <input
                id="decoded-byte"
                type="text"
                value={input}
                maxLength={1}
                onChange={(event) => {
                  setInput(event.target.value)
                  if (error) {
                    setError("")
                  }
                }}
                className="w-full sm:w-36 rounded-md border border-[#2e627b] bg-[#0b1b24] px-3 py-2 text-lg uppercase tracking-[0.25em] outline-none focus:border-[#7ec8ec]"
                placeholder="?"
              />
              <button
                type="submit"
                className="rounded-md bg-[#1c9d73] px-5 py-2 text-sm font-medium text-[#04130e] hover:bg-[#29bc8c] transition-colors"
              >
                Enter Site
              </button>
            </div>
            <p className="mt-3 text-xs text-[#8aa6b7]">
              Hint: Any one letter from the name is accepted.
            </p>
            {error && <p className="mt-3 text-sm text-[#ff9b9b]">{error}</p>}
          </form>
        )}
      </section>
    </main>
  )
}

export default PreLandingGate
