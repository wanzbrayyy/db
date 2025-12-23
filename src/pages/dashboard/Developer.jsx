import { useState, useEffect } from 'react';
import { Key, Globe, Terminal, Copy, Trash2, Plus, Code, Download, Cpu, Check } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { DevAPI } from '../../api/developer';

export default function Developer() {
  const [activeTab, setActiveTab] = useState('keys');
  const [keys, setKeys] = useState([]);
  const [webhooks, setWebhooks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch semua data awal
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [keysData, webhooksData, logsData] = await Promise.all([
            DevAPI.getKeys().catch(() => []),
            DevAPI.getWebhooks().catch(() => []),
            DevAPI.getLogs().catch(() => [])
        ]);
        setKeys(keysData);
        setWebhooks(webhooksData);
        setLogs(logsData);
      } catch (e) {
        console.error("Failed to fetch dev data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- UI COMPONENTS ---

  const KeyManager = () => {
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState(['read', 'write']);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const newKey = await DevAPI.createKey(name, permissions);
            setKeys(prev => [...prev, newKey]);
            setName('');
        } catch(e) {
            alert(e.message);
        }
    };
    const handleDelete = async (id) => {
        if(confirm("Delete this key?")) {
            await DevAPI.deleteKey(id);
            setKeys(prev => prev.filter(k => k._id !== id));
        }
    };

    const togglePermission = (perm) => {
        setPermissions(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">API Keys ({keys.length})</h3>
            <Card className="p-4 bg-surface/50 border-white/10">
                <form onSubmit={handleCreate} className="space-y-3">
                    <Input placeholder="Key Name (e.g., Mobile App)" value={name} onChange={e => setName(e.target.value)} />
                    <div className="flex gap-2 text-xs">
                        {['read', 'write', 'delete'].map(p => (
                            <button 
                                key={p} 
                                type="button" 
                                onClick={() => togglePermission(p)}
                                className={`px-3 py-1 rounded-full border transition ${permissions.includes(p) ? 'bg-sky-500 text-white border-sky-500' : 'bg-white/5 text-gray-400 border-white/10'}`}
                            >
                                {p.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <Button type="submit" size="sm" disabled={!name}><Plus size={14} /> Generate Key</Button>
                </form>
            </Card>
            
            {keys.map(k => (
                <Card key={k._id} className="bg-surface/30 border-white/10 p-4 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-white">{k.name}</h4>
                        <code className="text-xs text-gray-500 font-mono break-all">{k.key}</code>
                        <div className="mt-2 flex gap-1">
                            {k.permissions.map(p => <span key={p} className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1 rounded">{p.toUpperCase()}</span>)}
                        </div>
                    </div>
                    <button onClick={() => handleDelete(k._id)} className="text-gray-500 hover:text-red-400"><Trash2 size={18}/></button>
                </Card>
            ))}
        </div>
    );
  };

  const WebhookManager = () => {
    const [url, setUrl] = useState('');
    const [events, setEvents] = useState(['document.created']);
    const [testResult, setTestResult] = useState('');

    const handleTest = async () => {
        try {
            const result = await DevAPI.testWebhook(url);
            setTestResult(`Ping Success (Status: ${result.status})`);
        } catch(e) {
            setTestResult(`Ping Failed: ${e.message}`);
        }
    };
    
    // NOTE: Logika Add/Delete Webhook di frontend ini masih mock karena backend-nya belum dibuatkan Model/Route khusus.
    const handleCreate = () => {
        if (!url) return;
        setWebhooks(prev => [...prev, { _id: Date.now(), url, events, last_ping: new Date().toISOString() }]);
        setUrl('');
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Webhooks ({webhooks.length})</h3>
            <Card className="p-4 bg-surface/50 border-white/10 space-y-3">
                <Input placeholder="Target URL (https://my-service.com/hook)" value={url} onChange={e => setUrl(e.target.value)} />
                <div className="flex gap-2 text-xs">
                    {['document.created', 'document.updated', 'document.deleted'].map(e => (
                        <button key={e} type="button" onClick={() => setEvents(prev => prev.includes(e) ? prev.filter(i => i !== e) : [...prev, e])}
                            className={`px-3 py-1 rounded-full border transition ${events.includes(e) ? 'bg-sky-500 text-white border-sky-500' : 'bg-white/5 text-gray-400 border-white/10'}`}
                        >
                            {e.split('.')[1]}
                        </button>
                    ))}
                </div>
                <div className="flex gap-3">
                    <Button onClick={handleTest} size="sm" variant="secondary" className="w-1/2">Test Ping</Button>
                    <Button onClick={handleCreate} size="sm" className="w-1/2" disabled={!url}><Plus size={14}/> Add Webhook</Button>
                </div>
                {testResult && <div className="text-xs text-center p-2 rounded bg-white/5 text-gray-400">{testResult}</div>}
            </Card>
            
            {webhooks.map(w => (
                <Card key={w._id} className="bg-surface/30 border-white/10 p-4 flex items-center justify-between">
                    <div>
                        <code className="text-xs text-sky-400 font-mono break-all">{w.url}</code>
                        <div className="mt-2 flex gap-1">
                            {w.events.map(e => <span key={e} className="text-[10px] bg-purple-500/10 text-purple-400 px-1 rounded">{e}</span>)}
                        </div>
                    </div>
                    <button onClick={() => setWebhooks(prev => prev.filter(i => i._id !== w._id))} className="text-gray-500 hover:text-red-400"><Trash2 size={18}/></button>
                </Card>
            ))}
        </div>
    );
  };
  
  const LogsStreamer = () => (
    <Card className="bg-black border-white/10 font-mono text-xs overflow-hidden h-[400px] flex flex-col">
        <div className="p-3 border-b border-white/10 text-gray-400 flex justify-between items-center bg-white/5">
            <span className="flex items-center gap-2"><Terminal size={14}/> Live Request Stream ({logs.length})</span>
            <span className="flex items-center gap-1 text-[10px]"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live</span>
        </div>
        <div className="p-4 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
            {logs.slice(0, 20).map((log, i) => (
                <div key={i} className="flex gap-3 border-b border-white/5 pb-1 animate-in fade-in slide-in-from-left-2">
                    <span className="text-gray-500 w-20">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    <span className={`w-12 font-bold ${log.method === 'GET' ? 'text-blue-400' : log.method === 'POST' ? 'text-green-400' : log.method === 'DELETE' ? 'text-red-400' : 'text-yellow-400'}`}>{log.method}</span>
                    <span className={`w-10 font-bold ${log.statusCode >= 500 ? 'text-red-500' : log.statusCode >= 400 ? 'text-yellow-500' : 'text-emerald-500'}`}>{log.statusCode}</span>
                    <span className="text-gray-300 flex-1 truncate">{log.path}</span>
                    <span className="text-gray-600">{log.duration}ms</span>
                </div>
            ))}
        </div>
    </Card>
  );

  const SDKPage = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">SDK Download & Setup</h3>
        <Card className="p-4 bg-surface/30 border-white/10 space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded"><Code size={20}/></div>
                    <h4 className="font-bold text-white">NPM Package</h4>
                </div>
                <Button size="sm" variant="secondary"><Download size={16}/> Download</Button>
            </div>
            
            <div className="bg-[#050505] p-3 rounded font-mono text-xs border border-white/10">
                <span className="text-green-400">$ npm install wanzdb</span>
            </div>
        </Card>
        
        <Card className="p-4 bg-surface/30 border-white/10 space-y-3">
            <h4 className="font-bold text-white">Connection Snippet</h4>
            <div className="bg-[#050505] p-3 rounded font-mono text-xs border border-white/10 overflow-x-auto">
                <pre className="text-gray-300">
                    <span className="text-sky-400">const</span> {'{ Client }'} = require('wanzdb');<br/>
                    <span className="text-sky-400">const</span> db = new Client(<span className="text-yellow-400">'wanzdb://user:key@host...'</span>);<br/>
                    <span className="text-sky-400">await</span> db.collection('users').find({'{ role: "admin" }'});
                </pre>
            </div>
        </Card>
    </div>
  );

  // --- RENDER MAIN ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-white">Developer Center</h1>
      </div>
      
      <div className="flex border-b border-white/10">
        {['keys', 'webhooks', 'logs', 'sdk'].map(tab => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-4 py-2 text-sm font-medium border-b-2 transition ${activeTab === tab ? 'border-sky-500 text-sky-400' : 'border-transparent text-gray-400 hover:text-white'}`}
           >
             {tab.toUpperCase()}
           </button>
        ))}
      </div>

      <div className="mt-4">
        {isLoading && <div className="text-center py-10 text-gray-500">Loading data...</div>}
        {!isLoading && activeTab === 'keys' && <KeyManager />}
        {!isLoading && activeTab === 'webhooks' && <WebhookManager />}
        {!isLoading && activeTab === 'logs' && <LogsStreamer />}
        {!isLoading && activeTab === 'sdk' && <SDKPage />}
      </div>
    </div>
  );
}