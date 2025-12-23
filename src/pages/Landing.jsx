import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal, Globe, Zap, ShieldCheck, LayoutGrid, Cpu } from 'lucide-react';
import Button from '../components/ui/Button';
import { generateNanoId } from '../utils/uuid';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card'; // Pastikan Card ter-import jika diperlukan di masa depan

export default function Landing() {
  const navigate = useNavigate();

  const handleSmartLogin = () => {
    navigate(`/login/auth-${generateNanoId(8)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 }, // Tambahkan hidden
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } } // Tambahkan visible
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants} 
      className="relative isolate overflow-hidden bg-background"
    >
      
      {/* --- BACKGROUND EFFECTS --- */}
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
            <span>fitur enterprise sekarang tersedia di semua tingkatan</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-white font-sans mb-8 leading-tight">
            basis data untuk <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              aplikasi masa depan
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-textMuted leading-relaxed max-w-3xl mx-auto mb-12">
            wanzdb dirancang dari nol untuk penyimpanan data dengan latensi nol dan ketersediaan tinggi. kami menyediakan api dokumen yang kuat dan familiar yang memungkinkan anda berfokus secara eksklusif pada pembangunan fitur, bukan mengelola kluster kubernetes yang kompleks. sebarkan skema anda secara instan dan tingkatkan skala hingga jutaan permintaan tanpa hambatan.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="primary" className="w-full sm:w-auto font-bold h-12 px-8">
                mulai buat gratis
              </Button>
            </Link>
            <button 
              onClick={handleSmartLogin} 
              className="w-full sm:w-auto h-12 px-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition hover:border-sky-500/30 flex items-center justify-center gap-2"
            >
              <Terminal size={18} /> buka konsol
            </button>
          </motion.div>

          {/* Code Preview */}
          <motion.div variants={itemVariants} className="mt-20 mx-auto max-w-4xl transform hover:scale-[1.01] transition duration-500">
            <div className="rounded-xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500/20"></div><div className="w-3 h-3 rounded-full bg-yellow-500/20"></div><div className="w-3 h-3 rounded-full bg-green-500/20"></div></div>
                <div className="mx-auto text-xs text-textMuted font-mono">wanzdb-client.js</div>
              </div>
              <div className="p-6 md:p-8 text-left font-mono text-sm overflow-x-auto">
                 <pre>
                  <code className="language-javascript">
                    <span className="text-purple-400">import</span> {'{ client }'} <span className="text-purple-400">from</span> <span className="text-green-400">'wanzdb'</span>;<br/><br/>
                    <span className="text-gray-500">// hubungkan secara aman menggunakan uuid/api key anda</span><br/>
                    <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> client(<span className="text-yellow-400">"wanzdb://user:key@host"</span>);<br/>
                    <span className="text-purple-400">await</span> client.<span className="text-blue-400">connect</span>();<br/><br/>
                    <span className="gray-500">// lakukan kueri terindeks yang cepat</span><br/>
                    <span className="text-purple-400">const</span> hasil = <span className="text-purple-400">await</span> client.koleksi(<span className="text-green-400">'pesanan'</span>).<span className="text-blue-400">cari</span>({});<br/>
                    <span className="text-purple-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-green-400">`ditemukan ${hasil.length} catatan dalam ${hasil.latency}ms`</span>);
                  </code>
                 </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURES GRID (Detaill) --- */}
      <div id="features" className="py-24 bg-surface/30 border-y border-white/5 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-sky-400">direkayasa untuk keandalan</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              fitur platform yang menyederhanakan pengembangan
            </p>
            <p className="mt-4 text-gray-400">kami menawarkan seperangkat alat yang kuat dan jaminan arsitektur yang memastikan aplikasi anda tetap cepat, aman, dan dapat ditingkatkan skalanya tanpa batas sejak baris kode pertama hingga jutaan pengguna.</p>
          </div>

          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'arsitektur tepi global',
                desc: 'data anda secara otomatis di-shard dan direplikasi di seluruh jaringan tepi global kami. desain ini meminimalkan latensi, menempatkan data anda secara fisik lebih dekat ke pengguna akhir anda, memastikan pembacaan di bawah 50ms terlepas dari lokasi.',
                icon: Globe,
                color: 'text-sky-400'
              },
              {
                title: 'skalabilitas tanpa downtime',
                desc: 'beradaptasi secara instan terhadap lonjakan lalu lintas tanpa intervensi manual. arsitektur serverless kami menangani penyeimbangan beban dinamis, menjamin bahwa kinerja database anda tetap konsisten dan andal selama permintaan puncak.',
                icon: Zap,
                color: 'text-yellow-400'
              },
              {
                title: 'model keamanan terpadu',
                desc: 'implementasikan autentikasi dua faktor (2fa) untuk akses konsol dan kendalikan izin api key untuk permintaan terprogram. data dilindungi dengan enkripsi aes-256 saat diam dan dalam perjalanan (tls 1.3).',
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
                 siap sebarkan ide besar anda berikutnya?
               </h2>
               <p className="text-textMuted max-w-2xl mx-auto mb-10 relative z-10">
                 tingkat gratis menawarkan akses penuh ke semua fitur, termasuk api developer yang kuat,
                 untuk segera memulai proyek anda. tidak diperlukan kartu kredit untuk mulai mengembangkan.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                 <Link to="/docs" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition">
                    <LayoutGrid size={18} /> jelajahi dokumentasi
                 </Link>
                 <Link to="/register" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    buat instance database
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
             <Link to="/docs" className="hover:text-white transition">dokumentasi</Link>
             <a href="#" className="hover:text-white transition">status</a>
             <a href="#" className="hover:text-white transition">github</a>
           </div>
           <p className="text-gray-500 text-xs">
             © 2025 wanz technology. semua hak dilindungi.
           </p>
        </div>
      </footer>
    </motion.div>
  );
}