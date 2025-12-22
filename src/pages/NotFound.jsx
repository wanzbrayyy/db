import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#09090b] text-center p-4">
      <h1 className="text-9xl font-bold text-white/10 select-none">404</h1>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-6">
         <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
         <p className="text-gray-400">While you are lost, click the box to score!</p>
         
         {/* Mini Game */}
         <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sky-400 font-mono text-xl mb-4">Score: {score}</p>
            <button 
               onClick={() => setScore(s => s + 1)}
               className="w-32 h-32 bg-sky-500 rounded-full hover:scale-90 active:scale-95 transition-all shadow-[0_0_30px_rgba(14,165,233,0.5)] text-black font-bold"
            >
               CLICK ME!
            </button>
         </div>

         <Link to="/dashboard">
            <Button variant="secondary" className="mt-8">Return to Dashboard</Button>
         </Link>
      </div>
    </div>
  );
}