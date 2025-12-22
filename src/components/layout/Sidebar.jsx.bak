import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Database, User, LogOut, Layers, X, Hexagon } from 'lucide-react';
import { AuthService } from '../../api/auth';
import { cn } from '../../utils/cn';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    AuthService.logout();
    navigate('/login/ended');
  };

  const menus = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Collections', path: '/dashboard/collections', icon: Database },
    { name: 'Playground', path: '/dashboard/playground', icon: Layers },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <>
      {/* Overlay Gelap untuk Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Hexagon className="text-indigo-500 fill-indigo-500/20" size={24} />
            <span className="text-xl font-bold font-mono text-white tracking-tighter">wanzdb</span>
          </Link>
          {/* Tombol Close di Mobile */}
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-2">
          {menus.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link 
                key={menu.path} 
                to={menu.path}
                onClick={onClose} // Tutup sidebar saat menu diklik di mobile
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <menu.icon size={18} />
                {menu.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-800">
          <div className="mb-4 px-4 py-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-500">Status Server</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-mono text-green-400">Online</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}