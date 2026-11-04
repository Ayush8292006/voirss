import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';

export default function ProductCard({ product, priority = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { openQuickAdd, showToast, setCursorMode } = useUIStore();

  const isFavorited = isInWishlist(product.id);

  const handleQuickSizeAdd = (e, sizeObj) => {
    e.preventDefault();
    e.stopPropagation();
    if (!sizeObj.inStock) return;

    addItem(product, sizeObj.size, product.colors[0]?.name, 1);
    showToast(`Added ${product.name} (${sizeObj.size}) to Bag ✦`);
  };

  const handleMobilePlus = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickAdd(product);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist ✦');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col w-full"
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorMode('view');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorMode('default');
      }}
    >
      {/* 4:5 Tall Image Container */}
      <Link
        to={`/product/${product.slug}`}
        className="relative w-full aspect-[4/5] bg-void-studio overflow-hidden block rounded-none select-none"
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Second Image on Hover (Back view) */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} Back`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* BADGES: Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span
              className={`text-[10px] tracking-widest uppercase font-mono font-semibold px-2 py-0.5 rounded-sm shadow-sm ${
                product.badge.toLowerCase().includes('sale')
                  ? 'bg-void-sale text-white'
                  : product.badge.toLowerCase().includes('sold')
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-white text-[#0A0A0A] border border-[#E2E2E0]'
              }`}
            >
              {product.badge}
            </span>
          )}

          {product.matureGraphic && (
            <span className="text-[9px] tracking-wider uppercase font-mono font-medium px-1.5 py-0.5 bg-black/80 text-zinc-300 backdrop-blur-sm rounded-sm">
              18+ Mature
            </span>
          )}
        </div>

        {/* WISHLIST BUTTON: Top Right */}
        <button
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 ${
            isFavorited ? 'text-void-sale opacity-100' : 'text-[#0A0A0A] opacity-0 group-hover:opacity-100'
          } md:shadow-sm`}
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            fill={isFavorited ? 'currentColor' : 'none'}
          />
        </button>

        {/* MOBILE QUICK ADD BUTTON: Bottom Right (+) */}
        <button
          onClick={handleMobilePlus}
          aria-label="Quick add"
          className="md:hidden absolute bottom-2.5 right-2.5 z-20 w-9 h-9 rounded-full bg-white/95 text-[#0A0A0A] shadow-md flex items-center justify-center active:scale-90 transition-transform"
        >
          <Plus size={18} strokeWidth={2} />
        </button>

        {/* DESKTOP QUICK-ADD SLIDE-UP PANEL: Sizes Pills */}
        <div
          className={`hidden md:block absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-[#E2E2E0] transition-all duration-300 ease-out z-20 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="text-[10px] tracking-widest font-mono uppercase text-[#6B6B6B] mb-1.5 flex justify-between items-center">
            <span>QUICK ADD SIZE</span>
            <span className="text-[9px] text-[#A8A8A8]">240 GSM</span>
          </div>

          <div className="flex flex-wrap gap-1.5 justify-start">
            {product.sizes.map((s) => (
              <button
                key={s.size}
                disabled={!s.inStock}
                onClick={(e) => handleQuickSizeAdd(e, s)}
                className={`min-w-[32px] h-7 px-1.5 text-[11px] font-mono tracking-wider uppercase rounded-full border transition-all duration-150 flex items-center justify-center ${
                  !s.inStock
                    ? 'border-[#E2E2E0] text-[#A8A8A8] line-through cursor-not-allowed bg-zinc-100/50'
                    : 'border-[#E2E2E0] bg-white text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] active:scale-95'
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>
      </Link>

      {/* PRODUCT INFO BELOW IMAGE */}
      <div className="pt-2.5 pb-1 flex flex-col">
        <Link
          to={`/product/${product.slug}`}
          className="text-xs sm:text-sm font-heading font-bold uppercase tracking-tight text-[#0A0A0A] hover:underline transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* PRICE ROW */}
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs sm:text-sm font-bold font-mono text-[#0A0A0A]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs font-mono text-[#A8A8A8] line-through">
              ₹{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

