import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Mail, Check } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const showToast = useUIStore((state) => state.showToast);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Welcome to the Society ✦ Access Code Sent');
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#0A0A0A] text-white pt-16 pb-28 md:pb-16 border-t border-zinc-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Statement Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-zinc-800">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase flex items-center space-x-2">
              <span>✦</span>
              <span>EXCLUSIVE ACCESS ONLY</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase text-white">
              JOIN THE SOCIETY.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
              Sign up for secret midnight drops, archived sample releases, and early access codes. No spam, ever.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="p-4 bg-zinc-900/80 border border-zinc-700 rounded-full flex items-center justify-center space-x-2 text-xs font-mono text-emerald-400">
                <Check size={16} />
                <span>YOU ARE REGISTERED IN THE VOID ARCHIVE ✦</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-white text-xs sm:text-sm font-mono uppercase px-5 py-4 rounded-full text-white placeholder-zinc-600 outline-none pr-14 transition-colors"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-2 p-2.5 bg-white text-black rounded-full hover:bg-zinc-200 transition-transform active:scale-90"
                >
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </form>
            )}
            <span className="text-[10px] font-mono text-zinc-500 mt-2.5 ml-4">
              By subscribing you agree to receive Drop 02 transmission notices.
            </span>
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-14 border-b border-zinc-800 text-xs font-mono">
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-4 text-[11px] flex items-center space-x-1">
              <span>✦</span>
              <span>COLLECTION</span>
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><Link to="/shop?filter=new" className="hover:text-white transition-colors">NEW ARRIVALS</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">SHOP ALL TEES</Link></li>
              <li><Link to="/#featured-drop" className="hover:text-white transition-colors">BROKE BUT RICH</Link></li>
              <li><Link to="/shop?filter=sale" className="hover:text-white transition-colors">ARCHIVE SALE</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-4 text-[11px] flex items-center space-x-1">
              <span>✦</span>
              <span>HELP & SUPPORT</span>
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">ORDER TRACKING</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">SHIPPING & RETURNS</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">SIZE GUIDE</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">CONTACT US</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-4 text-[11px] flex items-center space-x-1">
              <span>✦</span>
              <span>BRAND</span>
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><Link to="/about" className="hover:text-white transition-colors">ABOUT VOID</Link></li>
              <li><Link to="/#lookbook" className="hover:text-white transition-colors">EDITORIAL LOOKBOOK</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">240 GSM FABRIC SPEC</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">MEMBER PORTAL</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-4 text-[11px] flex items-center space-x-1">
              <span>✦</span>
              <span>CONNECT</span>
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <Instagram size={13} />
                  <span>@VOIDSOCIETY</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@voidsociety.com" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <Mail size={13} />
                  <span>SUPPORT@VOIDSOCIETY.COM</span>
                </a>
              </li>
              <li><span className="text-zinc-500">MUMBAI & ATLANTA</span></li>
            </ul>
          </div>
        </div>

        {/* Big Chrome Logo in Footer */}
        <div className="pt-12 pb-6 flex flex-col items-center text-center">
          <Link to="/" className="inline-block group">
            <img
              src="/logo/void-logo-chrome.png"
              alt="VOID SOCIETY"
              className="h-16 sm:h-24 md:h-32 w-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            />
          </Link>
          <p className="font-serif italic tracking-widest text-zinc-500 text-xs mt-3 uppercase">
            BORN IN THE VOID. WORN BY THE SOCIETY.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500">
          <div>
            © 2026 all rights reserved by void society
          </div>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span>TERMS</span>
            <span>PRIVACY</span>
            <span>SECURITY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

