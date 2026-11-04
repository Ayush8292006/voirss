import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="text-5xl md:text-7xl text-[#0A0A0A] mb-6 inline-block"
      >
        ✦
      </motion.div>

      <span className="text-xs font-mono tracking-widest text-[#6B6B6B] uppercase mb-2">
        ERROR 404
      </span>

      <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight uppercase text-[#0A0A0A] mb-4">
        LOST IN THE VOID.
      </h1>

      <p className="text-xs sm:text-sm font-mono text-[#6B6B6B] max-w-sm mb-8 leading-relaxed">
        The coordinates you requested do not exist in this reality or have already been archived.
      </p>

      <Link
        to="/"
        className="px-8 py-4 bg-[#0A0A0A] text-white rounded-full font-heading font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg active:scale-95"
      >
        RETURN TO THE SOCIETY ✦
      </Link>
    </div>
  );
}

