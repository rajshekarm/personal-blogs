import type { BlogBlockType } from "../../types/blogEditor";

type Props = {
  onAdd: (type: BlogBlockType) => void;
};

const blocks: {
  type: BlogBlockType;
  label: string;
  description: string;
}[] = [
  {
    type: "paragraph",
    label: "Paragraph",
    description: "Normal article text",
  },
  {
    type: "image",
    label: "Image",
    description: "Image with caption",
  },
  {
    type: "code",
    label: "Code",
    description: "Technical code example",
  },
  {
    type: "quote",
    label: "Quote",
    description: "Highlighted quotation",
  },
  {
    type: "callout",
    label: "Callout",
    description: "Important information",
  },
  {
    type: "tip",
    label: "Tip",
    description: "Useful recommendation",
  },
  {
    type: "warning",
    label: "Warning",
    description: "Risk or caution",
  },
  {
    type: "comparison",
    label: "Comparison",
    description: "Compare two concepts",
  },
  {
    type: "steps",
    label: "Steps",
    description: "Step-by-step process",
  },
  {
    type: "faq",
    label: "FAQ",
    description: "Question and answer",
  },
  {
    type: "divider",
    label: "Divider",
    description: "Visual separation",
  },
];

export default function BlockPalette({
  onAdd,
}: Props) {
  return (
    <div>
      <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
        Insert Content
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block) => (
          <button
            key={block.type}
            type="button"
            onClick={() => onAdd(block.type)}
            className="rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            <div className="text-sm font-semibold text-slate-900">
              {block.label}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              {block.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}