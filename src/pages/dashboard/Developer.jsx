import { useState } from 'react';
import { Key, Globe, Terminal, Copy, Trash2, Plus } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Developer() {
  const [activeTab, setActiveTab] = useState('keys');
  const [keys, setKeys] = useState([{ id: '1', name: 'Production', key: 'wanz_live_83js9...' }]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Developer Settings</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {['API Keys', 'Webhooks', 'Logs Stream', 'SDKs'].map(tab => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
             className={`px-4 py-2 text-sm font-medium border-b-2 transition ${activeTab === tab.toLowerCase().split(' ')[0] ? 'border-sky-500 text-sky-400' : 'border-transparent text-gray-400 hover:text-white'}`}
           >
             {tab}
           </button>
        ))}
      </div>

      {activeTab === 'keys' && (
        <div className="space-y-4">
           <div className="flex justify-between items-center">
              <p className="text-gray-400 text-sm">Manage API keys to access your data programmatically.</p>
              <Button size="sm"><Plus size={14}/> Create New Key</Button>
           </div>
           {keys.map(k => (
             <Card key={k.id} className="bg-surface/30 border-white/5">
                <div className="p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/10 rounded text-yellow-500"><Key size={18}/></div>
                      <div>
                         <h4 className="text-white font-bold text-sm">{k.name}</h4>
                         <code className="text-xs text-gray-500 font-mono">{k.key}</code>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-2 hover:bg-white/5 rounded text-gray-400"><Copy size={16}/></button>
                      <button className="p-2 hover:bg-red-500/10 rounded text-red-400"><Trash2 size={16}/></button>
                   </div>
                </div>
             </Card>
           ))}
        </div>
      )}

      {activeTab === 'logs' && (
        <Card className="bg-black border-white/10 font-mono text-xs">
           <div className="p-2 border-b border-white/10 text-gray-500">Live Request Stream</div>
           <div className="p-4 space-y-2 h-[400px] overflow-y-auto">
              <div className="text-emerald-400">[200] GET /api/data/users - 24ms</div>
              <div className="text-emerald-400">[201] POST /api/data/products - 102ms</div>
              <div className="text-red-400">[401] DELETE /api/data/system - Unauthorized</div>
              <div className="text-blue-400">[INFO] Webhook triggered: order.created</div>
           </div>
        </Card>
      )}
    </div>
  );
}