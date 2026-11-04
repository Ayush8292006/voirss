import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getFreeShippingProgress } = useCartStore();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const shippingInfo = getFreeShippingProgress();

  return (
    <div className="w-full min-h-screen bg-[#F5F5F3] pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E2E2E0] mb-8">
        <div>
          <span className="text-xs font-mono font-semibold text-[#6B6B6B] tracking-label uppercase flex items-center space-x-1.5 mb-1.5">
            <span>✦</span>
            <span>SHOPPING BAG</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-[#0A0A0A]">
            YOUR BAG ({items.length})
          </h1>
        </div>

        <Link
          to="/shop"
          className="text-xs font-mono uppercase tracking-wider text-[#0A0A0A] hover:underline flex items-center space-x-1"
        >
          <ArrowLeft size={14} />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E2E0] p-12 text-center max-w-lg mx-auto">
          <span className="text-4xl text-[#0A0A0A] block mb-3">✦</span>
          <h3 className="font-heading font-black text-xl uppercase tracking-wider text-[#0A0A0A]">
            YOUR BAG IS CURRENTLY EMPTY
          </h3>
          <p className="text-xs text-[#6B6B6B] font-mono mt-2 mb-8">
            Explore our curated oversized graphic tees in 240 GSM combed cotton.
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-[#0A0A0A] text-white text-xs font-heading font-black uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-all shadow-lg active:scale-95"
          >
            DISCOVER THE COLLECTION ✦
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ITEMS LIST */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free shipping bar */}
            <div className="bg-white p-4 rounded-xl border border-[#E2E2E0]">
              <div className="text-xs font-mono text-[#0A0A0A] mb-2 flex justify-between">
                {shippingInfo.isFree ? (
                  <span className="font-semibold text-emerald-700">✦ YOU UNLOCKED FREE SHIPPING!</span>
                ) : (
                  <span>
                    Add <strong>₹{shippingInfo.remaining.toLocaleString('en-IN')}</strong> more for free shipping
                  </span>
                )}
                <span className="text-[#6B6B6B]">{shippingInfo.percentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E2E2E0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0A0A0A] rounded-full transition-all duration-300"
                  style={{ width: `${shippingInfo.percentage}%` }}
                />
              </div>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-xl border border-[#E2E2E0] flex space-x-4 sm:space-x-6 relative"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.slug}`}
                  className="w-24 sm:w-28 aspect-[4/5] bg-void-studio rounded-lg overflow-hidden shrink-0 border border-[#E2E2E0]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start pr-8">
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-heading font-bold text-sm sm:text-base uppercase tracking-tight text-[#0A0A0A] hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <div className="text-xs font-mono text-[#6B6B6B] mt-1 space-x-3">
                      <span>SIZE: <strong className="text-black">{item.size}</strong></span>
                      <span>•</span>
                      <span>COLOR: {item.color}</span>
                    </div>

                    <div className="text-xs font-mono text-zinc-500 mt-1">
                      Heavyweight 240 GSM
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#E2E2E0] bg-[#F5F5F3] rounded-full px-2.5 py-1 space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-zinc-500 hover:text-black"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-mono font-bold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-zinc-500 hover:text-black"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-sm sm:text-base font-mono font-bold text-[#0A0A0A]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-void-sale transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl border border-[#E2E2E0] shadow-sm sticky top-32">
              <h3 className="font-heading font-black text-sm uppercase tracking-wider text-[#0A0A0A] pb-4 border-b border-[#E2E2E0]">
                ORDER SUMMARY
              </h3>

              <div className="py-4 space-y-3 text-xs font-mono text-[#6B6B6B] border-b border-[#E2E2E0]">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-black font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>ESTIMATED SHIPPING</span>
                  <span className="text-black font-bold">
                    {shippingInfo.isFree ? 'FREE' : '₹150'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TAXES</span>
                  <span className="text-emerald-700">INCLUDED</span>
                </div>
              </div>

              <div className="py-4 flex justify-between items-center text-sm font-mono font-bold text-[#0A0A0A]">
                <span>TOTAL</span>
                <span className="text-lg">
                  ₹{(subtotal + (shippingInfo.isFree ? 0 : 150)).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#0A0A0A] hover:bg-zinc-800 text-white rounded-full font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-all flex items-center justify-center space-x-2 shadow-lg active:scale-95 mt-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </button>

              <div className="mt-4 text-[11px] font-mono text-center text-[#6B6B6B]">
                ✦ UPI, Credit Card, Netbanking & COD Accepted
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

