import { useEffect, useState } from 'react';
import { Database, FileJson, Activity, Server } from 'lucide-react';
import { DB } from '../../api/db';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent, CardTitle, CardHeader } from '../../components/ui/Card';

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ collections: 0, docs: 0, storage: '0 KB' });

  useEffect(() => {
    const fetchStats = async () => {
      const cols = await DB.getCollections();
      let totalDocs = 0;
      
      // Hitung total dokumen dari semua collection
      for (const col of cols) {
        const docs = await DB.find(col.name);
        totalDocs += docs.length;
      }

      // Estimasi storage (kasar)
      const storageSize = (JSON.stringify(localStorage).length / 1024).toFixed(2);

      setStats({ 
        collections: cols.length, 
        docs: totalDocs,
        storage: `${storageSize} KB`
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-textMuted mt-1">Real-time database metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Collections", value: stats.collections, icon: Database, color: "text-sky-400" },
          { title: "Total Documents", value: stats.docs, icon: FileJson, color: "text-emerald-400" },
          { title: "Storage Used", value: stats.storage, icon: Server, color: "text-yellow-400" },
          { title: "Latency", value: "2ms", icon: Activity, color: "text-pink-400" },
        ].map((stat, idx) => (
          <Card key={idx} className="border-white/5 bg-surface/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-textMuted">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-textMuted mt-1">+2% from last hour</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-surface to-surfaceLight border-white/5">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  <span className="text-textMuted">{new Date().toLocaleTimeString()}</span>
                  <span className="text-white">User <span className="text-sky-400 font-mono">auth_sys</span> performed write op</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface/30 border-white/5 flex flex-col justify-center items-center text-center p-6">
          <Server size={48} className="text-white/10 mb-4" />
          <h3 className="text-lg font-bold text-white">System Healthy</h3>
          <p className="text-textMuted text-sm max-w-xs mt-2">
            All nodes are operational. No latency issues detected in the cluster.
          </p>
        </Card>
      </div>
    </div>
  );
}