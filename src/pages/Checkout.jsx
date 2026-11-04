import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, CreditCard, Smartphone, Truck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../store/cartStore';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart, getFreeShippingProgress } = useCartStore();

  const subtotal = getSubtotal();
  const shippingInfo = getFreeShippingProgress();
  const shippingFee = shippingInfo.isFree ? 0 : 150;
  const totalAmount = subtotal + shippingFee;

  const [step, setStep] = useState(1); // 1: Contact, 2: Shipping, 3: Payment, 4: Confirmed
  const [formData, setFormData] = useState({
    email: 'society.member@void.com',
    phone: '+91 98765 43210',
    firstName: 'Arjun',
    lastName: 'Kapoor',
    address: 'B-402, Highline Lofts, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    paymentMethod: 'upi', // 'upi', 'card', 'cod'
    upiId: 'arjun@oksbi',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = () => {
    setStep(4);
    clearCart();

    // Trigger star confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0A0A0A', '#FFFFFF', '#C9A7F5', '#EDEDEB'],
      shapes: ['star', 'circle'],
    });
  };

  if (items.length === 0 && step !== 4) {
    return (
      <div className="w-full min-h-screen bg-[#F5F5F3] pt-32 pb-20 flex flex-col items-center justify-center px-4 text-center">
        <span className="text-4xl mb-3">✦</span>
        <h2 className="font-heading font-black text-2xl uppercase tracking-wider text-[#0A0A0A]">
          NO ITEMS IN CHECKOUT
        </h2>
        <p className="text-xs font-mono text-[#6B6B6B] mt-2 mb-6">
          Add tees to your shopping bag before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-[#0A0A0A] text-white rounded-full font-heading font-bold text-xs uppercase tracking-widest"
        >
          EXPLORE SHOP ✦
        </Link>
      </div>
    );
  }

  // ORDER CONFIRMED SCREEN
  if (step === 4) {
    return (
      <div className="w-full min-h-screen bg-[#0A0A0A] text-white pt-28 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Subtle star glow */}
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 text-3xl">
            ✦
          </div>

          <span className="text-xs font-mono tracking-widest uppercase text-emerald-400">
            TRANSMISSION CONFIRMED
          </span>

          <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-white mt-2">
            ORDER #VS-98241
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-3 leading-relaxed">
            Thank you, {formData.firstName}. Your 240 GSM pieces are being packed in our tamper-proof silver foil garment bag. Tracking updates will be dispatched via SMS & Email.
          </p>

          <div className="my-8 p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800/80 text-left text-xs font-mono space-y-2">
            <div className="flex justify-between text-zinc-400">
              <span>DELIVERY ADDRESS:</span>
              <span className="text-white text-right font-medium max-w-[200px] truncate">{formData.address}, {formData.city}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>PAYMENT:</span>
              <span className="text-white uppercase">{formData.paymentMethod} (PAID)</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>ESTIMATED DISPATCH:</span>
              <span className="text-white">WITHIN 24 HOURS</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/shop"
              className="block w-full py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-heading font-black text-xs uppercase tracking-widest transition-all shadow-lg"
            >
              CONTINUE BROWSING ✦
            </Link>
            <Link
              to="/account"
              className="block text-xs font-mono text-zinc-500 hover:text-white uppercase tracking-wider"
            >
              View Order in Member Account
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F5F5F3] pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* STEPS INDICATOR */}
      <div className="flex items-center justify-center space-x-4 sm:space-x-8 mb-10 text-xs font-mono">
        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#0A0A0A] font-bold' : 'text-[#A8A8A8]'}`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step > 1 ? 'bg-[#0A0A0A] text-white' : 'border border-black'}`}>
            {step > 1 ? '✓' : '1'}
          </span>
          <span>CONTACT</span>
        </div>
        <div className="w-6 sm:w-12 h-[1px] bg-[#E2E2E0]" />
        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#0A0A0A] font-bold' : 'text-[#A8A8A8]'}`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step > 2 ? 'bg-[#0A0A0A] text-white' : step === 2 ? 'border border-black' : 'border border-zinc-300'}`}>
            {step > 2 ? '✓' : '2'}
          </span>
          <span>SHIPPING</span>
        </div>
        <div className="w-6 sm:w-12 h-[1px] bg-[#E2E2E0]" />
        <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-[#0A0A0A] font-bold' : 'text-[#A8A8A8]'}`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'border border-black' : 'border border-zinc-300'}`}>
            3
          </span>
          <span>PAYMENT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: STEP FORMS */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E2E0] shadow-sm">
          
          {/* STEP 1: CONTACT */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="font-heading font-black text-base uppercase tracking-wider text-[#0A0A0A] pb-3 border-b border-[#E2E2E0]">
                1. CONTACT INFORMATION
              </h2>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">
                  EMAIL ADDRESS (FOR RECEIPT & TRACKING)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3.5 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">
                  PHONE NUMBER (FOR DELIVERY UPDATES)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3.5 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-[#0A0A0A] text-white rounded-full font-heading font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>CONTINUE TO SHIPPING</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SHIPPING ADDRESS */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#E2E2E0]">
                <h2 className="font-heading font-black text-base uppercase tracking-wider text-[#0A0A0A]">
                  2. DELIVERY ADDRESS
                </h2>
                <button onClick={() => setStep(1)} className="text-xs font-mono text-[#6B6B6B] underline">
                  Back
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">FIRST NAME</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">LAST NAME</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">STREET ADDRESS & APARTMENT</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3.5 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">CITY</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">STATE</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">PINCODE</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setStep(3)}
                  className="w-full py-4 bg-[#0A0A0A] text-white rounded-full font-heading font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-[#E2E2E0]">
                <h2 className="font-heading font-black text-base uppercase tracking-wider text-[#0A0A0A]">
                  3. SELECT PAYMENT METHOD
                </h2>
                <button onClick={() => setStep(2)} className="text-xs font-mono text-[#6B6B6B] underline">
                  Back
                </button>
              </div>

              {/* UPI Option */}
              <label
                onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.paymentMethod === 'upi' ? 'border-black bg-zinc-50 ring-1 ring-black' : 'border-[#E2E2E0]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Smartphone size={20} className="text-[#0A0A0A]" />
                  <div>
                    <span className="text-xs font-heading font-bold uppercase tracking-wider block text-[#0A0A0A]">
                      UPI (GPAY / PHONEPE / PAYTM)
                    </span>
                    <span className="text-[11px] font-mono text-[#6B6B6B]">Instant verification, 0 fee</span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={() => {}}
                  className="accent-black"
                />
              </label>

              {/* Credit/Debit Card Option */}
              <label
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' ? 'border-black bg-zinc-50 ring-1 ring-black' : 'border-[#E2E2E0]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard size={20} className="text-[#0A0A0A]" />
                  <div>
                    <span className="text-xs font-heading font-bold uppercase tracking-wider block text-[#0A0A0A]">
                      CREDIT / DEBIT CARD
                    </span>
                    <span className="text-[11px] font-mono text-[#6B6B6B]">Visa, MasterCard, Amex</span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'card'}
                  onChange={() => {}}
                  className="accent-black"
                />
              </label>

              {/* COD Option */}
              <label
                onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod' ? 'border-black bg-zinc-50 ring-1 ring-black' : 'border-[#E2E2E0]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Truck size={20} className="text-[#0A0A0A]" />
                  <div>
                    <span className="text-xs font-heading font-bold uppercase tracking-wider block text-[#0A0A0A]">
                      CASH ON DELIVERY (COD)
                    </span>
                    <span className="text-[11px] font-mono text-[#6B6B6B]">Pay upon doorstep receipt</span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => {}}
                  className="accent-black"
                />
              </label>

              <div className="pt-4">
                <button
                  onClick={handleCompleteOrder}
                  className="w-full py-4 bg-[#0A0A0A] hover:bg-zinc-800 text-white rounded-full font-heading font-black text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center space-x-2 shadow-xl active:scale-95"
                >
                  <ShieldCheck size={18} />
                  <span>PAY ₹{totalAmount.toLocaleString('en-IN')} & PLACE ORDER ✦</span>
                </button>
              </div>
            </motion.div>
          )}

        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E2E0] shadow-sm">
            <h3 className="font-heading font-black text-xs uppercase tracking-wider text-[#0A0A0A] pb-3 border-b border-[#E2E2E0]">
              SUMMARY ({items.length} ITEMS)
            </h3>

            <div className="py-4 space-y-3 max-h-72 overflow-y-auto no-scrollbar divide-y divide-[#E2E2E0]">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-16 bg-void-studio rounded-md object-cover border border-[#E2E2E0]"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-heading font-bold uppercase block text-[#0A0A0A] line-clamp-1">{item.name}</span>
                    <span className="font-mono text-[#6B6B6B] block">SIZE: {item.size} • QTY: {item.quantity}</span>
                    <span className="font-mono font-bold text-[#0A0A0A] mt-1 block">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="py-3 border-t border-[#E2E2E0] space-y-2 text-xs font-mono text-[#6B6B6B]">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="text-black font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>SHIPPING</span>
                <span className="text-black font-bold">
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E2E0] flex justify-between items-center text-sm font-mono font-bold text-[#0A0A0A]">
              <span>TOTAL DUE</span>
              <span className="text-base">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

