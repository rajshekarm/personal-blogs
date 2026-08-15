import { Link } from "react-router-dom";

import type { BlogArticle } from "../../types/blog";
import ArticleMeta from "./ArticleMeta";

type Props = {
  article: BlogArticle;
};

export default function ArticleCard({ article }: Props) {
  return (
    <Link
      to={`/blogs/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
    >

      <div className="aspect-video overflow-hidden bg-slate-100">
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">

        <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-indigo-600">
          {article.category}
        </span>

        <h3 className="mt-3 text-xl font-bold leading-7 tracking-tight text-slate-950">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-6">

          <ArticleMeta article={article} />

          <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900">
            →
          </span>

        </div>

      </div>

    </Link>
  );
}