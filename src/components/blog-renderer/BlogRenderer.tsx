import type { BlogDraft } from "../../types/blogEditor";
import RenderSection from "./RenderSection";

type Props = {
  article: BlogDraft;
};

export default function BlogRenderer({ article }: Props) {
  return (
    <article className="mx-auto max-w-3xl">
      {article.coverImage && (
        <img
          src={article.coverImage}
          alt={article.title}
          className="mb-10 aspect-[16/8] w-full rounded-2xl object-cover"
        />
      )}

      <header className="border-b border-slate-200 pb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          {article.title || "Untitled Article"}
        </h1>

        {article.subtitle && (
          <p className="mt-5 text-xl leading-8 text-slate-600">
            {article.subtitle}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          {article.author && (
            <span>
              By{" "}
              <strong className="font-semibold text-slate-700">
                {article.author}
              </strong>
            </span>
          )}

          {article.tags.length > 0 && (
            <>
              <span className="text-slate-300">•</span>

              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      <div className="mt-12 space-y-16">
        {article.sections.map((section) => (
          <RenderSection key={section.id} section={section} />
        ))}
      </div>
    </article>
  );
}