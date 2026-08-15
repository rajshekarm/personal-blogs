import type { BlogDraft } from "../../types/blogEditor";
import BlogRenderer from "../blog-renderer/BlogRenderer";

type Props = {
  draft: BlogDraft;
};

export default function BlogPreview({ draft }: Props) {
  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10 lg:px-14">
      <BlogRenderer article={draft} />
    </div>
  );
}