import { useState } from "react"
import { PROJECTS } from "../data/projects"
import type { ProjectCategory } from "../types/projects"
import { GitHubIcon } from "../components/GitHubIcon"
import { MediaPreview } from "../components/MediaPreview"

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  financial: "Financial",
  genai: "Gen AI",
  healthcare: "Healthcare",
  fun: "Fun",
}

const Projects = () => {
  const categories = Array.from(
    new Set(PROJECTS.map((p) => p.category))
  )

  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>(categories[0])

  const visibleProjects = PROJECTS.filter(
    (project) => project.category === activeCategory
  )

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#e4e8ec] py-20 font-sans">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="mt-4 text-gray-700 max-w-xl mx-auto">
          Selected projects across finance, GenAI, healthcare, and experiments.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${
                activeCategory === category
                  ? "bg-[#3576c0] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="max-w-5xl mx-auto space-y-8">
        {visibleProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-md overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              
              {/* LEFT: Content */}
              <div className="flex-1 p-8">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-[#3576c0] font-semibold text-lg pr-4">
                    {project.title}
                  </h2>

                  {project.github && (
                    <GitHubIcon href={project.github} />
                  )}
                </div>

                <p className="text-gray-700 text-sm mb-4">
                  {project.summary}
                </p>

                <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-1">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT: Media */}
              <div className="md:w-[320px] h-[220px] md:h-auto bg-gray-50 p-4">
                <MediaPreview media={project.media} />
              </div>

            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Projects
