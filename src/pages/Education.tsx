import { useEffect, useRef, useState, type RefObject, type WheelEvent } from "react"
import { ArrowLeft, CalendarDays, GraduationCap, Plus } from "lucide-react"
import { Link } from "react-router-dom"

type EditorialImageProps = {
  src: string
  fallback: string
  alt: string
  large?: boolean
  offsetClass?: string
  color?: boolean
}

type Chapter = {
  id: string
  date: string
  label: string
  title: string
  summary: string
  tags: string[]
  frames: EditorialImageProps[]
}

const chapters: Chapter[] = [
  {
    id: "chapter-01",
    date: "2025-05-01",
    label: "Latest chapter",
    title: "Awarded Master's in Computer Science",
    summary:
      "Specialized in machine learning, distributed systems, and applied AI, ready to drive next-generation computing and software systems.",
    tags: ["Machine learning", "Distributed systems", "Applied AI", "Software systems"],
    frames: [
      {
        src: "/projects/graduation1.jpeg",
        fallback: "/profile.jpeg",
        alt: "Graduation portrait",
        large: true,
        color: true,
        offsetClass: "left-6 top-6 rotate-[-4deg]",
      },
      {
        src: "/projects/graduation2.jpeg",
        fallback: "/profile.jpeg",
        alt: "Graduation close-up",
        offsetClass: "right-4 top-16 rotate-[4deg]",
      },
      {
        src: "/projects/graduation3.jpeg",
        fallback: "/profile.jpeg",
        alt: "Graduation side portrait",
        offsetClass: "left-8 bottom-4 rotate-[2deg]",
      },
    ],
  },
  {
    id: "chapter-02",
    date: "2018-05-01",
    label: "Earlier chapter",
    title: "Graduated from NIT Trichy",
    summary:
      "Completed my undergraduate chapter at NIT Trichy and built the foundation for systems, software, and computing work.",
    tags: ["NIT Trichy", "Undergraduate", "Systems", "Software"],
    frames: [
      {
        src: "/nit1.jpeg",
        fallback: "/nit1.jpeg",
        alt: "NIT Trichy visual",
        large: true,
        color: true,
        offsetClass: "left-6 top-8 rotate-[-3deg]",
      },
      {
        src: "/nit1.jpeg",
        fallback: "/nit1.jpeg",
        alt: "NIT Trichy visual two",
        color: true,
        offsetClass: "right-6 top-20 rotate-[5deg]",
      },
      {
        src: "/nit1.jpeg",
        fallback: "/nit1.jpeg",
        alt: "NIT Trichy visual three",
        color: true,
        offsetClass: "left-10 bottom-4 rotate-[2deg]",
      },
    ],
  },
]

const sortedChapters = [...chapters].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))

const getNearestSectionIndex = (root: HTMLElement, sections: HTMLElement[]) => {
  const target = root.scrollTop + root.clientHeight * 0.42
  let nearestIndex = 0
  let nearestDistance = Number.POSITIVE_INFINITY

  sections.forEach((section, index) => {
    const distance = Math.abs(section.offsetTop - target)

    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestIndex = index
    }
  })

  return nearestIndex
}

const EditorialImage = ({ src, fallback, alt, large, offsetClass, color }: EditorialImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src)

  return (
    <div
      className={`absolute overflow-hidden rounded-[1.75rem] shadow-[0_28px_60px_rgba(15,23,42,0.18)] ${
        large ? "h-[28rem] w-[20rem] sm:h-[34rem] sm:w-[24rem]" : "h-[15rem] w-[11rem] sm:h-[18rem] sm:w-[13rem]"
      } ${offsetClass ?? ""}`}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={`h-full w-full object-cover transition duration-500 hover:scale-[1.03] ${
          color ? "contrast-105 saturate-105" : "grayscale contrast-110"
        }`}
        onError={() => {
          if (currentSrc !== fallback) {
            setCurrentSrc(fallback)
          }
        }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0.18))]" />
    </div>
  )
}

