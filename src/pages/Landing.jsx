import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal, Globe, Zap, ShieldCheck, Database, LayoutGrid } from 'lucide-react';
import Button from '../components/ui/Button';
import { generateNanoId } from '../utils/uuid';

export default function Landing() {
  const navigate = useNavigate();

  const handleSmartLogin = () => {
    navigate(`/login/auth-${generateNanoId(8)}`);
  };

  return (
    <div className="relative isolate overflow-hidden bg-background">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-24 pb-20 lg:pt-36 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-medium text-white mb-8 hover:bg-white/10 transition cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span>v2.4 is now available in Public Beta</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white font-sans mb-8 leading-tight">
            The Database for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              Modern Applications
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-textMuted leading-relaxed max-w-2xl mx-auto mb-12">
            Experience the speed of an in-memory datastore with the durability of a document database. 
            Built for developers who ship fast.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="primary" className="w-full sm:w-auto font-bold h-12 px-8">
                Start Building Free
              </Button>
            </Link>
            <button 
              onClick={handleSmartLogin} 
              className="w-full sm:w-auto h-12 px-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition hover:border-sky-500/30 flex items-center justify-center gap-2"
            >
              <Terminal size={18} /> Open Console
            </button>
          </div>

          {/* Code Preview */}
          <div className="mt-20 mx-auto max-w-4xl transform hover:scale-[1.01] transition duration-500">
            <div className="rounded-xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
                <div className="mx-auto text-xs text-textMuted font-mono">server.js</div>
              </div>
              <div className="p-6 md:p-8 text-left font-mono text-sm overflow-x-auto">
                 <pre>
                  <code className="language-javascript">
                    <span className="text-purple-400">import</span> <span className="text-yellow-100">{`{ DB }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@wanzdb/client'</span>;<br/><br/>
                    <span className="text-gray-500">// Initialize instant connection</span><br/>
                    <span className="text-purple-400">const</span> user <span className="text-sky-400">=</span> <span className="text-purple-400">await</span> DB.<span className="text-blue-400">create</span>(<span className="text-green-400">'users'</span>, <span className="text-yellow-100">{`{`}</span><br/>
                    &nbsp;&nbsp;<span className="text-sky-300">email</span>: <span className="text-green-400">'dev@wanzdb.com'</span>,<br/>
                    &nbsp;&nbsp;<span className="text-sky-300">role</span>: <span className="text-green-400">'admin'</span>,<br/>
                    &nbsp;&nbsp;<span className="text-sky-300">features</span>: <span className="text-yellow-100">['fast', 'secure']</span><br/>
                    <span className="text-yellow-100">{`}`});</span><br/><br/>
                    <span className="text-gray-500">// Returns strictly typed JSON</span><br/>
                    <span className="text-purple-400">console</span>.<span className="text-blue-400">log</span>(user._id); <span className="text-gray-500">// "8k92Lm..." (Collision-free ID)</span>
                  </code>
                 </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <div id="features" className="py-24 bg-surface/30 border-y border-white/5 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Global Edge Network',
                desc: 'Your data is automatically replicated across multiple regions for low-latency access worldwide.',
                icon: Globe,
                color: 'text-sky-400'
              },
              {
                title: 'Instant Scalability',
                desc: 'Handle millions of requests per second without managing a single server or cluster.',
                icon: Zap,
                color: 'text-yellow-400'
              },
              {
                title: 'Enterprise Security',
                desc: 'Encryption at rest and in transit. Role-based access control built directly into the core.',
                icon: ShieldCheck,
                color: 'text-emerald-400'
              },
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.08] transition duration-300">
                <div className={`w-12 h-12 rounded-lg bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition ${feature.color}`}>
                  <feature.icon />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-textMuted leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- TECH STACK / CTA --- */}
      <div className="py-24">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-b from-[#111] to-black border border-white/10 p-8 md:p-16 text-center overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20 pointer-events-none"></div>
               
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
                 Ready to deploy?
               </h2>
               <p className="text-textMuted max-w-2xl mx-auto mb-10 relative z-10">
                 Join thousands of developers building the next generation of web applications.
                 No credit card required for development.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                 <Link to="/docs" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition">
                    <LayoutGrid size={18} /> Read Documentation
                 </Link>
                 <Link to="/register" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Create Database
                 </Link>
               </div>
            </div>
         </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-background py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2 opacity-80">
             <Database className="text-sky-500" size={20} />
             <span className="text-lg font-bold font-mono text-white">wanzdb</span>
           </div>
           <div className="flex gap-8 text-sm text-textMuted">
             <Link to="/docs" className="hover:text-white transition">Documentation</Link>
             <a href="#" className="hover:text-white transition">Status</a>
             <a href="#" className="hover:text-white transition">GitHub</a>
             <a href="#" className="hover:text-white transition">Twitter</a>
           </div>
           <p className="text-textMuted text-xs">
             © 2025 Wanz Technology. All rights reserved.
           </p>
        </div>
      </footer>
    </div>
  );
}