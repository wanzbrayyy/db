import { Link } from 'react-router-dom';
import { Database, Zap } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Mongo<span className="text-indigo-500">Vite</span>
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition">
              Log in
            </Link>
            <Link to="/register">
              <Button size="sm" className="rounded-full px-6">
                Get Started <Zap size={14} className="fill-current" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}