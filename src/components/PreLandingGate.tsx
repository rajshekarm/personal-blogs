import { useEffect, useMemo, useState } from "react"
import type { FormEvent } from "react"

const NAME = "Rajashekar Mudigonda"
const STORAGE_KEY = "site_unlocked_v1"
const REVEAL_INTERVAL_MS = 130

const toBinaryByte = (text: string) =>
  Array.from(new TextEncoder().encode(text))
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(" ")

const createNameStream = (text: string) =>
  Array.from(text).map((char, index) => ({
    byte: toBinaryByte(char),
    char,
    id: `${char}-${index}`,
    isSpace: char === " ",
  }))

const persistUnlock = () => {
  sessionStorage.setItem(STORAGE_KEY, "true")
}

type PreLandingGateProps = {
  onUnlock: () => void
}

const PreLandingGate = ({ onUnlock }: PreLandingGateProps) => {
  const nameStream = useMemo(() => createNameStream(NAME), [])
  const challengeBytes = useMemo(
    () => nameStream.filter((entry) => !entry.isSpace),
    [nameStream],
  )
  const [revealedCount, setRevealedCount] = useState(0)
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [waitingDots, setWaitingDots] = useState(".")
  const [challengeIndex, setChallengeIndex] = useState(0)

  const revealComplete = revealedCount >= nameStream.length
  const activeChallenge = challengeBytes[challengeIndex % challengeBytes.length]

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      onUnlock()
      return
    }

    if (revealComplete) {
      return
    }

    const timer = window.setTimeout(() => {
      setRevealedCount((prev) => Math.min(prev + 1, nameStream.length))
    }, REVEAL_INTERVAL_MS)

    return () => window.clearTimeout(timer)
  }, [nameStream.length, onUnlock, revealComplete, revealedCount])

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
      setError("Enter the decoded letter for the highlighted byte.")
      return
    }

    if (input.trim().charAt(0).toLowerCase() === activeChallenge.char.toLowerCase()) {
      persistUnlock()
      onUnlock()
      return
    }

    setError("That letter does not match the highlighted byte. Try another one.")
  }

  const handleEnterPortfolio = () => {
    persistUnlock()
    onUnlock()
  }

  const handleNextChallenge = () => {
    setChallengeIndex((prev) => (prev + 1) % challengeBytes.length)
    setInput("")
    setError("")
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
          My name is rendered in binary because I like building things from the
          machine up. You can jump straight into the portfolio or decode a byte
          for fun.
        </p>

        <div className="mt-6 rounded-lg border border-[#1f4458] bg-[#07151d] p-4">
          <div className="flex flex-wrap gap-2 font-mono text-sm">
            {nameStream.slice(0, revealedCount).map((entry) => (
              <span
                key={entry.id}
                className={
                  activeChallenge?.id === entry.id && revealComplete
                    ? "rounded-md border border-[#7ec8ec] bg-[#123444] px-2 py-1 text-[#f2fbff]"
                    : "rounded-md border border-[#255266] bg-[#0d212c] px-2 py-1 text-[#d8e9f2]"
                }
              >
                {entry.byte}
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

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleEnterPortfolio}
            className="rounded-md bg-[#1c9d73] px-5 py-3 text-sm font-medium text-[#04130e] hover:bg-[#29bc8c] transition-colors"
          >
            Enter Portfolio
          </button>
          <p className="self-center text-sm text-[#8aa6b7]">
            The binary warm-up below is optional.
          </p>
        </div>

        {revealComplete && activeChallenge && (
          <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-[#1f4458] bg-[#091720] p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#7ec8ec]">
                  Optional Warm-Up
                </p>
                <label htmlFor="decoded-byte" className="mt-2 block text-sm text-[#c5d8e2]">
                  Decode the highlighted byte and enter the matching letter.
                </label>
              </div>
              <button
                type="button"
                onClick={handleNextChallenge}
                className="rounded-md border border-[#2e627b] px-4 py-2 text-sm text-[#cfe5ef] hover:border-[#7ec8ec] hover:text-white transition-colors"
              >
                Show Another Byte
              </button>
            </div>
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
                className="rounded-md bg-[#124f78] px-5 py-2 text-sm font-medium text-[#e9f7ff] hover:bg-[#18689d] transition-colors"
              >
                Unlock via Decode
              </button>
            </div>
            <p className="mt-3 text-xs text-[#8aa6b7]">
              A small nod to low-level thinking. Completely optional.
            </p>
            {error && <p className="mt-3 text-sm text-[#ff9b9b]">{error}</p>}
          </form>
        )}
      </section>
    </main>
  )
}

export default PreLandingGate
