import { Link } from 'react-router-dom';
import { Globe, Code, Zap, RefreshCw, Key, ToggleLeft, ToggleRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useState } from 'react';

export default function RestAPI() {
    const [isActive, setIsActive] = useState(true);
    const [copied, setCopied] = useState(false);
    
    const BASE_URL = 'https://rest.wanzofc.site/api/v1';

    const handleCopy = () => {
        navigator.clipboard.writeText(BASE_URL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Code size={24} className="text-sky-400" /> REST API Access
                </h1>
                <div className="flex items-center gap-3">
                   <span className="text-sm text-gray-400 font-bold uppercase">Status</span>
                   <button onClick={() => setIsActive(!isActive)} className="text-sky-500 hover:text-sky-400 transition">
                      {isActive ? <ToggleRight size={32}/> : <ToggleLeft size={32} className="text-red-500"/>}
                   </button>
                </div>
            </div>

            {/* Status Bar */}
            <Card className={`p-4 ${isActive ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <div className="flex items-center gap-3">
                    {isActive ? <Zap size={20} className="text-emerald-400" /> : <AlertTriangle size={20} className="text-red-400" />}
                    <p className="text-sm font-medium text-white">
                        API Saat Ini **{isActive ? 'Aktif' : 'Tidak Aktif'}**. Endpoint siap menerima permintaan.
                    </p>
                </div>
            </Card>

            {/* Base URL & Endpoint */}
            <Card className="p-6 bg-surface/30 border-white/10 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <Globe size={20} className="text-gray-400" /> Endpoint Utama
                </h3>
                <div className="bg-[#050505] p-3 rounded-lg border border-white/10 flex justify-between items-center">
                    <code className="font-mono text-sm text-sky-400 break-all">{BASE_URL}</code>
                    <Button size="sm" onClick={handleCopy} className="ml-4">
                        {copied ? <Check size={16} className="text-emerald-400"/> : 'Salin'}
                    </Button>
                </div>
                <p className="text-xs text-gray-500">gunakan header 'x-auth-token' untuk otentikasi.</p>
            </Card>

            {/* Dokumentasi Simulasi */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-surface/30 border-white/10 space-y-3">
                   <h3 className="font-bold text-white flex items-center gap-2">
                     <Key size={18} className="text-yellow-400" /> Otentikasi
                   </h3>
                   <p className="text-sm text-gray-400">semua permintaan ke /api/v1/* memerlukan token jwt aktif. token dikirimkan melalui header.</p>
                   <CodeBlock language="bash">
                      {`curl -X GET ${BASE_URL}/users \\
                        -H "x-auth-token: <token_jwt>"
                      `}
                   </CodeBlock>
                </Card>
                <Card className="p-6 bg-surface/30 border-white/10 space-y-3">
                   <h3 className="font-bold text-white flex items-center gap-2">
                     <Zap size={18} className="text-sky-400" /> Metode CRUD
                   </h3>
                   <p className="text-sm text-gray-400">endpoint standar untuk manipulasi data koleksi.</p>
                   <CodeBlock language="bash">
                      {`# Membaca Data
                        GET ${BASE_URL}/:collection

                        # Membuat Data
                        POST ${BASE_URL}/:collection

                        # Mengubah Data
                        PUT ${BASE_URL}/:collection/:id
                      `}
                   </CodeBlock>
                </Card>
            </div>

            {/* Link ke Docs */}
            <div className="pt-4 text-center">
                <Link to="/docs" className="text-sky-400 hover:underline">
                    Baca Dokumentasi API Lengkap
                </Link>
            </div>
        </div>
    );
}