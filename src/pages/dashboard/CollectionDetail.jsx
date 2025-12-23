import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDatabase } from '../../hooks/useDatabase';
import { Trash2, Plus, Download, Upload, Filter, Copy, ChevronLeft, Search, Database, Layers, Code, Check, X, Pencil } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SchemaAPI } from '../../api/schema';
import { useToast } from '../../hooks/useToast'; // Import Toast

const API_URL = 'https://dbw-nu.vercel.app/api/data';

// --- HELPER UNTUK TIPE DATA ICON ---
const DataTypeIcon = ({ type }) => {
    switch (type) {
        case 'string': return <span className="font-bold text-sky-400 mr-1">T</span>;
        case 'number': return <span className="font-bold text-yellow-400 mr-1">#</span>;
        case 'boolean': return <span className="font-bold text-red-400 mr-1">B</span>;
        default: return <span className="font-bold text-gray-500 mr-1">?</span>;
    }
};

// ... SchemaModal component (diasumsikan sudah di-copy dari jawaban sebelumnya) ...
function SchemaModal({ isOpen, onClose, collectionName, initialSchemaFields }) {
  if (!isOpen) return null;
  const [schemaFields, setSchemaFields] = useState(initialSchemaFields);
  const [loading, setLoading] = useState(false);

  const addField = () => setSchemaFields(prev => [...prev, { name: '', type: 'string', required: false }]);
  const updateField = (index, key, value) => {
    setSchemaFields(prev => prev.map((f, i) => i === index ? { ...f, [key]: value } : f));
  };
  const removeField = (index) => setSchemaFields(prev => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    const cleanSchema = schemaFields.filter(f => f.name.trim() !== '');
    setLoading(true);
    try {
        await SchemaAPI.saveSchema(collectionName, cleanSchema);
        alert("Schema Validation Saved Successfully!");
        onClose();
    } catch (e) {
        alert("Error saving schema: " + e.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <Card className="w-full max-w-3xl bg-[#09090b] border-white/10 relative">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Schema Validation for <span className="text-sky-400 font-mono">{collectionName}</span></h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          <p className="text-sm text-gray-500">Define field types and requirements for data integrity.</p>

          <div className="grid grid-cols-4 gap-4 text-xs font-bold text-gray-400 uppercase border-b border-white/10 pb-2">
            <div>Field Name</div>
            <div>Type</div>
            <div>Required</div>
            <div>Actions</div>
          </div>
          
          {schemaFields.map((field, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 items-center">
              <Input 
                placeholder="Field Name"
                value={field.name}
                onChange={e => updateField(index, 'name', e.target.value)}
                className="py-1.5 text-sm"
              />
              <select 
                value={field.type}
                onChange={e => updateField(index, 'type', e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-0"
              >
                {['string', 'number', 'boolean', 'date', 'object', 'array'].map(type => (
                   <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => updateField(index, 'required', !field.required)}
                className={`px-3 py-1.5 rounded-lg border text-sm transition ${field.required ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-gray-400 border-white/10'}`}
              >
                {field.required ? <Check size={16}/> : <X size={16}/>}
              </button>
              <Button type="button" onClick={() => removeField(index)} variant="danger" size="sm"><Trash2 size={14}/></Button>
            </div>
          ))}

          <Button type="button" onClick={addField} variant="secondary" size="sm" className="mt-4"><Plus size={14}/> Add Field</Button>
        </div>
        <div className="p-4 border-t border-white/10 flex justify-end">
          <Button onClick={handleSave} variant="primary" isLoading={loading}>Save Schema</Button>
        </div>
      </Card>
    </div>
  );
}
// --- AKHIR KOMPONEN SCHEMA BUILDER MODAL ---


export default function CollectionDetail() {
  const { name } = useParams();
  const { data, loading, create, remove, fetchAll, update } = useDatabase(name); // Tambah update
  const { showToast } = useToast(); // Hook Toast
  
  const [filter, setFilter] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [editingDocId, setEditingDocId] = useState(null); // State Quick Edit
  const [editingField, setEditingField] = useState(null); // State Field yang sedang diedit
  const [editingValue, setEditingValue] = useState(''); // State Value Quick Edit
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false); 
  const [currentSchema, setCurrentSchema] = useState([]);
  const fileInputRef = useRef(null);

  const safeData = Array.isArray(data) ? data : [];
  const filteredData = safeData.filter(doc => 
    JSON.stringify(doc).toLowerCase().includes(filter.toLowerCase()) || doc._id?.includes(filter)
  );

  // FETCH SCHEMA & DATA
  useEffect(() => {
    const loadData = async () => {
        fetchAll();
        try {
            const schemaData = await SchemaAPI.getSchema(name);
            setCurrentSchema(schemaData.fields || []);
        } catch (e) {
            setCurrentSchema([]);
        }
    };
    loadData();
  }, [name]); 

  // SCHEMA AUTO DETECTION
  const detectSchema = useCallback(() => {
    if (safeData.length === 0) return [];
    const fields = new Set();
    safeData.forEach(doc => Object.keys(doc).forEach(key => fields.add(key)));
    return Array.from(fields).filter(f => !f.startsWith('_')).slice(0, 5); 
  }, [safeData]);
  const detectedSchema = detectSchema();
  const schemaFieldsForModal = [...currentSchema, ...detectedSchema.filter(f => !currentSchema.find(s => s.name === f)).map(f => ({ name: f, type: 'string', required: false }))];


  // --- LOGIC QUICK EDIT ---
  const startQuickEdit = (docId, field, value) => {
    setEditingDocId(docId);
    setEditingField(field);
    setEditingValue(value);
  };
  
  const handleQuickEditSave = async (docId, field) => {
    try {
        const payload = { [field]: editingValue };
        await update(docId, payload);
        showToast(`Field ${field} updated!`, 'success');
        fetchAll(); // Refresh data
    } catch(e) {
        showToast(`Error updating field: ${e.message}`, 'error');
    } finally {
        setEditingDocId(null);
        setEditingField(null);
    }
  };
  
  // --- END LOGIC QUICK EDIT ---


  // Handle Export (Sama seperti sebelumnya)
  const handleExport = () => {
    // ...
  };

  // Handle Import (Sama seperti sebelumnya)
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
        showToast('Import Successful!', 'success');
      } catch (err) {
        showToast('Invalid JSON file', 'error');
      }
    };
    reader.readAsText(file);
  };
  
  // Fitur: DUPLICATE DOCUMENT
  const handleDuplicate = async (doc) => {
    const { _id, createdAt, updatedAt, _uid, ...rest } = doc;
    if(confirm("Duplicate this document?")) {
        await create({ ...rest, source: _id }); 
        showToast("Document Cloned!", 'success');
        fetchAll();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Modals */}
      {/* <IndexModal ... /> */}
      <SchemaModal 
        isOpen={isSchemaModalOpen} 
        onClose={() => setIsSchemaModalOpen(false)} 
        collectionName={name} 
        initialSchemaFields={schemaFieldsForModal} 
      />

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
              <Button size="sm" variant="secondary" onClick={() => setIsSchemaModalOpen(true)}>
                <Code size={14} /> <span className="hidden sm:inline">Schema</span>
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setIsIndexModalOpen(true)}>
                <Database size={14} /> <span className="hidden sm:inline">Indexes</span>
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
      <div className="bg-surface/30 border border-white/10 rounded-xl p-4 mb-4 space-y-3">
         <div className="flex flex-wrap gap-2 items-center text-xs text-gray-400">
            <span className="font-bold text-white mr-1">Schema Detected:</span>
            {detectedSchema.map(field => (
                <span key={field} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-xs">
                    {field}
                </span>
            ))}
            {detectedSchema.length === 0 && <span className="text-red-400">No fields detected.</span>}
         </div>
         <div className="flex flex-wrap gap-2 items-center text-xs text-gray-400">
            <span className="font-bold text-white mr-1">Filter Presets:</span>
            {['status:active', 'role:admin', 'views[gt]:100', '_id:abc...'].map((preset, i) => (
               <button 
                  key={i} 
                  onClick={() => setFilter(preset.split(':')[1])} // Contoh simple filter
                  className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition text-xs font-mono"
               >
                  {preset.split(':')[0]}
               </button>
            ))}
         </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Document List */}
        <div className={`flex-1 overflow-y-auto space-y-2 pr-2 ${selectedDoc ? 'hidden md:block' : ''}`}>
           {loading ? (
             <div className="text-center py-10 text-gray-500 animate-pulse">Fetching Data...</div>
           ) : (
             filteredData.map(doc => (
               <div 
                 key={doc._id} 
                 // PENTING: Tambah onContextMenu (Right Click)
                 onContextMenu={(e) => { e.preventDefault(); setSelectedDoc(doc); /* Tampilkan Context Menu */ }}
                 onClick={() => setSelectedDoc(doc)}
                 className={`p-3 rounded border cursor-pointer transition ${selectedDoc?._id === doc._id ? 'bg-sky-900/20 border-sky-500/50' : 'bg-[#0f0f11] border-white/5 hover:border-white/20'}`}
               >
                  {/* Quick Edit (Hanya field pertama yang bukan ID) */}
                  {Object.keys(doc).filter(k => !k.startsWith('_')).slice(0, 1).map(field => (
                      <div key={field} className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500 capitalize">{field}:</span>
                          {editingDocId === doc._id && editingField === field ? (
                            <input 
                                value={editingValue}
                                onChange={e => setEditingValue(e.target.value)}
                                onKeyDown={e => { if(e.key === 'Enter') handleQuickEditSave(doc._id, field); if(e.key === 'Escape') { setEditingDocId(null); setEditingField(null); } }}
                                onBlur={() => handleQuickEditSave(doc._id, field)}
                                className="bg-black/50 border border-sky-500/50 rounded px-2 py-0.5 text-xs text-white outline-none w-1/2"
                                autoFocus
                            />
                          ) : (
                            <div 
                                onDoubleClick={() => startQuickEdit(doc._id, field, doc[field])}
                                className="text-xs text-white truncate max-w-[60%] flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-text"
                            >
                                <Pencil size={12} className="text-gray-600"/>
                                {doc[field]}
                            </div>
                          )}
                      </div>
                  ))}
                  
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
               {/* JSON Syntax Highlighter */}
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