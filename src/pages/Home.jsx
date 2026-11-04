import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, LOOKBOOK_ITEMS } from '../data/products';
import { useUIStore } from '../store/uiStore';

export default function Home() {
  const { setCursorMode } = useUIStore();
  const heroRef = useRef(null);

  // Scroll animations for hero
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.94]);
  const heroRadius = useTransform(heroProgress, [0, 1], [0, 24]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 80]);

  const newArrivals = PRODUCTS.slice(0, 4);
  const featuredProduct = PRODUCTS.find((p) => p.slug === 'broke-but-rich-washed-tee') || PRODUCTS[3];
  const horizontalProducts = PRODUCTS;

  // Words for brand statement reveal
  const brandWords = "BORN IN THE VOID. WORN BY THE SOCIETY.".split(" ");

  return (
    <div className="w-full bg-[#F5F5F3] overflow-hidden">
      
      {/* 1. HERO SECTION (100svh) */}
      <section
        ref={heroRef}
        className="relative w-full h-[100svh] min-h-[580px] overflow-hidden bg-[#0A0A0A]"
      >
        <motion.div
          style={{
            scale: heroScale,
            borderRadius: heroRadius,
            y: heroY,
          }}
          className="relative w-full h-full overflow-hidden"
        >
          {/* Editorial Lifestyle Image */}
          <picture className="w-full h-full block">
            <source media="(min-width: 1024px)" srcSet="/hero/hero-desktop.jpg" />
            <img
              src="/hero/hero-1.jpg"
              alt="VOID SOCIETY Editorial Models"
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
              loading="eager"
            />
          </picture>

          {/* Ambient Vignette & Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* "SHOP NOW" Button Bottom-Left */}
          <div className="absolute bottom-16 sm:bottom-12 left-6 sm:left-12 z-20">
            <Link
              to="/shop"
              onMouseEnter={() => setCursorMode('star')}
              onMouseLeave={() => setCursorMode('default')}
              className="group inline-flex items-center space-x-2 px-7 py-3 rounded-full border-[1.5px] border-white text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white shadow-2xl active:scale-95"
            >
              <span>SHOP NOW</span>
              <ArrowRight
                size={16}
                className="transform -translate-x-1 group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </div>

          {/* Vertical Label on Right Edge */}
          <div className="hidden sm:flex absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 rotate-90 origin-right items-center space-x-3 text-white/70 text-[10px] font-mono tracking-widest pointer-events-none select-none">
            <span>DROP 01 — 2026</span>
            <span className="text-white text-xs">✦</span>
          </div>

          {/* Subtle scroll down indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[10px] font-mono uppercase tracking-widest flex flex-col items-center pointer-events-none animate-bounce">
            <span>SCROLL</span>
            <span className="text-xs">↓</span>
          </div>
        </motion.div>
      </section>


      {/* 2. NEW ARRIVALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-mono font-semibold text-[#6B6B6B] tracking-label uppercase flex items-center space-x-1.5 mb-1.5">
              <span>✦</span>
              <span>DROP 01 SELECTIONS</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight uppercase text-[#0A0A0A]">
              NEW ARRIVALS
            </h2>
          </div>

          <Link
            to="/shop"
            onMouseEnter={() => setCursorMode('star')}
            onMouseLeave={() => setCursorMode('default')}
            className="group text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#6B6B6B] transition-colors flex items-center space-x-1 pb-1"
          >
            <span>VIEW ALL</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-5">
          {newArrivals.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 2} />
          ))}
        </div>
      </section>


      {/* 3. MARQUEE STRIP (Huge Outlined Text Scrolling) */}
      <section className="w-full bg-[#0A0A0A] py-10 sm:py-14 overflow-hidden border-y border-zinc-800 select-none">
        <div className="flex whitespace-nowrap">
          <div className="flex animate-marquee shrink-0 items-center">
            <span className="text-5xl sm:text-7xl md:text-8xl font-heading font-black uppercase text-stroke-1 px-6 tracking-tighter">
              VOID SOCIETY ✦ BROKE BUT RICH ✦ HEART BREAK CLUB ✦ 240 GSM HEAVYWEIGHT ✦
            </span>
          </div>
          <div className="flex animate-marquee shrink-0 items-center" aria-hidden="true">
            <span className="text-5xl sm:text-7xl md:text-8xl font-heading font-black uppercase text-stroke-1 px-6 tracking-tighter">
              VOID SOCIETY ✦ BROKE BUT RICH ✦ HEART BREAK CLUB ✦ 240 GSM HEAVYWEIGHT ✦
            </span>
          </div>
        </div>
      </section>


      {/* 4. FEATURED DROP BANNER ("BROKE BUT RICH") */}
      <section
        id="featured-drop"
        className="w-full bg-[#0A0A0A] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Ambient radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-950/60 border border-red-800/60 rounded-full text-[11px] font-mono text-red-400">
              <span>✦</span>
              <span>SIGNATURE CAPSULE DROP</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tighter uppercase leading-[0.95] text-white">
              BROKE BUT<br />
              <span className="chrome-text">RICH TEE.</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              Heavyweight 260 GSM custom acid-washed charcoal cotton. Featuring our viral satire print — flaming red dumpster brimming with cash bags and red stilettos. Every single piece is uniquely enzyme-washed.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xl sm:text-2xl font-mono font-bold text-white">
                ₹{featuredProduct.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-mono text-zinc-500 uppercase px-2 py-1 border border-zinc-800 rounded">
                Selling Fast
              </span>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to={`/product/${featuredProduct.slug}`}
                onMouseEnter={() => setCursorMode('star')}
                onMouseLeave={() => setCursorMode('default')}
                className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-all shadow-xl active:scale-95"
              >
                SHOP THE DROP ✦
              </Link>
              <Link
                to="/shop"
                className="px-6 py-4 border border-zinc-700 hover:border-white text-white rounded-full font-heading font-bold text-xs sm:text-sm tracking-widest uppercase transition-colors"
              >
                VIEW LOOKBOOK
              </Link>
            </div>
          </div>

          {/* Right Centered Product Showcase with slight float/rotation */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative w-full max-w-md aspect-[4/5] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group"
            >
              <img
                src={featuredProduct.images[0]}
                alt={featuredProduct.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono">
                <span>ACID WASH • 260 GSM</span>
                <span className="text-red-400">LIMITED TO 150 PCS</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 5. HORIZONTAL SCROLL COLLECTION (Swipeable on mobile, horizontal carousel on desktop) */}
      <section className="py-20 bg-[#F5F5F3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex justify-between items-end">
          <div>
            <span className="text-xs font-mono font-semibold text-[#6B6B6B] tracking-label uppercase flex items-center space-x-1.5 mb-1.5">
              <span>✦</span>
              <span>CURATED ROTATION</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight uppercase text-[#0A0A0A]">
              THE ARCHIVE
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6B6B6B] hidden sm:block">
            DRAG OR SWIPE TO EXPLORE →
          </span>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setCursorMode('drag')}
          onMouseLeave={() => setCursorMode('default')}
          className="flex space-x-4 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 pb-6 snap-x snap-mandatory"
        >
          {horizontalProducts.map((prod) => (
            <div
              key={prod.id}
              className="w-[260px] sm:w-[300px] shrink-0 snap-start"
            >
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </section>


      {/* 6. LOOKBOOK GRID (Masonry of lifestyle editorial shots with clip-path reveal) */}
      <section id="lookbook" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#E2E2E0]">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-[#6B6B6B] tracking-label uppercase">
            AUTUMN / WINTER 2026
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-[#0A0A0A] mt-2">
            EDITORIAL LOOKBOOK
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-[#6B6B6B] mt-2">
            Captured on 35mm flash film across Tokyo alleys and Atlanta subways.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {LOOKBOOK_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`group relative overflow-hidden bg-zinc-900 rounded-none ${
                index === 0 || index === 4 ? 'row-span-2 aspect-[4/6]' : 'aspect-[4/5]'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-xs font-mono font-bold tracking-wider">{item.title}</span>
                <span className="text-[10px] text-zinc-400 font-mono mt-0.5">{item.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 7. BRAND STATEMENT (Centered Serif Text with Word-by-Word Scroll Fade) */}
      <section className="py-24 sm:py-36 bg-[#0A0A0A] text-white text-center px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-2xl text-white/50 mb-4">✦</div>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif italic tracking-wideSerif leading-snug text-zinc-200">
            {brandWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.15 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="inline-block mx-1.5"
              >
                {word}
              </motion.span>
            ))}
          </h3>
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-zinc-500 max-w-md mx-auto pt-4">
            HEAVYWEIGHT STREETWEAR • ZERO COMPROMISE
          </p>
        </div>
      </section>

    </div>
  );
}

