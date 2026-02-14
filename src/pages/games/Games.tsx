import { Link } from "react-router-dom"

const Games = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f4f7fb] px-6 py-12">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-[#1d3557]">Games</h1>
        <p className="mt-3 text-gray-700">
          Small interactive experiments and coding mini-games.
        </p>

        <div className="mt-8 grid gap-4">
          <article className="rounded-lg border border-[#c7d6ea] bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-[#123456]">
              Name To Binary
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your name and see it encoded into binary bytes.
            </p>
            <Link
              to="/games/name-to-binary"
              className="mt-4 inline-flex rounded-md bg-[#25537e] px-4 py-2 text-sm font-medium text-white hover:bg-[#1f4468] transition-colors"
            >
              Play
            </Link>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Games
