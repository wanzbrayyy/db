import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import { Loader2 } from 'lucide-react';

export default function AppLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect jika tidak ada user
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-indigo-500">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // Jika user ada, tampilkan Layout Dashboard
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar Tetap di Kiri */}
      <Sidebar />

      {/* Area Konten Utama (sebelah kanan sidebar) */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto animate-fadeIn">
           {/* Outlet adalah placeholder untuk halaman dashboard (Overview, Profile, dll) */}
           <Outlet />
        </div>
      </main>
    </div>
  );
}