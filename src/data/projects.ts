import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
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
    id: "icu-event-processing",
    title: "Real-Time ICU Event Processing & Deterioration Alerting Platform",
    category: "healthcare",
    featured: true,
    summary:
      "Distributed ICU monitoring platform for ingesting patient vitals, processing streaming events, and triggering low-latency deterioration alerts.",
    bullets: [
      "Built a Kafka ingestion pipeline for simulated patient vitals and continuous ICU event streams",
      "Used Apache Flink windowing and rule-based processing to detect potential patient deterioration in real time",
      "Exposed alerting and visualization services backed by PostgreSQL, Redis, and observability tooling",
    ],
    tech: ["Kafka", "Flink", "PostgreSQL", "Redis", "Streaming", "Observability"],
    media: {
      type: "image",
      src: "/projects/icu-event-processing.png",
    },
  },
  {
    id: "kafkacare",
    title: "KafkaCare: Real-Time Healthcare Claims Intelligence Platform",
    category: "healthcare",
    summary:
      "Event-driven healthcare claims platform for eligibility checks, fraud detection, prior authorization, and live claim decisioning.",
    bullets: [
      "Built a Kafka-based claims workflow where intake, eligibility, policy, fraud, and audit services process events in parallel",
      "Designed a claim aggregator that combines service outcomes into a final decision stream for the frontend dashboard",
      "Added real-time operational visibility for topic activity, processing status, and dead-letter handling",
    ],
    tech: ["Apache Kafka", "Kafka Streams", "React", "TypeScript", "PostgreSQL", "Redis"],
    media: {
      type: "image",
      src: "/projects/kafkacare.png",
    },
  },
  {
    id: "medical-image-analysis",
    title: "Medical Image Analysis under Real-World Data Variability",
    category: "healthcare",
    summary:
      "Research project studying how noise, resolution, and class imbalance affect tumor detection on MRI datasets.",
    bullets: [
      "Investigated the impact of data variability on tumor detection by training CNN and U-Net models using PyTorch on MRI datasets",
      "Designed controlled experiments by introducing Gaussian noise, downsampling, and class imbalance, then evaluated F1-score and ROC-AUC",
      "Improved robustness using augmentation techniques such as rotation, flipping, and intensity scaling along with dropout and batch normalization",
    ],
    tech: ["PyTorch", "CNN", "U-Net", "MRI", "F1-score", "ROC-AUC"],
    media: {
      type: "image",
      src: "/projects/medical-image-analysis.png",
    },
  },
  {
    id: "gpu-medical-image-processing",
    title: "GPU-Accelerated Medical Image Processing Engine",
    category: "healthcare",
    summary:
      "CUDA-based acceleration project for improving the speed of common medical image processing operations.",
    bullets: [
      "Analyzed limitations of CPU-based medical image processing and redesigned key operations using CUDA-based parallel kernels",
      "Implemented Sobel edge detection and Gaussian blur with custom CUDA kernels to accelerate pixel-wise computations",
      "Profiled kernel execution using NVIDIA Nsight, identified bottlenecks, and improved kernel efficiency",
    ],
    tech: ["CUDA", "C++", "NVIDIA Nsight", "Sobel", "Gaussian Blur"],
    media: {
      type: "image",
      src: "/projects/gpu-medical-image-processing.png",
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
    summary:
      "Experimental operating system interface controlled using hand gestures and computer vision.",
    bullets: [
      "Implemented real-time hand gesture recognition using computer vision techniques",
      "Mapped gesture inputs to OS-level commands for touchless system interaction",
      "Built vision-based control pipeline with low-latency input processing",
    ],
    tech: ["Python", "OpenCV", "Computer Vision", "Gesture Recognition"],
    github: "https://github.com/rajshekarm/jarvis",
    media: {
      type: "image",
      src: "/robot.png",
    },
  },
]
