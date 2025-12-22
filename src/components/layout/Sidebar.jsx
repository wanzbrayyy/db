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
    <>
      {/* Overlay Gelap untuk Mobile saat Sidebar Terbuka */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleMobile}
      />

      <aside className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-[#09090b] border-r border-white/10 transition-transform duration-300 flex flex-col",
        // LOGIKA RESPONSIF:
        // Mobile: Default hidden (-translate-x-full), muncul jika isMobileOpen
        // Desktop: Selalu muncul, lebar berubah based on isCollapsed
        "w-64 md:translate-x-0", 
        !isMobileOpen && "-translate-x-full", // Mobile: Sembunyi jika tidak open
        isCollapsed ? "md:w-20" : "md:w-64"   // Desktop: Lebar dinamis
      )}>
        
        {/* Header */}
        <div className={cn(
          "h-16 flex items-center px-4 border-b border-white/10 shrink-0", 
          isCollapsed ? "md:justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-sky-500/10 p-1.5 rounded shrink-0">
                 <Hexagon className="text-sky-500 fill-sky-500/20" size={24} />
              </div>
              {/* Teks Brand: Muncul di Mobile ATAU Desktop Expanded */}
              <span className={cn(
                "text-xl font-bold font-mono text-white tracking-tighter transition-opacity duration-200 whitespace-nowrap",
                isCollapsed ? "md:opacity-0 md:w-0 md:hidden" : "opacity-100"
              )}>
                wanzdb
              </span>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto mt-2 custom-scrollbar">
          {menus.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link 
                key={menu.path} 
                to={menu.path}
                onClick={() => isMobileOpen && toggleMobile()} // Tutup sidebar otomatis di HP
                title={isCollapsed ? menu.name : ''}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden whitespace-nowrap",
                  isActive 
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/20" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white",
                  isCollapsed && "md:justify-center"
                )}
              >
                <menu.icon size={20} className={cn("shrink-0", isActive ? "text-white" : "group-hover:text-sky-400")} />
                
                {/* Teks Menu: Logic sama dengan Header */}
                <span className={cn(
                  "transition-all duration-200",
                  isCollapsed ? "md:hidden" : "block"
                )}>
                  {menu.name}
                </span>
                
                {/* Tooltip Hover Khusus Desktop Collapsed */}
                {isCollapsed && (
                   <div className="hidden md:block absolute left-full ml-2 px-2 py-1 bg-[#1a1a1a] border border-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 pointer-events-none shadow-xl">
                      {menu.name}
                   </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 shrink-0">
          <button 
            onClick={handleLogout}
            className={cn(
               "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition overflow-hidden whitespace-nowrap",
               isCollapsed && "md:justify-center"
            )}
          >
            <LogOut size={20} className="shrink-0" />
            <span className={cn(isCollapsed ? "md:hidden" : "block")}>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}