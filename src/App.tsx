import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import MyTasks from "./pages/MyTasks";
import Analytics from "./pages/Analytics";
import AdminPanel from "./pages/AdminPanel";
import Settings from "./pages/Settings";
import OrbitView from "./pages/OrbitView";
import FocusPage from "./pages/FocusPage";
import Layout from "./components/Layout";

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, token } = useAuthStore();
  
  if (!token) return <Navigate to="/login" />;
  if (adminOnly && user?.role !== "ADMIN") return <Navigate to="/dashboard" />;
  
  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<Layout />}>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/tasks" element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          } />
          <Route path="/my-tasks" element={<Navigate to="/tasks" replace />} />
          <Route path="/projects" element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } />
          <Route path="/projects/:id" element={
            <ProtectedRoute>
              <ProjectDetail />
            </ProtectedRoute>
          } />
          <Route path="/orbit" element={
            <ProtectedRoute>
              <OrbitView />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/focus" element={
             <ProtectedRoute>
                <FocusPage />
             </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}
