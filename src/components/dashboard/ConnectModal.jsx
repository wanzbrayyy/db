import { useState } from 'react';
import { X, Copy, Check, Eye, EyeOff, Terminal, ShieldCheck, Globe } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function ConnectModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [activeTab, setActiveTab] = useState('uri'); // 'uri' or 'code'

  // Generate Credentials Palsu tapi terlihat Real
  const username = user?.name.toLowerCase().replace(/\s/g, '') || 'admin';
  const dbPassword = user?._id?.substring(0, 16) || 'a1b2c3d4e5f6g7h8'; // Ambil sebagian ID sbg password
  const host = "dbw-nu.vercel.app";
  
  // Connection String Format
  const connectionString = `wanzdb://${username}:<password>@${host}/?retryWrites=true&w=majority`;
  const displayString = showPassword 
    ? connectionString.replace('<password>', dbPassword)
    : connectionString.replace('<password>', '••••••••');

  // Code Snippet Node.js
  const codeSnippet = `const wanzdb = require('wanzdb');

const client = new wanzdb.Client('${displayString.replace('••••••••', dbPassword)}');

async function run() {
  try {
    await client.connect();
    console.log("Connected to WanzDB Cluster!");
    const doc = await client.db("main").collection("users").findOne();
    console.log(doc);
  } finally {
    await client.close();
  }
}
run();`;

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <Card className="w-full max-w-2xl bg-[#09090b] border-white/10 shadow-2xl relative animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe size={20} className="text-sky-400" /> Connect to Cluster
            </h2>
            <p className="text-sm text-textMuted mt-1">Setup connection for application <b>Production</b>.</p>
          </div>
          <button onClick={onClose} className="text-textMuted hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 px-6">
          <button 
            onClick={() => setActiveTab('uri')}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'uri' ? 'border-sky-500 text-sky-400' : 'border-transparent text-textMuted hover:text-white'}`}
          >
            Drivers (Node.js, Go, etc)
          </button>
          <button 
            onClick={() => setActiveTab('code')}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'code' ? 'border-sky-500 text-sky-400' : 'border-transparent text-textMuted hover:text-white'}`}
          >
            Full Code Snippet
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Section 1: Connection String */}
          {activeTab === 'uri' && (
            <div className="space-y-4">
              <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-4 flex items-start gap-3">
                <ShieldCheck className="text-sky-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="text-sm font-bold text-white">Security Notice</h4>
                  <p className="text-xs text-textMuted mt-1 leading-relaxed">
                    This connection string includes your credentials. Do not share it publicly. 
                    Ensure your IP address is whitelisted in Network Access.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider mb-2 block">
                  Connection String (Standard SRV)
                </label>
                <div className="relative group">
                  <div className="bg-[#050505] border border-white/10 rounded-lg p-4 font-mono text-sm text-textMuted break-all pr-24">
                    <span className="text-sky-400">wanzdb://</span>
                    <span className="text-white">{username}</span>:
                    <span className={showPassword ? "text-yellow-400" : "text-textMuted"}>
                      {showPassword ? dbPassword : "••••••••"}
                    </span>
                    <span className="text-white">@{host}/</span>
                    <span className="text-emerald-400">?retryWrites=true&w=majority</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute right-2 top-2 flex gap-1 bg-[#050505] pl-2">
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 hover:bg-white/10 rounded text-textMuted hover:text-white transition"
                      title={showPassword ? "Hide Password" : "Show Password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button 
                      onClick={() => handleCopy(connectionString.replace('<password>', dbPassword), 'uri')}
                      className="p-2 hover:bg-white/10 rounded text-textMuted hover:text-white transition"
                      title="Copy Connection String"
                    >
                      {copiedField === 'uri' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs text-textMuted">Username</label>
                   <div className="mt-1 p-2 bg-surface border border-white/5 rounded text-sm text-white font-mono">{username}</div>
                </div>
                <div>
                   <label className="text-xs text-textMuted">Database Name</label>
                   <div className="mt-1 p-2 bg-surface border border-white/5 rounded text-sm text-white font-mono">wanzdb_production</div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Code Snippet */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-textMuted uppercase tracking-wider">
                  index.js
                </label>
                <button 
                  onClick={() => handleCopy(codeSnippet, 'code')}
                  className="flex items-center gap-2 text-xs font-medium text-sky-400 hover:text-sky-300 transition"
                >
                  {copiedField === 'code' ? <Check size={14} /> : <Copy size={14} />}
                  {copiedField === 'code' ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              
              <div className="bg-[#050505] border border-white/10 rounded-lg p-4 font-mono text-sm overflow-x-auto relative custom-scrollbar">
                 <pre>
                  <code className="language-javascript text-gray-300">
                    {codeSnippet.split('\n').map((line, i) => (
                      <div key={i} className="table-row">
                        <span className="table-cell text-right pr-4 text-white/10 select-none">{i + 1}</span>
                        <span className="table-cell">{line}</span>
                      </div>
                    ))}
                  </code>
                 </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-surface/30">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="primary" onClick={() => handleCopy(connectionString.replace('<password>', dbPassword), 'btn')}>
             {copiedField === 'btn' ? 'Copied to Clipboard' : 'Copy Connection String'}
          </Button>
        </div>
      </Card>
    </div>
  );
}