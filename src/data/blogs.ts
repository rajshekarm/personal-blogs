import type { Blog } from "../types/blog"

export const blogs: Blog[] = [
  {
    slug: "distributed-systems",
    title: "Distributed Systems",
    description: "Scalability, fault tolerance, and consistency",
    content: `
## What is a Distributed System?

A distributed system is a collection of independent computers
that appears to its users as a single coherent system.

### Core Concepts
- CAP Theorem
- Consensus
- Replication
- Fault Tolerance
    `,
  },
  {
    slug: "system-design",
    title: "System Design Basics",
    description: "Foundations of designing scalable systems",
    content: `
System design focuses on building systems
that scale horizontally and handle failures gracefully.
    `,
  },
]
