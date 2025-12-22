import { useEffect, useState } from 'react';
import { Database, FileJson, Activity, Server, Zap, Globe, Cpu } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; // Tambahan untuk Chart
import { DB } from '../../api/db';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent, CardTitle, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ConnectModal from '../../components/dashboard/ConnectModal'; 

// Dummy Data untuk Grafik (Simulasi Realtime Traffic)
const chartData = [
  { time: '00:00', req: 120 }, { time: '04:00', req: 80 }, { time: '08:00', req: 450 },
  { time: '12:00', req: 980 }, { time: '16:00', req: 850 }, { time: '20:00', req: 340 }, { time: '23:59', req: 190 },
];

export default function Overview() {
  const { user } = useAuth();
  
  // State Management
  const [stats, setStats] = useState({ 
    collections: 0, 
    docs: 0, 
    storage: '0 KB',
    storagePercent: 0, // Tambahan untuk Storage Bar
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
          
        // Hitung persentase storage (Misal kuota free tier 500MB = 512000 KB)
        const percent = Math.min((storageSizeVal / 512000) * 100, 100);

        setStats({ 
          collections: cols.length, 
          docs: totalDocs,
          storage: storageDisplay,
          storagePercent: percent,
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

      {/* --- METRICS GRID (Dengan Storage Bar) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Collections Card */}
        <Card className="border-white/5 bg-surface/40 hover:bg-surface/60 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-textMuted group-hover:text-white transition-colors">Collections</CardTitle>
              <Database className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">{loading ? "..." : stats.collections}</div>
              <p className="text-xs text-textMuted mt-1">Active namespaces</p>
            </CardContent>
        </Card>

        {/* Total Documents Card */}
        <Card className="border-white/5 bg-surface/40 hover:bg-surface/60 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-textMuted group-hover:text-white transition-colors">Total Documents</CardTitle>
              <FileJson className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">{loading ? "..." : stats.docs}</div>
              <p className="text-xs text-textMuted mt-1">Across all nodes</p>
            </CardContent>
        </Card>

        {/* Storage Size Card (Dengan Progress Bar) */}
        <Card className="border-white/5 bg-surface/40 hover:bg-surface/60 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-textMuted group-hover:text-white transition-colors">Storage Size</CardTitle>
              <Server className="h-4 w-4 text-yellow-400 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">{loading ? "..." : stats.storage}</div>
              
              {/* Storage Usage Bar Implementation */}
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.max(stats.storagePercent, 2)}%` }} // Minimal 2% biar kelihatan
                ></div>
              </div>
              <p className="text-xs text-textMuted mt-1">{stats.storagePercent < 1 ? '< 1%' : `${stats.storagePercent.toFixed(1)}%`} used</p>
            </CardContent>
        </Card>

        {/* Latency Card */}
        <Card className="border-white/5 bg-surface/40 hover:bg-surface/60 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-textMuted group-hover:text-white transition-colors">Network Latency</CardTitle>
              <Activity className="h-4 w-4 text-pink-400 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">24ms</div>
              <p className="text-xs text-textMuted mt-1">Region: AWS-SGP</p>
            </CardContent>
        </Card>

      </div>

      {/* --- CHART ACTIVITY SECTION (Baru) --- */}
      <Card className="bg-[#09090b] border-white/5 p-6 shadow-2xl">
         <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Throughput Metrics</h3>
              <p className="text-xs text-textMuted">Requests per hour (Real-time)</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-400"><div className="w-2 h-2 bg-sky-500 rounded-full"></div> Read</div>
              <div className="flex items-center gap-1 text-xs text-gray-400"><div className="w-2 h-2 bg-purple-500 rounded-full"></div> Write</div>
            </div>
         </div>
         <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                  <defs>
                     <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="time" stroke="#444" tick={{fill: '#666', fontSize: 12}} />
                  <YAxis stroke="#444" tick={{fill: '#666', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff'}} 
                    itemStyle={{color: '#0ea5e9'}}
                  />
                  <Area type="monotone" dataKey="req" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </Card>

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