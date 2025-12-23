import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Key, Copy, Trash2, Plus, Zap, Code, Terminal, Sliders, X, AlertTriangle, Box, ToggleLeft, ToggleRight, Database } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// 🔥 API Endpoints (Gunakan path Vercel Anda)
const API_URL_ADMIN = 'https://dbw-nu.vercel.app/api/admin'; 
const API_URL_DEV = 'https://dbw-nu.vercel.app/api/developer'; // Untuk Logs/Keys/Stats

// Helper untuk fetch API dengan token
const fetchApi = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
            ...options.headers
        }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.msg || 'API Error');
    return data;
};


// --- UI: MODAL ADD/EDIT AI MODEL ---
function AiModelModal({ isOpen, onClose, onSave }) {
    if (!isOpen) return null;
    const [formData, setFormData] = useState({ modelName: 'nex-agi/deepseek-v3.1-nex-n1:free', version: 'v3.1', context: 131072, description: 'Model untuk coding, tool use, dan produktivitas.', apiKey: 'sk-or-v1-...' });
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // POST ke API Admin
            const data = await fetchApi(`${API_URL_ADMIN}/ai-models`, { 
                method: 'POST',
                body: JSON.stringify(formData)
            });
            onSave(data);
            onClose();
        } catch (e) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <Card className="w-full max-w-xl bg-[#09090b] border-white/10 relative">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><Sliders size={20}/> Tambah Model AI Baru</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20}/></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <Input label="Nama Model (OpenRouter Format)" name="modelName" value={formData.modelName} onChange={handleChange} placeholder="nex-agi/deepseek-v3.1-nex-n1:free" required />
                        <Input label="Deskripsi" name="description" value={formData.description} onChange={handleChange} placeholder="Model untuk coding, tool use, dan produktivitas." required />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Versi" name="version" value={formData.version} onChange={handleChange} placeholder="v3.1" />
                            <Input label="Context Window (K)" name="context" value={formData.context} onChange={handleChange} placeholder="131072" type="number" />
                        </div>
                        <Input label="API Key (OpenRouter)" name="apiKey" value={formData.apiKey} onChange={handleChange} placeholder="sk-or-v1-..." required />
                        <p className="text-xs text-yellow-400 bg-yellow-900/20 p-2 rounded flex items-center gap-2"><AlertTriangle size={14}/> API Key akan dienkripsi di database.</p>
                    </div>
                    <div className="p-4 border-t border-white/10 flex justify-end">
                        <Button type="submit" variant="primary" isLoading={loading}>Simpan Model</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
// --- AKHIR MODAL ---


