import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AIChat from './pages/AIChat';
import ResumeAnalysis from './pages/ResumeAnalysis';
import JobMatching from './pages/JobMatching';
import CourseExplorer from './pages/CourseExplorer';
import Settings from './pages/Settings';
import UserDashboard from './pages/UserDashboard';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/ai-chat" element={<PrivateRoute><AIChat /></PrivateRoute>} />
            <Route path="/resume-analysis" element={<PrivateRoute><ResumeAnalysis /></PrivateRoute>} />
            <Route path="/job-matching" element={<PrivateRoute><JobMatching /></PrivateRoute>} />
            <Route path="/courses" element={<PrivateRoute><CourseExplorer /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 