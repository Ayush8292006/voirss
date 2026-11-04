import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../store/uiStore';

export default function Toast() {
  const { toast, hideToast } = useUIStore();

  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed top-12 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto"
        >
          <div
            onClick={hideToast}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#0A0A0A] text-white text-xs font-mono tracking-wider shadow-2xl border border-zinc-700/60 cursor-pointer active:scale-95"
          >
            <span className="text-zinc-400">✦</span>
            <span>{toast.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

