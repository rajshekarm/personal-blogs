import type { BlogBlock } from "../../types/blogEditor";

type Props = {
  block: BlogBlock;

  onUpdate: (
    data: Record<string, any>,
  ) => void;

  onDelete: () => void;

  onMoveUp: () => void;
  onMoveDown: () => void;
};

export default function BlockEditor({
  block,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: Props) {
  const { data } = block;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          {block.type}
        </div>

        <div className="flex gap-1">
          <ToolbarButton onClick={onMoveUp}>
            ↑
          </ToolbarButton>

          <ToolbarButton onClick={onMoveDown}>
            ↓
          </ToolbarButton>

          <ToolbarButton
            onClick={onDelete}
            danger
          >
            Delete
          </ToolbarButton>
        </div>
      </div>

      {block.type === "paragraph" && (
        <textarea
          rows={6}
          value={data.text}
          placeholder="Write your paragraph..."
          onChange={(event) =>
            onUpdate({
              text: event.target.value,
            })
          }
          className={textareaClass}
        />
      )}

      {block.type === "image" && (
        <div className="space-y-3">
          <input
            value={data.src}
            placeholder="Image URL"
            onChange={(event) =>
              onUpdate({
                src: event.target.value,
              })
            }
            className={inputClass}
          />

          {data.src && (
            <img
              src={data.src}
              alt={data.alt}
              className="max-h-[420px] w-full rounded-xl object-cover"
            />
          )}

          <input
            value={data.alt}
            placeholder="Alt text"
            onChange={(event) =>
              onUpdate({
                alt: event.target.value,
              })
            }
            className={inputClass}
          />

          <input
            value={data.caption}
            placeholder="Caption (optional)"
            onChange={(event) =>
              onUpdate({
                caption: event.target.value,
              })
            }
            className={inputClass}
          />

          <select
            value={data.size}
            onChange={(event) =>
              onUpdate({
                size: event.target.value,
              })
            }
            className={inputClass}
          >
            <option value="medium">
              Medium
            </option>
            <option value="large">
              Large
            </option>
            <option value="full">
              Full Width
            </option>
          </select>
        </div>
      )}

      {block.type === "code" && (
        <div className="space-y-3">
          <input
            value={data.language}
            placeholder="Language"
            onChange={(event) =>
              onUpdate({
                language:
                  event.target.value,
              })
            }
            className={inputClass}
          />

          <textarea
            rows={12}
            value={data.code}
            placeholder="Write code..."
            onChange={(event) =>
              onUpdate({
                code: event.target.value,
              })
            }
            className="w-full resize-y rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 font-mono text-sm leading-6 text-slate-100 outline-none focus:border-indigo-500"
          />
        </div>
      )}

      {block.type === "quote" && (
        <textarea
          rows={4}
          value={data.text}
          placeholder="Quote..."
          onChange={(event) =>
            onUpdate({
              text: event.target.value,
            })
          }
          className={textareaClass}
        />
      )}

      {(block.type === "callout" ||
        block.type === "tip" ||
        block.type === "warning") && (
        <div className="space-y-3">
          <input
            value={data.title}
            placeholder="Title"
            onChange={(event) =>
              onUpdate({
                title: event.target.value,
              })
            }
            className={inputClass}
          />

          <textarea
            rows={4}
            value={data.text}
            placeholder="Content..."
            onChange={(event) =>
              onUpdate({
                text: event.target.value,
              })
            }
            className={textareaClass}
          />
        </div>
      )}

      {block.type === "comparison" && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <input
              value={data.leftTitle}
              placeholder="Left title"
              onChange={(event) =>
                onUpdate({
                  leftTitle:
                    event.target.value,
                })
              }
              className={inputClass}
            />

            <textarea
              rows={5}
              value={data.leftText}
              placeholder="Left content"
              onChange={(event) =>
                onUpdate({
                  leftText:
                    event.target.value,
                })
              }
              className={textareaClass}
            />
          </div>

          <div className="space-y-3">
            <input
              value={data.rightTitle}
              placeholder="Right title"
              onChange={(event) =>
                onUpdate({
                  rightTitle:
                    event.target.value,
                })
              }
              className={inputClass}
            />

            <textarea
              rows={5}
              value={data.rightText}
              placeholder="Right content"
              onChange={(event) =>
                onUpdate({
                  rightText:
                    event.target.value,
                })
              }
              className={textareaClass}
            />
          </div>
        </div>
      )}

      {block.type === "steps" && (
        <textarea
          rows={7}
          value={data.items}
          placeholder={`One step per line\nUnderstand intent\nValidate inputs\nCall required tools`}
          onChange={(event) =>
            onUpdate({
              items: event.target.value,
            })
          }
          className={textareaClass}
        />
      )}

      {block.type === "faq" && (
        <div className="space-y-3">
          <input
            value={data.question}
            placeholder="Question"
            onChange={(event) =>
              onUpdate({
                question:
                  event.target.value,
              })
            }
            className={inputClass}
          />

          <textarea
            rows={5}
            value={data.answer}
            placeholder="Answer"
            onChange={(event) =>
              onUpdate({
                answer:
                  event.target.value,
              })
            }
            className={textareaClass}
          />
        </div>
      )}

      {block.type === "divider" && (
        <div className="py-4">
          <hr className="border-slate-300" />
        </div>
      )}
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  danger = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium ${
        danger
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-slate-200 text-slate-600 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

const textareaClass =
  "w-full resize-y rounded-xl border border-slate-300 px-4 py-3 leading-7 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";