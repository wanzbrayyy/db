import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar'; // Pastikan path Navbar benar
import { Database } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-sky-500/30 flex flex-col">
      {/* Navbar Statis (Hanya muncul jika bukan di halaman login/register jika diinginkan, tapi default muncul) */}
      <Navbar />

      {/* Konten Halaman */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer Branding Baru */}
      <footer className="bg-[#09090b] border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-sky-500" />
            <span className="font-bold font-mono text-sm">wanzdb</span>
          </div>
          <p className="text-gray-500 text-xs text-center md:text-right">
            &copy; 2025 WANZOFC DATABASE
          </p>
        </div>
      </footer>
    </div>
  );
}