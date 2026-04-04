import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "nutriapi",
    title: "NutriAPI: Nutrition & Recipe Engine",
    category: "healthcare",
    summary: "Backend system for managing recipes and nutritional data.",
    bullets: [
      "Designed normalized relational schema for recipes & ingredients",
      "Built RESTful CRUD APIs using Django",
      "Implemented ingredient-based filtering & nutrition analysis",
    ],
    tech: ["Django", "PostgreSQL", "REST APIs"],
    github: "https://github.com/rajshekarm/nutriapi",
    media: {
    type: "image",
    src: "/projects/nutriapi.png",
  },
  },
  {
    id: "ecg-triage",
    title: "ECG Triage Intelligence Platform",
    category: "healthcare",
    summary:
      "AI-assisted cardiac triage system designed for rural clinics, combining offline ECG inference with event-driven specialist dispatch.",
    bullets: [
      "Built a clinic-scale ECG workflow for 1,000+ rural sites, cutting diagnosis time from hours to under 15 minutes",
      "Deployed quantized TensorFlow Lite CNN models on Android tablets for offline STEMI detection in low-bandwidth environments",
      "Designed Kafka and Redis powered dispatch flows to route critical ECG cases to available cardiologists in real time",
    ],
    tech: ["Python", "TensorFlow Lite", "Android", "Kafka", "Redis", "Java"],
    link: {
      href: "/projects/ecg-triage-intelligence",
      label: "Open Experience",
    },
    media: {
      type: "image",
      src: "/projects/ecg-triage.svg",
    },
  },
  {
    id: "realtime-chat",
    title: "Real-time Chat Application",
    category: "financial",
    summary: "Scalable real-time messaging system on Azure.",
    bullets: [
      "Built SignalR-based real-time communication",
      "Enabled horizontal scaling using Redis backplane",
      "Handled WebSocket reconnection & state management",
    ],
    tech: [".NET", "SignalR", "Redis", "Azure"],
    github: "https://github.com/rajshekarm/realtime-chat",
    media: {
    type: "image",
    src: "/projects/nutriapi.png",
  },
  },
  {
    id: "llm-cache",
    title: "LLM Response Caching Library",
    category: "genai",
    summary: "Semantic caching system to reduce redundant LLM calls.",
    bullets: [
      "Implemented vector similarity-based caching with Redis",
      "Reduced duplicate LLM calls by ~60%",
      "Evaluated cache accuracy vs latency trade-offs",
    ],
    tech: ["Python", "Redis", "Embeddings", "LLMs"],
    github: "https://github.com/rajshekarm/llm-cache",
    media: {
    type: "image",
    src: "/projects/nutriapi.png",
  },
  },

  {
  id: "jarvis",
  title: "J.A.R.V.I.S Hand & Vision Controlled Operating System",
  category: "fun",
  summary: "Experimental operating system interface controlled using hand gestures and computer vision.",
  bullets: [
    "Implemented real-time hand gesture recognition using computer vision techniques",
    "Mapped gesture inputs to OS-level commands for touchless system interaction",
    "Built vision-based control pipeline with low-latency input processing"
  ],
  tech: [
    "Python",
    "OpenCV",
    "Computer Vision",
    "Gesture Recognition"
  ],
  github: "https://github.com/rajshekarm/jarvis",
  media: {
    type: "image",
    src: "/robot.png",
  },
}
,


]
