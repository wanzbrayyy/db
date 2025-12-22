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
  
  // DEFAULT TRUE: Sidebar tertutup di awal (Mini sidebar di desktop, Hidden di mobile)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  
  // State khusus untuk Mobile (Drawer open/close)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login/auth-redirect');
    }
  }, [user, loading, navigate]);

  if (loading) return <div className="h-screen w-full bg-background flex items-center justify-center text-sky-500"><Loader2 className="animate-spin" /></div>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      <CommandPalette />
      
      {/* Sidebar Component */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        toggleMobile={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Content Wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        
        {/* Navbar menerima toggle function */}
        <NavbarDashboard 
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          toggleMobile={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isCollapsed={isSidebarCollapsed}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto animate-fade-in-up">
             <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay (Klik di luar untuk tutup sidebar di HP) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}