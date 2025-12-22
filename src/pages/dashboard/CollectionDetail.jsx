import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Plus, Trash2, ArrowRight, Folder, RefreshCw } from 'lucide-react';
import { DB } from '../../api/db';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCollections = async () => {
    try {
      const cols = await DB.getCollections();
      // Fetch docs count parallel
      const colsWithCounts = await Promise.all(cols.map(async (c) => {
        const docs = await DB.find(c.name);
        return { ...c, count: docs?.length || 0 };
      }));
      setCollections(colsWithCounts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newColName) return;
    setLoading(true);
    try {
      await DB.createCollection(newColName.toLowerCase().replace(/\s/g, '_'));
      setNewColName('');
      setIsModalOpen(false);
      fetchCollections();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (name) => {
    if (confirm(`Drop collection '${name}'? All data will be lost permanently.`)) {
      await DB.deleteCollection(name);
      fetchCollections();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Collections</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your JSON document stores.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary" className="w-full sm:w-auto">
          <Plus size={16} /> Create Collection
        </Button>
      </div>

      {/* Grid Responsif: 1 kolom di HP, 2 di Tablet, 3 di Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {collections.map((col) => (
          <Card key={col.name} className="group hover:border-sky-500/30 transition-all duration-300 bg-surface/30">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="p-2.5 bg-white/5 rounded-xl text-sky-400 group-hover:text-white group-hover:bg-sky-500 transition-colors">
                <Folder size={20} />
              </div>
              {col.type !== 'system' && (
                <button 
                  onClick={() => handleDelete(col.name)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                  title="Drop Collection"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-bold text-white mb-1 truncate" title={col.name}>{col.name}</h3>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {col.count} Docs
                </span>
                {col.type === 'system' && <span className="text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded">System</span>}
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/dashboard/collections/${col.name}`} className="w-full">
                <Button variant="secondary" className="w-full justify-between group/btn bg-white/5 hover:bg-white/10 border-transparent">
                  Browse Data <ArrowRight size={16} className="text-gray-500 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal Create Collection (Responsive) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
          <Card className="w-full sm:max-w-md bg-[#09090b] border-t sm:border border-white/10 rounded-t-2xl sm:rounded-xl shadow-2xl relative">
            <CardHeader>
              <CardTitle>New Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <Input 
                  label="Name" 
                  placeholder="e.g. products, orders" 
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  autoFocus
                />
                <div className="text-xs text-gray-500 bg-white/5 p-3 rounded">
                  * Name will be converted to snake_case.
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="ghost" className="w-full" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit" variant="primary" className="w-full" isLoading={loading}>Create</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}