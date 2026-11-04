import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getSubtotal, getFreeShippingProgress } = useCartStore();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const shippingInfo = getFreeShippingProgress();

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 border-l border-[#E2E2E0]"
        >
          {/* HEADER */}
          <div className="p-4 sm:p-5 border-b border-[#E2E2E0] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <h2 className="text-sm font-heading font-black tracking-widest uppercase text-[#0A0A0A]">
                YOUR BAG ({items.length})
              </h2>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="p-1.5 text-zinc-500 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* FREE SHIPPING PROGRESS BAR */}
          <div className="bg-[#EDEDEB] p-3.5 px-5 border-b border-[#E2E2E0]">
            <div className="text-xs font-mono tracking-wide text-[#0A0A0A] mb-2 flex justify-between">
              {shippingInfo.isFree ? (
                <span className="font-semibold text-emerald-700">✦ YOU UNLOCKED FREE SHIPPING!</span>
              ) : (
                <span>
                  ADD <strong className="font-bold">₹{shippingInfo.remaining.toLocaleString('en-IN')}</strong> MORE FOR FREE SHIPPING
                </span>
              )}
              <span className="text-[#6B6B6B]">{shippingInfo.percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E2E0] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${shippingInfo.percentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-[#0A0A0A] rounded-full"
              />
            </div>
          </div>

          {/* ITEM LIST OR EMPTY STATE */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <span className="text-4xl text-[#0A0A0A] mb-3 animate-pulse">✦</span>
                <h3 className="font-heading font-black text-lg uppercase tracking-wider text-[#0A0A0A]">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-xs text-[#6B6B6B] mt-1.5 max-w-xs font-mono">
                  Explore our latest drops and heavyweight graphic tees before they sell out.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="mt-6 px-6 py-3 bg-[#0A0A0A] text-white text-xs font-heading font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors shadow-md"
                >
                  SHOP NEW ARRIVALS ✦
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-3.5 p-3 rounded-xl bg-[#F5F5F3] border border-[#E2E2E0] relative group"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="w-20 h-24 bg-white rounded-lg overflow-hidden shrink-0 border border-[#E2E2E0]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between pr-5">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-xs font-heading font-bold uppercase tracking-tight text-[#0A0A0A] hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className="text-[11px] font-mono text-[#6B6B6B] mt-0.5 flex items-center space-x-2">
                        <span>SIZE: <strong className="text-[#0A0A0A]">{item.size}</strong></span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E2E2E0] bg-white rounded-full px-2 py-0.5 space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-zinc-500 hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-mono font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-zinc-500 hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Item Price */}
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-[#0A0A0A]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="absolute top-2.5 right-2.5 text-zinc-400 hover:text-void-sale transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* FOOTER CHECKOUT AREA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E2E2E0] bg-white pb-safe">
              <div className="flex justify-between items-center mb-1 text-xs font-mono text-[#6B6B6B]">
                <span>SUBTOTAL</span>
                <span className="font-bold text-sm text-[#0A0A0A]">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] font-mono text-[#A8A8A8] mb-4">
                Taxes calculated at checkout. Shipping {shippingInfo.isFree ? 'FREE' : 'calculated next'}.
              </p>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 bg-[#0A0A0A] hover:bg-zinc-800 text-white rounded-full font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg active:scale-98"
              >
                <span>CHECKOUT</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={closeCart}
                className="w-full text-center text-xs font-mono tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] mt-3 underline"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

