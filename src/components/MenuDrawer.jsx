import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Instagram, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';

export default function MenuDrawer() {
  const { isMenuOpen, closeMenu } = useUIStore();

  const menuItems = [
    { label: 'HOME', path: '/' },
    { label: 'NEW ARRIVALS', path: '/shop?filter=new' },
    { label: 'SHOP ALL TEES', path: '/shop' },
    { label: 'DROPS ARCHIVE', path: '/#featured-drop' },
    { label: 'LOOKBOOK', path: '/#lookbook' },
    { label: 'ABOUT SOCIETY', path: '/about' },
    { label: 'ORDER SUPPORT', path: '/contact' },
  ];

  if (!isMenuOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMenu}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Left Slide Panel */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-xs sm:max-w-sm h-full bg-[#0A0A0A] text-white p-6 flex flex-col justify-between z-10 border-r border-zinc-800"
        >
          {/* Top header */}
          <div>
            <div className="flex justify-between items-center pb-6 border-b border-zinc-800">
              <img
                src="/logo/void-logo-chrome.png"
                alt="VOID SOCIETY"
                className="h-8 w-auto object-contain"
              />
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="p-1.5 text-zinc-400 hover:text-white rounded-full border border-zinc-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Staggered Navigation Links */}
            <nav className="mt-8 space-y-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className="group flex items-center justify-between text-lg sm:text-xl font-heading font-black tracking-tight uppercase hover:text-zinc-400 transition-colors py-1"
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      size={16}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-500"
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Bottom info */}
          <div className="pt-6 border-t border-zinc-800 space-y-4">
            <div className="text-xs font-mono text-zinc-400 flex items-center space-x-2">
              <span className="text-white">✦</span>
              <span>240 GSM HEAVYWEIGHT STREETWEAR</span>
            </div>

            <div className="flex items-center space-x-4 text-zinc-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center space-x-1 text-xs font-mono"
              >
                <Instagram size={16} />
                <span>@VOIDSOCIETY</span>
              </a>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="hover:text-white transition-colors flex items-center space-x-1 text-xs font-mono"
              >
                <Mail size={16} />
                <span>SUPPORT</span>
              </Link>
            </div>

            <div className="text-[10px] font-mono text-zinc-600">
              © 2026 ALL RIGHTS RESERVED BY VOID SOCIETY
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

