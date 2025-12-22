import { useEffect, useState } from 'react';
import { Trash2, RefreshCw, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { DB } from '../../api/db';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Mock API call untuk trash (karena logic API backend sudah ada)
// Frontend perlu endpoint khusus atau filter deletedAt != null
const API_URL = 'https://dbw-nu.vercel.app/api/data';

export default function Trash() {
  const [deletedItems, setDeletedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCol, setSelectedCol] = useState('users'); // Default collection to check
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const init = async () => {
      const cols = await DB.getCollections();
      setCollections(cols);
      fetchTrash(cols[0]?.name || 'users');
    };
    init();
  }, []);

  const fetchTrash = async (colName) => {
    setLoading(true);
    setSelectedCol(colName);
    try {
      // Panggil API Backend dengan query trash=true
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
      fetchTrash(selectedCol); // Refresh list
    } catch (e) {
      alert("Failed to restore");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trash2 className="text-red-400" /> Trash Bin
          </h1>
          <p className="text-gray-400 text-sm">Recover deleted documents or purge them permanently.</p>
        </div>
        
        {/* Collection Selector */}
        <div className="flex gap-2">
          {collections.map(col => (
            <button
              key={col.name}
              onClick={() => fetchTrash(col.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${selectedCol === col.name ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
            >
              {col.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 animate-pulse">Scanning deleted sectors...</div>
      ) : deletedItems.length === 0 ? (
        <Card className="bg-surface/30 border-white/5 border-dashed p-12 text-center">
           <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-gray-600" size={32} />
           </div>
           <h3 className="text-lg font-bold text-white">Trash is Empty</h3>
           <p className="text-gray-500">No deleted items found in {selectedCol}.</p>
        </Card>
      ) : (
        <div className="grid gap-3">
           {deletedItems.map(item => (
             <div key={item._id} className="p-4 bg-[#0a0a0a] border border-red-500/10 rounded-lg flex justify-between items-center group hover:border-red-500/30 transition">
                <div className="overflow-hidden">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-red-400 px-2 py-0.5 bg-red-500/10 rounded border border-red-500/20">DELETED</span>
                      <span className="text-xs text-gray-500 font-mono">ID: {item._id}</span>
                   </div>
                   <code className="text-xs text-gray-400 truncate block">
                      {JSON.stringify(item).substring(0, 80)}...
                   </code>
                </div>
                <div className="flex items-center gap-2">
                   <Button size="sm" variant="secondary" onClick={() => handleRestore(item._id)}>
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