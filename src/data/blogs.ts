import type { Blog } from "../types/blog"

export const blogs: Blog[] = [


   {
    slug: "hierarchical-permissions-tree",
    title: "Beyond RBAC: Building a Recursive Entitlement Engine for Buy-Side SaaS",
    description: "From Root to Leaf: How Hierarchical Permissions Streamline Trade Execution and Audits",
    content: `
                  From Root to Leaf: How Hierarchical Permissions Streamline Trade Execution and AuditsIn the world of B2B SaaS, “User Management” is usually straightforward: you have Admins, Editors, and Viewers. But in the institutional investment space—dealing with Hedge Funds, Asset Managers, and Prime Brokers—simple Role-Based Access Control (RBAC) falls apart quickly.When I was tasked with building the client onboarding and authorization platform for our investment management SaaS, I realized we weren't just managing users; we were managing structures.A large buy-side firm doesn’t just have "users." They have Regional Branches, Trading Desks, Portfolio Managers, and thousands of underlying Accounts. A simple "Admin" role is too broad, and a "User" role is too restricted.Here is how I architected a hierarchical, multi-tenant authorization system using .NET and React to solve this challenge—and how it unexpectedly revolutionized our ability to track trade history.The Challenge: The "Flat List" ProblemImagine an Asset Manager with 500 accounts spread across 10 branches.If we used a standard flat permission model, onboarding a new Regional Manager would mean manually assigning them permission to 50 accounts. If they opened 10 new accounts the next day, we’d have to update the user again.This creates two problems:Onboarding Friction: It takes forever to set up a new client.Security Risk: It’s easy to miss an account or leave access open when someone changes roles.The Solution: A Recursive Tree ArchitectureTo solve this, I moved away from flat lists and implemented a Directed Tree Structure.We modeled the client’s organization as a hierarchy of nodes. The structure we defined looks like this:Firm (Root) $\rightarrow$ Client $\rightarrow$ Branch $\rightarrow$ Customer $\rightarrow$ Account (Leaf)How Inheritance WorksThe core logic of the system is Permission Inheritance.Instead of assigning permissions to an individual account, we assign a user to a Node in the tree.If a user is assigned to a specific Account (Leaf node), they see only that account.If a user is assigned to a Branch (Parent node), the system recursively grants them access to every Customer and Account underneath that Branch.This reduced onboarding time by 90%. To give a manager access to a new region, we simply link them to the "Branch" node, and the system dynamically resolves access to the thousands of accounts beneath it.Technical Implementation (.NET & React)We built this using a robust .NET API backend and a React frontend.The Backend LogicThe complex part was the "Resolution Engine." When a user logs in, the API doesn't just check a table of allowed accounts. It performs a graph traversal starting from the user's assigned node.Authentication: Verifies identity.Authorization: The API queries the tree: "Is User X an ancestor of Account Y?"The Frontend ExperienceIn React, we visualized this as an interactive organization chart. Clients can drag-and-drop accounts between branches or assign users to different levels of the tree visually. This turned a complex database relationship into a UI that non-technical operations managers could understand intuitively.The "Unlock": Context-Aware Trade Execution & HistoryWhile the primary goal was security, the biggest win was actually in Data Intelligence and Auditing.In a standard system, a trade log looks like this:“John Doe bought 100 shares of Apple for Account 123.”But in our hierarchical system, because John Doe’s permission is derived from his position in the tree, we capture the context of the trade. Our logs look like this:“John Doe (acting as Branch Manager) executed a bulk order for Branch NYC, affecting 50 child Accounts.”Why This Matters for Buy-Side Clients:Crystal Clear Audits: We can trace exactly why a user had the authority to make a trade. If a trade is flagged for compliance, we can see the exact scope of authority used at the moment of execution.Historical "Roll-Ups": Because the trade history is linked to the tree structure, clients can instantly view performance history at any level. They can click "Branch NYC" and see the P&L (Profit and Loss) of all underlying accounts combined. The permission structure doubles as a reporting structure.ConclusionBuilding this system taught me that in Fintech, architecture is the product. 
                  By mirroring the real-world complexity of our clients' organizations in our data structure, we didn't just make the software more secure; we made it smarter.We turned "User Management" from a tedious admin task into a powerful tool for analyzing organizational performance and trade history..
    `,
    Url: "https://medium.com/@rashekarmudigonda/from-root-to-leaf-how-hierarchical-permissions-streamline-trade-execution-and-audits-a8fc2f69d6c0"
  },
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
    Url: ""
  },
  {
    slug: "system-design",
    title: "System Design Basics",
    description: "Foundations of designing scalable systems",
    content: `
System design focuses on building systems
that scale horizontally and handle failures gracefully.
    `,
    Url:""
  },


  


  
]
