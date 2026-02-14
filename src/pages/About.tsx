import { Link } from "react-router-dom"
import { ArrowDown } from "lucide-react"

const About = () => {
  return (
    <main className="min-h-screen bg-white font-sans">
      <section className="relative flex min-h-[calc(100vh-64px)] flex-col md:flex-row">
        <div className="relative bg-[#2F5D62]/10 px-4 pb-8 pt-8 md:w-1/2 md:px-6 md:pb-0 md:pt-0">
          <div className="mx-auto w-full max-w-[340px] rounded-md bg-[#faf9f7] p-8 text-center shadow-2xl md:absolute md:right-[-72px] md:top-1/2 md:z-10 md:-translate-y-1/2">
            <div className="mx-auto mb-8 h-42 w-42 overflow-hidden rounded-full">
              <img
                src="/profile.png"
                alt="Profile"
                className="mt-2 h-48 w-48 scale-110 object-cover object-[50%_20%]"
              />
            </div>

            <h2 className="text-xl font-semibold leading-tight text-gray-900">
              Rajashekar
              <br />
              Mudigonda
            </h2>

            <div className="mx-auto my-4 h-[2px] w-8 bg-[#2F5D62]" />

            <p className="text-xs tracking-[0.3em] text-gray-600">BACKEND ENGINEER</p>

            <div className="mt-6 flex justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/rajshekarmudigonda/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-[#2F5D62] hover:text-[#2F5D62]"
              >
                <span className="pb-1 font-bold">in</span>
              </a>

              <a
                href="https://github.com/rajshekarm"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-[#2F5D62] hover:text-[#2F5D62]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center px-5 pb-12 pt-2 md:w-1/2 md:px-16 md:pb-0 md:pl-32">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:mb-6 md:text-5xl">
              Hi, I'm Rajashekar.
            </h1>

            <p className="mb-4 text-base leading-relaxed text-gray-700">
              I am a Software Engineer who builds reliable, high-performance systems. I have
              worked on low-latency trading platforms that process massive order volumes, and my
              core strengths include distributed systems, streaming pipelines, and API design.
            </p>

            <p className="mb-8 text-base leading-relaxed text-gray-700 md:mb-10">
              I recently completed my Master's degree in Computer Science from Illinois Institute
              of Technology, Chicago.
              <br />
              I enjoy tackling complex technical problems and turning them into simple, dependable
              solutions. I value continuous learning and thrive on challenges, from Parallel
              Computing (GPU Programming) to Neural Networks.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link
                to="/resume"
                className="rounded-full bg-[#3576c0] px-6 py-3 font-medium text-white transition hover:bg-[#042030]"
              >
                Resume
              </Link>

              <Link
                to="/projects"
                className="rounded-full border border-gray-800 px-6 py-3 font-medium transition hover:bg-gray-100"
              >
                Projects
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-gray-400 md:block">
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <ArrowDown className="mx-auto mt-1 h-4 w-4" />
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#2F5D62]">
            My Journey
          </h3>
          <p className="text-lg font-light leading-loose text-gray-800 md:text-xl">
            Over the past few years, I have worked on cloud infrastructure, secure data systems,
            and full-stack platforms using <span className="font-semibold">C#</span>,{" "}
            <span className="font-semibold">.NET</span>,{" "}
            <span className="font-semibold">React</span>,{" "}
            <span className="font-semibold">Azure</span>,{" "}
            <span className="font-semibold">AWS</span>, and occasionally{" "}
            <span className="font-semibold">Python</span> and{" "}
            <span className="font-semibold">FastAPI</span>.
          </p>
          <p className="mt-6 text-lg font-light leading-loose text-gray-800 md:text-xl">
            I have worked across different environments, from the fast-paced startup culture at{" "}
            <span className="font-semibold">Fashion AI</span> to enterprise-scale systems at{" "}
            <span className="font-semibold">SS&amp;C Eze</span>.
          </p>
        </div>
      </section>
    </main>
  )
}

export default About
