type MediaPreviewProps = {
  media?: {
    type: "image" | "video"
    src: string
  }
}

export const MediaPreview = ({ media }: MediaPreviewProps) => {
  if (!media) {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center text-sm text-slate-500">
        Project preview will appear here
      </div>
    )
  }

  if (media.type === "video") {
    return (
      <video
        src={media.src}
        controls
        className="h-full w-full rounded-2xl object-cover"
      />
    )
  }

  return (
    <img
      src={media.src}
      alt="Project preview"
      className="h-full w-full rounded-2xl object-cover"
    />
  )
}
