import { Link } from 'react-router-dom';
import { Globe, Code, Zap, Check, Key, Code2, Copy, Terminal, ToggleLeft, ToggleRight, AlertTriangle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Untuk ambil UUID

// Helper untuk Syntax Highlighting Sederhana (agar tidak perlu SyntaxHighlighter)
const CodeBlock = ({ language, children }) => (
    <div className="bg-[#050505] rounded-lg border border-white/10 p-4 overflow-x-auto my-4">
      <pre className="font-mono text-xs text-gray-300">
        <code className={`language-${language}`}>
          {children}
        </code>
      </pre>
    </div>
);

export default function RestAPI() {
    const { user } = useAuth();
    const [isActive, setIsActive] = useState(true);
    const [copied, setCopied] = useState(false);
    
    // Base URL FAKE yang diminta
    const BASE_URL = 'https://rest.wanzofc.site/api/v1';
    const API_KEY = user?._id || '<YOUR_UUID_API_KEY>';
    
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Code size={24} className="text-sky-400" /> REST API Access
                </h1>
                
                {/* Status Toggle */}
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

            {/* Status Bar */}
            <Card className={`p-4 ${isActive ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <div className="flex items-center gap-3">
                    <Zap size={20} className={`${isActive ? 'text-emerald-400' : 'text-red-400'}`} />
                    <p className="text-sm font-medium text-white">
                        Endpoint saat ini **{isActive ? 'AKTIF dan MENGARAH' : 'DINONAKTIFKAN'}. Silakan gunakan API Key Anda.
                    </p>
                </div>
            </Card>

            {/* Base URL & API Key */}
            <Card className="p-6 bg-surface/30 border-white/10 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <Globe size={20} className="text-gray-400" /> Endpoint Utama
                </h3>
                <div className="bg-[#050505] p-3 rounded-lg border border-white/10 flex justify-between items-center">
                    <code className="font-mono text-sm text-sky-400 break-all">{BASE_URL}</code>
                    <Button size="sm" onClick={() => handleCopy(BASE_URL)} className="ml-4">
                        {copied ? <Check size={16} className="text-emerald-400"/> : 'Salin'}
                    </Button>
                </div>
                
                <h3 className="text-xl font-bold text-white flex items-center gap-2 pt-4 border-t border-white/10">
                   <Key size={20} className="text-yellow-400" /> API Key
                </h3>
                <div className="bg-[#050505] p-3 rounded-lg border border-white/10 flex justify-between items-center">
                    <code className="font-mono text-xs text-yellow-400 break-all">{API_KEY}</code>
                    <Button size="sm" onClick={() => handleCopy(API_KEY)} className="ml-4">
                        {copied ? <Check size={16} className="text-emerald-400"/> : 'Salin'}
                    </Button>
                </div>
                <p className="text-xs text-gray-500">gunakan key ini sebagai token 'x-auth-token' untuk permintaan api.</p>
            </Card>

            {/* Dokumentasi Simulasi */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-surface/30 border-white/10 space-y-3">
                   <h3 className="font-bold text-white flex items-center gap-2">
                     <Code2 size={18} className="text-yellow-400" /> Contoh CURL
                   </h3>
                   <p className="text-sm text-gray-400">kueri data pengguna dengan token otentikasi.</p>
                   <CodeBlock language="bash">
                      {`curl -X GET ${BASE_URL}/users \\
-H "Content-Type: application/json" \\
-H "x-auth-token: ${API_KEY.substring(0, 10)}..."`}
                   </CodeBlock>
                </Card>
                <Card className="p-6 bg-surface/30 border-white/10 space-y-3">
                   <h3 className="font-bold text-white flex items-center gap-2">
                     <Database size={18} className="text-sky-400" /> Metode CRUD
                   </h3>
                   <p className="text-sm text-gray-400">metode standar untuk manipulasi dokumen.</p>
                   <CodeBlock language="bash">
                      {`# Membaca Data
GET ${BASE_URL}/:collection

# Membuat Data
POST ${BASE_URL}/:collection

# Mengubah Data
PUT ${BASE_URL}/:collection/:id`}
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