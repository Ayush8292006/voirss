import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useCartStore } from '../store/cartStore';

export default function QuickAddSheet() {
  const { isQuickAddOpen, quickAddProduct, closeQuickAdd, showToast } = useUIStore();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (quickAddProduct) {
      // Find first available size
      const firstAvailable = quickAddProduct.sizes.find((s) => s.inStock)?.size || 'M';
      setSelectedSize(firstAvailable);
      setSelectedColor(quickAddProduct.colors[0]?.name || 'Standard');
      setIsAdded(false);
    }
  }, [quickAddProduct]);

  if (!isQuickAddOpen || !quickAddProduct) return null;

  const handleAdd = () => {
    if (isAdded) return;
    addItem(quickAddProduct, selectedSize, selectedColor, 1);
    setIsAdded(true);
    showToast(`Added ${quickAddProduct.name} (${selectedSize}) to Bag ✦`);

    setTimeout(() => {
      setIsAdded(false);
      closeQuickAdd();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickAdd}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Bottom Sheet / Modal Card */}
        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-md bg-white rounded-t-3xl md:rounded-2xl border border-[#E2E2E0] shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          {/* Mobile Drag Indicator Handle */}
          <div className="md:hidden w-12 h-1.5 bg-zinc-300 rounded-full mx-auto mb-4" />

          {/* Close button */}
          <button
            onClick={closeQuickAdd}
            aria-label="Close"
            className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Product Image Cutout */}
          <div className="w-36 h-36 mx-auto mb-4 bg-void-studio rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={quickAddProduct.images[0]}
              alt={quickAddProduct.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Centered Name ending with period */}
          <div className="text-center mb-1">
            <h3 className="text-sm sm:text-base font-heading font-black tracking-tight uppercase text-[#0A0A0A]">
              {quickAddProduct.name.replace(/\.$/, '')}.
            </h3>
            <p className="text-xs font-mono font-bold text-[#0A0A0A] mt-1">
              ₹{quickAddProduct.price.toLocaleString('en-IN')}.00
              {quickAddProduct.compareAtPrice && (
                <span className="text-[#A8A8A8] line-through font-normal ml-2">
                  ₹{quickAddProduct.compareAtPrice.toLocaleString('en-IN')}.00
                </span>
              )}
            </p>
          </div>

          {/* SIZE SELECTION */}
          <div className="mt-5">
            <div className="text-[11px] font-mono font-semibold tracking-label uppercase text-[#6B6B6B] mb-2.5">
              SIZE
            </div>
            <div className="flex flex-wrap gap-2">
              {quickAddProduct.sizes.map((s) => {
                const isSelected = selectedSize === s.size;
                return (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(s.size)}
                    className={`min-w-[48px] h-9 px-3 rounded-full text-xs font-mono tracking-wider transition-all duration-150 flex items-center justify-center ${
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
          {quickAddProduct.colors && quickAddProduct.colors.length > 0 && (
            <div className="mt-5">
              <div className="text-[11px] font-mono font-semibold tracking-label uppercase text-[#6B6B6B] mb-2.5">
                COLOR
              </div>
              <div className="flex flex-wrap gap-2">
                {quickAddProduct.colors.map((c) => {
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

          {/* ACTION BUTTON */}
          <div className="mt-7">
            <button
              onClick={handleAdd}
              className={`w-full py-4 rounded-full font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg active:scale-95 ${
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
          </div>

          <div className="mt-3 text-center">
            <span className="text-[11px] font-mono text-[#6B6B6B]">
              Heavyweight 240 GSM ✦ Free shipping on orders over ₹2,999
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

