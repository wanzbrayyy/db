import { Link, useNavigate } from 'react-router-dom';
import { Shield, Zap, ArrowRight, Terminal, Code, Cpu } from 'lucide-react';
import Button from '../components/ui/Button';
import { generateNanoId } from '../utils/uuid';

export default function Landing() {
  const navigate = useNavigate();

  const handleSmartLogin = () => {
    navigate(`/login/auth-${generateNanoId(8)}`);
  };

  return (
    <div className="relative isolate overflow-hidden bg-background">
      
      {/* --- BACKGROUND BLOBS (GANTI WARNA JADI BIRU MIST/CYAN) --- */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-[128px] opacity-5 animate-blob animation-delay-4000"></div>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-sm font-medium text-white mb-6 hover:bg-white/10 transition cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                v2.0 Stable Release
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl font-mono mb-6">
                wanzdb<span className="text-sky-500 animate-pulse">_</span>
              </h1>
              
              <p className="text-xl text-textMuted leading-relaxed max-w-2xl">
                Database JSON Serverless dengan arsitektur <span className="text-white font-semibold">Local-First</span>. 
                Generate <span className="text-sky-400 font-mono">50-char UUID</span> secara instan tanpa backend latency.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" variant="primary" className="w-full sm:w-auto font-bold">
                    Buat Database <ArrowRight size={18} />
                  </Button>
                </Link>
                <button 
                  onClick={handleSmartLogin} 
                  className="w-full sm:w-auto px-8 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition hover:border-sky-500/30"
                >
                  Live Console
                </button>
              </div>
            </div>
            
            {/* Right Content (Floating Code) - NO PURPLE SYNTAX */}
            <div className="lg:col-span-5 mt-16 lg:mt-0 animate-float">
              <div className="relative rounded-xl bg-[#0a0a0a] border border-white/10 shadow-2xl p-1">
                {/* Window Controls */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  <div className="ml-auto text-xs text-textMuted font-mono flex items-center gap-1">
                    <Terminal size={12} /> bash
                  </div>
                </div>

                {/* Code Content (GANTI WARNA UNGU JADI BIRU/PUTIH) */}
                <div className="p-6 font-mono text-sm overflow-hidden">
                  <div className="space-y-1">
                    <p className="text-textMuted">$ npm install wanzdb</p>
                    <p className="text-emerald-500">✔ Added 1 package in 50ms</p>
                    <p className="text-textMuted mt-4">$ node index.js</p>
                    <p className="text-sky-400">const <span className="text-white">db</span> = require('<span className="text-emerald-400">wanzdb</span>');</p>
                    <p className="text-sky-400">await <span className="text-yellow-200">db.insert</span>({'{'}</p>
                    <p className="pl-4 text-white">name: <span className="text-emerald-400">'Project Stealth'</span>,</p>
                    <p className="pl-4 text-white">status: <span className="text-emerald-400">'active'</span></p>
                    <p className="text-sky-400">{'}'});</p>
                    <p className="mt-4 text-textMuted">// Result:</p>
                    <div className="p-3 bg-white/5 rounded border border-white/5 text-xs">
                      <p className="text-emerald-400">"id": "9jK2mP_... (50 chars)"</p>
                      <p className="text-sky-400">"latency": "2ms"</p>
                    </div>
                  </div>
                </div>
                
                {/* Glow Effect behind card (BLUE/WHITE) */}
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-xl blur opacity-10 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div id="features" className="py-24 bg-surface/30 border-y border-white/5 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sky-400 font-semibold tracking-wide uppercase text-sm">Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Dibangun untuk Kecepatan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '50-Digit UUID',
                desc: 'Collision-proof ID generation menggunakan timestamp + random entropy.',
                icon: Shield,
                color: 'text-emerald-400'
              },
              {
                title: 'Zero Latency',
                desc: 'Operasi I/O terjadi di memory browser. Lebih cepat dari Redis remote.',
                icon: Zap,
                color: 'text-yellow-400'
              },
              {
                title: 'Developer API',
                desc: 'Syntax mirip MongoDB. Mudah dipelajari dalam 5 menit.',
                icon: Code,
                color: 'text-sky-400'
              },
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-sky-500/30 hover:bg-white/[0.08] transition duration-300">
                <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition ${feature.color}`}>
                  <feature.icon />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-textMuted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-background py-12">
        <div className="text-center">
           <div className="flex justify-center items-center gap-2 mb-4 opacity-80 hover:opacity-100 transition">
             <Cpu className="text-sky-500" />
             <span className="text-xl font-bold font-mono text-white">wanzdb</span>
           </div>
           <p className="text-textMuted text-sm">
             &copy; 2025 Wanz Technology. <span className="text-white/20">|</span> Pure Code.
           </p>
        </div>
      </footer>
    </div>
  );
}