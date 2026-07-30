import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useAuth();

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="toast-item neu-raised"
            style={{
              borderLeftColor:
                toast.type === 'success'
                  ? '#10b981'
                  : toast.type === 'error'
                  ? '#f43f5e'
                  : '#4f46e5',
            }}
          >
            {toast.type === 'success' && (
              <CheckCircle2 size={20} style={{ color: '#10b981', flexShrink: 0 }} />
            )}
            {toast.type === 'error' && (
              <AlertCircle size={20} style={{ color: '#f43f5e', flexShrink: 0 }} />
            )}
            {toast.type === 'info' && (
              <Info size={20} style={{ color: '#4f46e5', flexShrink: 0 }} />
            )}

            <span style={{ flex: 1, lineHeight: 1.35 }}>{toast.message}</span>

            <button onClick={() => removeToast(toast.id)} className="toast-close-btn">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
