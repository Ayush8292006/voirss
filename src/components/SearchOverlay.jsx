import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';
import { PRODUCTS } from '../data/products';

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');

  const trendingTags = ['BROKE BUT RICH', 'HEART BREAK CLUB', 'VS FACE', 'OVERSIZED', '240 GSM', 'COMIC'];

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.type.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl text-white flex flex-col p-4 sm:p-8"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center max-w-4xl mx-auto w-full mb-6">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            SEARCH THE VOID ARCHIVE
          </span>
          <button
            onClick={closeSearch}
            aria-label="Close search"
            className="p-2 text-zinc-400 hover:text-white rounded-full border border-zinc-800 hover:border-zinc-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Big Search Input */}
        <div className="max-w-4xl mx-auto w-full mb-8">
          <div className="relative border-b-2 border-zinc-700 focus-within:border-white transition-colors pb-3">
            <input
              type="text"
              autoFocus
              placeholder="SEARCH TEES, GRAPHICS, DROPS..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white placeholder-zinc-700 outline-none pr-10"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Trending Searches */}
          {!query && (
            <div className="mt-6">
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-500 block mb-3">
                TRENDING SEARCHES
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 hover:border-zinc-400 hover:text-white text-xs font-mono tracking-wider text-zinc-300 transition-all active:scale-95 flex items-center space-x-1"
                  >
                    <span>✦</span>
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Container */}
        <div className="max-w-4xl mx-auto w-full flex-1 overflow-y-auto pr-2 no-scrollbar">
          {query.trim() && (
            <>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
                RESULTS ({filteredProducts.length})
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 text-zinc-500 font-mono text-sm">
                  No drops found for "{query}". Try "Heart Break" or "Broke".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={closeSearch}
                      className="group flex space-x-3 p-3 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-600 rounded-xl transition-all"
                    >
                      <div className="w-16 h-20 bg-zinc-800 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <span className="text-xs font-heading font-bold uppercase tracking-tight text-white group-hover:text-zinc-200">
                          {product.name}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 mt-1">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 mt-0.5">
                          {product.badge || 'Heavyweight 240 GSM'}
                        </span>
                      </div>
                      <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

