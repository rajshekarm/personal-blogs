import type { BlogArticle } from "../../types/blog";

type Props = {
  article: BlogArticle;
};

export default function ArticleMeta({ article }: Props) {
  return (
    <div className="flex items-center gap-3">

      <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white">
        {article.author.avatar ? (
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="h-full w-full object-cover"
          />
        ) : (
          article.author.name.slice(0, 1).toUpperCase()
        )}
      </div>

      <div>
        <div className="text-sm font-semibold text-slate-800">
          {article.author.name}
        </div>

        <div className="text-xs text-slate-400">
          {formatDate(article.publishedAt)}
          {" · "}
          {article.readingTime} min read
        </div>
      </div>

    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}