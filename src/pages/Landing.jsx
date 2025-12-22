import { Link } from 'react-router-dom';
import { Database, Shield, Zap, ArrowRight, Code } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Landing() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
              Versi 2.0 Kini Tersedia
            </span>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Database Serverless <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Generasi Berikutnya
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Kelola data JSON Anda dengan ID unik 50-digit, keamanan enkripsi lokal, dan antarmuka dashboard yang memukau. Tanpa setup backend yang rumit.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link to="/register">
              <Button size="lg" className="rounded-full px-8">
                Mulai Gratis <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/login" className="text-sm font-semibold leading-6 text-white hover:text-indigo-400 transition">
              Live Demo <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        
        {/* Right Hero Visual */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="rounded-xl bg-slate-900/50 border border-slate-700 p-2 ring-1 ring-inset ring-slate-700/50 lg:rounded-2xl lg:p-4 shadow-2xl shadow-indigo-500/20">
              <div className="bg-slate-950 rounded-lg p-6 font-mono text-xs text-gray-400 overflow-hidden">
                 <div className="flex gap-2 mb-4">
                   <div className="w-3 h-3 rounded-full bg-red-500"/>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                   <div className="w-3 h-3 rounded-full bg-green-500"/>
                 </div>
                 <p><span className="text-purple-400">const</span> <span className="text-blue-400">user</span> = <span className="text-yellow-400">await</span> db.create({'{'}</p>
                 <p className="pl-4"><span className="text-sky-300">_id</span>: <span className="text-green-400">"lq5n9z... (50 chars)"</span>,</p>
                 <p className="pl-4"><span className="text-sky-300">role</span>: <span className="text-green-400">"admin"</span>,</p>
                 <p className="pl-4"><span className="text-sky-300">status</span>: <span className="text-green-400">"active"</span></p>
                 <p>{'}'});</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}