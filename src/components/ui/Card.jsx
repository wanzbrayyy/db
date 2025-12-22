import { cn } from '../../utils/cn';

// 1. Wrapper Utama
export default function Card({ children, className, ...props }) {
  return (
    <div 
      className={cn(
        "group relative rounded-xl border border-white/10 bg-surface/40 backdrop-blur-md shadow-2xl transition-all duration-300",
        "hover:border-sky-500/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-surface/60",
        className
      )} 
      {...props}
    >
      {/* Efek Gradient Halus di Background saat Hover */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {children}
    </div>
  );
}

// 2. Card Header (Untuk Judul)
export function CardHeader({ children, className }) {
  return (
    <div className={cn("p-6 pb-2", className)}>
      {children}
    </div>
  );
}

// 3. Card Title (Typography Khusus)
export function CardTitle({ children, className }) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)}>
      {children}
    </h3>
  );
}

// 4. Card Description (Text abu-abu di bawah judul)
export function CardDescription({ children, className }) {
  return (
    <p className={cn("text-sm text-textMuted mt-1.5", className)}>
      {children}
    </p>
  );
}

// 5. Card Content (Isi Utama)
export function CardContent({ children, className }) {
  return (
    <div className={cn("p-6 pt-2", className)}>
      {children}
    </div>
  );
}

// 6. Card Footer (Untuk Tombol di bawah)
export function CardFooter({ children, className }) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)}>
      {children}
    </div>
  );
}