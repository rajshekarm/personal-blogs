export type ProjectCategory =
  | "financial"
  | "genai"
  | "healthcare"
  | "fun"

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  summary: string
  bullets: string[]
  tech: string[]
  github?: string
  media?: {
    type: "image" | "video"
    src: string
  }
}
