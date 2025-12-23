import { useState } from 'react';
import { X, Copy, Check, Eye, EyeOff, Terminal, ShieldCheck, Code2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function ConnectModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null; // Pastikan user ada

  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [activeTab, setActiveTab] = useState('uri'); 
  const [langTab, setLangTab] = useState('node'); 

  // Generate Credentials: Gunakan Nama dan ID Asli dari DB
  const username = user?.name?.toLowerCase().replace(/\s/g, '') || 'admin-user';
  const apiKey = user?._id || 'UUID-NOT-FOUND-50-CHARS'; // Gunakan ID 50 Digit sebagai API Key
  const host = "dbw-nu.vercel.app";
  
  // Connection String (Menampilkan API Key/UUID sebagai password)
  const connectionString = `wanzdb://${username}:<API_KEY>@${host}/?w=majority`;
  const displayString = showPassword 
    ? connectionString.replace('<API_KEY>', apiKey)
    : connectionString.replace('<API_KEY>', '••••••••••••••••••••••••••••••••••••••••••••••••••');

  // SNIPPETS GENERATOR
  const realConnectionString = connectionString.replace('<API_KEY>', apiKey);
  const snippets = {
    node: `const { Client } = require('wanzdb');\n\nconst client = new Client('${realConnectionString}');\n\nasync function run() {\n  await client.connect();\n  console.log("Connected. User ID: ${user._id}");\n}`,
    python: `from wanzdb import Client\n\nclient = Client("${realConnectionString}")\nclient.connect() # Start connection`,
    php: `$client = new WanzDB\\Client("${realConnectionString}");\n$client->connect(); // PHP PDO style`
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <Card className="w-full max-w-2xl bg-surface border-border shadow-2xl relative animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-textMain flex items-center gap-2">
              <Globe size={20} className="text-sky-400" /> Connect to Cluster
            </h2>
            <p className="text-sm text-textMuted mt-1">Use this key for programmatic access.</p>
          </div>
          <button onClick={onClose} className="text-textMuted hover:text-textMain"><X size={24} /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-6">
          <button onClick={() => setActiveTab('uri')} className={`py-3 px-4 text-sm font-medium border-b-2 transition ${activeTab === 'uri' ? 'border-sky-500 text-sky-400' : 'border-transparent text-textMuted hover:text-textMain'}`}>Connection String</button>
          <button onClick={() => setActiveTab('code')} className={`py-3 px-4 text-sm font-medium border-b-2 transition ${activeTab === 'code' ? 'border-sky-500 text-sky-400' : 'border-transparent text-textMuted hover:text-textMain'}`}>Code Snippet</button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Section 1: Connection String (URI) */}
          {activeTab === 'uri' && (
            <div className="space-y-4">
              <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-4 flex items-start gap-3">
                <ShieldCheck size={18} className="text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Warning: API Key</h4>
                  <p className="text-xs text-textMuted mt-1 leading-relaxed">
                    The password in this string is your **Unique User ID (UUID)**, which acts as your secret API Key. Do not share it publicly.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider mb-2 block">Connection String (wanzdb SRV)</label>
                <div className="relative group">
                  <div className="bg-[#050505] border border-border rounded-lg p-4 font-mono text-sm text-textMuted break-all pr-24 select-all">
                    <span className="text-sky-400">wanzdb://</span>
                    <span className="text-white">{username}</span>:
                    <span className={showPassword ? "text-yellow-400" : "text-textMuted"}>
                      {showPassword ? apiKey : "••••••••••••••••••••••••••••••••••••••••••••••••••"}
                    </span>
                    <span className="text-white">@{host}/</span>
                    <span className="text-emerald-400">?w=majority</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute right-2 top-2 flex gap-1 bg-[#050505] pl-2">
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 hover:bg-white/10 rounded text-textMuted hover:text-white transition"
                      title={showPassword ? "Hide Key" : "Show Key"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button 
                      onClick={() => handleCopy(realConnectionString, 'uri')}
                      className="p-2 hover:bg-white/10 rounded text-textMuted hover:text-white transition"
                      title="Copy Connection String"
                    >
                      {copiedField === 'uri' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Code Snippet */}
          {activeTab === 'code' && (
            <div className="space-y-4">
               {/* Language Tabs */}
               <div className="flex gap-2 mb-2">
                  {['node', 'python', 'php'].map(lang => (
                     <button 
                        key={lang}
                        onClick={() => setLangTab(lang)}
                        className={`px-3 py-1 text-xs uppercase font-bold rounded border ${langTab === lang ? 'bg-sky-500 text-white border-sky-500' : 'bg-transparent text-textMuted border-border hover:border-textMuted'}`}
                     >
                        {lang}
                     </button>
                  ))}
               </div>

               <div className="bg-[#050505] border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto relative">
                 <button onClick={() => handleCopy(snippets[langTab], 'code')} className="absolute top-2 right-2 p-2 hover:bg-white/10 rounded text-textMuted">
                    {copiedField === 'code' ? <Check size={14} className="text-emerald-400"/> : <Copy size={14}/>}
                 </button>
                 <pre><code className="text-sky-300">{snippets[langTab]}</code></pre>
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-surface/30">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="primary" onClick={() => handleCopy(realConnectionString, 'btn')}>
             {copiedField === 'btn' ? 'Copied Full String!' : 'Copy Full String'}
          </Button>
        </div>
      </Card>
    </div>
  );
}