import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Key, Code, Zap, Copy, Check, Terminal, Play, Cpu, ChevronLeft } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import CodeBlock from '../../components/ui/CodeBlock';
import Input from '../../components/ui/Input';
import { useToast } from '../../hooks/useToast';

// URL Endpoint
const API_URL_DEV = 'https://dbw-nu.vercel.app/api/developer';
const AI_ENDPOINT = 'https://ai.wanzofc.site/v1/chat/completions';
const API_KEY = '<YOUR_UUID_API_KEY>'; // Placeholder

export default function RestAPIDetail() {
    const { modelName } = useParams();
    const { showToast } = useToast();
    const [modelData, setModelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prompt, setPrompt] = useState("jelaskan fungsi dari rest api dalam 50 kata.");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    // Dapatkan Model Data
    useEffect(() => {
        const fetchModelDocs = async () => {
            if (!modelName) { setLoading(false); return; }
            try {
                const res = await fetch(`${API_URL_DEV}/public/ai-model/${modelName.replace('/*', '')}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.msg || "Model not found");
                setModelData(data);
            } catch (e) {
                showToast(e.message, 'error');
                setModelData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchModelDocs();
    }, [modelName]);
    
    // Logic Simulasi/Realtime API Call
    const handleTestApi = async () => {
        setIsRunning(true);
        setOutput("running...");
        // Simulasi hit API call (di frontend tidak bisa panggil CURL/fetch ke AI secara langsung)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulasikan response dari AI
        setOutput("fungsi utama rest api adalah memungkinkan komunikasi antar sistem. ia menggunakan metode http standar (get, post, put, delete) untuk mengakses dan memanipulasi data. ini sangat penting untuk aplikasi web modern dan layanan mikro. (simulasi)");
        setIsRunning(false);
        showToast("Test API Selesai!", 'success');
    };

    // CURL Generator
    const curlCommand = `curl -X POST ${AI_ENDPOINT} \\
-H "Authorization: Bearer ${API_KEY}" \\
-H "Content-Type: application/json" \\
-d '{
    "model": "${modelData?.modelName || '<MODEL_NAME>'}",
    "messages": [{"role": "user", "content": "${prompt.replace(/"/g, '\\"')}"}],
    "temperature": 0.7,
    "max_tokens": 100
}'`;

    if (loading) return <div className="text-center py-20 text-gray-500">Memuat Detail Model...</div>;
    if (!modelData) return (
        <div className="text-center py-20 text-gray-500">
            <h2 className="text-xl text-white mb-3">Model Tidak Ditemukan</h2>
            <Link to="/dashboard/rest-api" className="text-sky-400 hover:underline">Kembali ke Daftar Model</Link>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Link to="/dashboard/rest-api" className="text-gray-400 hover:text-white"><ChevronLeft size={24}/></Link>
                <h1 className="text-3xl font-bold text-sky-400">{modelData.modelName}</h1>
            </div>

            {/* DETAIL MODEL */}
            <Card className="p-6 bg-surface/30 border-white/10 space-y-3">
                <h3 className="text-xl font-bold text-white">Ikhtisar Model AI</h3>
                <p className="text-sm text-gray-400">{modelData.description}</p>
                <div className="grid grid-cols-3 pt-3 border-t border-white/10 text-xs text-gray-500">
                    <p>Versi: <span className="text-white font-mono">{modelData.version}</span></p>
                    <p>Context Window: <span className="text-white font-mono">{modelData.context}K</span></p>
                    <p>Endpoint: <span className="text-white font-mono truncate">{AI_ENDPOINT}</span></p>
                </div>
            </Card>

            {/* CURL BUILDER */}
            <Card className="p-6 bg-surface/30 border-white/10 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><Code size={20} className="text-yellow-400"/> CURL Builder</h3>
                <p className="text-sm text-gray-400">Salin perintah CURL lengkap untuk pengujian di terminal Anda.</p>
                <CodeBlock language="bash">
                    {curlCommand}
                </CodeBlock>
                <Button size="sm" variant="secondary" onClick={() => handleCopy(curlCommand)} className="w-full">
                    <Copy size={16}/> Salin Perintah CURL
                </Button>
            </Card>

            {/* TEST GROUND */}
            <Card className="p-6 bg-surface/30 border-white/10 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><Zap size={20} className="text-red-400"/> Test Ground (Simulasi)</h3>
                
                <Input label="Prompt (Isi Pertanyaan)" value={prompt} onChange={(e) => setPrompt(e.target.value)} />

                <Button onClick={handleTestApi} isLoading={isRunning} className="w-full">
                    <Play size={16} className="fill-current mr-2"/> {isRunning ? 'Running...' : 'Jalankan Test API'}
                </Button>

                <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2">
                        <Terminal size={16} /> Output:
                    </h4>
                    <div className="bg-[#050505] p-3 rounded-lg border border-white/10 min-h-20 text-sm text-emerald-400">
                        {output || 'Output akan muncul di sini...'}
                    </div>
                </div>
            </Card>
        </div>
    );
}