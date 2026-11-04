import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: star, 1: logo, 2: society & shine, 3: exit
  const [counter, setCounter] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check session storage
    const hasSeenIntro = sessionStorage.getItem('void_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro) {
      if (onComplete) onComplete();
      return;
    }

    setShouldShow(true);

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        sessionStorage.setItem('void_intro_seen', 'true');
        setShouldShow(false);
        if (onComplete) onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }

    // Counter animation 0 -> 100
    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(counterInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 45);

    // Sequence stages
    const t1 = setTimeout(() => setStage(1), 600); // Logo entrance
    const t2 = setTimeout(() => setStage(2), 1400); // Shine + Society text
    const t3 = setTimeout(() => {
      setStage(3); // Exit curtains
      sessionStorage.setItem('void_intro_seen', 'true');
    }, 2800);
    const t4 = setTimeout(() => {
      setShouldShow(false);
      if (onComplete) onComplete();
    }, 3500);

    return () => {
      clearInterval(counterInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('void_intro_seen', 'true');
    setShouldShow(false);
    if (onComplete) onComplete();
  };

  if (!shouldShow) return null;

  const societyLetters = "SOCIETY".split("");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center overflow-hidden">
        {/* Top curtain */}
        <motion.div
          initial={{ y: 0 }}
          animate={stage === 3 ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 w-full h-1/2 bg-[#0A0A0A] z-10 border-b border-white/5"
        />

        {/* Bottom curtain */}
        <motion.div
          initial={{ y: 0 }}
          animate={stage === 3 ? { y: '100%' } : { y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0A0A0A] z-10 border-t border-white/5"
        />

        {/* Content Container */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-6 text-center select-none">
          {/* Stage 0: 4-point star pulsing */}
          {stage === 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 180, opacity: 1 }}
              exit={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-white text-5xl md:text-6xl drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]"
            >
              ✦
            </motion.div>
          )}

          {/* Stage 1 & 2: Chrome VOID Logo + Society reveal */}
          {stage >= 1 && stage < 3 && (
            <div className="flex flex-col items-center">
              {/* Logo with shine sweep */}
              <motion.div
                initial={{ scale: 0.88, opacity: 0, filter: 'blur(12px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden inline-block max-w-[280px] sm:max-w-[360px] md:max-w-[480px]"
              >
                <img
                  src="/logo/void-logo-chrome.png"
                  alt="VOID SOCIETY"
                  className="w-full h-auto object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]"
                />

                {/* Diagonal Chrome Shine Sweep */}
                {stage >= 2 && (
                  <motion.div
                    initial={{ x: '-150%' }}
                    animate={{ x: '250%' }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-25 pointer-events-none mix-blend-overlay"
                  />
                )}
              </motion.div>

              {/* Tagline / Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6 font-serif uppercase tracking-wideSerif text-zinc-400 text-xs sm:text-sm"
              >
                AUTUMN / WINTER 2026 ✦ DROP 01
              </motion.div>
            </div>
          )}

          {/* Bottom elements: Mono loading counter and Skip button */}
          <div className="fixed bottom-8 left-0 right-0 px-8 flex items-center justify-between z-30">
            <button
              onClick={handleSkip}
              className="text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-mono py-1 px-2.5 rounded border border-zinc-800 hover:border-zinc-500"
            >
              Skip ✦
            </button>

            <div className="font-mono text-xs tracking-widest text-zinc-400">
              {String(Math.min(100, counter)).padStart(3, '0')} %
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

