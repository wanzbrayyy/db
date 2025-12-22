import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Database, User, Code, Settings, LogOut, Trash2, Hexagon } from 'lucide-react';
import { AuthService } from '../../api/auth';
import { cn } from '../../utils/cn';

export default function Sidebar({ isCollapsed, toggleCollapse, isMobileOpen, toggleMobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const menus = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Collections', path: '/dashboard/collections', icon: Database },
    { name: 'Developer', path: '/dashboard/developer', icon: Code }, 
    { name: 'Trash Bin', path: '/dashboard/trash', icon: Trash2 }, 
    { name: 'Settings', path: '/dashboard/profile', icon: Settings },
  ];

  return (
    <aside className={cn(
      "fixed top-0 left-0 z-40 h-screen bg-background border-r border-border transition-all duration-300 flex flex-col",
      // Logic Desktop: Collapsed (w-20) vs Expanded (w-64)
      "hidden md:flex",
      isCollapsed ? "w-20" : "w-64",
      // Logic Mobile: Slide in/out
      isMobileOpen ? "!flex w-64 translate-x-0 shadow-2xl" : "md:translate-x-0"
    )}>
      
      {/* Header */}
      <div className={cn("h-16 flex items-center px-4 border-b border-border", isCollapsed ? "justify-center" : "justify-between")}>
        <div className="flex items-center gap-2">
            <div className="bg-sky-500/10 p-1.5 rounded">
               <Hexagon className="text-sky-500 fill-sky-500/20" size={24} />
            </div>
            {!isCollapsed && <span className="text-xl font-bold font-mono text-textMain tracking-tighter">wanzdb</span>}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto mt-2">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <Link 
              key={menu.path} 
              to={menu.path}
              onClick={() => isMobileOpen && toggleMobile()} // Tutup sidebar di HP saat klik menu
              title={isCollapsed ? menu.name : ''}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive 
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" 
                  : "text-textMuted hover:bg-surface hover:text-textMain",
                isCollapsed && "justify-center"
              )}
            >
              <menu.icon size={20} className={cn(isActive ? "text-white" : "group-hover:text-sky-400")} />
              
              {!isCollapsed && <span>{menu.name}</span>}
              
              {/* Tooltip Hover saat Collapsed */}
              {isCollapsed && (
                 <div className="absolute left-full ml-2 px-2 py-1 bg-surface border border-border rounded text-xs text-textMain opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
                    {menu.name}
                 </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
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