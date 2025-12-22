import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDatabase } from '../../hooks/useDatabase';
import { Trash2, Plus, Copy, Check, ChevronLeft, Search } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card, { CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';

export default function CollectionDetail() {
  const { name } = useParams();
  const { data, loading, create, remove, fetchAll } = useDatabase(name);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('{\n  "title": "New Item",\n  "status": "active"\n}');
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAll();
  }, [name, fetchAll]);

  const handleCreate = async () => {
    try {
      const parsed = JSON.parse(jsonInput);
      await create(parsed);
      setIsModalOpen(false);
    } catch (e) {
      alert("Invalid JSON Format: " + e.message);
    }
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Simple Filtering
  const filteredData = data.filter(doc => 
    JSON.stringify(doc).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/collections" className="p-2 hover:bg-white/5 rounded-lg text-textMuted hover:text-white transition">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-textMuted font-normal">Collection /</span> {name}
            </h1>
            <p className="text-textMuted text-xs mt-1 font-mono">{filteredData.length} Documents</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={16} />
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-sky-500 outline-none placeholder:text-textMuted"
              placeholder="Search JSON..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} variant="primary" size="sm">
            <Plus size={16} /> Insert
          </Button>
        </div>
      </div>

      {/* Data List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {loading ? (
          <div className="text-center py-20 text-textMuted animate-pulse">Fetching documents...</div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
            <p className="text-textMuted">No documents found.</p>
          </div>
        ) : (
          filteredData.map((doc) => (
            <Card key={doc._id} className="border-white/5 bg-surface/30 group hover:border-sky-500/30 hover:bg-surface/50 transition-all">
              <div className="px-4 py-2 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider">UUID</span>
                  <code className="text-xs text-sky-400 font-mono truncate max-w-[200px] select-all">
                    {doc._id}
                  </code>
                  <button onClick={() => handleCopy(doc._id)} className="text-textMuted hover:text-white transition">
                    {copiedId === doc._id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <button 
                  onClick={() => confirm('Delete this document?') && remove(doc._id)}
                  className="text-textMuted hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-emerald-300 leading-relaxed">
                  {JSON.stringify(doc, null, 2)}
                </pre>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Insert Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-2xl bg-[#0d1117] border-white/10 shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Insert Document</h3>
              <div className="text-xs text-textMuted">JSON Format</div>
            </div>
            <div className="p-0">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-80 bg-[#0d1117] p-4 font-mono text-sm text-sky-300 focus:outline-none resize-none leading-relaxed"
                spellCheck="false"
              />
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-white/10 bg-surface/50">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} variant="primary">Insert Document</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}