import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_TASKS, MOCK_PROJECTS } from "../data/mockData";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  urgency: string;
  projectId: string;
  dueDate: string;
  assignees: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  color: string;
  status: string;
  deadline?: string;
  members: string[];
  assetsFolder?: string;
  specificationsLink?: string;
}

interface OrbitStore {
  tasks: Task[];
  projects: Project[];
  setTasks: (tasks: Task[]) => void;
  setProjects: (projects: Project[]) => void;
  updateTaskStatus: (taskId: string, status: string) => void;
  addTask: (task: Omit<Task, "id">) => void;
  addProject: (project: Omit<Project, "id" | "progress">) => void;
  deleteTask: (taskId: string) => void;
}

export const useOrbitStore = create<OrbitStore>()(
  persist(
    (set) => ({
      tasks: MOCK_TASKS,
      projects: MOCK_PROJECTS,
      setTasks: (tasks) => set({ tasks }),
      setProjects: (projects) => set({ projects }),
      updateTaskStatus: (taskId, status) => set((state) => ({
        tasks: state.tasks.map((t) => t.id === taskId ? { ...t, status } : t)
      })),
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: Math.random().toString(36).substr(2, 9) }]
      })),
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: Math.random().toString(36).substr(2, 9), progress: 0 }]
      })),
      deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== taskId)
      }))
    }),
    {
      name: "orbit-storage",
    }
  )
);
