import { useLocation } from 'react-router-dom';
import { Bell, Command, Search, Moon, Sun, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

export default function NavbarDashboard({ toggleSidebar, toggleMobile, isCollapsed }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme(); 
  
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  return (
    <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 transition-colors duration-300">
      
      <div className="flex items-center gap-4">
        {/* Tombol BARS (Mobile) */}
        <button onClick={toggleMobile} className="md:hidden p-2 text-textMuted hover:text-textMain">
           <Menu size={24} />
        </button>

        {/* Tombol Toggle Sidebar (Desktop) */}
        <button onClick={toggleSidebar} className="hidden md:block p-2 text-textMuted hover:text-textMain transition">
           {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>

        {/* Breadcrumbs */}
        <div className="hidden sm:flex items-center text-sm text-textMuted">
          <span className="hover:text-textMain cursor-pointer">Console</span>
          {pathnames.map((value, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-2 text-borderHighlight">/</span>
              <span className={`capitalize ${index === pathnames.length - 1 ? 'text-textMain font-medium' : 'hover:text-textMain cursor-pointer'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        <button className="hidden md:flex items-center gap-2 bg-surface border border-border rounded-full px-3 py-1.5 text-xs text-textMuted hover:bg-surfaceLight transition">
           <Search size={14} />
           <span>Search...</span>
           <div className="flex items-center gap-0.5 ml-2 border border-borderHighlight rounded px-1">
             <Command size={10} /> K
           </div>
        </button>

        <button className="relative p-2 text-textMuted hover:text-textMain transition">
           <Bell size={20} />
           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* DARK/LIGHT MODE TOGGLE */}
        <button 
          onClick={toggleTheme} 
          className="p-2 text-textMuted hover:text-textMain transition bg-surface border border-border rounded-lg"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
           {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}