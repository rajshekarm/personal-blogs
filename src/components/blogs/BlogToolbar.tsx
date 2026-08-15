type Props = {
  search: string;
  category: string;
  categories: string[];

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export default function BlogToolbar({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: Props) {
  return (
    <section className="flex flex-col gap-5 border-b border-slate-200 py-8">

      <div className="max-w-xl">
        <input
          type="search"
          value={search}
          placeholder="Search articles, topics, authors..."
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => onCategoryChange(item)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              item === category
                ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

    </section>
  );
}