const ChapterSection = ({
  chapter,
  index,
  scrollRootRef,
}: {
  chapter: Chapter
  index: number
  scrollRootRef: RefObject<HTMLElement | null>
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const reverse = index % 2 === 1

  useEffect(() => {
    const node = sectionRef.current

    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        root: scrollRootRef.current,
        threshold: 0.24,
        rootMargin: "0px 0px -8% 0px",
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={sectionRef}
      id={chapter.id}
      data-chapter-index={index}
      className={`grid min-h-[100svh] snap-start scroll-mt-8 items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 ${
        reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
      }`}
    >
      <div
        className={`max-w-xl space-y-6 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:will-change-transform ${
          isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-[2px]"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-black">
          <GraduationCap className="h-4 w-4" />
          {chapter.label}
        </div>

        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.42em] text-black/55">
            Chapter {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="max-w-xl text-3xl font-semibold leading-[0.95] tracking-tight text-black sm:text-4xl lg:text-5xl">
            {chapter.title}
          </h2>
          <p className="max-w-xl text-sm leading-7 text-black/70 sm:text-base">{chapter.summary}</p>
        </div>

        <div className="grid max-w-xl gap-3 rounded-[1.75rem] border border-black/10 bg-white p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-black/60">
            <CalendarDays className="h-4 w-4" />
            {formatDate(chapter.date)}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {chapter.tags.map((item) => (
              <div key={item} className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-medium text-black">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`relative mx-auto flex min-h-[34rem] w-full max-w-[34rem] items-center justify-center lg:mx-0 lg:max-w-[42rem] transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:will-change-transform ${
          isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-[2px]"
        }`}
        style={{ transitionDelay: isVisible ? "220ms" : "0ms" }}
      >
        <div className="absolute inset-x-4 top-10 h-[31rem] rounded-[2.5rem] border border-black/10 bg-white" />

        {chapter.frames.map((frame) => (
          <EditorialImage
            key={`${chapter.id}-${frame.alt}`}
            src={frame.src}
            fallback={frame.fallback}
            alt={frame.alt}
            large={frame.large}
            offsetClass={frame.offsetClass}
            color={frame.color}
          />
        ))}
      </div>
    </article>
  )
}

const Education = () => {
  const scrollRootRef = useRef<HTMLElement | null>(null)
  const wheelLockRef = useRef(false)

  const scrollToChapter = (direction: 1 | -1) => {
    const root = scrollRootRef.current

    if (!root) {
      return
    }

    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-chapter-index]"))

    if (!sections.length) {
      return
    }

    const currentIndex = getNearestSectionIndex(root, sections)

    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1)

    const targetSection = sections[nextIndex]

    targetSection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (wheelLockRef.current) {
      return
    }

    if (Math.abs(event.deltaY) < 8) {
      return
    }

    event.preventDefault()
    wheelLockRef.current = true
    scrollToChapter(event.deltaY > 0 ? 1 : -1)

    window.setTimeout(() => {
      wheelLockRef.current = false
    }, 1100)
  }

  return (
    <section
      ref={scrollRootRef}
      onWheel={handleWheel}
      className="relative h-screen snap-y snap-proximity overflow-y-auto overscroll-contain scroll-smooth bg-white px-4 pb-12 pt-6 text-black md:px-6 md:pt-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

      <Link
        to="/"
        className="fixed left-4 top-4 z-40 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/12 bg-white text-black transition hover:bg-black hover:text-white"
        aria-label="Back to home"
        title="Back to home"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>

      <div className="relative z-10 mx-auto max-w-[1500px] pt-4">
        <div className="mt-8 space-y-10">
          {sortedChapters.map((chapter, index) => (
            <ChapterSection key={chapter.id} chapter={chapter} index={index} scrollRootRef={scrollRootRef} />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToChapter(1)}
        className="fixed bottom-4 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-black/12 bg-white px-3 py-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-black shadow-[0_10px_26px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
        aria-label="Scroll for more"
        title="Scroll for more"
      >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/10 bg-white">
          <Plus className="h-3 w-3 animate-pulse" />
        </span>
        Scroll for more
      </button>

      <Link
        to="/blogs/new"
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full border border-black/12 bg-white px-3 py-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-black shadow-[0_10px_26px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
        aria-label="Add achievement"
        title="Add achievement"
      >
        <Plus className="h-3.5 w-3.5" />
        Add
      </Link>
    </section>
  )
}

export default Education
