import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Key, Code, Zap, Copy, Check, Terminal, Play, Cpu, ChevronLeft, Info, Server, Code2, Database } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import CodeBlock from '../../components/ui/CodeBlock';
import Input from '../../components/ui/Input';
import { useToast } from '../../hooks/useToast';

// URL Endpoint
const API_URL_DEV_PUBLIC = 'https://dbw-nu.vercel.app/api/developer/public';
const AI_ENDPOINT = 'https://ai.wanzofc.site/v1/chat/completions';
const API_KEY = '<YOUR_UUID_API_KEY>'; // Placeholder

// --- KOMPONEN HELPER SWAGGER STYLE ---

// Helper: Menampilkan Response Code dan Skema Body
const ResponseSchema = ({ status, description, color, bodySchema }) => (
    <div className="border-l-4 p-4 rounded-lg bg-surface/50 my-2" style={{borderColor: color}}>
        <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-white text-lg" style={{color: color}}>{status}</span>
            <span className="text-sm text-gray-400">{description}</span>
        </div>
        <details className="cursor-pointer text-gray-300">
            <summary className="text-sm font-medium hover:text-white transition">Lihat Skema Body/Payload</summary>
            <div className="mt-2">
                <CodeBlock language="json">{bodySchema}</CodeBlock>
            </div>
        </details>
    </div>
);

// Helper: Menampilkan Blok Endpoint
const EndpointDetail = ({ method, path, title, description, responses }) => {
    const methodColor = method === 'POST' ? 'text-green-400' : method === 'GET' ? 'text-sky-400' : 'text-red-440';
    const methodBg = method === 'POST' ? 'bg-green-500/10' : method === 'GET' ? 'bg-sky-500/10' : 'bg-red-500/10';

    return (
        <Card className="p-6 bg-surface/30 border-white/10 space-y-4">
            <div className={`p-2 rounded-lg ${methodBg}`}>
                <span className={`text-sm font-bold ${methodColor} mr-3 px-2 py-1 rounded`}>{method}</span>
                <code className="text-white font-mono">{path}</code>
            </div>
            
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>

            <h4 className="font-bold text-gray-300 mt-4 border-t border-white/10 pt-4">Responses ({responses.length})</h4>
            <div className="space-y-3">
                {responses.map((res, i) => (
                    <ResponseSchema key={i} {...res} />
                ))}
            </div>
        </Card>
    );
};
// --- AKHIR KOMPONEN HELPER ---


export default function RestAPIDetail() {
    const { showToast } = useToast();
    const location = useLocation(); 
    
    // 🔥 PERBAIKAN: Ambil dan decode sisa path (untuk nama model yang mengandung / dan :)
    const pathSegment = location.pathname.split('/dashboard/rest-api/')[1];
    const modelName = pathSegment ? decodeURIComponent(pathSegment) : null; 
    
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
                // Panggil endpoint publik yang baru
                const res = await fetch(`${API_URL_DEV_PUBLIC}/ai-model/${modelName}`);
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
        setOutput("Running...");
        await new Promise(resolve => setTimeout(resolve, 1500));
        
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

    // Data Swagger untuk Model AI
    const aiResponses = [
        {
            status: 200,
            description: "Permintaan berhasil. Mengembalikan stream jawaban model.",
            color: 'green',
            bodySchema: JSON.stringify({
                id: "chatcmpl-...",
                object: "chat.completion.chunk",
                choices: [{ delta: { content: "jawaban..." } }]
            }, null, 2)
        },
        {
            status: 401,
            description: "Tidak terotorisasi. Token API Key hilang atau tidak valid.",
            color: 'red',
            bodySchema: JSON.stringify({
                error: { type: "authentication_error", message: "API Key is missing or invalid." }
            }, null, 2)
        },
        {
            status: 429,
            description: "Rate limit terlampaui. Terlalu banyak permintaan.",
            color: 'orange',
            bodySchema: JSON.stringify({ error: { type: "rate_limit", message: "Too many requests." } }, null, 2)
        }
    ];

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
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><Info size={20} className="text-yellow-400"/> Detail Model</h3>
                <p className="text-sm text-gray-400">{modelData.description}</p>
                <div className="grid grid-cols-3 pt-3 border-t border-white/10 text-xs text-gray-500">
                    <p>Versi: <span className="text-white font-mono">{modelData.version}</span></p>
                    <p>Context Window: <span className="text-white font-mono">{modelData.context}K</span></p>
                    <p>Endpoint AI: <span className="text-white font-mono truncate">{AI_ENDPOINT}</span></p>
                </div>
            </Card>

            {/* RESPONSE DOCS (Swagger Style) */}
            <h2 className="text-2xl font-bold text-white mt-8 flex items-center gap-2">
                <Server size={22} className="text-sky-400"/> Endpoint: Chat Completions
            </h2>
            <p className="text-gray-400 text-sm">Metode: <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 font-mono font-bold">POST</span> {AI_ENDPOINT}</p>
            
            <EndpointDetail 
                method="POST"
                path="/v1/chat/completions"
                title="Membuat Permintaan Chat"
                description="Mengirimkan serangkaian pesan untuk mendapatkan respons dari model AI."
                responses={aiResponses}
            />


            {/* CURL BUILDER */}
            <Card className="p-6 bg-surface/30 border-white/10 space-y-4 mt-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><Code size={20} className="text-yellow-400"/> CURL Builder & Test</h3>
                
                <Input label="Prompt (Isi Pertanyaan)" value={prompt} onChange={(e) => setPrompt(e.target.value)} />

                <Button onClick={handleTestApi} isLoading={isRunning} className="w-full">
                    <Play size={16} className="fill-current mr-2"/> {isRunning ? 'Menjalankan Test...' : 'Jalankan Test API'}
                </Button>
                
                <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2">
                        <Terminal size={16} /> Perintah CURL:
                    </h4>
                    <CodeBlock language="bash">
                        {curlCommand}
                    </CodeBlock>
                    <Button size="sm" variant="secondary" onClick={() => handleCopy(curlCommand)} className="w-full mt-2">
                        <Copy size={16}/> Salin Perintah CURL
                    </Button>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2">
                        <Cpu size={16} /> Output Konsol (Simulasi):
                    </h4>
                    <div className="bg-[#050505] p-3 rounded-lg border border-white/10 min-h-20 text-sm text-emerald-400">
                        {output || 'Output akan muncul di sini...'}
                    </div>
                </div>
            </Card>
        </div>
    );
}