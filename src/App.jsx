import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './hooks/useToast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AppLayout from './layouts/AppLayout';

// Public Pages
import Landing from './pages/Landing';
import Docs from './pages/Docs'; 
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Verify2FA from './pages/auth/Verify2FA'; 
import NotFound from './pages/NotFound';

// Dashboard Pages
import Overview from './pages/dashboard/Overview';
import Profile from './pages/dashboard/Profile';
import Collections from './pages/dashboard/Collections';
import CollectionDetail from './pages/dashboard/CollectionDetail';
import Playground from './pages/dashboard/Playground';
import Developer from './pages/dashboard/Developer';
import Trash from './pages/dashboard/Trash';
import Upgrade from './pages/dashboard/Upgrade';
import RestAPI from './pages/dashboard/RestAPI'; 
import RestAPIDetail from './pages/dashboard/RestAPIDetail'; // Import Halaman Detail

function App() {
  return (
    <ThemeProvider>
      <ToastProvider> 
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/docs" element={<Docs />} />
                
                {/* Auth */}
                <Route path="/login/:sessionId" element={<Login />} />
                <Route path="/login" element={<Navigate to={`/login/auth-${Date.now()}`} replace />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-2fa" element={<Verify2FA />} />
              </Route>

              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={<AppLayout />}>
                <Route index element={<Overview />} />
                <Route path="profile" element={<Profile />} />
                
                {/* Data Management */}
                <Route path="collections" element={<Collections />} />
                <Route path="collections/:name" element={<CollectionDetail />} />
                <Route path="trash" element={<Trash />} /> 
                
                {/* Developer Tools */}
                <Route path="developer" element={<Developer />} />
                <Route path="playground" element={<Playground />} />
                
                {/* 🔥 PERBAIKAN ROUTING FINAL: Menggunakan Path Splitting */}
                <Route path="rest-api" element={<RestAPI />} /> 
                <Route path="rest-api/:modelName/*" element={<RestAPIDetail />} /> 
                
                {/* Upgrade */}
                <Route path="upgrade" element={<Upgrade />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          
          <Analytics />
          <SpeedInsights />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;