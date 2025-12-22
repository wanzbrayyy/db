import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function ModernAlert({ type, isOpen, onClose, message }) {
  if (!isOpen) return null;

  // Lottie URLs dari request Anda
  const lottieLoading = "https://lottie.host/embed/e3960de2-795c-4ae2-b4dc-38d7397c72f3/PpLoOqQzrH.lottie";
  const lottieSuccess = "https://lottie.host/embed/fd85ac68-b21c-43a2-98e6-0d5fa7780118/dtzYfLNDZu.lottie";

  const currentLottie = type === 'loading' ? lottieLoading : lottieSuccess;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-sm w-full relative">
        
        {/* Tombol Close (Hanya muncul jika bukan loading) */}
        {type !== 'loading' && (
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
          >
            <X size={20} />
          </button>
        )}

        {/* Lottie Iframe Wrapper */}
        <div className="w-48 h-48 mb-4 relative overflow-hidden rounded-full bg-white/5">
          <iframe 
            src={currentLottie} 
            className="w-full h-full border-0 pointer-events-none scale-150" // Scale diperbesar agar border lottie tidak terlihat
            title="Status Animation"
          ></iframe>
          {/* Overlay transparan agar iframe tidak mencuri fokus klik */}
          <div className="absolute inset-0 z-10"></div>
        </div>

        {/* Text Content */}
        <h3 className="text-xl font-bold text-white text-center mb-2">
          {type === 'loading' ? 'Processing...' : 'Success!'}
        </h3>
        <p className="text-gray-400 text-center text-sm leading-relaxed">
          {message}
        </p>

        {/* Auto redirect hint */}
        {type === 'success' && (
          <div className="mt-6 w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 animate-[width_2s_ease-out_forwards] w-0"></div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}