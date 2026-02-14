import { useEffect, useState } from "react"
import type { FormEvent } from "react"

const encodeToBinary = (value: string) =>
  Array.from(new TextEncoder().encode(value))
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(" ")

const NameToBinary = () => {
  const [name, setName] = useState("")
  const [submittedName, setSubmittedName] = useState("")
  const [targetBinary, setTargetBinary] = useState("")
  const [renderedBinary, setRenderedBinary] = useState("")
  const [isEncoding, setIsEncoding] = useState(false)

  useEffect(() => {
    if (!targetBinary) {
      return
    }

    setRenderedBinary("")
    setIsEncoding(true)

    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setRenderedBinary(targetBinary.slice(0, index))
      if (index >= targetBinary.length) {
        setIsEncoding(false)
        window.clearInterval(timer)
      }
    }, 24)

    return () => window.clearInterval(timer)
  }, [targetBinary])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanValue = name.trim()
    if (!cleanValue) {
      return
    }

    setSubmittedName(cleanValue)
    setTargetBinary(encodeToBinary(cleanValue))
  }

  return (
    <main className="relative min-h-[calc(100vh-64px)] overflow-x-hidden bg-[#050908] px-3 py-4 font-mono text-[#86f7b3] sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(17,80,47,0.35),_rgba(0,0,0,0.94)_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(134,247,179,0.045),rgba(134,247,179,0.045)_1px,transparent_1px,transparent_4px)]" />

      <section className="relative mx-auto flex min-h-[520px] w-full max-w-5xl flex-col rounded-xl border border-[#1e5a36] bg-[#040b07]/90 p-4 shadow-[0_0_40px_rgba(35,158,88,0.18)] sm:p-6 md:min-h-[calc(100vh-140px)] md:max-h-[calc(100vh-92px)]">
        <div className="flex min-h-0 flex-1 flex-col">
          <header className="border-b border-[#1e5a36] pb-3">
            <p className="text-xs tracking-[0.25em] text-[#57c482]">BINARY TERMINAL</p>
            <h1 className="mt-2 text-xl font-semibold sm:text-2xl">Name Encoder</h1>
          </header>

          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-3 border-b border-[#1e5a36] pb-4 sm:flex-row"
          >
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="enter_name"
              className="w-full rounded border border-[#1e5a36] bg-[#06120b] px-3 py-2 text-[#aafccc] outline-none placeholder:text-[#4f9168] focus:border-[#6ef3a4]"
            />
            <button
              type="submit"
              className="rounded border border-[#2f8f5a] bg-[#0f2e1d] px-5 py-2 text-sm font-semibold text-[#8ff5b8] transition-colors hover:bg-[#174329]"
            >
              RUN ENCODE
            </button>
          </form>

          <div className="mt-4 min-h-[220px] flex-1 overflow-y-auto rounded border border-[#1e5a36] bg-[#020603] p-3 sm:p-4">
            <p className="text-sm text-[#6dcf95]">$ encoder --format binary --input "{submittedName || "..."}"</p>
            {submittedName && (
              <p className="mt-2 text-sm text-[#79dfa1]">
                Subject: <span className="text-[#bcffd8]">{submittedName}</span>
              </p>
            )}
            <p className="mt-2 text-sm text-[#5fbf87]">
              Status: {isEncoding ? "encoding stream..." : targetBinary ? "completed" : "idle"}
            </p>

            {renderedBinary && (
              <p className="mt-4 break-words text-sm leading-7 text-[#d4ffe8]">
                {renderedBinary}
                {isEncoding && <span className="animate-pulse text-[#7ef7b0]">|</span>}
              </p>
            )}

            {!renderedBinary && (
              <p className="mt-4 text-sm text-[#3b7854]">
                Awaiting input. Submit a name to start binary output.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default NameToBinary
