export const MAX_SECTION_IMAGE_SIZE_BYTES = 5 * 1024 * 1024

export const SECTION_IMAGE_SIZE_LABEL = "5MB"

export const readSectionImageFile = async (file: File): Promise<string> => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.")
  }

  if (file.size > MAX_SECTION_IMAGE_SIZE_BYTES) {
    throw new Error(`Please choose an image smaller than ${SECTION_IMAGE_SIZE_LABEL}.`)
  }

  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result)
        return
      }

      reject(new Error("Failed to read the selected image."))
    }

    reader.onerror = () => {
      reject(new Error("Failed to read the selected image."))
    }

    reader.readAsDataURL(file)
  })
}
