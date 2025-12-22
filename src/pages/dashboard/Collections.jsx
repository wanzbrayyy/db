import { Link } from 'react-router-dom';
import { Database, FolderPlus, ArrowRight } from 'lucide-react';
import Card from '../../components/ui/Card';

export default function Collections() {
  // Simulasi daftar collection (di real app bisa disimpan di array 'collections' di DB)
  const collections = [
    { name: 'my_collection', count: 'Dynamic', desc: 'Main document storage' },
    { name: 'users', count: 'Protected', desc: 'System users data' },
    { name: 'logs', count: '0', desc: 'System activity logs' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Database Collections</h1>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
          <FolderPlus size={18} /> New Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Link key={col.name} to={`/dashboard/collections/${col.name}`}>
            <Card className="p-6 h-full hover:bg-slate-800/80 hover:border-indigo-500/50 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition">
                  <Database size={24} />
                </div>
                <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-slate-400">
                  {col.count} Docs
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{col.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{col.desc}</p>
              <div className="flex items-center text-indigo-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                Browse Data <ArrowRight size={16} className="ml-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}