import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal, Globe, Zap, ShieldCheck, LayoutGrid, Cpu } from 'lucide-react';
import Button from '../components/ui/Button';
import { generateNanoId } from '../utils/uuid';
import { motion } from 'framer-motion';

export default function Landing() {
  const navigate = useNavigate();

  const handleSmartLogin = () => {
    navigate(`/login/auth-${generateNanoId(8)}`);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative isolate overflow-hidden bg-background">
      
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Catatan: Blur besar ini bisa menyebabkan isu di beberapa device. Opacity aman. */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-24 pb-20 lg:pt-36 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-medium text-white mb-8 hover:bg-white/10 transition cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span>Enterprise-Grade Features Now Available for All Tiers</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-white font-sans mb-8 leading-tight">
            The Database for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              Future-Proof Applications
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-textMuted leading-relaxed max-w-3xl mx-auto mb-12">
            **WanzDB** is engineered from the ground up for zero-latency, high-availability data storage. We provide a robust, familiar Document API that lets you focus exclusively on building features, not managing complex Kubernetes clusters or sharding configurations. Deploy your schema instantly and scale to millions of requests without friction.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
          </motion.div>

          {/* Code Preview */}
          <motion.div variants={itemVariants} className="mt-20 mx-auto max-w-4xl transform hover:scale-[1.01] transition duration-500">
            {/* Memastikan background solid di sini */}
            <div className="rounded-xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div>
                <div className="mx-auto text-xs text-textMuted font-mono">wanzdb-client.js</div>
              </div>
              <div className="p-6 md:p-8 text-left font-mono text-sm overflow-x-auto">
                 <pre>
                  <code className="language-javascript">
                    <span className="text-purple-400">import</span> {'{ Client }'} <span className="text-purple-400">from</span> <span className="text-green-400">'wanzdb'</span>;<br/><br/>
                    <span className="text-gray-500">// Connect securely using your UUID/API Key</span><br/>
                    <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> Client(<span className="text-yellow-400">"wanzdb://user:key@host"</span>);<br/>
                    <span className="text-purple-400">await</span> client.<span className="text-blue-400">connect</span>();<br/><br/>
                    <span className="gray-500">// Perform a fast, indexed query</span><br/>
                    <span className="text-purple-400">const</span> results = <span className="text-purple-400">await</span> client.collection(<span className="text-green-400">'orders'</span>).<span className="text-blue-400">find</span>({});<br/>
                    <span className="text-purple-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-green-400">`Found ${results.length} records in ${results.latency}ms`</span>);
                  </code>
                 </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- FEATURES GRID (Detaill) --- */}
      <div id="features" className="py-24 bg-surface/30 border-y border-white/5 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-sky-400">Engineered for Reliability</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Platform Features That Simplify Development
            </p>
            <p className="mt-4 text-gray-400">We offer a robust set of tools and architectural guarantees that ensure your application remains fast, secure, and infinitely scalable from the first line of code to millions of users.</p>
          </div>

          <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Global Edge Architecture',
                desc: 'Your data is automatically sharded and replicated across our global edge network. This design minimizes latency, placing your data physically closer to your end-users, ensuring sub-50ms reads regardless of location.',
                icon: Globe,
                color: 'text-sky-400'
              },
              {
                title: 'Zero-Downtime Scalability',
                desc: 'Instantly adapt to traffic spikes without manual intervention. Our serverless architecture handles dynamic load balancing, guaranteeing that your database performance remains consistent and reliable during peak demand.',
                icon: Zap,
                color: 'text-yellow-400'
              },
              {
                title: 'Unified Security Model',
                desc: 'Implement two-factor authentication (2FA) for console access and control API Key permissions for programmatic requests. Data is protected with AES-256 encryption both at rest and in transit (TLS 1.3).',
                icon: ShieldCheck,
                color: 'text-emerald-400'
              },
            ].map((feature) => (
              <motion.div 
                key={feature.title} 
                variants={itemVariants}
                className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-sky-500/30 hover:bg-white/[0.08] transition duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-black border border-white/10 flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-textMuted leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- CTA --- */}
      <div className="py-24">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-b from-[#111] to-black border border-white/10 p-8 md:p-16 text-center overflow-hidden relative">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
                 Ready to deploy your next big idea?
               </h2>
               <p className="text-textMuted max-w-2xl mx-auto mb-10 relative z-10">
                 The Free Tier offers full access to all features, including the robust Developer API, 
                 to get your project off the ground immediately. No credit card is required to start developing.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                 <Link to="/docs" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition">
                    <LayoutGrid size={18} /> Explore Documentation
                 </Link>
                 <Link to="/register" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Create Database Instance
                 </Link>
               </div>
            </div>
         </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-background py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2 opacity-80">
             <Cpu className="text-sky-500" size={20} />
             <span className="text-lg font-bold font-mono text-white">wanzdb</span>
           </div>
           <div className="flex gap-8 text-sm text-textMuted">
             <Link to="/docs" className="hover:text-white transition">Documentation</Link>
             <a href="#" className="hover:text-white transition">Status</a>
             <a href="#" className="hover:text-white transition">GitHub</a>
           </div>
           <p className="text-gray-500 text-xs">
             © 2025 Wanz Technology. All rights reserved.
           </p>
        </div>
      </footer>
    </motion.div>
  );
}