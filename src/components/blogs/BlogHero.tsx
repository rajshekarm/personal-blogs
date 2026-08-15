import { Link } from "react-router-dom";

export default function BlogHero() {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-indigo-50/70 to-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-600">
              Community Blogs
            </span>

            <h1 className="mt-4 text-5xl font-bold tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
              Ideas, experiments, and lessons from builders.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Read practical articles about AI agents, software engineering,
              Python, architecture, and production systems.
            </p>
          </div>

          <Link
            to="/blogs/new"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <span>✎</span>
            Write an Article
          </Link>

        </div>
      </div>
    </section>
  );
}