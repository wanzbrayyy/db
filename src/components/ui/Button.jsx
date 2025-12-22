import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Button({ 
  children, variant = 'primary', size = 'md', isLoading, className, ...props 
}) {
  const variants = {
    // Tombol Utama: Putih solid di tema gelap (Standar Modern)
    primary: "bg-white text-black hover:bg-gray-200 border-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)]",
    
    // Tombol Brand: Ungu Neon
    brand: "bg-primary text-white hover:bg-primary-glow shadow-[0_0_20px_rgba(124,58,237,0.4)] border-transparent",
    
    // Tombol Secondary: Outline tipis
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40",
    
    // Tombol Danger
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