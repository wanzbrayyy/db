import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Bell, Command, Search, Moon, Sun, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

export default function NavbarDashboard({ toggleSidebar, toggleMobile, isCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme() || { theme: 'dark', toggleTheme: () => {} };
  
  // Breadcrumbs Generator
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Fungsi untuk membuat path yang dapat diklik
  const getPathTo = (index) => {
    return '/' + pathnames.slice(0, index + 1).join('/');
  };
  
  return (
    <header className="h-16 border-b border-white/10 bg-[#09090b]/80 backdrop-blur sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 transition-colors duration-300">
      
      <div className="flex items-center gap-4">
        
        {/* Tombol BARS (Mobile) & Toggle (Desktop) */}
        <button onClick={toggleMobile} className="md:hidden p-2 text-gray-400 hover:text-white transition">
           <Menu size={24} />
        </button>
        <button onClick={toggleSidebar} className="hidden md:block p-2 text-gray-400 hover:text-white transition">
           {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>

        {/* Breadcrumbs Interaktif */}
        <div className="flex items-center text-sm text-gray-400">
          <Link to="/dashboard" className="hover:text-white transition">Console</Link>
          {pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const pathTo = getPathTo(index);
            
            return (
              <div key={index} className="flex items-center">
                <span className="mx-2 text-gray-600">/</span>
                {isLast ? (
                  // Item terakhir (tidak bisa diklik)
                  <span className="capitalize text-white font-medium">{value.replace('-', ' ')}</span>
                ) : (
                  // Item di tengah (bisa diklik)
                  <Link to={pathTo} className="capitalize hover:text-white transition">
                    {value.replace('-', ' ')}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        <button className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-gray-400 hover:bg-white/10 transition">
           <Search size={14} />
           <span>Search...</span>
           <div className="flex items-center gap-0.5 ml-2 border border-gray-700 rounded px-1">
             <Command size={10} /> K
           </div>
        </button>

        <button className="relative p-2 text-gray-400 hover:text-white transition">
           <Bell size={20} />
           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* DARK/LIGHT MODE TOGGLE */}
        <button 
          onClick={toggleTheme} 
          className="p-2 text-gray-400 hover:text-white transition bg-white/5 border border-white/10 rounded-lg"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
           {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}