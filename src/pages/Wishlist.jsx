import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { items: wishlistIds, clearWishlist } = useWishlistStore();
  const showToast = useUIStore((state) => state.showToast);

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="w-full min-h-screen bg-[#F5F5F3] pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-end justify-between pb-6 border-b border-[#E2E2E0] mb-8">
        <div>
          <span className="text-xs font-mono font-semibold text-[#6B6B6B] tracking-label uppercase flex items-center space-x-1.5 mb-1.5">
            <span>✦</span>
            <span>SAVED ARCHIVES</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-[#0A0A0A]">
            WISHLIST ({savedProducts.length})
          </h1>
        </div>

        {savedProducts.length > 0 && (
          <button
            onClick={() => {
              clearWishlist();
              showToast('Wishlist cleared ✦');
            }}
            className="text-xs font-mono text-zinc-500 hover:text-black underline uppercase"
          >
            Clear all
          </button>
        )}
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E2E0] p-12 text-center max-w-md mx-auto">
          <Heart size={36} className="mx-auto mb-3 text-zinc-400" strokeWidth={1.5} />
          <h3 className="font-heading font-black text-lg uppercase tracking-wider text-[#0A0A0A]">
            NO SAVED PIECES YET
          </h3>
          <p className="text-xs text-[#6B6B6B] font-mono mt-1 mb-6">
            Tap the heart icon on any oversized tee to save it for later.
          </p>
          <Link
            to="/shop"
            className="inline-block px-7 py-3.5 bg-[#0A0A0A] text-white text-xs font-heading font-black uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors shadow-md"
          >
            EXPLORE THE COLLECTION ✦
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-5">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}

