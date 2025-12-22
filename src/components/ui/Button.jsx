import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Button({ 
  children, variant = 'primary', size = 'md', isLoading, className, ...props 
}) {
  const variants = {
    // Primary: Putih Solid (Sangat kontras di background hitam)
    primary: "bg-white text-black hover:bg-gray-200 border-transparent shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    
    // Brand: Sekarang pakai Sky Blue atau Putih, bukan Ungu. 
    // Kita samakan dengan primary agar "clean".
    brand: "bg-white text-black hover:bg-gray-200 border-transparent shadow-lg",
    
    // Secondary: Outline
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40",
    
    danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
    ghost: "bg-transparent hover:bg-white/5 text-textMuted hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base"
  };

  return (
    <button 
      disabled={isLoading}
      className={cn(
        "rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
      {children}
    </button>
  );
}