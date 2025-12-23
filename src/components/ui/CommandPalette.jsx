import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, ArrowRight, Database, Settings, Code, FileText, User, X, LayoutDashboard, Plus } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { cn } from '../../utils/cn';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Listen Ctrl+K
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Simpan Aksi Cepat
  const actions = [
    { name: 'Go to Dashboard', icon: LayoutDashboard, path: '/dashboard', shortcut: 'D' },
    { name: 'View Collections', icon: Database, path: '/dashboard/collections', shortcut: 'C' },
    { name: 'Developer Settings', icon: Code, path: '/dashboard/developer', shortcut: 'G' },
    { name: 'Profile & Security', icon: User, path: '/dashboard/profile', shortcut: 'P' },
    { name: 'Read Documentation', icon: FileText, path: '/docs', shortcut: '?' },
    // Aksi yang memicu Toast
    { name: 'Show Welcome Toast', icon: Plus, action: () => showToast('Welcome back to WanzDB Console!', 'info') },
  ];

  if (!isOpen) return null;

  const filtered = actions.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]" onClick={() => setIsOpen(false)}>
      <div className="w-full max-w-lg bg-[#09090b] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center px-4 border-b border-white/10">
          <Search className="text-gray-500 w-5 h-5" />
          <input 
            className="w-full bg-transparent border-none p-4 text-white placeholder-gray-500 focus:ring-0 outline-none"
            placeholder="Type a command or search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-gray-400">
            <span className="text-xs">ESC</span>
          </kbd>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filtered.length === 0 && <div className="p-4 text-center text-sm text-gray-500">No results found.</div>}
          {filtered.map((action, i) => (
            <button
              key={i}
              onClick={() => { 
                if (action.path) navigate(action.path); 
                if (action.action) action.action();
                setIsOpen(false); 
              }}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 group transition-colors text-left"
            >
              <div className="flex items-center gap-3 text-gray-300 group-hover:text-white">
                <action.icon size={18} />
                <span className="text-sm font-medium">{action.name}</span>
              </div>
              {action.shortcut && (
                 <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-white/10 bg-white/5 px-2 font-mono text-xs font-medium text-gray-400">
                    {action.shortcut}
                 </kbd>
              )}
            </button>
          ))}
        </div>
        
        {/* Keyboard Shortcuts Display */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] text-xs space-y-2">
            <h4 className="font-bold text-gray-400">Global Shortcuts</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-500">
                {[['Ctrl+K', 'Command Palette'], ['Ctrl+S', 'Save/Insert'], ['Esc', 'Close Modal']].map(([key, desc]) => (
                    <div key={key} className="flex justify-between">
                        <span className="font-medium">{desc}</span>
                        <kbd className="font-mono text-white bg-black/20 px-1 rounded">{key}</kbd>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}