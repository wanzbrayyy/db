import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AppLayout from './layouts/AppLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';

// Dashboard Pages
import Overview from './pages/dashboard/Overview';
import Profile from './pages/dashboard/Profile';
import Collections from './pages/dashboard/Collections';
import CollectionDetail from './pages/dashboard/CollectionDetail';
import Playground from './pages/dashboard/Playground'; // Halaman Baru

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login/:sessionId" element={<Login />} />
            <Route path="/login" element={<Navigate to={`/login/auth-${Date.now()}`} replace />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<Overview />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collections" element={<Collections />} />
            <Route path="collections/:name" element={<CollectionDetail />} />
            <Route path="playground" element={<Playground />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      
      {/* Vercel Monitoring Tools */}
      <Analytics />
      <SpeedInsights />
    </AuthProvider>
  );
}

export default App;