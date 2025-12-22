import { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Input({ 
  label, 
  error, 
  icon: Icon, // Icon Kiri (Optional)
  type = "text",
  className, 
  ...props 
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  
  // Toggle logic untuk password
  const togglePassword = () => setShowPassword(!showPassword);
  const currentType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full space-y-2">
      {/* Label dengan style clean */}
      {label && (
        <label className="text-sm font-medium text-textMuted peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1">
          {label}
        </label>
      )}

      <div className="relative group">
        {/* Icon Kiri (Jika ada) */}
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted transition-colors group-focus-within:text-sky-400">
            <Icon size={18} />
          </div>
        )}

        {/* Input Field Utama */}
        <input 
          type={currentType}
          className={cn(
            "flex h-11 w-full rounded-lg border bg-surface/50 px-3 py-2 text-sm text-white shadow-sm transition-all duration-200",
            "border-white/10 placeholder:text-white/20",
            "focus:border-sky-500/50 focus:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            Icon ? "pl-10" : "pl-4", // Geser text jika ada icon kiri
            isPassword ? "pr-10" : "pr-4", // Geser text jika ada icon mata
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />

        {/* Toggle Password Eye Icon (Otomatis muncul jika type password) */}
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-white transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {/* Error Message dengan Icon */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-xs mt-1.5 animate-pulse ml-1">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}