import { Link, useNavigate } from 'react-router-dom';
import { Database, Zap, Menu, X, Cpu } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import { generateNanoId } from '../../utils/uuid';
import { cn } from '../../utils/cn';

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efek transparan saat di atas, solid saat discroll
  window.addEventListener('scroll', () => {
    setScrolled(window.scrollY > 20);
  });

  const handleSmartLogin = () => {
    const sessionToken = `session-${generateNanoId(10)}`;
    navigate(`/login/${sessionToken}`);
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled 
        ? "bg-background/80 backdrop-blur-xl border-white/10 py-2" 
        : "bg-transparent border-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/20 group-hover:border-primary/50 transition">
              <Cpu className="w-5 h-5 text-primary-glow" />
            </div>
            <span className="text-xl font-bold font-mono tracking-tighter text-white">
              wanzdb
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-textMuted hover:text-white transition">Fitur</a>
            <button onClick={handleSmartLogin} className="text-sm font-medium text-textMuted hover:text-white transition">
              Console
            </button>
            
            <Link to="/register">
              <Button size="sm" variant="brand" className="rounded-full">
                Get Started <Zap size={14} className="fill-current" />
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-textMuted hover:text-white">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-white/10 p-4 space-y-4 absolute w-full">
          <button onClick={handleSmartLogin} className="block w-full text-left text-textMuted hover:text-white py-2">Log in</button>
          <Link to="/register" className="block w-full">
            <Button className="w-full" variant="brand">Get Started</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}