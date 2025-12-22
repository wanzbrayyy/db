import { Link, useNavigate } from 'react-router-dom';
import { Database, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import { generateNanoId } from '../../utils/uuid';

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fungsi membuat URL Login terlihat canggih
  const handleSmartLogin = () => {
    // Generate session ID palsu agar URL terlihat keren
    const sessionToken = `session-${generateNanoId(10)}`;
    navigate(`/login/${sessionToken}`);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo wanzdb */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-mono tracking-tighter text-white">
              wanzdb
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition">Fitur</a>
            <a href="#docs" className="text-sm font-medium text-slate-400 hover:text-white transition">Dokumentasi</a>
            
            <button onClick={handleSmartLogin} className="text-sm font-medium text-slate-400 hover:text-white transition">
              Log in
            </button>
            
            <Link to="/register">
              <Button size="sm" className="rounded-full px-6 bg-white text-slate-950 hover:bg-slate-200">
                Get Started <Zap size={14} className="fill-current" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-400 hover:text-white">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-4">
          <button onClick={handleSmartLogin} className="block w-full text-left text-slate-300 py-2">Log in</button>
          <Link to="/register" className="block w-full">
            <Button className="w-full">Get Started</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}