import { useEffect, useState } from 'react';
import { Trash2, RefreshCw, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { DB } from '../../api/db';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Trash() {
  const [deletedItems, setDeletedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCol, setSelectedCol] = useState('users');
  const [collections, setCollections] = useState([]);

  const fetchTrash = async (colName) => {
    setLoading(true);
    setSelectedCol(colName);
    try {
      const data = await DB.find(colName, { trash: true }); // Menggunakan DB.find dengan query param 'trash: true'
      setDeletedItems(data);
    } catch (e) {
      console.error(e);
      setDeletedItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const cols = await DB.getCollections();
      setCollections(cols);
      const initialCol = cols.find(c => c.name === 'users') ? 'users' : cols[0]?.name;
      if (initialCol) fetchTrash(initialCol);
      else setLoading(false);
    };
    init();
  }, []);

  const handleRestore = async (id) => {
    if(!confirm("Restore this item?")) return;
    try {
      await DB.restore(selectedCol, id);
      fetchTrash(selectedCol);
    } catch (e) {
      alert("Failed to restore: " + e.message);
    }
  };

  const handleRestoreAll = async () => {
    if(!confirm("Restore ALL items in this trash?")) return;
    // NOTE: Backend tidak memiliki endpoint restore-all, kita simulasi one-by-one.
    // Jika backend punya, panggil DB.restoreAll(selectedCol);
    for (const item of deletedItems) {
        await DB.restore(selectedCol, item._id);
    }
    alert("All items restored (simulated)!");
    fetchTrash(selectedCol);
  };

  const handleEmptyTrash = async () => {
    if(!confirm(`Permanently delete ALL items in ${selectedCol} trash? This cannot be undone.`)) return;
    try {
      await DB.emptyTrash(selectedCol); // Panggil endpoint EmptyTrash di DB
      alert("Trash emptied permanently!");
      fetchTrash(selectedCol);
    } catch (e) {
      alert("Failed to empty trash: " + e.message);
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
          <p className="text-gray-400 text-sm mt-1">Recover soft-deleted items from {selectedCol}.</p>
        </div>
        
        {deletedItems.length > 0 && (
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="secondary" size="sm" onClick={handleRestoreAll} className="w-1/2 md:w-auto">
               Restore All ({deletedItems.length})
            </Button>
            <Button variant="danger" size="sm" onClick={handleEmptyTrash} className="w-1/2 md:w-auto">
               Empty Trash
            </Button>
          </div>
        )}
      </div>
      
      {/* Collection Selector */}
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
                   <div className="bg-black/50 p-2 rounded border border-white/5 overflow-x-auto">
                     <code className="text-xs text-gray-400 truncate font-mono">
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