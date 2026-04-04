const Resume = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#e4e8ec] px-4 py-10 font-sans sm:px-6 sm:py-16">
      {/* Resume Header */}

          <div className="flex justify-center mb-16">
            <a
              href="/Rajashekar_Mudigonda_Resume.pdf"
              className="
                inline-flex items-center
                px-6 py-3
                rounded-full
                border border-[#2F5D62]
                text-[#0a81b8]
                text-sm font-semibold
                bg-white
                transition
                hover:bg-[#7298c4]
                hover:text-white
                hover:shadow-md
                active:scale-[0.98]
              "
            >
              Download Resume
            </a>
          </div>





      {/* Content */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">
        {/* Left: Education */}
        <div className="bg-white p-5 shadow-md sm:p-8 md:col-span-1">
          <h2 className="text-xl font-semibold mb-6">Education</h2>

          <div className="space-y-8 text-sm">
            <div>
              <h3 className="font-semibold">
                Illinois Institute of Technology
              </h3>
              <p className="text-gray-600">
                Master’s in Computer Science
              </p>
              <p className="text-gray-500">
                Aug 2023 – May 2025 · Chicago, USA
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                National Institute of Technology, Trichy
              </h3>
              <p className="text-gray-600">
                B.Tech in Electronics & Communication Engineering
              </p>
              <p className="text-gray-500">
                Aug 2014 – May 2018 · India
              </p>
            </div>
          </div>
        </div>

        {/* Right: Experience */}
        <div className="space-y-10 bg-white p-5 shadow-md sm:p-8 md:col-span-2 md:space-y-12">
          <h2 className="text-xl font-semibold">Experience</h2>

          {/* Experience 1 */}
          <div>
            <p className="text-blue-600 font-semibold">
              Sep 2025 – Present
            </p>
            <h3 className="font-semibold">
              Software Engineer · Fashion AI
            </h3>
            <p className="text-gray-500 text-sm mb-3">
              Chicago, IL
            </p>

            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>
                Built production-grade backend using FastAPI integrating Google
                Gemini vision APIs for image-to-image generation with streaming
                responses (~2.5s avg inference time).
              </li>
              <li>
                Designed event-driven architecture using AWS SQS and distributed
                Python worker pools in Docker, scaling to 100+ concurrent users.
              </li>
              <li>
                Implemented Redis caching for embeddings and recommendations,
                reducing LLM API costs by ~40%.
              </li>
              <li>
                Added stateless JWT auth with HttpOnly cookies, CSRF protection,
                and token refresh workflows.
              </li>
            </ul>
          </div>

          {/* Experience 2 */}
          <div>
            <p className="text-blue-600 font-semibold">
              Jan 2020 – Aug 2023
            </p>
            <h3 className="font-semibold">
              Software Engineer AI/ML · Prognovex
            </h3>

            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>
                Led development of an AI-assisted ECG triage platform deployed
                across 1,000+ rural clinics, addressing delays in cardiac
                diagnosis in low-resource, low-bandwidth networks and reducing
                diagnosis time from 4 to 6 hours to under 15 minutes.
              </li>
              <li>
                Deployed quantized TensorFlow Lite CNN models on Android
                tablets for offline STEMI detection, enabling real-time
                prioritization of critical cases.
              </li>
              <li>
                Developed a geo-based Uber-style cardiologist dispatch system
                with Java, Kafka, and Redis, enabling real-time matching of ECG
                cases with available specialists across a distributed network of
                clinics.
              </li>
            </ul>
          </div>

          {/* Experience 3 */}
          <div>
            <p className="text-blue-600 font-semibold">
              Jun 2018 – Jul 2020
            </p>
            <h3 className="font-semibold">
              Associate Software Engineer · SS&C Eze
            </h3>
            <p className="text-gray-500 text-sm mb-3">
              Hyderabad, India
            </p>

            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>
                Built end-to-end onboarding platform using ASP.NET Core and
                React/TypeScript, reducing manual effort by 70%.
              </li>
              <li>
                Implemented multi-step validation using React Hook Form and
                FluentValidation with shared schemas.
              </li>
              <li>
                Created reusable UI components with Tailwind and Storybook,
                standardizing UI across multiple internal apps.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Resume

