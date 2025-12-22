import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Database, User, Code, Settings, ChevronLeft, ChevronRight, LogOut, Trash2 } from 'lucide-react';
import { AuthService } from '../../api/auth';
import { cn } from '../../utils/cn';

export default function Sidebar({ isCollapsed, toggleCollapse }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const menus = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Collections', path: '/dashboard/collections', icon: Database },
    { name: 'Developer', path: '/dashboard/developer', icon: Code }, // NEW
    { name: 'Trash Bin', path: '/dashboard/trash', icon: Trash2 }, // NEW
    { name: 'Settings', path: '/dashboard/profile', icon: Settings },
  ];

  return (
    <aside className={cn(
      "fixed top-0 left-0 z-40 h-screen bg-[#09090b] border-r border-white/10 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-20" : "w-64"
    )}>
      
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        {!isCollapsed && <span className="text-xl font-bold font-mono text-white tracking-tighter">wanzdb</span>}
        <button onClick={toggleCollapse} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400">
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto mt-2">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <Link 
              key={menu.path} 
              to={menu.path}
              title={isCollapsed ? menu.name : ''}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive ? "bg-white text-black" : "text-gray-400 hover:bg-white/5 hover:text-white",
                isCollapsed && "justify-center"
              )}
            >
              <menu.icon size={20} />
              {!isCollapsed && <span>{menu.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className={cn(
             "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition",
             isCollapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!isCollapsed && "Sign Out"}
        </button>
      </div>
    </aside>
  );
}