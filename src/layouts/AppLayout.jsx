import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import NavbarDashboard from '../components/layout/NavbarDashboard';
import CommandPalette from '../components/ui/CommandPalette';
import { Loader2 } from 'lucide-react';

export default function AppLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login/auth-redirect');
    }
  }, [user, loading, navigate]);

  if (loading) return <div className="h-screen w-full bg-[#09090b] flex items-center justify-center text-sky-500"><Loader2 className="animate-spin" /></div>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">
      <CommandPalette />
      
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'md:ml-64'}`}>
        <NavbarDashboard />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto animate-fade-in-up">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}