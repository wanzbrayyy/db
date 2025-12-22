import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Plus, Trash2, ArrowRight, Folder } from 'lucide-react';
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
    const cols = await DB.getCollections();
    // Hitung jumlah dokumen untuk setiap koleksi
    const colsWithCounts = await Promise.all(cols.map(async (c) => {
      const docs = await DB.find(c.name);
      return { ...c, count: docs.length };
    }));
    setCollections(colsWithCounts);
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
    if (confirm(`Are you sure you want to drop collection '${name}'? All data will be lost.`)) {
      await DB.deleteCollection(name);
      fetchCollections();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Collections</h1>
          <p className="text-textMuted text-sm mt-1">Manage your JSON document stores.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary">
          <Plus size={16} /> Create Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Card key={col.name} className="group hover:border-sky-500/30">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="p-2 bg-white/5 rounded-lg text-sky-400 group-hover:text-white group-hover:bg-sky-500 transition-colors">
                <Folder size={20} />
              </div>
              {col.type !== 'system' && (
                <button 
                  onClick={() => handleDelete(col.name)}
                  className="text-white/20 hover:text-red-400 transition"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold text-white mb-1">{col.name}</h3>
              <div className="flex items-center gap-2 text-xs font-mono text-textMuted">
                <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {col.count} Documents
                </span>
                {col.type === 'system' && <span className="text-yellow-500">System</span>}
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/dashboard/collections/${col.name}`} className="w-full">
                <Button variant="secondary" className="w-full justify-between group/btn">
                  Browse Data <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal Create Collection */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md bg-surface border-white/10">
            <CardHeader>
              <CardTitle>New Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <Input 
                  label="Collection Name" 
                  placeholder="e.g. products, orders" 
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  autoFocus
                />
                <div className="text-xs text-textMuted">
                  * Collection name will be converted to snake_case.
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