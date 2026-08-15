import type { BlogArticle } from "../types/blog";

export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    title: "When an LLM Refuses to Call a Critical Tool",
    subtitle: "Designing reliable AI agents for production systems.",
    excerpt:
      "What happens when an LLM decides not to call a tool that your business process considers mandatory?",
    slug: "llm-critical-tool-calling",

    category: "AI Agents",

    tags: ["LLM", "AI Agents", "Architecture", "Python"],

    author: {
      name: "Alex Morgan",
    },

    publishedAt: "2026-08-14",
    readingTime: 10,

    coverImage: "https://placehold.co/1200x700",
    featured: true,
  },

  {
    id: "2",
    title: "Parallel Tool Calling in Python",
    excerpt:
      "Learn how asyncio and concurrent execution can improve AI agent performance.",
    slug: "parallel-tool-calling-python",

    category: "Python",

    tags: ["Python", "AsyncIO", "Agents"],

    author: {
      name: "Sam Carter",
    },

    publishedAt: "2026-08-11",
    readingTime: 8,

    coverImage: "https://placehold.co/900x520",
  },

  {
    id: "3",
    title: "State Machines for Production AI Agents",
    excerpt:
      "Why deterministic state transitions are useful for complex production agent workflows.",
    slug: "state-machines-ai-agents",

    category: "Architecture",

    tags: ["Agents", "State Machines", "Production"],

    author: {
      name: "Jordan Lee",
    },

    publishedAt: "2026-08-08",
    readingTime: 12,

    coverImage: "https://placehold.co/900x520",
  },
];