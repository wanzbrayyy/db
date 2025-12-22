import { useState, useEffect } from 'react';
import { Key, Copy, Trash2, Plus, Terminal, RefreshCw, ToggleLeft, ToggleRight, Box } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Developer() {
  const [activeTab, setActiveTab] = useState('logs');
  const [isSandbox, setIsSandbox] = useState(false); // Sandbox Mode State
  const [logs, setLogs] = useState([]);

  // Simulasi Logs Stream Realtime
  useEffect(() => {
    if (activeTab !== 'logs') return;
    
    const interval = setInterval(() => {
        const methods = ['GET', 'POST', 'PUT', 'DELETE'];
        const paths = ['/api/users', '/api/products', '/api/auth/login', '/api/data/collections'];
        const status = [200, 201, 204, 400, 401, 500];
        
        const newLog = {
            id: Date.now(),
            method: methods[Math.floor(Math.random() * methods.length)],
            path: paths[Math.floor(Math.random() * paths.length)],
            status: status[Math.floor(Math.random() * status.length)],
            time: new Date().toLocaleTimeString(),
            latency: Math.floor(Math.random() * 200) + 'ms'
        };

        setLogs(prev => [newLog, ...prev].slice(0, 20)); // Keep last 20 logs
    }, 2000);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-textMain">Developer Settings</h1>
         
         {/* SANDBOX MODE TOGGLE */}
         <div className="flex items-center gap-3 bg-surface border border-border px-4 py-2 rounded-lg">
            <div className="flex flex-col items-end">
               <span className="text-sm font-bold text-textMain flex items-center gap-1"><Box size={14}/> Sandbox Mode</span>
               <span className="text-[10px] text-textMuted">Auto-reset in 24h</span>
            </div>
            <button onClick={() => setIsSandbox(!isSandbox)} className="text-sky-500 hover:text-sky-400 transition">
               {isSandbox ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-600"/>}
            </button>
         </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-border">
        {['Logs Stream', 'API Keys', 'Webhooks'].map(tab => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
             className={`px-4 py-2 text-sm font-medium border-b-2 transition ${activeTab === tab.toLowerCase().split(' ')[0] ? 'border-sky-500 text-sky-400' : 'border-transparent text-textMuted hover:text-textMain'}`}
           >
             {tab}
           </button>
        ))}
      </div>

      {/* LOGS STREAM UI */}
      {activeTab === 'logs' && (
        <Card className="bg-[#050505] border-border font-mono text-xs overflow-hidden h-[500px] flex flex-col">
           <div className="p-3 border-b border-white/10 text-gray-400 flex justify-between items-center bg-white/5">
              <span className="flex items-center gap-2"><Terminal size={14}/> Live Request Stream</span>
              <span className="flex items-center gap-1 text-[10px]"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live</span>
           </div>
           <div className="p-4 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
              {logs.length === 0 && <div className="text-gray-600 italic">Waiting for requests...</div>}
              {logs.map(log => (
                 <div key={log.id} className="flex gap-3 border-b border-white/5 pb-1 animate-in fade-in slide-in-from-left-2">
                    <span className="text-gray-500 w-20">{log.time}</span>
                    <span className={`w-12 font-bold ${log.method === 'GET' ? 'text-blue-400' : log.method === 'POST' ? 'text-green-400' : log.method === 'DELETE' ? 'text-red-400' : 'text-yellow-400'}`}>{log.method}</span>
                    <span className={`w-10 font-bold ${log.status >= 500 ? 'text-red-500' : log.status >= 400 ? 'text-yellow-500' : 'text-emerald-500'}`}>{log.status}</span>
                    <span className="text-gray-300 flex-1">{log.path}</span>
                    <span className="text-gray-600">{log.latency}</span>
                 </div>
              ))}
           </div>
        </Card>
      )}

      {activeTab === 'api' && (
        <div className="text-center py-10 text-textMuted">API Keys content here...</div>
      )}
    </div>
  );
}