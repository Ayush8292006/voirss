import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '../store/uiStore';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const cursorMode = useUIStore((state) => state.cursorMode);

  useEffect(() => {
    // Only enable if pointer is fine (desktop mouse)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (window.innerWidth < 1024 || isTouch) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {cursorMode === 'default' && (
        <motion.div
          className="fixed top-0 left-0 w-2.5 h-2.5 bg-black rounded-full mix-blend-difference pointer-events-none"
          animate={{
            x: mousePosition.x - 5,
            y: mousePosition.y - 5,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.1 }}
        />
      )}

      {cursorMode === 'view' && (
        <motion.div
          className="fixed top-0 left-0 w-14 h-14 bg-black/90 text-white rounded-full flex items-center justify-center text-[10px] font-mono tracking-widest uppercase pointer-events-none shadow-xl border border-white/20"
          animate={{
            x: mousePosition.x - 28,
            y: mousePosition.y - 28,
            scale: 1,
          }}
          initial={{ scale: 0.5 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.1 }}
        >
          VIEW
        </motion.div>
      )}

      {cursorMode === 'drag' && (
        <motion.div
          className="fixed top-0 left-0 w-14 h-14 bg-black/90 text-white rounded-full flex items-center justify-center text-[10px] font-mono tracking-widest uppercase pointer-events-none shadow-xl border border-white/20"
          animate={{
            x: mousePosition.x - 28,
            y: mousePosition.y - 28,
            scale: 1,
          }}
          initial={{ scale: 0.5 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.1 }}
        >
          DRAG
        </motion.div>
      )}

      {cursorMode === 'star' && (
        <motion.div
          className="fixed top-0 left-0 text-black text-xl flex items-center justify-center pointer-events-none drop-shadow-md"
          animate={{
            x: mousePosition.x - 10,
            y: mousePosition.y - 12,
            rotate: 180,
          }}
          transition={{ rotate: { duration: 1.5, repeat: Infinity, ease: 'linear' } }}
        >
          ✦
        </motion.div>
      )}
    </div>
  );
}

