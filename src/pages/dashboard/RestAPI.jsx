import { Link } from 'react-router-dom';
import { Globe, Code, Zap, Check, Key, Code2, Copy, Terminal, ToggleLeft, ToggleRight, AlertTriangle, Database, Info } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import CodeBlock from '../../components/ui/CodeBlock';
import { useState, useEffect } from 'react'; // 🔥 PERBAIKAN: Import dari 'react', bukan 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

// URL Endpoint (untuk mengambil daftar model)
const API_URL_ADMIN = 'https://dbw-nu.vercel.app/api/admin';

export default function RestAPI() {
    const { user } = useAuth();
    const [isActive, setIsActive] = useState(true);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const CORE_BASE_URL = 'https://rest.wanzofc.site/api/v1'; 
    const API_KEY = user?._id || '<YOUR_UUID_API_KEY>';
    
    // Fetch Daftar Model dari Admin API
    useEffect(() => {
        const fetchModels = async () => {
            try {
                // Hanya admin yang bisa melihat daftar penuh (seperti di Developer.jsx)
                const res = await fetch(`${API_URL_ADMIN}/ai-models`, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.msg || 'Failed to fetch models');
                setModels(data);
            } catch (e) {
                // Jika user biasa, biarkan models kosong, tapi tampilkan default API
                console.error("Not Admin or failed to load models:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchModels();
    }, []);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // ... (feedback logic) ...
    };

    return (
        <div className="space-y-8 animate-in fade-in">
            {/* Header dan Toggle (Sama) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Code size={24} className="text-sky-400" /> REST API Katalog
                </h1>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                   <span className="text-sm text-gray-400 font-bold uppercase">Status:</span>
                   <div className="flex items-center gap-2">
                     <span className={`text-sm font-bold ${isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isActive ? 'Aktif' : 'Tidak Aktif'}
                     </span>
                     <button onClick={() => setIsActive(!isActive)} className="text-sky-500 hover:text-sky-400 transition">
                        {isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-600"/>}
                     </button>
                   </div>
                </div>
            </div>

            {/* List Model AI */}
            <h2 className="text-xl font-bold text-white pt-4">Model AI ({models.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                    <p className="text-gray-500">Memuat daftar model...</p>
                ) : models.length > 0 ? (
                    models.map(model => (
                        <Card key={model._id} className="p-4 bg-surface/30 border-white/10 flex justify-between items-center group hover:border-sky-500/30 transition-all">
                            <div>
                                <h3 className="text-lg font-bold text-sky-400">{model.modelName}</h3>
                                <p className="text-xs text-gray-400">Versi: {model.version} | Context: {model.context}K</p>
                            </div>
                            <Link to={`/dashboard/rest-api/${model.modelName}`}>
                                <Button size="sm" variant="secondary" className="bg-white/5 hover:bg-white/10">Lihat Docs</Button>
                            </Link>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-500 md:col-span-2">Tidak ada model AI yang terdaftar.</p>
                )}
            </div>
            
            <div className="pt-8 border-t border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Core Data Endpoint</h2>
                <Card className="p-6 bg-surface/30 border-white/10 space-y-3">
                    <h3 className="font-bold text-white flex items-center gap-2">
                       <Database size={18} className="text-sky-400" /> Endpoint Utama
                    </h3>
                    <p className="text-sm text-gray-400">Gunakan endpoint ini untuk operasi CRUD pada koleksi Anda.</p>
                    <h4 className="text-white font-bold my-2">Base URL: {CORE_BASE_URL}</h4>
                </Card>
            </div>
        </div>
    );
}