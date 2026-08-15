import type { BlogDraft } from "../../types/blogEditor";

type Props = {
  draft: BlogDraft;
  onChange: (draft: BlogDraft) => void;
};

export default function ArticleMetaEditor({
  draft,
  onChange,
}: Props) {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div>
        <label className="text-sm font-semibold text-slate-700">
          Title
        </label>

        <input
          value={draft.title}
          onChange={(event) =>
            onChange({
              ...draft,
              title: event.target.value,
            })
          }
          placeholder="Article title"
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-xl font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-700">
          Subtitle
          <span className="ml-2 font-normal text-slate-400">
            Optional
          </span>
        </label>

        <textarea
          value={draft.subtitle ?? ""}
          onChange={(event) =>
            onChange({
              ...draft,
              subtitle: event.target.value,
            })
          }
          placeholder="Short supporting subtitle"
          rows={3}
          className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-700">
          Excerpt
          <span className="ml-2 font-normal text-slate-400">
            Optional
          </span>
        </label>

        <textarea
          value={draft.excerpt ?? ""}
          onChange={(event) =>
            onChange({
              ...draft,
              excerpt: event.target.value,
            })
          }
          placeholder="Short summary shown on the blogs listing page"
          rows={3}
          className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-700">
          Cover Image URL
          <span className="ml-2 font-normal text-slate-400">
            Optional
          </span>
        </label>

        <input
          value={draft.coverImage ?? ""}
          onChange={(event) =>
            onChange({
              ...draft,
              coverImage: event.target.value,
            })
          }
          placeholder="https://..."
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />

        {draft.coverImage && (
          <img
            src={draft.coverImage}
            alt=""
            className="mt-4 aspect-[16/7] w-full rounded-xl object-cover"
          />
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Author
          </label>

          <input
            value={draft.author}
            onChange={(event) =>
              onChange({
                ...draft,
                author: event.target.value,
              })
            }
            placeholder="Your name"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Tags
          </label>

          <input
            value={draft.tags.join(", ")}
            onChange={(event) =>
              onChange({
                ...draft,
                tags: event.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              })
            }
            placeholder="AI Agents, Python, LLM"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>
    </section>
  );
}