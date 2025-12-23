import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Portal */}
      <div className="fixed bottom-4 right-4 z-[9999]">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className={cn(
                "w-full max-w-sm p-4 rounded-xl shadow-lg mb-3 border backdrop-blur-sm cursor-pointer flex items-start gap-3",
                toast.type === 'success' && 'bg-emerald-800/80 border-emerald-500/50',
                toast.type === 'error' && 'bg-red-800/80 border-red-500/50',
                toast.type === 'info' && 'bg-sky-800/80 border-sky-500/50'
              )}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 400, transition: { duration: 0.3 } }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              onClick={() => removeToast(toast.id)}
            >
              <div className="shrink-0">
                {toast.type === 'success' && <CheckCircle size={20} className="text-emerald-400" />}
                {toast.type === 'error' && <XCircle size={20} className="text-red-400" />}
                {toast.type === 'info' && <Info size={20} className="text-sky-400" />}
              </div>
              <div>
                <p className="font-semibold text-white">{toast.type.toUpperCase()}</p>
                <p className="text-sm text-gray-300 mt-1">{toast.message}</p>
              </div>
              <button className="ml-auto shrink-0 text-gray-500 hover:text-white" onClick={(e) => { e.stopPropagation(); removeToast(toast.id); }}>
                  <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);