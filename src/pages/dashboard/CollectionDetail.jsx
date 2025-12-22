import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDatabase } from '../../hooks/useDatabase';
import { Trash2, Plus, Download, Upload, Filter, Copy, ChevronLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const API_URL = 'https://dbw-nu.vercel.app/api/data';

export default function CollectionDetail() {
  const { name } = useParams();
  const { data, loading, create, remove, fetchAll } = useDatabase(name);
  const [filter, setFilter] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const fileInputRef = useRef(null);

  // FIX: Safety check (data || []) agar tidak crash "filter of undefined"
  const safeData = Array.isArray(data) ? data : [];
  
  const filteredData = safeData.filter(doc => 
    JSON.stringify(doc).toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    fetchAll();
  }, [name]); // Refresh saat nama collection berubah

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(safeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}_export.json`;
    a.click();
  };

  const handleImport = async (e) => {
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

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
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
           <div className="relative grow md:grow-0">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                placeholder='Filter...' 
                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white w-full md:w-64 focus:outline-none focus:border-sky-500"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
           </div>
           
           <div className="flex gap-2">
             <Button size="sm" variant="secondary" onClick={() => fileInputRef.current.click()}>
                <Upload size={14} /> <span className="hidden sm:inline">Import</span>
             </Button>
             <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleImport} />
             
             <Button size="sm" variant="secondary" onClick={handleExport}>
                <Download size={14} /> <span className="hidden sm:inline">Export</span>
             </Button>
             <Button size="sm" onClick={() => create({ new_entry: true })}>
                <Plus size={14} /> Insert
             </Button>
           </div>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Document List */}
        <div className={`flex-1 overflow-y-auto space-y-2 pr-2 ${selectedDoc ? 'hidden md:block' : ''}`}>
           {loading ? (
             <div className="text-center py-10 text-gray-500 animate-pulse">Fetching Data...</div>
           ) : filteredData.length === 0 ? (
             <div className="text-center py-10 text-gray-500 border border-dashed border-white/10 rounded">No data found</div>
           ) : (
             filteredData.map(doc => (
               <div 
                 key={doc._id} 
                 onClick={() => setSelectedDoc(doc)}
                 className={`p-3 rounded border cursor-pointer transition ${selectedDoc?._id === doc._id ? 'bg-sky-900/20 border-sky-500/50' : 'bg-[#0f0f11] border-white/5 hover:border-white/20'}`}
               >
                  <div className="flex justify-between items-start">
                     <code className="text-xs text-sky-400 font-mono">ID: {doc._id?.substring(0, 18)}...</code>
                     <button onClick={(e) => { e.stopPropagation(); remove(doc._id); }} className="text-gray-600 hover:text-red-400 p-1">
                        <Trash2 size={14} />
                     </button>
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