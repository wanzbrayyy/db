import { Link, useParams } from 'react-router-dom';
import { Globe, Code, Zap, Check, Key, Code2, Copy, Terminal, ToggleLeft, ToggleRight, AlertTriangle, Database, Info } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import CodeBlock from '../../components/ui/CodeBlock';
import { useState, useEffect } from 'react';

// URL Khusus untuk mengambil data Model AI
const API_URL_DEV = 'https://dbw-nu.vercel.app/api/developer';

export default function RestAPI() {
    const { modelName } = useParams(); // Ambil nama model dari URL
    const [isActive, setIsActive] = useState(true);
    const [copied, setCopied] = useState(false);
    const [modelData, setModelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'https://rest.wanzofc.site/api/v1'; // Base URL Data
    
    // Default data jika modelName tidak ada (untuk halaman utama /rest-api)
    const displayModelName = modelData?.modelName || modelName || 'data';
    const ENDPOINT_MODEL = modelData?.endpoint || `https://ai.wanzofc.site/v1/chat/completions/${modelName || '<model-name>'}`;

    useEffect(() => {
        const fetchModelDocs = async () => {
            if (!modelName) {
                setLoading(false);
                return;
            }
            try {
                // Panggil endpoint baru di backend
                const res = await fetch(`${API_URL_DEV}/public/ai-model/${modelName}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.msg || "Model not found");
                setModelData(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchModelDocs();
    }, [modelName]);


    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return <div className="text-center py-20 text-gray-500">Loading Model Docs...</div>;

    // Tampilan Halaman
    return (
        <div className="space-y-8 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4">
                <h1 className="text-3xl font-bold text-white flex flex-col items-start">
                    <span className="text-sm text-gray-500 font-mono">API Reference / {modelName ? 'AI Model' : 'Core Data'}</span>
                    <span className="text-sky-400 mt-1">{displayModelName}</span>
                </h1>
                
                {/* Status Toggle (Sama) */}
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

            {/* Content Dinamis */}
            {modelData ? (
                // --- TAMPILAN MODEL AI ---
                <div className="space-y-6">
                    <Card className="p-6 bg-surface/30 border-white/10 space-y-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                           <Code2 size={20} className="text-sky-400" /> Model Detail
                        </h3>
                        <p className="text-sm text-gray-400">{modelData.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-4 border-t border-white/10">
                            <p className="text-gray-500">Versi: <span className="text-white font-mono">{modelData.version}</span></p>
                            <p className="text-gray-500">Context: <span className="text-white font-mono">{modelData.context}</span></p>
                            <p className="text-gray-500">Endpoint: <span className="text-white font-mono truncate">{ENDPOINT_MODEL.split('/chat')[0]}</span></p>
                        </div>
                    </Card>

                    <Card className="p-6 bg-surface/30 border-white/10 space-y-3">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                           <Terminal size={20} className="text-emerald-400" /> Quickstart: Node.js
                        </h3>
                        <p className="text-sm text-gray-400">Gunakan SDK kami untuk membuat permintaan chat completions.</p>
                        <CodeBlock language="javascript">
                           {`const stream = await client.ai.chat.send({
  model: '${modelData.modelName}',
  messages: [{ role: "user", content: "Apa itu WanzDB?" }],
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content);
}`}
                        </CodeBlock>
                        <p className="text-xs text-yellow-400 flex items-center gap-1"><AlertTriangle size={14}/> API Key harus ada di client initialization.</p>
                    </Card>
                </div>
            ) : (
                // --- TAMPILAN CORE DATA DEFAULT ---
                <div className="space-y-6">
                    <Card className="p-6 bg-surface/30 border-white/10 space-y-3">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                           <Database size={20} className="text-sky-400" /> Core Data API Reference
                        </h3>
                        <p className="text-sm text-gray-400">Ini adalah referensi untuk endpoint CRUD utama. Gunakan API Key Anda sebagai token otentikasi.</p>
                        <div className="pt-3">
                            <h4 className="text-white font-bold mb-2">Endpoint: {BASE_URL}/:collection</h4>
                            <CodeBlock language="bash">
                                {`# Membaca Data
GET ${BASE_URL}/:collection

# Membuat Data
POST ${BASE_URL}/:collection

# Mengubah Data
PUT ${BASE_URL}/:collection/:id`}
                            </CodeBlock>
                        </div>
                    </Card>
                </div>
            )}

            {/* Link ke Docs */}
            <div className="pt-4 text-center">
                <Link to="/docs" className="text-sky-400 hover:underline">
                    Baca Dokumentasi API Lengkap
                </Link>
            </div>
        </div>
    );
}