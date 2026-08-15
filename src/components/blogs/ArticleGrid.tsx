import type { BlogArticle } from "../../types/blog";

import ArticleCard from "./ArticleCard";

type Props = {
  articles: BlogArticle[];
};

export default function ArticleGrid({ articles }: Props) {
  if (articles.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-200 py-20 text-center">
        <h3 className="font-semibold text-slate-900">
          No articles found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
        />
      ))}
    </div>
  );
}