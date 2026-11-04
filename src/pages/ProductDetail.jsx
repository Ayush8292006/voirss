import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Ruler, Plus, Minus, Check, ChevronDown } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useUIStore } from '../store/uiStore';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Accordions state
  const [openAccordion, setOpenAccordion] = useState('details');

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { openSizeGuide, showToast, setCursorMode } = useUIStore();

  const isFavorited = isInWishlist(product.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Find first available size
    const firstInStock = product.sizes.find((s) => s.inStock)?.size || 'M';
    setSelectedSize(firstInStock);
    setSelectedColor(product.colors[0]?.name || 'Standard');
    setActiveImageIndex(0);
    setQuantity(1);
    setIsAdded(false);
  }, [product]);

  const handleAddToCart = () => {
    if (isAdded) return;
    addItem(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    showToast(`Added ${quantity}x ${product.name} (${selectedSize}) to Bag ✦`);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on VOID SOCIETY`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard ✦');
    }
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F5F3] pt-20 md:pt-28 pb-32 md:pb-24">
      
      {/* DESKTOP BREADCRUMB */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 mb-6">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#6B6B6B]">
          <Link to="/" className="hover:text-black">HOME</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black">TEES</Link>
          <span>/</span>
          <span className="text-black font-semibold uppercase">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12">
          
          {/* ==================== LEFT: IMAGE GALLERY ==================== */}
          <div className="lg:col-span-7">
            {/* MOBILE VIEW: Full-bleed Swipeable Carousel with Floating Actions */}
            <div className="md:hidden relative w-full aspect-[4/5] bg-void-studio overflow-hidden">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Floating Back Button Top Left */}
              <button
                onClick={() => navigate(-1)}
                aria-label="Back"
                className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-black flex items-center justify-center shadow-md active:scale-90 transition-transform"
              >
                <ArrowLeft size={18} strokeWidth={2} />
              </button>

              {/* Floating Share & Wishlist Top Right */}
              <div className="absolute top-4 right-4 z-20 flex space-x-2">
                <button
                  onClick={handleShare}
                  aria-label="Share"
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-black flex items-center justify-center shadow-md active:scale-90 transition-transform"
                >
                  <Share2 size={16} strokeWidth={2} />
                </button>
                <button
                  onClick={() => {
                    toggleWishlist(product.id);
                    showToast(isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist ✦');
                  }}
                  aria-label="Wishlist"
                  className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md active:scale-90 transition-transform ${
                    isFavorited ? 'text-void-sale' : 'text-black'
                  }`}
                >
                  <Heart size={18} strokeWidth={2} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Carousel Dot Indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeImageIndex === idx ? 'w-5 bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* DESKTOP VIEW: Stacked Vertical Editorial Gallery */}
            <div className="hidden md:flex flex-col space-y-4">
              {product.images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative w-full aspect-[4/5] bg-void-studio rounded-xl overflow-hidden group border border-[#E2E2E0]"
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} View ${idx + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {idx === 0 ? 'FRONT VIEW' : 'BACK PRINT'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ==================== RIGHT: STICKY INFO PANEL ==================== */}
          <div className="lg:col-span-5 px-4 sm:px-6 lg:px-0 -mt-6 sm:mt-0 relative z-10">
            <div className="bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 border border-[#E2E2E0] shadow-sm lg:sticky lg:top-28">
              
              {/* Badge & Subtitle */}
              <div className="flex items-center space-x-2 mb-2">
                {product.badge && (
                  <span
                    className={`text-[10px] tracking-widest uppercase font-mono font-semibold px-2 py-0.5 rounded ${
                      product.badge.toLowerCase().includes('sale')
                        ? 'bg-void-sale text-white'
                        : product.badge.toLowerCase().includes('sold')
                        ? 'bg-[#0A0A0A] text-white'
                        : 'bg-zinc-100 text-[#0A0A0A] border border-[#E2E2E0]'
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
                <span className="text-[11px] font-mono text-[#6B6B6B] uppercase tracking-wider">
                  240 GSM HEAVYWEIGHT COTTON
                </span>
              </div>

              {/* Title & Price */}
              <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase text-[#0A0A0A]">
                {product.name}
              </h1>

              <div className="flex items-baseline space-x-3 mt-3 pb-6 border-b border-[#E2E2E0]">
                <span className="text-2xl font-mono font-bold text-[#0A0A0A]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm font-mono text-[#A8A8A8] line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-mono text-emerald-700 font-semibold ml-2">
                  Tax included. Free shipping over ₹2,999
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed my-6 font-sans">
                {product.description}
              </p>

              {/* SIZE SELECTION (Caprii pill style) */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[11px] font-mono font-semibold tracking-label uppercase text-[#6B6B6B]">
                    SELECT SIZE
                  </span>
                  <button
                    onClick={openSizeGuide}
                    className="text-[11px] font-mono text-[#0A0A0A] hover:underline flex items-center space-x-1"
                  >
                    <Ruler size={13} />
                    <span>SIZE GUIDE</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        disabled={!s.inStock}
                        onClick={() => setSelectedSize(s.size)}
                        className={`min-w-[50px] h-10 px-3 rounded-full text-xs font-mono tracking-wider transition-all duration-150 flex items-center justify-center ${
                          !s.inStock
                            ? 'border border-[#E2E2E0] text-[#A8A8A8] line-through bg-zinc-100/60 cursor-not-allowed opacity-60'
                            : isSelected
                            ? 'bg-[#0A0A0A] text-white border border-[#0A0A0A] shadow-sm'
                            : 'bg-white text-[#0A0A0A] border border-[#E2E2E0] hover:border-black'
                        }`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COLOR SELECTION */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="text-[11px] font-mono font-semibold tracking-label uppercase text-[#6B6B6B] mb-2.5">
                    COLOR: <span className="text-[#0A0A0A] font-bold">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`h-9 px-4 rounded-full text-xs font-medium tracking-wider flex items-center space-x-2 border transition-all duration-150 ${
                            isSelected
                              ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-sm'
                              : 'bg-white text-[#0A0A0A] border-[#E2E2E0] hover:border-black'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUANTITY & ACTIONS */}
              <div className="flex items-center space-x-3 mb-6">
                {/* Stepper */}
                <div className="flex items-center border border-[#E2E2E0] bg-[#F5F5F3] rounded-full px-3 py-2 space-x-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-zinc-500 hover:text-black"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs font-mono font-bold w-5 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-zinc-500 hover:text-black"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-full font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg active:scale-95 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0A0A0A] text-white hover:bg-zinc-800'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={18} strokeWidth={2.5} />
                      <span>ADDED ✓</span>
                    </>
                  ) : (
                    <span>ADD {selectedSize} TO BAG +</span>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => {
                    toggleWishlist(product.id);
                    showToast(isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist ✦');
                  }}
                  className={`hidden sm:flex w-12 h-12 rounded-full border border-[#E2E2E0] items-center justify-center hover:border-black transition-colors ${
                    isFavorited ? 'text-void-sale bg-red-50' : 'text-[#0A0A0A]'
                  }`}
                >
                  <Heart size={20} strokeWidth={1.5} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* ACCORDIONS */}
              <div className="border-t border-[#E2E2E0] divide-y divide-[#E2E2E0] text-xs font-mono">
                {/* Details & Fit */}
                <div className="py-3.5">
                  <button
                    onClick={() => toggleAccordion('details')}
                    className="w-full flex justify-between items-center font-bold text-[#0A0A0A] uppercase tracking-wider"
                  >
                    <span>DETAILS & FIT</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        openAccordion === 'details' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'details' && (
                    <div className="pt-3 text-[#6B6B6B] space-y-1.5 leading-relaxed font-sans text-xs">
                      <p>• {product.details.fit}</p>
                      <p>• Reinforced ribbed neck collar, stays flat after wash</p>
                      <p>• Pre-shrunk to maintain true oversized proportions</p>
                      <p>• Drop shoulder seam reinforced with dual topstitch</p>
                    </div>
                  )}
                </div>

                {/* Fabric & Care */}
                <div className="py-3.5">
                  <button
                    onClick={() => toggleAccordion('fabric')}
                    className="w-full flex justify-between items-center font-bold text-[#0A0A0A] uppercase tracking-wider"
                  >
                    <span>FABRIC & CARE</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        openAccordion === 'fabric' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'fabric' && (
                    <div className="pt-3 text-[#6B6B6B] space-y-1.5 leading-relaxed font-sans text-xs">
                      <p>• {product.details.fabric}</p>
                      <p>• {product.details.care}</p>
                      <p>• {product.details.origin}</p>
                    </div>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div className="py-3.5">
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex justify-between items-center font-bold text-[#0A0A0A] uppercase tracking-wider"
                  >
                    <span>SHIPPING & RETURNS</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        openAccordion === 'shipping' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'shipping' && (
                    <div className="pt-3 text-[#6B6B6B] space-y-1.5 leading-relaxed font-sans text-xs">
                      <p>• Dispatched within 24 hours from Mumbai facility</p>
                      <p>• Delivered in 2-4 business days across India</p>
                      <p>• 7-day hassle-free size exchange policy</p>
                      <p>• Free shipping applied automatically on orders ₹2,999+</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ==================== YOU MAY ALSO LIKE ==================== */}
        <div className="mt-20 pt-12 border-t border-[#E2E2E0] px-4 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-heading font-black tracking-tight uppercase text-[#0A0A0A]">
              YOU MAY ALSO LIKE ✦
            </h2>
            <Link to="/shop" className="text-xs font-mono underline hover:text-[#6B6B6B]">
              VIEW ALL TEES
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>

      {/* MOBILE STICKY BOTTOM BAR (APP STYLE) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E2E2E0] px-4 py-3 pb-safe shadow-2xl flex items-center justify-between space-x-3">
        <div>
          <div className="text-[10px] font-mono text-[#6B6B6B] uppercase">
            SIZE: <strong>{selectedSize}</strong>
          </div>
          <div className="text-sm font-mono font-bold text-[#0A0A0A]">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`flex-1 py-3.5 rounded-full font-heading font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center space-x-2 shadow-md active:scale-95 ${
            isAdded ? 'bg-emerald-600 text-white' : 'bg-[#0A0A0A] text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check size={16} strokeWidth={2.5} />
              <span>ADDED ✓</span>
            </>
          ) : (
            <span>ADD {selectedSize} TO BAG +</span>
          )}
        </button>
      </div>

    </div>
  );
}

