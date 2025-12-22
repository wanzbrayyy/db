import { useEffect, useState } from 'react';
import { Trash2, RefreshCw, AlertTriangle, Search, Info } from 'lucide-react';
import { DB } from '../../api/db';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Mock API call karena fitur trash backend sudah ada
const API_URL = 'https://dbw-nu.vercel.app/api/data';

export default function Trash() {
  const [deletedItems, setDeletedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCol, setSelectedCol] = useState('users');
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const init = async () => {
      const cols = await DB.getCollections();
      setCollections(cols);
      // Default load 'users' trash if exists, else first available
      const initialCol = cols.find(c => c.name === 'users') ? 'users' : cols[0]?.name;
      if (initialCol) fetchTrash(initialCol);
      else setLoading(false);
    };
    init();
  }, []);

  const fetchTrash = async (colName) => {
    setLoading(true);
    setSelectedCol(colName);
    try {
      // Fetch data dengan query param trash=true
      const res = await fetch(`${API_URL}/${colName}?trash=true`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      const data = await res.json();
      setDeletedItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    if(!confirm("Restore this item?")) return;
    try {
      await fetch(`${API_URL}/${selectedCol}/restore/${id}`, {
        method: 'POST',
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchTrash(selectedCol);
    } catch (e) {
      alert("Failed to restore");
    }
  };

  const handleEmptyTrash = async () => {
    if(!confirm(`Permanently delete ALL items in ${selectedCol} trash? This cannot be undone.`)) return;
    try {
      await fetch(`${API_URL}/${selectedCol}/empty-trash`, {
        method: 'DELETE',
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchTrash(selectedCol);
    } catch (e) {
      alert("Failed to empty trash");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trash2 className="text-red-400" /> Trash Bin
          </h1>
          <p className="text-gray-400 text-sm mt-1">Recover soft-deleted items.</p>
        </div>
        
        {deletedItems.length > 0 && (
          <Button variant="danger" size="sm" onClick={handleEmptyTrash} className="w-full md:w-auto">
             Empty {selectedCol} Trash
          </Button>
        )}
      </div>
      
      {/* Collection Selector Scrollable */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {collections.map(col => (
          <button
            key={col.name}
            onClick={() => fetchTrash(col.name)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition whitespace-nowrap ${
              selectedCol === col.name 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            {col.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 animate-pulse flex flex-col items-center">
           <RefreshCw className="animate-spin mb-2" />
           Scanning deleted sectors...
        </div>
      ) : deletedItems.length === 0 ? (
        <Card className="bg-surface/30 border-white/5 border-dashed p-12 text-center">
           <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
              <Trash2 size={32} />
           </div>
           <h3 className="text-lg font-bold text-white">Trash is Empty</h3>
           <p className="text-gray-500 text-sm mt-2">No deleted items found in <span className="text-sky-400 font-mono">{selectedCol}</span>.</p>
        </Card>
      ) : (
        // Grid Layout agar tidak overflow di Mobile
        <div className="grid grid-cols-1 gap-3">
           {deletedItems.map(item => (
             <div key={item._id} className="p-4 bg-[#0a0a0a] border border-red-500/10 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-red-500/30 transition">
                <div className="min-w-0 flex-1">
                   <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-red-400 px-1.5 py-0.5 bg-red-500/10 rounded border border-red-500/20 uppercase tracking-wider">
                        Deleted
                      </span>
                      <span className="text-xs text-gray-500 font-mono truncate">
                        {new Date(item.deletedAt || Date.now()).toLocaleString()}
                      </span>
                   </div>
                   {/* JSON Preview Code Block */}
                   <div className="bg-black/50 p-2 rounded border border-white/5 overflow-x-auto">
                     <code className="text-xs text-gray-300 font-mono whitespace-pre-wrap break-all">
                        {JSON.stringify(item, null, 2).substring(0, 150)}{JSON.stringify(item).length > 150 && '...'}
                     </code>
                   </div>
                </div>
                
                <div className="flex sm:flex-col gap-2 shrink-0">
                   <Button size="sm" variant="secondary" onClick={() => handleRestore(item._id)} className="w-full sm:w-auto">
                      <RefreshCw size={14} className="mr-2"/> Restore
                   </Button>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
}