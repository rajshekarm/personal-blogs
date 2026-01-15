const Projects = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#e4e8ec] py-20 font-sans">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
         
          Projects
        </h1>

        <p className="mt-6 text-gray-700 max-w-xl mx-auto">
          Selected projects that highlight my backend, systems, and full-stack
          engineering experience.
        </p>
      </div>

      {/* Projects Container */}
      <div className="space-y-16 max-w-5xl mx-auto">
        {/* Project 1 */}
        <div className="bg-white shadow-md p-10 flex gap-10">
          {/* Left */}
          <div className="w-1/2">
            <h2 className="text-[#3576c0] font-semibold text-lg mb-4 flex items-start gap-2">
              <span className="w-1 h-6 bg-[#3576c0] inline-block mt-1" />
              NutriAPI: A RESTful Engine for Beverage Recipes & Nutrition Data
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              Designed and implemented a robust backend system for managing
              smoothie recipes and their detailed nutritional data. Built a
              normalized relational schema to represent recipes, ingredients,
              and nutritional breakdowns.
              <br /><br />
              Developed REST APIs providing full CRUD capabilities using Django,
              enabling seamless management of recipes and ingredients. Enhanced
              usability through ingredient-based filtering and advanced
              nutritional analysis while ensuring data integrity and query
              efficiency.
            </p>
          </div>

          {/* Right (optional image / placeholder) */}
          <div className="w-1/2 bg-[#6e7579] flex items-center justify-center">
            <span className="text-gray-400 text-sm">
              Project Preview
            </span>
          </div>
        </div>

        {/* Project 2 */}
        <div className="bg-white shadow-md p-10">
          <h2 className="text-[#3576c0] font-semibold text-lg mb-4 flex items-start gap-2">
            <span className="w-1 h-6 bg-[#3576c0] inline-block mt-1" />
            Real-time Chat Application
          </h2>

          <p className="text-gray-700 leading-relaxed text-sm max-w-3xl">
            Built a scalable real-time chat system using SignalR and .NET,
            deployed on Azure Container Instances. Implemented Redis backplane
            support to enable horizontal scaling across multiple server
            instances.
            <br /><br />
            Gained hands-on experience with WebSocket connection state
            management, reconnection logic, and real-time message delivery at
            scale.
          </p>
        </div>

        {/* Project 3 */}
        <div className="bg-white shadow-md p-10">
          <h2 className="text-[#3576c0] font-semibold text-lg mb-4 flex items-start gap-2">
            <span className="w-1 h-6 bg-[#3576c0] inline-block mt-1" />
            LLM Response Caching Library
          </h2>

          <p className="text-gray-700 leading-relaxed text-sm max-w-3xl">
            Created a Python library for semantic caching of LLM responses using
            Redis and vector similarity search with sentence transformers.
            Reduced duplicate LLM API calls by approximately 60% across personal
            projects.
            <br /><br />
            Contributed learnings to open-source alternatives such as GPTCache
            and explored trade-offs between cache accuracy, latency, and memory
            usage.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Projects
