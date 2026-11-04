import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Scissors } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full min-h-screen bg-[#F5F5F3] pt-28 sm:pt-36 pb-24">
      
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="text-xs font-mono font-semibold text-[#6B6B6B] tracking-label uppercase flex items-center justify-center space-x-1.5 mb-2">
          <span>✦</span>
          <span>ESTABLISHED 2026</span>
          <span>✦</span>
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tighter uppercase text-[#0A0A0A]">
          BORN IN THE VOID.<br />
          <span className="chrome-text-dark font-serif italic">WORN BY THE SOCIETY.</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-[#6B6B6B] leading-relaxed max-w-2xl mx-auto font-sans">
          VOID SOCIETY was founded to disrupt generic commercial streetwear. We merge nostalgic Y2K cyber-grunge, underground pulp zines, and brutalist liquid metal graphics into heavyweight oversized garments that drape with purpose.
        </p>
      </div>

      {/* Editorial Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/hero/hero-desktop.jpg"
            alt="Void Society Editorial"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 text-white">
            <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
              DROP 01 // TOKYO NOIR & ATLANTA UNDERGROUND
            </span>
            <h2 className="text-xl sm:text-3xl font-heading font-black uppercase tracking-tight mt-1">
              FLASH PHOTOGRAPHY & STREET BRUTALISM
            </h2>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Craftsmanship */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-[#E2E2E0] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-mono">
              <Scissors size={20} />
            </div>
            <h3 className="font-heading font-black text-lg uppercase tracking-tight text-[#0A0A0A]">
              CUSTOM BOXY FIT
            </h3>
            <p className="text-xs text-[#6B6B6B] font-mono leading-relaxed">
              Exaggerated drop shoulder, wide elbow-length sleeves, and a tailored boxy torso that hangs effortlessly without flaring or clinging.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E2E2E0] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-mono">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-heading font-black text-lg uppercase tracking-tight text-[#0A0A0A]">
              240 GSM COMBED COTTON
            </h3>
            <p className="text-xs text-[#6B6B6B] font-mono leading-relaxed">
              100% pre-shrunk bio-washed combed cotton with dense interlock knit. Heavy enough to hold architectural drape, yet breathable in tropical heat.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E2E2E0] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-mono">
              <Flame size={20} />
            </div>
            <h3 className="font-heading font-black text-lg uppercase tracking-tight text-[#0A0A0A]">
              HIGH-DENSITY SCREENPRINT
            </h3>
            <p className="text-xs text-[#6B6B6B] font-mono leading-relaxed">
              Multi-layer vintage plastisol and puff metallic inks cured at 180°C. Resists fading, flaking, and cracking over hundreds of wash cycles.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#0A0A0A]">
          READY TO ENTER THE VOID?
        </h2>
        <Link
          to="/shop"
          className="inline-flex items-center space-x-2 mt-6 px-8 py-4 bg-[#0A0A0A] text-white rounded-full font-heading font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg active:scale-95"
        >
          <span>EXPLORE DROP 01 TEES</span>
          <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}

