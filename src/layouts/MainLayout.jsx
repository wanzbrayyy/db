import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Navbar Statis */}
      <Navbar />

      {/* Konten Halaman akan dirender di sini */}
      <main>
        <Outlet />
      </main>

      {/* Footer Sederhana */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MongoVite Simulation. Built with React & Vite.</p>
      </footer>
    </div>
  );
}