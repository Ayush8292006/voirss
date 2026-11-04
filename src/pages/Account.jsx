import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, MapPin, LogOut, CheckCircle2, ArrowRight } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { PRODUCTS } from '../data/products';

export default function Account() {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'address', 'profile'
  const showToast = useUIStore((state) => state.showToast);

  const mockOrders = [
    {
      id: 'VS-98241',
      date: '02 NOV 2026',
      total: 2699,
      status: 'In Transit',
      items: [
        {
          name: 'BROKE BUT RICH Washed Tee',
          size: 'L',
          price: 2699,
          image: '/products/broke-rich.jpg',
        },
      ],
    },
    {
      id: 'VS-87119',
      date: '14 OCT 2026',
      total: 4298,
      status: 'Delivered',
      items: [
        {
          name: 'VS FACE Oversized Tee',
          size: 'M',
          price: 1999,
          image: '/products/vs-face-tee.jpg',
        },
        {
          name: 'HEART BREAK CLUB Tee',
          size: 'L',
          price: 2299,
          image: '/products/heartbreak-tee.jpg',
        },
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F5F5F3] pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E2E0] shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-heading font-black text-xl">
            ✦
          </div>
          <div>
            <h1 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#0A0A0A]">
              ARJUN KAPOOR
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-0.5">
              society.member@void.com • TIER 01 INNER CIRCLE
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast('Signed out of Society Session')}
          className="self-start sm:self-auto px-4 py-2 border border-[#E2E2E0] rounded-full text-xs font-mono uppercase text-zinc-600 hover:text-black hover:border-black transition-colors flex items-center space-x-1.5"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-[#E2E2E0] pb-4 mb-6 text-xs font-mono">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-full font-bold uppercase transition-all ${
            activeTab === 'orders' ? 'bg-[#0A0A0A] text-white' : 'bg-white text-[#6B6B6B] border border-[#E2E2E0]'
          }`}
        >
          ORDERS ({mockOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('address')}
          className={`px-4 py-2 rounded-full font-bold uppercase transition-all ${
            activeTab === 'address' ? 'bg-[#0A0A0A] text-white' : 'bg-white text-[#6B6B6B] border border-[#E2E2E0]'
          }`}
        >
          SAVED ADDRESS
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-full font-bold uppercase transition-all ${
            activeTab === 'profile' ? 'bg-[#0A0A0A] text-white' : 'bg-white text-[#6B6B6B] border border-[#E2E2E0]'
          }`}
        >
          SOCIETY PERKS
        </button>
      </div>

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-[#E2E2E0] p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E2E0] text-xs font-mono gap-2">
                <div>
                  <span className="font-bold text-[#0A0A0A] text-sm">ORDER #{order.id}</span>
                  <span className="text-[#6B6B6B] ml-3">PLACED ON {order.date}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-zinc-100 text-[#0A0A0A] border border-[#E2E2E0]'
                    }`}
                  >
                    ✦ {order.status}
                  </span>
                  <span className="font-bold text-sm text-[#0A0A0A]">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-[#E2E2E0]">
                {order.items.map((item, i) => (
                  <div key={i} className="py-3 first:pt-0 last:pb-0 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 bg-void-studio rounded-lg object-cover border border-[#E2E2E0]"
                    />
                    <div className="flex-1 text-xs">
                      <span className="font-heading font-bold uppercase text-[#0A0A0A] block">{item.name}</span>
                      <span className="font-mono text-[#6B6B6B] block mt-0.5">SIZE: {item.size} • 240 GSM COTTON</span>
                      <span className="font-mono font-bold text-[#0A0A0A] mt-1 block">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: ADDRESS */}
      {activeTab === 'address' && (
        <div className="bg-white rounded-2xl border border-[#E2E2E0] p-6 max-w-lg">
          <div className="flex items-center space-x-2 mb-3">
            <MapPin size={18} className="text-[#0A0A0A]" />
            <h3 className="font-heading font-black text-sm uppercase tracking-wider text-[#0A0A0A]">
              DEFAULT SHIPPING ADDRESS
            </h3>
          </div>
          <p className="text-xs font-mono text-[#6B6B6B] leading-relaxed">
            Arjun Kapoor<br />
            B-402, Highline Lofts, Near Carter Road<br />
            Bandra West, Mumbai, Maharashtra 400050<br />
            Phone: +91 98765 43210
          </p>
          <button
            onClick={() => showToast('Address editing modal opened')}
            className="mt-4 px-4 py-2 border border-[#E2E2E0] rounded-full text-xs font-mono uppercase hover:border-black"
          >
            Edit Address
          </button>
        </div>
      )}

      {/* TAB CONTENT: PERKS */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-[#E2E2E0] p-6 max-w-lg space-y-3 text-xs font-mono">
          <h3 className="font-heading font-black text-sm uppercase tracking-wider text-[#0A0A0A] pb-2 border-b border-[#E2E2E0]">
            SOCIETY VIP PRIVILEGES
          </h3>
          <p className="text-[#6B6B6B]">✦ Early 15-minute checkout on future drops</p>
          <p className="text-[#6B6B6B]">✦ Free standard express shipping on all domestic orders</p>
          <p className="text-[#6B6B6B]">✦ Access to unreleased sample room sales</p>
        </div>
      )}

    </div>
  );
}

