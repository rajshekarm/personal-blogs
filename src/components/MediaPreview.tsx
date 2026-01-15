type MediaPreviewProps = {
  media?: {
    type: "image" | "video"
    src: string
  }
}

export const MediaPreview = ({ media }: MediaPreviewProps) => {
  if (!media) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        Project Preview
      </div>
    )
  }

  if (media.type === "video") {
    return (
      <video
        src={media.src}
        controls
        className="w-full h-full object-cover rounded-md"
      />
    )
  }

  return (
    <img
      src={media.src}
      alt="Project preview"
      className="w-full h-full object-cover rounded-md"
    />
  )
}
