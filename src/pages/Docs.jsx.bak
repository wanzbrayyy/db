import { Link } from 'react-router-dom';
import { Book, ChevronRight, Code, Terminal, Server, Key, Shield, HardHat, FileText, Database, Code2 } from 'lucide-react';
import Card from '../components/ui/Card';

export default function Docs() {
  const sections = [
    { title: 'Getting Started', items: ['Introduction', 'Installation', 'Authentication'] },
    { title: 'Core Data API', items: ['Collections & Documents', 'Basic CRUD Operations', 'Advanced Filtering & Sorting', 'Trash Bin & Restore'] },
    { title: 'Developer Tools', items: ['API Keys & Permissions', 'Webhooks Integration', 'Playground & Aggregation'] },
    { title: 'SDK Reference', items: ['JavaScript SDK', 'Error Handling'] },
  ];

  const CodeBlock = ({ language, children }) => (
    <div className="bg-[#050505] rounded-lg border border-white/10 p-4 overflow-x-auto my-4">
      <pre className="font-mono text-sm">
         <code className={`language-${language} text-gray-300`}>
           {children}
         </code>
      </pre>
    </div>
  );

  const SectionTitle = ({ id, icon: Icon, children }) => (
    <h2 id={id} className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-3">
      <Icon className="text-sky-400 shrink-0" size={24} /> {children}
    </h2>
  );

  return (
    <div className="min-h-screen bg-background pt-20 flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-12">
      
      {/* Sidebar Navigation */}
      <aside className="hidden lg:block w-64 shrink-0 py-8 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h5 className="mb-3 font-semibold text-white tracking-wide text-sm uppercase opacity-90">
                {section.title}
              </h5>
              <ul className="space-y-2">
                {section.items.map((item) => {
                  const id = item.toLowerCase().replace(/[^a-z0-9]/g, '-');
                  return (
                    <li key={item}>
                      <a href={`#${id}`} className="block text-sm text-textMuted hover:text-sky-400 transition-colors border-l border-white/5 pl-4 hover:border-sky-400">
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-8 min-w-0">
        
        <div className="mb-12 border-b border-white/10 pb-10">
          <h1 className="text-4xl font-bold text-white mb-4">WANZDB Documentation</h1>
          <p className="text-xl text-gray-400">The comprehensive guide to integrating WanzDB into your Node.js, Python, or PHP applications.</p>
        </div>

        {/* ======================= SECTION 1: GETTING STARTED ======================= */}
        <SectionTitle id="introduction" icon={Book}>Getting Started</SectionTitle>
        <p className="text-gray-400 mb-6 leading-relaxed">
          WANZDB adalah database JSON serverless yang dirancang untuk kecepatan tinggi dan skalabilitas instan. Berbeda dengan database tradisional, WanzDB mengurus semua konfigurasi jaringan, sharding, dan failover, memungkinkan Anda berfokus penuh pada logika bisnis aplikasi Anda. Arsitektur kami yang **Global-First** menjamin latensi yang minim untuk pengguna di seluruh dunia.
        </p>

        <h3 id="installation" className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
            <Terminal className="text-gray-500" size={20} /> Installation
        </h3>
        <p className="text-gray-400 mb-4">WANZDB dirilis sebagai NPM package ringan. Gunakan manajer paket favorit Anda:</p>
        <CodeBlock language="bash">
          npm install wanzdb
        </CodeBlock>

        <h3 id="authentication" className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
            <Key className="text-gray-500" size={20} /> Authentication
        </h3>
        <p className="text-gray-400 mb-4">Autentikasi menggunakan Connection String standar, di mana **Password** Anda adalah **Unique User ID (UUID)** yang berfungsi sebagai **API Key** rahasia. Ini menghilangkan kebutuhan untuk mengirim password asli (bcrypt hash) melalui API, meningkatkan keamanan.</p>
        <CodeBlock language="javascript">
          <span className="text-purple-400">const</span> {'{ Client }'} = require('<span className="text-green-400">wanzdb</span>');

          <span className="text-gray-500">// Format: wanzdb://{'<USERNAME>'}:{'<UUID_KEY>'}@dbw-nu.vercel.app</span>
          <span className="text-purple-400">const</span> db = <span className="text-purple-400">new</span> Client(<span className="text-yellow-400">"wanzdb://{'<USERNAME>'}:{'<UUID_KEY>'}@dbw-nu.vercel.app"</span>);
          
          <span className="text-purple-400">await</span> db.<span className="text-blue-400">connect</span>();
        </CodeBlock>


        {/* ======================= SECTION 2: CORE DATA API ======================= */}
        <SectionTitle id="core-data-api" icon={Database}>Core Data API</SectionTitle>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Semua operasi data dilakukan melalui objek `client.collection('nama_koleksi')`. Koleksi dibuat secara otomatis saat Anda melakukan `insert` pertama kali, dan data Anda diisolasi secara ketat berdasarkan **User ID (UID)** Anda untuk mencegah kebocoran data antar pengguna.
        </p>
        
        <h3 id="basic-crud-operations" className="text-2xl font-bold text-white mt-8 mb-4">Basic CRUD Operations</h3>
        <CodeBlock language="javascript">
          <span className="text-purple-400">const</span> users = client.<span className="text-blue-400">collection</span>(<span className="text-green-400">'users'</span>);
          
          <span className="text-gray-500">// INSERT: Auto generates 50-char ID</span>
          <span className="text-purple-400">const</span> newUser = <span className="text-purple-400">await</span> users.<span className="text-blue-400">insert</span>({'{'} email: "ali@wanz.dev" {'}'});
          
          <span className="text-gray-500">// FIND: Ambil semua</span>
          <span className="text-purple-400">const</span> allUsers = <span className="text-purple-400">await</span> users.<span className="text-blue-400">find</span>({});
          
          <span className="text-gray-500">// UPDATE: Update by ID</span>
          <span className="text-purple-400">await</span> users.<span className="text-blue-400">update</span>(newUser._id, {'{'} status: "active" {'}'});
        </CodeBlock>
        
        <h3 id="trash-bin-restore" className="text-2xl font-bold text-white mt-8 mb-4">Trash Bin & Restore</h3>
        <p className="text-gray-400 mb-4">Operasi delete adalah **Soft Delete** secara default. Dokumen dipindahkan ke Trash Bin dan dapat dipulihkan hingga Anda melakukan *Empty Trash* permanen.</p>
        <CodeBlock language="javascript">
          <span className="text-gray-500">// SOFT DELETE: Pindah ke Trash Bin</span>
          <span className="text-purple-400">await</span> users.<span className="text-blue-400">delete</span>(userId);
          
          <span className="text-gray-500">// RESTORE: Mengembalikan dokumen dari Trash</span>
          <span className="text-purple-400">await</span> client.trash.<span className="text-blue-400">restore</span>('users', userId);
        </CodeBlock>

        <h3 id="advanced-filtering-sorting" className="text-2xl font-bold text-white mt-8 mb-4">Advanced Filtering & Sorting</h3>
        <p className="text-gray-400 mb-4">WANZDB mendukung operator query lanjutan melalui parameter objek. Anda bisa melakukan sorting (`-` untuk DESC) dan filtering logis.</p>
        <CodeBlock language="javascript">
          <span className="text-purple-400">const</span> users = client.collection(<span className="text-green-400">'users'</span>);
          <span className="text-purple-400">const</span> seniorUsers = <span className="text-purple-400">await</span> users.<span className="text-blue-400">find</span>({'{'}
            age: {'{'} <span className="text-yellow-200">gt</span>: 20 {'}'},
            role: <span className="text-green-400">"admin"</span>
          {'}'}, {'{'} sort: <span className="text-green-400">"name"</span>, limit: 10 {'}'});
        </CodeBlock>


        {/* ======================= SECTION 3: DEVELOPER TOOLS ======================= */}
        <SectionTitle id="developer-tools" icon={HardHat}>Developer Tools</SectionTitle>

        <h3 id="api-keys-permissions" className="text-2xl font-bold text-white mt-8 mb-4">API Keys & Permissions</h3>
        <p className="text-gray-400 mb-6">Kelola akses data Anda secara granular. Anda dapat membuat API Key terpisah untuk lingkungan *development* dan *production*, serta membatasi Key tersebut hanya untuk operasi **READ** atau **READ/WRITE** pada koleksi tertentu melalui Console Dashboard.</p>

        <h3 id="webhooks-integration" className="text-2xl font-bold text-white mt-8 mb-4">Webhooks Integration</h3>
        <p className="text-gray-400 mb-6">Daftarkan URL Webhook di Dashboard untuk menerima notifikasi *real-time* saat terjadi event seperti `document.created` atau `document.updated`. Fitur ini sangat penting untuk membangun arsitektur *event-driven* atau sinkronisasi data antar layanan mikro (microservices).</p>

        <h3 id="playground-aggregation" className="text-2xl font-bold text-white mt-8 mb-4">Playground & Aggregation</h3>
        <p className="text-gray-400 mb-6">Gunakan Playground Console untuk menguji query dan aggregation pipeline secara langsung. Ini mendukung sintaks MongoDB MQL penuh untuk operasi data yang kompleks dan visualisasi data sebelum diimplementasikan di kode Anda.</p>

        {/* ======================= SECTION 4: SDK REFERENCE ======================= */}
        <SectionTitle id="sdk-reference" icon={Code2}>SDK Reference</SectionTitle>

        <h3 id="javascript-sdk" className="text-2xl font-bold text-white mt-8 mb-4">JavaScript SDK</h3>
        <p className="text-gray-400 mb-4">SDK kami dirancang untuk kompatibilitas penuh dengan lingkungan Node.js dan browser. Semua method mengembalikan Promise, sehingga Anda dapat menggunakan sintaks `async/await` yang modern.</p>
        <CodeBlock language="javascript">
          <span className="text-purple-400">const</span> {'{ Client }'} = require(<span className="text-green-400">'wanzdb'</span>);

          <span className="text-purple-400">async function</span> getUser() {'{'}
            <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> Client(<span className="text-yellow-400">"wanzdb://user:key@host"</span>);
            <span className="text-purple-400">await</span> client.<span className="text-blue-400">connect</span>();
            
            <span className="text-purple-400">const</span> users = client.collection(<span className="text-green-400">'users'</span>);
            <span className="text-purple-400">const</span> doc = <span className="text-purple-400">await</span> users.<span className="text-blue-400">findOne</span>({'{'} email: <span className="text-green-400">"test@example.com"</span> {'}'});

            <span className="text-purple-400">return</span> doc;
          {'}'}
        </CodeBlock>

        <h3 id="error-handling" className="text-2xl font-bold text-white mt-8 mb-4">Error Handling</h3>
        <p className="text-gray-400 mb-4">Semua method SDK mengembalikan Promise. Anda harus menggunakan blok `try...catch` untuk menangani kegagalan jaringan, validasi, atau otentikasi.</p>
        <CodeBlock language="javascript">
          <span className="text-purple-400">try</span> {'{'}
            <span className="text-purple-400">await</span> client.collection(<span className="text-green-400">'protected'</span>).<span className="text-blue-400">insert</span>({'{} data: true {'}'});
          {'}'} <span className="text-purple-400">catch</span> (error) {'{'}
            <span className="text-purple-400">console</span>.<span className="text-blue-400">error</span>(<span className="text-green-400">`Error Code: ${error.message}`</span>);
          {'}'}
        </CodeBlock>
      </main>
    </div>
  );
}