import { Link, useNavigate } from 'react-router-dom';
import { Database, Shield, Zap, ArrowRight, Code, Terminal, Globe, Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import { generateNanoId } from '../utils/uuid';

export default function Landing() {
  const navigate = useNavigate();

  const handleSmartLogin = () => {
    navigate(`/login/auth-${generateNanoId(8)}`);
  };

  return (
    <div className="relative isolate overflow-hidden">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-14 lg:pt-20">
        {/* Background Effects */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="flex items-center gap-x-6">
              <div className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                v2.0 Stable Release
              </div>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>Baru: 50-Digit UUID</span>
              </span>
            </div>
            <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-white sm:text-6xl font-mono">
              wanzdb<span className="text-indigo-500">_</span>
            </h1>
            <p className="mt-4 text-3xl font-bold text-slate-200">
              Database JSON Serverless <br/> untuk Modern Web.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Kelola data JSON Anda dengan ID unik 50-digit, keamanan enkripsi lokal, dan antarmuka dashboard responsif. Tanpa setup backend, hanya JavaScript murni.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/register">
                <Button size="lg" className="rounded-full px-8 bg-white text-slate-900 hover:bg-slate-200">
                  Buat Database Gratis <ArrowRight size={18} />
                </Button>
              </Link>
              <button onClick={handleSmartLogin} className="text-sm font-semibold leading-6 text-white hover:text-indigo-400 transition">
                Masuk ke Console <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
          
          {/* Code Visualization */}
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <div className="relative rounded-xl bg-slate-900/80 border border-slate-700 shadow-2xl backdrop-blur-sm p-6 ring-1 ring-white/10">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-4">
                <Terminal size={18} className="text-slate-400" />
                <span className="text-sm text-slate-400 font-mono">wanzdb-cli — node</span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-gray-300 space-y-2">
                <p><span className="text-purple-400">const</span> db = <span className="text-yellow-400">require</span>(<span className="text-green-400">'wanzdb'</span>);</p>
                <p>&nbsp;</p>
                <p><span className="text-slate-500">// Auto-generate 50 char ID</span></p>
                <p><span className="text-purple-400">await</span> db.collection(<span className="text-green-400">'users'</span>).insert({'{'}</p>
                <p className="pl-4"><span className="text-blue-300">name</span>: <span className="text-green-400">"Wanz Developer"</span>,</p>
                <p className="pl-4"><span className="text-blue-300">role</span>: <span className="text-green-400">"Super Admin"</span></p>
                <p>});</p>
                <p>&nbsp;</p>
                <p><span className="text-slate-500">// Output:</span></p>
                <p className="text-green-400">{'{'}</p>
                <p className="pl-4 text-green-400">"_id": "k8L2n... [50 chars]"</p>
                <p className="text-green-400">{'}'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <div id="features" className="bg-slate-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">Deploy Lebih Cepat</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Semua yang Anda butuhkan untuk prototyping
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'UUID Ultra Panjang',
                  description: 'Setiap dokumen mendapat ID unik 50 karakter yang mustahil diduplikasi.',
                  icon: Shield,
                },
                {
                  name: 'Instant Performance',
                  description: 'Dibangun di atas Vite dan LocalStorage untuk latensi nol milidetik.',
                  icon: Zap,
                },
                {
                  name: 'Developer Friendly',
                  description: 'Export dan Import data JSON Anda dengan mudah melalui dashboard.',
                  icon: Code,
                },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <feature.icon className="h-5 w-5 flex-none text-indigo-400" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* --- STATS SECTION --- */}
      <div className="bg-slate-950 py-24 sm:py-32 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {[
              { id: 1, name: 'Documents Created', value: '1M+' },
              { id: 2, name: 'Average Latency', value: '< 10ms' },
              { id: 3, name: 'Uptime', value: '99.9%' },
            ].map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-400">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
           <div className="flex justify-center items-center gap-2 mb-4">
             <Database className="text-indigo-500" />
             <span className="text-2xl font-bold font-mono text-white">wanzdb</span>
           </div>
           <p className="text-slate-500 text-sm">
             &copy; 2025 Wanz Technology. All rights reserved.
           </p>
        </div>
      </footer>
    </div>
  );
}