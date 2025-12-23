import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDatabase } from '../../hooks/useDatabase';
import { Trash2, Plus, Download, Upload, Filter, Copy, ChevronLeft, Search, Database, Layers } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const API_URL = 'https://dbw-nu.vercel.app/api/data';

// --- KOMPONEN INDEX MODAL BARU ---
function IndexModal({ isOpen, onClose, collectionName }) {
  if (!isOpen) return null;
  const indices = [
    { field: '_id', type: 'ASC', usage: 'High' },
    { field: '_uid', type: 'ASC', usage: 'High' },
    { field: 'email', type: 'Unique', usage: 'Low' },
  ];
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <Card className="w-full max-w-lg bg-[#09090b] border-white/10 relative">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Indexes for {collectionName}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20}/></button>
        </div>
        <div className="p-4 space-y-4">
          <Button variant="primary" size="sm" className="w-full">Create New Index</Button>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs text-white uppercase bg-white/5">
                <tr><th className="px-3 py-2">Field</th><th>Type</th><th>Usage</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {indices.map(i => (
                  <tr key={i.field} className="border-b border-white/5">
                    <td className="px-3 py-2 font-mono">{i.field}</td>
                    <td>{i.type}</td>
                    <td><span className={`px-2 py-0.5 rounded text-xs ${i.usage === 'High' ? 'bg-green-500/10 text-green-400' : 'bg-white/10 text-gray-400'}`}>{i.usage}</span></td>
                    <td><button className="text-red-400 hover:text-red-300 transition">Drop</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
// --- AKHIR KOMPONEN INDEX MODAL ---


// --- COMPONENT UTAMA ---
export default function CollectionDetail() {
  const { name } = useParams();
  const { data, loading, create, remove, fetchAll } = useDatabase(name);
  const [filter, setFilter] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isIndexModalOpen, setIsIndexModalOpen] = useState(false); // State Modal Index
  const fileInputRef = useRef(null);

  const safeData = Array.isArray(data) ? data : [];
  const filteredData = safeData.filter(doc => 
    JSON.stringify(doc).toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    fetchAll();
  }, [name]); 

  // SCHEMA AUTO DETECT
  const detectSchema = useCallback(() => {
    if (safeData.length === 0) return [];
    const fields = new Set();
    safeData.forEach(doc => Object.keys(doc).forEach(key => fields.add(key)));
    return Array.from(fields).slice(0, 5); // Tampilkan 5 field teratas
  }, [safeData]);
  const detectedSchema = detectSchema();

  // Handle Export
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(safeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}_export.json`;
    a.click();
  };

  // Handle Import
  const handleImport = async (e) => {
    // ... (kode import sama seperti sebelumnya) ...
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        await fetch(`${API_URL}/${name}/import`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('token') },
            body: JSON.stringify(json)
        });
        fetchAll();
        alert('Import Successful!');
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };
  
  // Fitur: DUPLICATE DOCUMENT
  const handleDuplicate = async (doc) => {
    const { _id, createdAt, updatedAt, _uid, ...rest } = doc;
    if(confirm("Duplicate this document?")) {
        await create({ ...rest, source: _id }); // Tambah field source
        alert("Document Cloned!");
        fetchAll();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <IndexModal isOpen={isIndexModalOpen} onClose={() => setIsIndexModalOpen(false)} collectionName={name} />

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
           <Link to="/dashboard/collections" className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white">
             <ChevronLeft size={20} />
           </Link>
           <div>
             <h1 className="text-2xl font-bold text-white flex items-center gap-2">{name}</h1>
             <p className="text-xs text-gray-500 font-mono">{safeData.length} Documents</p>
           </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
           {/* SEARCH/FILTER INPUTS */}
           <div className="relative grow md:grow-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                placeholder='Search by keyword or UUID...' 
                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white w-full md:w-64 focus:outline-none focus:border-sky-500"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
           </div>
           
           {/* Action Buttons */}
           <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setIsIndexModalOpen(true)}>
                <Layers size={14} /> <span className="hidden sm:inline">Indexes</span>
              </Button>
              <Button size="sm" variant="secondary" onClick={() => fileInputRef.current.click()}>
                 <Upload size={14} /> Import
              </Button>
              <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleImport} />
              <Button size="sm" variant="secondary" onClick={handleExport}>
                 <Download size={14} /> Export
              </Button>
              <Button size="sm" onClick={() => create({ new_entry: true })}>
                 <Plus size={14} /> Insert
              </Button>
           </div>
        </div>
      </div>

      {/* SCHEMA & FILTER PRESETS */}
      <div className="bg-surface/30 border border-white/10 rounded-xl p-4 mb-4 space-y-2">
         <div className="flex flex-wrap gap-2 items-center text-xs text-gray-400">
            <span className="font-bold text-white mr-1">Schema Detected:</span>
            {detectedSchema.map(field => (
                <span key={field} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono">
                    {field}
                </span>
            ))}
         </div>
         <div className="flex flex-wrap gap-2 items-center text-xs text-gray-400">
            <span className="font-bold text-white mr-1">Filter Presets:</span>
            {['status: "active"', 'role: "admin"', 'views[gt]: 100'].map((preset, i) => (
               <button 
                  key={i} 
                  onClick={() => setFilter(preset.split(':')[0])} // Contoh simple filter
                  className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition"
               >
                  {preset}
               </button>
            ))}
         </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Document List */}
        <div className={`flex-1 overflow-y-auto space-y-2 pr-2 ${selectedDoc ? 'md:w-1/2' : 'w-full'} transition-all`}>
           {loading ? (
             <div className="text-center py-10 text-gray-500 animate-pulse">Fetching Data...</div>
           ) : (
             filteredData.map(doc => (
               <div 
                 key={doc._id} 
                 onClick={() => setSelectedDoc(doc)}
                 className={`p-3 rounded border cursor-pointer transition ${selectedDoc?._id === doc._id ? 'bg-sky-900/20 border-sky-500/50' : 'bg-[#0f0f11] border-white/5 hover:border-white/20'}`}
               >
                  <div className="flex justify-between items-start">
                     <code className="text-xs text-sky-400 font-mono">ID: {doc._id?.substring(0, 18)}...</code>
                     <div className="flex gap-2">
                        <button onClick={(e) => { e.stopPropagation(); handleDuplicate(doc); }} className="text-gray-600 hover:text-green-400 p-1" title="Duplicate"><Copy size={14} /></button>
                        <button onClick={(e) => { e.stopPropagation(); remove(doc._id); }} className="text-gray-600 hover:text-red-400 p-1" title="Move to Trash"><Trash2 size={14} /></button>
                     </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400 truncate font-mono">
                     {JSON.stringify(doc).substring(0, 80)}...
                  </div>
               </div>
             ))
           )}
        </div>

        {/* JSON Pretty Viewer Panel (Responsive Overlay on Mobile) */}
        {selectedDoc && (
          <div className="fixed inset-0 z-50 md:static md:inset-auto md:w-1/2 bg-[#0d1117] md:border border-white/10 rounded-lg flex flex-col overflow-hidden">
             <div className="p-3 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400 uppercase">Document Viewer</span>
                <div className="flex gap-2">
                   <button className="p-1 hover:text-white text-gray-500" title="Copy ID" onClick={() => navigator.clipboard.writeText(selectedDoc._id)}><Copy size={14}/></button>
                   <button className="p-1 hover:text-white text-gray-500" title="Close" onClick={() => setSelectedDoc(null)}>✕</button>
                </div>
             </div>
             <div className="flex-1 overflow-auto custom-scrollbar p-2">
               <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{background: 'transparent', fontSize: '12px', margin: 0}}>
                  {JSON.stringify(selectedDoc, null, 2)}
               </SyntaxHighlighter>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}