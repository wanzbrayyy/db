import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AppLayout from './layouts/AppLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';
import Overview from './pages/dashboard/Overview';
import Profile from './pages/dashboard/Profile';
import Collections from './pages/dashboard/Collections';
import CollectionDetail from './pages/dashboard/CollectionDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            
            {/* URL Login Dinamis: /login/session-id-acak */}
            <Route path="/login/:sessionId" element={<Login />} />
            {/* Fallback jika akses /login langsung tanpa ID */}
            <Route path="/login" element={<Navigate to={`/login/auth-${Date.now()}`} replace />} />
            
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<Overview />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collections" element={<Collections />} />
            <Route path="collections/:name" element={<CollectionDetail />} />
            <Route path="playground" element={<Navigate to="collections" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;