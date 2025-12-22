import { useState } from 'react';
import { X, Copy, Check, Eye, EyeOff, Terminal, ShieldCheck, Globe, Code2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function ConnectModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [activeTab, setActiveTab] = useState('uri'); 
  const [langTab, setLangTab] = useState('node'); // node | python | php

  const username = user?.name?.toLowerCase().replace(/\s/g, '') || 'admin';
  const dbPassword = user?._id?.substring(0, 16) || 'xxx';
  const host = "dbw-nu.vercel.app";
  
  const connectionString = `wanzdb://${username}:<password>@${host}/?w=majority`;
  const displayString = showPassword 
    ? connectionString.replace('<password>', dbPassword)
    : connectionString.replace('<password>', '••••••••');

  // SNIPPETS GENERATOR
  const snippets = {
    node: `const { DB } = require('wanzdb');\n\nconst client = new DB('${displayString.replace('••••••••', dbPassword)}');\nawait client.connect();`,
    python: `from wanzdb import Client\n\nclient = Client("${displayString.replace('••••••••', dbPassword)}")\nclient.connect()`,
    php: `$client = new WanzDB\\Client("${displayString.replace('••••••••', dbPassword)}");\n$client->connect();`
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
            <p className="text-sm text-textMuted mt-1">Setup connection for <b>Production</b>.</p>
          </div>
          <button onClick={onClose} className="text-textMuted hover:text-textMain"><X size={24} /></button>
        </div>

        <div className="flex border-b border-border px-6">
          <button onClick={() => setActiveTab('uri')} className={`py-3 px-4 text-sm font-medium border-b-2 transition ${activeTab === 'uri' ? 'border-sky-500 text-sky-400' : 'border-transparent text-textMuted'}`}>Connection String</button>
          <button onClick={() => setActiveTab('code')} className={`py-3 px-4 text-sm font-medium border-b-2 transition ${activeTab === 'code' ? 'border-sky-500 text-sky-400' : 'border-transparent text-textMuted'}`}>Code Snippet</button>
        </div>

        <div className="p-6 space-y-6">
          {activeTab === 'uri' && (
            <div className="space-y-4">
              <div className="relative group">
                <div className="bg-[#050505] border border-border rounded-lg p-4 font-mono text-sm text-textMuted break-all pr-24">
                   {displayString}
                </div>
                <div className="absolute right-2 top-2 flex gap-1 bg-[#050505] pl-2">
                    <button onClick={() => setShowPassword(!showPassword)} className="p-2 hover:bg-white/10 rounded text-textMuted">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                    <button onClick={() => handleCopy(connectionString.replace('<password>', dbPassword), 'uri')} className="p-2 hover:bg-white/10 rounded text-textMuted">{copiedField === 'uri' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}</button>
                </div>
              </div>
            </div>
          )}

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
      </Card>
    </div>
  );
}