export default function Developer() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(user?.role === 'admin' ? 'models' : 'api');
  const [isSandbox, setIsSandbox] = useState(false);
  const [logs, setLogs] = useState([]);
  const [models, setModels] = useState([]);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);

  // Fetch AI Models
  useEffect(() => {
    if (activeTab !== 'models' || user?.role !== 'admin') return;
    const fetchModels = async () => {
        try {
            // GET dari API Admin
            const data = await fetchApi(`${API_URL_ADMIN}/ai-models`);
            setModels(data);
        } catch (e) {
            console.error(e.message);
        }
    };
    fetchModels();
  }, [activeTab, user?.role]);
  
  // Fetch Logs (Simulasi Realtime)
  useEffect(() => {
    if (activeTab !== 'logs') return;
    
    // START LOGIC SIMULASI LOGS STREAM
    const interval = setInterval(() => {
        const methods = ['GET', 'POST', 'PUT', 'DELETE'];
        const paths = ['/api/data/users', '/api/data/products', '/api/auth/login', '/api/data/collections'];
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
    // END LOGIC SIMULASI LOGS STREAM
  }, [activeTab]);

  
  const handleModelSave = (newModel) => {
      setModels(prev => [...prev, newModel]);
  };
  
  const handleModelDelete = async (id) => {
      if(!confirm("Yakin hapus model ini?")) return;
      try {
          // DELETE ke API Admin
          await fetchApi(`${API_URL_ADMIN}/ai-models/${id}`, { method: 'DELETE' });
          setModels(prev => prev.filter(m => m._id !== id));
      } catch (e) {
          alert("Gagal menghapus: " + e.message);
      }
  };


  return (
    <div className="space-y-6">
      <AiModelModal isOpen={isModelModalOpen} onClose={() => setIsModelModalOpen(false)} onSave={handleModelSave} />

      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-textMain">Pengaturan Developer</h1>
         {/* SANDBOX MODE TOGGLE */}
         <div className="flex items-center gap-3 bg-surface border border-border px-4 py-2 rounded-lg">
            <div className="flex flex-col items-end">
               <span className="text-sm font-bold text-textMain flex items-center gap-1"><Box size={14}/> Mode Sandbox</span>
               <span className="text-[10px] text-textMuted">Auto-reset dalam 24j</span>
            </div>
            <button onClick={() => setIsSandbox(!isSandbox)} className="text-sky-500 hover:text-sky-400 transition">
               {isSandbox ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-600"/>}
            </button>
         </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-border">
        {user?.role === 'admin' && ( // Hanya tampilkan tab Model untuk Admin
            <button
                onClick={() => setActiveTab('models')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition ${activeTab === 'models' ? 'border-sky-500 text-sky-400' : 'border-transparent text-textMuted hover:text-textMain'}`}
            >
                AI Models
            </button>
        )}
        {['api', 'webhooks', 'logs'].map(tab => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-4 py-2 text-sm font-medium border-b-2 transition ${activeTab === tab ? 'border-sky-500 text-sky-400' : 'border-transparent text-textMuted hover:text-textMain'}`}
           >
             {tab.toUpperCase() === 'API' ? 'API Keys' : tab.toUpperCase() === 'LOGS' ? 'Logs Stream' : tab.toUpperCase()}
           </button>
        ))}
      </div>

      {/* --- TAB CONTENT: AI MODELS (HANYA ADMIN) --- */}
      {activeTab === 'models' && user?.role === 'admin' && (
          <div className="space-y-4">
              <div className="flex justify-between items-center">
                  <p className="text-sm text-textMuted">Kelola model-model AI pihak ketiga yang terintegrasi (OpenRouter).</p>
                  <Button size="sm" onClick={() => setIsModelModalOpen(true)}><Plus size={14}/> Tambah Model</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {models.map(model => (
                      <Card key={model._id} className="bg-surface/50 border-white/10 p-4">
                          <div className="flex justify-between items-start">
                              <h3 className="text-lg font-bold text-sky-400">{model.modelName}</h3>
                              <button onClick={() => handleModelDelete(model._id)} className="text-red-400 hover:text-red-300 transition"><Trash2 size={16}/></button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Versi: {model.version} | Context: {model.context}K</p>
                          <p className="text-sm text-gray-300 mt-3">{model.description}</p>
                          <div className="mt-4 border-t border-white/5 pt-3 flex justify-between items-center">
                              <span className="text-xs text-yellow-400 flex items-center gap-1"><Zap size={12}/> {model.isPublic ? 'Publik' : 'Private'}</span>
                              <Button size="sm" variant="secondary" className="bg-white/5 hover:bg-white/10">Lihat Docs</Button>
                          </div>
                      </Card>
                  ))}
              </div>
              {models.length === 0 && <div className="text-center py-10 text-textMuted">Belum ada model yang terdaftar.</div>}
          </div>
      )}

      {/* --- TAB CONTENT: API KEYS --- */}
      {activeTab === 'api' && (
        <div className="space-y-4">
           <div className="flex justify-between items-center">
              <p className="text-sm text-textMuted">API Keys adalah kunci rahasia Anda untuk akses programatik ke data. Generate, atur izin, dan hapus kunci di sini.</p>
              <Button size="sm"><Plus size={14}/> Generate Key</Button>
           </div>
           {/* Simulasi List Keys */}
           <Card className="p-4 bg-surface/50 border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <Database size={20} className="text-sky-400" />
                 <div>
                    <h4 className="text-white font-bold">Key: dev_instance_2025</h4>
                    <p className="text-xs text-gray-500">Izin: READ, WRITE | Dibuat: 1 bulan lalu</p>
                 </div>
              </div>
              <Button size="sm" variant="secondary"><Copy size={16}/></Button>
           </Card>
        </div>
      )}
      
      {/* --- TAB CONTENT: WEBHOOKS --- */}
      {activeTab === 'webhooks' && (
        <div className="space-y-4">
           <div className="flex justify-between items-center">
              <p className="text-sm text-textMuted">Daftarkan URL untuk menerima notifikasi real-time (e.g., pada event document.created).</p>
              <Button size="sm"><Plus size={14}/> Tambah Webhook</Button>
           </div>
           {/* Simulasi Webhook List */}
           <Card className="p-4 bg-surface/50 border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <Terminal size={20} className="text-green-400" />
                 <div>
                    <h4 className="text-white font-bold">https://api.internal.com/hook/order</h4>
                    <p className="text-xs text-gray-500">Event: document.created (users)</p>
                 </div>
              </div>
              <Button size="sm" variant="secondary">Test Ping</Button>
           </Card>
        </div>
      )}

      {/* --- TAB CONTENT: LOGS STREAM --- */}
      {activeTab === 'logs' && (
        <Card className="bg-[#050505] border-white/10 font-mono text-xs overflow-hidden h-[500px] flex flex-col">
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
    </div>
  );
}