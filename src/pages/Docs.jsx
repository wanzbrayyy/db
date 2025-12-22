import { Link } from 'react-router-dom';
import { Book, ChevronRight, Code, Terminal, Server } from 'lucide-react';
import Card from '../components/ui/Card';

export default function Docs() {
  const sections = [
    { title: 'Getting Started', items: ['Introduction', 'Installation', 'Quick Start'] },
    { title: 'Core Concepts', items: ['Collections', 'Documents', 'Querying'] },
    { title: 'API Reference', items: ['Authentication', 'Database Methods', 'Error Handling'] },
  ];

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
                {section.items.map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="block text-sm text-textMuted hover:text-sky-400 transition-colors border-l border-white/5 pl-4 hover:border-sky-400">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-8 min-w-0">
        <div className="prose prose-invert max-w-none">
          
          <div className="mb-12 border-b border-white/10 pb-10">
            <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
            <p className="text-xl text-textMuted">
              Everything you need to build with WanzDB, from authentication to advanced queries.
            </p>
          </div>

          {/* Introduction */}
          <section id="introduction" className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Book className="text-sky-400" /> Introduction
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              WanzDB is a serverless, document-oriented database designed for modern applications. 
              It provides a familiar JSON-like interface but runs on a globally distributed edge network, 
              ensuring low latency and high availability.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
               <Card className="bg-surface/50 border-white/5 p-4">
                  <h3 className="font-bold text-white mb-2">Serverless</h3>
                  <p className="text-sm text-textMuted">No infrastructure to manage. Just API calls.</p>
               </Card>
               <Card className="bg-surface/50 border-white/5 p-4">
                  <h3 className="font-bold text-white mb-2">Type Safe</h3>
                  <p className="text-sm text-textMuted">Built-in TypeScript support and validation.</p>
               </Card>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="text-sky-400" /> Quick Start
            </h2>
            <p className="text-gray-400 mb-4">
              Connect to your database using the standard connection string format.
            </p>
            
            <div className="bg-[#050505] rounded-lg border border-white/10 p-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-textMuted border-b border-white/5 pb-2 mb-2">
                <Terminal size={12} /> bash
              </div>
              <code className="font-mono text-sm text-sky-300">
                npm install @wanzdb/client
              </code>
            </div>

            <p className="text-gray-400 mb-4">Initialize the client:</p>
            <div className="bg-[#050505] rounded-lg border border-white/10 p-4 overflow-x-auto">
               <pre className="font-mono text-sm">
<span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> <span className="text-yellow-200">WanzClient</span>(<span className="text-green-400">'wanzdb://admin:key@host'</span>);

<span className="text-purple-400">async function</span> <span className="text-blue-400">main</span>() {'{'}
  <span className="text-purple-400">await</span> client.<span className="text-blue-400">connect</span>();
  <span className="text-purple-400">const</span> doc = <span className="text-purple-400">await</span> client.<span className="text-blue-400">collection</span>(<span className="text-green-400">'users'</span>).<span className="text-blue-400">insert</span>({'{'} name: <span className="text-green-400">'Alice'</span> {'}'});
  <span className="text-purple-400">console</span>.<span className="text-blue-400">log</span>(doc);
{'}'}
               </pre>
            </div>
          </section>

           {/* API Reference */}
           <section id="api-reference" className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Server className="text-sky-400" /> API Reference
            </h2>
            <p className="text-gray-400 mb-6">
              Full list of available methods for collection manipulation.
            </p>
            
            <div className="space-y-4">
              {[
                { method: 'find(query)', desc: 'Search for documents matching the query object.' },
                { method: 'findOne(query)', desc: 'Return the first document matching the query.' },
                { method: 'insert(doc)', desc: 'Add a new document to the collection.' },
                { method: 'update(id, changes)', desc: 'Modify an existing document by ID.' },
                { method: 'delete(id)', desc: 'Remove a document permanently.' },
              ].map((api, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-white/5 rounded-lg bg-surface/30">
                  <code className="text-sky-400 font-mono text-sm min-w-[150px]">{api.method}</code>
                  <span className="text-textMuted text-sm">{api.desc}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}