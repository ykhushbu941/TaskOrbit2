export const MOCK_PROJECTS = [
  {
    id: "p1",
    name: "Apollo-X Engine",
    description: "Next-generation propulsion system research and development.",
    progress: 75,
    color: "#6366f1",
    status: "Active",
    deadline: "2026-08-30",
    members: ["u1", "u2", "u3"],
    assetsFolder: "https://drive.google.com/orbit/apollo-x",
    specificationsLink: "https://notion.so/orbit/specs-v2"
  },
  {
    id: "p2",
    name: "Nebula UI Kit",
    description: "Standardizing the design system across all galactic platforms.",
    progress: 42,
    color: "#8b5cf6",
    status: "Active",
    deadline: "2026-10-15",
    members: ["u1", "u4"],
  },
  {
    id: "p3",
    name: "Stellar Security",
    description: "Quantum encryption layer for inter-planetary communications.",
    progress: 90,
    color: "#14b8a6",
    status: "Review",
    deadline: "2026-06-01",
    members: ["u2", "u5"],
  }
];

export const MOCK_TASKS = [
  { id: "t1", name: "Ion Thruster Optimization", description: "Optimize fuel consumption by 15% using AI heuristics.", status: "Done", urgency: "Critical", projectId: "p1", dueDate: "2026-07-20", assignees: ["u1"] },
  { id: "t2", name: "Heat Shield Stress Test", description: "Simulate atmospheric entry at Mach 25.", status: "In Progress", urgency: "High", projectId: "p1", dueDate: "2026-08-05", assignees: ["u2"] },
  { id: "t3", name: "Quantum Key Distribution", description: "Implement BB84 protocol for node handshakes.", status: "To Do", urgency: "Medium", projectId: "p3", dueDate: "2026-05-30", assignees: ["u5"] },
  { id: "t4", name: "Nebula Core Refactor", description: "Clean up the glassmorphism component logic.", status: "In Progress", urgency: "Low", projectId: "p2", dueDate: "2026-09-12", assignees: ["u1", "u4"] },
  { id: "t5", name: "Navigation AI Training", description: "Feed black hole trajectory data into the model.", status: "Done", urgency: "Critical", projectId: "p1", dueDate: "2026-07-15", assignees: ["u3"] },
];

export const MOCK_USERS = [
  { id: "u1", name: "Khushbu", email: "ykhushbu941@gmail.com", role: "ADMIN", avatar: "KH" },
  { id: "u2", name: "Sarah Miller", email: "sarah@taskorbit.io", role: "MEMBER", avatar: "SM" },
  { id: "u3", name: "David Chen", email: "david@taskorbit.io", role: "MEMBER", avatar: "DC" },
  { id: "u4", name: "Elena Rez", email: "elena@taskorbit.io", role: "MEMBER", avatar: "ER" },
  { id: "u5", name: "Marcus Thorne", email: "marcus@taskorbit.io", role: "MEMBER", avatar: "MT" },
];

export const MOCK_ACTIVITY = [
  { id: "a1", userName: "Khushbu", action: "completed task", targetName: "Ion Thruster Optimization", timestamp: new Date().toISOString() },
  { id: "a2", userName: "Sarah Miller", action: "joined project", targetName: "Apollo-X Engine", timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "a3", userName: "Khushbu", action: "created project", targetName: "Stellar Security", timestamp: new Date(Date.now() - 86400000).toISOString() },
];
