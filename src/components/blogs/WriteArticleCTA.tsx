import { Link } from "react-router-dom";

export default function WriteArticleCTA() {
  return (
    <section className="mb-20 rounded-3xl bg-slate-950 px-8 py-12 text-white sm:px-12">

      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

        <div className="max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-indigo-300">
            Share What You Know
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Have something worth sharing?
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Write about something you learned, built, debugged, or discovered.
          </p>
        </div>

        <Link
          to="/blogs/new"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
        >
          Start Writing
          <span>→</span>
        </Link>

      </div>

    </section>
  );
}