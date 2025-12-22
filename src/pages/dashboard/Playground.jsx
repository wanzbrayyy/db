import { useState } from 'react';
import { Terminal, Play, RefreshCw, Trash } from 'lucide-react';
import { DB } from '../../api/db';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Playground() {
  const [inputCode, setInputCode] = useState("db.find('users')");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Fungsi Parser Sederhana untuk Simulasi
  const executeCommand = async () => {
    setLoading(true);
    setOutput(null);
    try {
      let result;
      const cmd = inputCode.trim();
      
      // Regex parsing untuk keamanan simulasi
      if (cmd.startsWith("db.find")) {
        const match = cmd.match(/db\.find\(['"](.+)['"]\)/);
        if (match) result = await DB.find(match[1]);
        else throw new Error("Syntax Error. Use: db.find('collection_name')");
      } 
      else if (cmd.startsWith("db.insert")) {
        const match = cmd.match(/db\.insert\(['"](.+)['"],\s*({.+})\)/);
        if (match) {
           const data = JSON.parse(match[2]);
           result = await DB.insert(match[1], data);
        } else {
           throw new Error("Syntax Error. Use: db.insert('name', { json })");
        }
      }
      else if (cmd.startsWith("db.getCollections")) {
        result = await DB.getCollections();
      }
      else {
        throw new Error("Unknown command. Try: db.find('users')");
      }

      setOutput(result);
      setHistory(prev => [`> ${cmd}`, ...prev].slice(0, 5));
    } catch (err) {
      setOutput({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Terminal className="text-sky-400" /> Playground
          </h1>
          <p className="text-textMuted text-sm">Execute commands directly to wanzdb instance.</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Editor Area */}
        <Card className="flex flex-col border-white/10 bg-[#0d1117] overflow-hidden">
          <div className="bg-white/5 p-2 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs text-textMuted font-mono ml-2">Input Console</span>
            <div className="flex gap-2">
              <button onClick={() => setInputCode("db.find('users')")} className="text-xs text-sky-400 hover:text-white px-2">Example 1</button>
              <button onClick={() => setInputCode("db.getCollections()")} className="text-xs text-sky-400 hover:text-white px-2">Example 2</button>
            </div>
          </div>
          <textarea 
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="flex-1 bg-[#0d1117] p-4 font-mono text-sm text-white resize-none focus:outline-none"
            spellCheck="false"
          />
          <div className="p-4 border-t border-white/10 bg-surface/50 flex justify-end">
            <Button onClick={executeCommand} isLoading={loading} variant="primary" className="w-full sm:w-auto">
              <Play size={16} className="fill-current" /> Run Command
            </Button>
          </div>
        </Card>

        {/* Output Area */}
        <Card className="flex flex-col border-white/10 bg-[#0d1117] overflow-hidden relative">
          <div className="bg-white/5 p-2 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs text-textMuted font-mono ml-2">JSON Output</span>
            <button onClick={() => setOutput(null)} className="text-textMuted hover:text-white p-1">
              <Trash size={14} />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4 custom-scrollbar">
            {output ? (
              <pre className={`font-mono text-xs ${output.error ? 'text-red-400' : 'text-emerald-400'}`}>
                {JSON.stringify(output, null, 2)}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-white/20">
                <Terminal size={48} className="mb-4 opacity-20" />
                <p>Ready to execute.</p>
              </div>
            )}
          </div>
          
          {/* History Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-surface/90 border-t border-white/10 p-2 max-h-32 overflow-y-auto">
            <p className="text-[10px] text-textMuted uppercase mb-1 px-2">Recent Commands</p>
            {history.map((h, i) => (
              <div key={i} className="px-2 py-0.5 text-xs font-mono text-white/50 truncate">
                {h}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}