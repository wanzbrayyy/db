import { Link, useNavigate } from 'react-router-dom';
import { Database, Zap, Menu, X, Terminal, LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import { generateNanoId } from '../../utils/uuid';
import { cn } from '../../utils/cn';

// Simulasi Font Awesome Icons
const faIcon = (IconComponent, faClass) => {
    return <IconComponent size={18} className={`fa ${faClass}`} />;
};

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSmartLogin = () => {
    const sessionToken = `session-${generateNanoId(10)}`;
    navigate(`/login/${sessionToken}`);
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      "bg-background/80 backdrop-blur-lg border-white/10 py-2" 
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Logo wanzdb */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-sky-500/10 p-1.5 rounded-lg border border-sky-500/20 group-hover:rotate-12 transition-transform">
              {faIcon(Database, 'fa-database')}
            </div>
            <span className="text-xl font-bold font-mono tracking-tighter text-white">
              wanzdb
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/docs" className="text-sm font-medium text-gray-400 hover:text-white transition">dokumentasi</Link>
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition">fitur</a>
            
            <button onClick={handleSmartLogin} className="text-sm font-medium text-gray-400 hover:text-white transition flex items-center gap-2">
              {faIcon(LogIn, 'fa-sign-in')} masuk
            </button>
            
            <Link to="/register">
              <Button size="sm" variant="primary" className="rounded-lg shadow-lg shadow-sky-500/20 px-4 flex items-center gap-2">
                {faIcon(UserPlus, 'fa-user-plus')} mulai
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-400 hover:text-white">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090b] border-b border-white/10 p-4 space-y-4">
          <Link to="/docs" className="block w-full text-left text-gray-300 py-2">dokumentasi</Link>
          <button onClick={handleSmartLogin} className="block w-full text-left text-gray-300 py-2 flex items-center gap-2">
             {faIcon(LogIn, 'fa-sign-in')} masuk konsol
          </button>
          <Link to="/register" className="block w-full">
            <Button className="w-full" variant="primary">mulai</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}