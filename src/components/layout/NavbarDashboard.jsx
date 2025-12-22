import { useLocation } from 'react-router-dom';
import { Bell, Command, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext'; // Anda perlu membuat context ini
import Button from '../ui/Button';

export default function NavbarDashboard() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme() || { theme: 'dark', toggleTheme: () => {} }; // Fallback safe
  
  // Breadcrumbs Generator
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  return (
    <header className="h-16 border-b border-white/10 bg-[#09090b]/80 backdrop-blur sticky top-0 z-30 flex items-center justify-between px-6">
      
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-400">
        <span className="hover:text-white cursor-pointer">Home</span>
        {pathnames.map((value, index) => (
          <div key={index} className="flex items-center">
            <span className="mx-2 text-gray-600">/</span>
            <span className={`capitalize ${index === pathnames.length - 1 ? 'text-white font-medium' : 'hover:text-white cursor-pointer'}`}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Command Search Trigger */}
        <button className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-gray-400 hover:bg-white/10 transition">
           <Search size={14} />
           <span>Search...</span>
           <div className="flex items-center gap-0.5 ml-2 border border-gray-700 rounded px-1">
             <Command size={10} /> K
           </div>
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white transition">
           <Bell size={20} />
           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* Theme Toggle (Mock Visual) */}
        <button onClick={toggleTheme} className="p-2 text-gray-400 hover:text-white transition">
           {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
}