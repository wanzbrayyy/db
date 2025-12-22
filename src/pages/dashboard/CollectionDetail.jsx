import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDatabase } from '../../hooks/useDatabase';
import { Trash2, Plus, Copy, Check, ChevronLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function CollectionDetail() {
  const { name } = useParams();
  const { data, loading, create, remove, fetchAll } = useDatabase(name);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('{\n  "title": "New Item",\n  "status": "active"\n}');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/collections" className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition">
            <ChevronLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              Collection: <span className="text-indigo-400 font-mono">{name}</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">Total {data.length} documents found.</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Insert Document
        </Button>
      </div>

      {/* List Data */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading data...</div>
      ) : data.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
          <p className="text-slate-400">Collection ini kosong.</p>
          <button onClick={() => setIsModalOpen(true)} className="text-indigo-400 hover:underline mt-2">
            Tambah data pertama
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {data.map((doc) => (
            <Card key={doc._id} className="p-0 border-slate-800 overflow-hidden hover:border-indigo-500/30 transition group">
              <div className="bg-slate-900/50 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-xs text-slate-500 font-bold uppercase">ID:</span>
                  <code className="text-xs text-indigo-300 font-mono truncate max-w-[150px] sm:max-w-md">
                    {doc._id}
                  </code>
                  <button onClick={() => handleCopy(doc._id)} className="text-slate-500 hover:text-white transition">
                    {copiedId === doc._id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <button 
                  onClick={() => confirm('Hapus data ini?') && remove(doc._id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-4 bg-slate-950 overflow-x-auto">
                <pre className="text-sm font-mono text-green-400">
                  {JSON.stringify(doc, null, 2)}
                </pre>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Simple Modal Insert */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg p-6 bg-slate-900 border-slate-700 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-white">Insert New JSON</h3>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-64 bg-slate-950 border border-slate-700 rounded-lg p-4 font-mono text-sm text-green-400 focus:border-indigo-500 focus:outline-none resize-none"
              spellCheck="false"
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate}>Insert</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}