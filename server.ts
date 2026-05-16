import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "orbit-secret-key-2026";

app.use(express.json());

// --- AI Setup ---
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: { headers: { "User-Agent": "aistudio-build" } },
});

// --- Middleware ---
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const isAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== "ADMIN") return res.status(403).json({ error: "Admin access required" });
  next();
};

// --- Helper: Update Project Progress ---
async function updateProjectProgress(projectId: string) {
  const tasks = await prisma.task.findMany({
    where: { projectId },
  });

  if (tasks.length === 0) {
    await prisma.project.update({
      where: { id: projectId },
      data: { progress: 0 },
    });
    return 0;
  }

  const doneTasks = tasks.filter((t) => t.status === "Done").length;
  const progress = Math.round((doneTasks / tasks.length) * 100);

  await prisma.project.update({
    where: { id: projectId },
    data: { progress },
  });

  io.to(`project:${projectId}`).emit("project:progress", { projectId, progress });
  return progress;
}

// --- Helper: Log Activity ---
async function logActivity(userId: string, userName: string, action: string, targetName: string, projectId?: string) {
  const log = await prisma.activityLog.create({
    data: {
      userId,
      userName,
      action,
      targetName,
      projectId,
    },
  });
  io.emit("activity:new", log);
  return log;
}

// --- Auth Routes ---
app.post("/api/auth/register", async (req, res) => {
  const { email, password, name, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: role || "MEMBER" },
    });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar: user.avatar, assignedProjectId: user.assignedProjectId } });
});

// --- User Routes ---
app.get("/api/users", authenticateToken, isAdmin, async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, avatar: true, assignedProjectId: true },
  });
  res.json(users);
});

// --- Project Routes ---
app.get("/api/projects", authenticateToken, async (req, res) => {
  if (req.user.role === "ADMIN") {
    const projects = await prisma.project.findMany({
      include: { tasks: true, users: true },
    });
    res.json(projects);
  } else {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user?.assignedProjectId) return res.json([]);
    const project = await prisma.project.findUnique({
      where: { id: user.assignedProjectId },
      include: { tasks: true, users: true },
    });
    res.json(project ? [project] : []);
  }
});

app.post("/api/projects", authenticateToken, isAdmin, async (req, res) => {
  const { name, description, deadline, color, members } = req.body;
  const project = await prisma.project.create({
    data: { name, description, deadline: deadline ? new Date(deadline) : null, color },
  });

  if (members && members.length > 0) {
    await prisma.user.updateMany({
      where: { id: { in: members } },
      data: { assignedProjectId: project.id },
    });
  }

  await logActivity(req.user.id, (req as any).user.name, "Created Project", project.name, project.id);
  res.json(project);
});

app.get("/api/projects/:id", authenticateToken, async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
    include: { tasks: { include: { assignments: { include: { user: true } } } }, users: true },
  });
  res.json(project);
});

// --- Task Routes ---
app.post("/api/tasks", authenticateToken, isAdmin, async (req, res) => {
  const { name, description, urgency, projectId, dueDate, assignees } = req.body;
  const task = await prisma.task.create({
    data: {
      name,
      description,
      urgency,
      projectId,
      dueDate: dueDate ? new Date(dueDate) : null,
      assignments: {
        create: assignees?.map((userId: string) => ({ userId })) || [],
      },
    },
  });

  await updateProjectProgress(projectId);
  await logActivity(req.user.id, (req as any).user.name, "Created Task", task.name, projectId);
  res.json(task);
});

app.patch("/api/tasks/:id", authenticateToken, async (req, res) => {
  const { status, name, description, urgency, dueDate } = req.body;
  const task = await prisma.task.findUnique({ where: { id: req.params.id } });
  if (!task) return res.status(404).json({ error: "Task not found" });

  const updatedTask = await prisma.task.update({
    where: { id: req.params.id },
    data: { status, name, description, urgency, dueDate: dueDate ? new Date(dueDate) : null },
  });

  await updateProjectProgress(updatedTask.projectId);
  await logActivity(req.user.id, (req as any).user.name, `Updated Task Status to ${status}`, updatedTask.name, updatedTask.projectId);
  
  io.to(`project:${updatedTask.projectId}`).emit("task:updated", updatedTask);
  res.json(updatedTask);
});

app.delete("/api/tasks/:id", authenticateToken, isAdmin, async (req, res) => {
  const task = await prisma.task.findUnique({ where: { id: req.params.id } });
  if (!task) return res.status(404).json({ error: "Task not found" });

  await prisma.task.delete({ where: { id: req.params.id } });
  await updateProjectProgress(task.projectId);
  res.sendStatus(244);
});

// --- Activity Logs ---
app.get("/api/activity", authenticateToken, async (req, res) => {
  const logs = await prisma.activityLog.findMany({
    take: 50,
    orderBy: { timestamp: "desc" },
  });
  res.json(logs);
});

// --- AI Command Center ---
app.post("/api/ai/command", authenticateToken, async (req, res) => {
  const { command, context } = req.body;

  try {
    const prompt = `
      You are the TaskOrbit AI Assistant. 
      The user is asking: "${command}"
      
      Current Context:
      ${JSON.stringify(context)}
      
      Provide a response that helps the user manage their tasks and projects. 
      If they ask to "Plan my sprint" or "Break this project into tasks", provide a structured plan in JSON format embedded in the text if possible.
      Be futuristic, professional, and encouraging.
    `;

    const result = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    res.json({ response: result.text });
  } catch (error) {
    res.status(500).json({ error: "AI failed to respond" });
  }
});

// --- Socket.io Logic ---
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join:project", (projectId) => {
    socket.join(`project:${projectId}`);
  });

  socket.on("leave:project", (projectId) => {
    socket.leave(`project:${projectId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// --- Static Files & Vite ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
