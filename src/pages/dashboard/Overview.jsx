import { useEffect, useState } from 'react';
import { Database, FileText, Activity, Users } from 'lucide-react';
import { DB } from '../../api/db';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/dashboard/StatCard';

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 0, docs: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      // Hitung data real dari LocalStorage
      const users = await DB.find('users');
      const docs = await DB.find('my_collection'); // Contoh collection default
      setStats({ users: users.length, docs: docs.length });
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400 mt-2">Selamat datang kembali, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Collections" 
          value="3" 
          icon={Database} 
          trend="12"
        />
        <StatCard 
          title="Total Documents" 
          value={stats.docs} 
          icon={FileText} 
          trend="5"
        />
        <StatCard 
          title="Active Users" 
          value={stats.users} 
          icon={Users} 
        />
        <StatCard 
          title="System Status" 
          value="Healthy" 
          icon={Activity} 
          className="text-green-400"
        />
      </div>

      {/* Quick Action Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">Mulai Buat Schema Baru?</h3>
          <p className="text-indigo-200 mt-1">Buat koleksi data baru dengan ID otomatis 50 digit.</p>
        </div>
        <a href="/dashboard/collections" className="bg-white text-indigo-900 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition">
          Go to Collections
        </a>
      </div>
    </div>
  );
}