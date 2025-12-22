import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; // Context Baru
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AppLayout from './layouts/AppLayout';

// Public Pages
import Landing from './pages/Landing';
import Docs from './pages/Docs'; // Halaman Dokumentasi
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';

// Dashboard Pages
import Overview from './pages/dashboard/Overview';
import Profile from './pages/dashboard/Profile'; // Halaman Profile (Avatar/2FA)
import Collections from './pages/dashboard/Collections';
import CollectionDetail from './pages/dashboard/CollectionDetail';
import Playground from './pages/dashboard/Playground';
import Developer from './pages/dashboard/Developer'; // Halaman Developer (API Keys)
import Trash from './pages/dashboard/Trash'; // Halaman Trash Bin

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/docs" element={<Docs />} />
              
              {/* Auth Routes with Dynamic Session ID */}
              <Route path="/login/:sessionId" element={<Login />} />
              <Route path="/login" element={<Navigate to={`/login/auth-${Date.now()}`} replace />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<AppLayout />}>
              <Route index element={<Overview />} />
              <Route path="profile" element={<Profile />} />
              
              {/* Data Management */}
              <Route path="collections" element={<Collections />} />
              <Route path="collections/:name" element={<CollectionDetail />} />
              <Route path="trash" element={<Trash />} /> {/* Route Trash Bin */}
              
              {/* Developer Tools */}
              <Route path="developer" element={<Developer />} />
              <Route path="playground" element={<Playground />} />
            </Route>

            {/* 404 Page (Mini Game) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        
        {/* Vercel Monitoring */}
        <Analytics />
        <SpeedInsights />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;