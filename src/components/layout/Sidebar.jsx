import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Database, User, LogOut, Layers } from 'lucide-react';
import { AuthService } from '../../api/auth';
import { cn } from '../../utils/cn';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const menus = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Collections', path: '/dashboard/collections', icon: Database },
    { name: 'Playground', path: '/dashboard/playground', icon: Layers },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 fixed left-0 top-0 flex flex-col">
      <div className="p-6 h-16 flex items-center border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-wider">DASHBOARD</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <Link 
              key={menu.path} 
              to={menu.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <menu.icon size={18} />
              {menu.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}