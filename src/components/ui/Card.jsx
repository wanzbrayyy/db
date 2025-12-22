import { cn } from '../../utils/cn';

export default function Card({ children, className }) {
  return (
    <div className={cn(
      "bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-xl",
      className
    )}>
      {children}
    </div>
  );
}