import { useEffect, useState } from 'react';
import { Database, FileJson, Activity, Server, Zap, Globe, Cpu } from 'lucide-react';
import { DB } from '../../api/db';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent, CardTitle, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ConnectModal from '../../components/dashboard/ConnectModal'; 

export default function Overview() {
  const { user } = useAuth();
  
  // State Management
  const [stats, setStats] = useState({ 
    collections: 0, 
    docs: 0, 
    storage: '0 KB',
    status: 'Checking...'
  });
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // 1. Ambil daftar collection (Sekarang aman, return [] jika error)
        const cols = await DB.getCollections();
        
        // 2. Hitung total dokumen (Parallel Fetching agar cepat)
        let totalDocs = 0;
        
        if (cols && cols.length > 0) {
          // Promise.allSettled lebih aman daripada Promise.all 
          // (satu error tidak membatalkan semua)
          const results = await Promise.allSettled(
            cols.map(c => DB.find(c.name))
          );
          
          results.forEach(result => {
            if (result.status === 'fulfilled' && Array.isArray(result.value)) {
              totalDocs += result.value.length;
            }
          });
        }

        // 3. Simulasi Storage 
        const storageSizeVal = (totalDocs * 0.8);
        const storageDisplay = storageSizeVal > 1024 
          ? `${(storageSizeVal / 1024).toFixed(2)} MB`
          : `${storageSizeVal.toFixed(2)} KB`;

        setStats({ 
          collections: cols.length, 
          docs: totalDocs,
          storage: storageDisplay,
          status: 'Healthy'
        });
      } catch (e) {
        console.error("Failed to load dashboard stats", e);
        setStats(prev => ({ ...prev, status: 'Degraded' }));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight font-mono">
            Dashboard
          </h1>
          <p className="text-textMuted mt-1 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${stats.status === 'Healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
            System Status: <span className={stats.status === 'Healthy' ? "text-emerald-400" : "text-red-400"}>{stats.status}</span>
          </p>
        </div>
        
        <div className="flex gap-3">
           {/* Tombol Connect dengan Efek Glow */}
           <Button 
             onClick={() => setIsConnectModalOpen(true)} 
             variant="primary" 
             className="shadow-[0_0_20px_rgba(14,165,233,0.3)] border-sky-500/50 hover:bg-sky-50"
           >
             <Zap size={16} className="fill-current text-sky-600" /> 
             <span className="text-sky-900 font-bold">Connect Cluster</span>
           </Button>
        </div>
      </div>

      {/* --- METRICS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "Collections", 
            value: loading ? "..." : stats.collections, 
            icon: Database, 
            color: "text-sky-400",
            sub: "Active namespaces"
          },
          { 
            title: "Total Documents", 
            value: loading ? "..." : stats.docs, 
            icon: FileJson, 
            color: "text-emerald-400",
            sub: "Across all nodes"
          },
          { 
            title: "Storage Size", 
            value: loading ? "..." : stats.storage, 
            icon: Server, 
            color: "text-yellow-400",
            sub: "Estimated usage"
          },
          { 
            title: "Network Latency", 
            value: "24ms", 
            icon: Activity, 
            color: "text-pink-400",
            sub: "Region: AWS-SGP"
          }, 
        ].map((stat, idx) => (
          <Card key={idx} className="border-white/5 bg-surface/40 hover:bg-surface/60 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-textMuted group-hover:text-white transition-colors">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
              <p className="text-xs text-textMuted mt-1">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- INFRASTRUCTURE & TOPOLOGY --- */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Topology Card */}
        <Card className="md:col-span-2 bg-gradient-to-br from-surface to-[#0a0a0a] border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe size={18} className="text-sky-400" /> Cluster Topology
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col gap-4">
                {/* Primary Node */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-emerald-500/20 relative overflow-hidden">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                         <Cpu className="text-emerald-400" size={20} />
                      </div>
                      <div>
                         <h4 className="text-white font-bold text-sm">Primary-01 (Writer)</h4>
                         <p className="text-xs text-textMuted font-mono">dbw-nu.vercel.app</p>
                      </div>
                   </div>
                   <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                     ONLINE
                   </span>
                </div>

                {/* Replica Node (Visual Only) */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 opacity-70">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                         <Database className="text-textMuted" size={20} />
                      </div>
                      <div>
                         <h4 className="text-textMuted font-bold text-sm">Replica-Set-01 (Reader)</h4>
                         <p className="text-xs text-textMuted font-mono">10.0.42.15</p>
                      </div>
                   </div>
                   <span className="px-2 py-1 rounded bg-white/5 text-textMuted text-xs font-bold border border-white/10">
                     STANDBY
                   </span>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Connection Info Card */}
        <Card className="bg-surface/30 border-white/5 flex flex-col justify-center items-center text-center p-6 relative overflow-hidden">
           <div className="absolute inset-0 bg-sky-500/5 blur-3xl rounded-full transform -translate-y-1/2"></div>
           
           <div className="w-full bg-[#050505] rounded-lg p-4 font-mono text-xs text-left text-gray-400 border border-white/5 mb-6 relative z-10 shadow-xl">
              <div className="flex gap-1.5 mb-3 border-b border-white/5 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-emerald-400">➜</span> <span className="text-sky-400">~</span> ping dbw-nu.vercel.app<br/>
              PING dbw-nu.vercel.app (76.76.21.21): 56 data bytes<br/>
              64 bytes from 76.76.21.21: seq=0 ttl=58 time=24.3 ms<br/>
              64 bytes from 76.76.21.21: seq=1 ttl=58 time=23.1 ms
           </div>
           
           <h3 className="text-lg font-bold text-white relative z-10">Production Ready</h3>
           <p className="text-textMuted text-xs max-w-xs mt-1 mb-4 relative z-10">
             Your cluster is optimized for high-performance reads and writes.
           </p>
           
           <Button variant="secondary" size="sm" onClick={() => setIsConnectModalOpen(true)} className="relative z-10 w-full">
             View Connection String
           </Button>
        </Card>
      </div>

      {/* --- RENDER MODAL --- */}
      <ConnectModal 
        isOpen={isConnectModalOpen} 
        onClose={() => setIsConnectModalOpen(false)} 
        user={user}
      />
    </div>
  );
}