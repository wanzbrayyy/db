import { useLocation, Link } from 'react-router-dom';
import { Bell, Command, Search, Moon, Sun, Menu, PanelLeftClose, PanelLeftOpen, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';
import { cn } from '../../utils/cn';

function NotificationsModal({ notifications }) {
    const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);
    
    // Simulasikan marking all as read
    const markAllRead = () => {
        // Logika real-nya: call API
        setUnreadCount(0);
        // Lakukan set local state agar tidak ada notif baru muncul lagi
    };

    return (
        <div className="absolute right-0 mt-3 w-80 bg-[#09090b] border border-white/10 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-white/10">
                <h3 className="font-bold text-white">Notifications</h3>
                <button onClick={markAllRead} className="text-xs text-sky-400 hover:text-sky-300 transition">
                    Mark all read
                </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="p-4 text-sm text-gray-500 text-center">No new notifications.</p>
                ) : (
                    notifications.map((n, i) => (
                        <div key={i} className={`p-3 border-b border-white/5 last:border-b-0 cursor-pointer hover:bg-white/5 transition ${n.read ? 'opacity-70' : 'bg-sky-500/5'}`}>
                            <p className="text-sm text-white">{n.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{n.time} ago</p>
                            {!n.read && <span className="absolute top-2 left-2 w-2 h-2 bg-sky-500 rounded-full"></span>}
                        </div>
                    ))
                )}
            </div>
            <Link to="/dashboard/upgrade" className="block p-3 text-center text-sm text-yellow-400 bg-black/30 hover:bg-black/50 transition">
                <Zap size={14} className="inline mr-2"/> See plans to increase limits
            </Link>
        </div>
    );
}

export default function NavbarDashboard({ toggleSidebar, toggleMobile, isCollapsed }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme() || { theme: 'dark', toggleTheme: () => {} };
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const notificationsData = [ // Dummy Notifications
    { title: "New Feature: Trash Bin is Live!", time: "1m", read: false },
    { title: "Billing: Usage at 80% limit.", time: "2h", read: false },
    { title: "System: Maintenance complete.", time: "1d", read: true },
  ];

  // Breadcrumbs Generator... (sama seperti sebelumnya)
  const pathnames = location.pathname.split('/').filter((x) => x);
  const getPathTo = (index) => '/' + pathnames.slice(0, index + 1).join('/');
  
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
                  <span className="capitalize text-white font-medium">{value.replace('-', ' ')}</span>
                ) : (
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

        {/* Notifications Center */}
        <div className="relative">
            <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative p-2 text-gray-400 hover:text-white transition">
               <Bell size={20} />
               {notificationsData.filter(n => !n.read).length > 0 && (
                   <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
               )}
            </button>
            {isNotificationsOpen && <NotificationsModal notifications={notificationsData} />}
        </div>

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