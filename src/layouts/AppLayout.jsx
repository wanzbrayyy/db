import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import { Loader2, Menu } from 'lucide-react';

export default function AppLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login/auth-redirect');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-indigo-500">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* Mobile Header (Hanya muncul di HP) */}
      <div className="md:hidden fixed top-0 w-full h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-40">
        <div className="font-bold font-mono text-xl">wanzdb</div>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-400 hover:text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <main className={`flex-1 p-4 md:p-8 overflow-y-auto h-screen transition-all duration-300 ${isSidebarOpen ? 'blur-sm md:blur-none' : ''} md:ml-64 pt-20 md:pt-8`}>
        <div className="max-w-6xl mx-auto animate-fadeIn pb-20">
           <Outlet />
        </div>
      </main>
    </div>
  );
}