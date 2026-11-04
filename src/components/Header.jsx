import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useUIStore } from '../store/uiStore';

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { scrollDirection, isScrolled } = useScrollDirection(15);

  const totalItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistItems = useWishlistStore((state) => state.items);
  const { openSearch, openMenu, setCursorMode } = useUIStore();

  // On home page: transparent when at top; on other pages: always solid white
  const isTransparent = isHomePage && !isScrolled;

  // Header hide on scroll down, show on scroll up
  const isHidden = isScrolled && scrollDirection === 'down';

  const navLinks = [
    { label: 'NEW ARRIVALS', path: '/shop?filter=new' },
    { label: 'SHOP ALL', path: '/shop' },
    { label: 'TEES', path: '/shop?filter=tees' },
    { label: 'DROPS', path: '/#featured-drop' },
    { label: 'ABOUT', path: '/about' },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: isHidden ? '-100%' : '0%',
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
      }}
      className={`fixed top-[33px] left-0 right-0 z-40 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent text-white border-b border-transparent py-4 md:py-6'
          : 'bg-white/95 backdrop-blur-md text-[#0A0A0A] border-b border-[#E2E2E0] py-3 md:py-3.5 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* MOBILE LEFT: Hamburger + Search */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={openMenu}
            aria-label="Open Navigation Menu"
            className="p-1.5 -ml-1.5 text-current hover:opacity-75 transition-opacity active:scale-95"
          >
            <Menu strokeWidth={1.5} size={22} />
          </button>
          <button
            onClick={openSearch}
            aria-label="Search Catalog"
            className="p-1.5 text-current hover:opacity-75 transition-opacity active:scale-95"
          >
            <Search strokeWidth={1.5} size={20} />
          </button>
        </div>

        {/* DESKTOP LEFT: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onMouseEnter={() => setCursorMode('star')}
              onMouseLeave={() => setCursorMode('default')}
              className="group relative text-xs tracking-label uppercase font-medium transition-colors py-1 flex items-center"
            >
              {/* Star appears on hover */}
              <span className="opacity-0 -ml-3 mr-1 text-[10px] transform -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                ✦
              </span>
              <span>{link.label}</span>
              {/* Left to right drawing underline */}
              <span
                className={`absolute bottom-0 left-0 w-0 h-[1.5px] group-hover:w-full transition-all duration-300 ease-out ${
                  isTransparent ? 'bg-white' : 'bg-[#0A0A0A]'
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* CENTER: Brand Logo */}
        <div className="flex-1 md:flex-initial text-center flex justify-center items-center">
          <Link
            to="/"
            onMouseEnter={() => setCursorMode('star')}
            onMouseLeave={() => setCursorMode('default')}
            className="inline-block relative py-1"
          >
            {isTransparent ? (
              <img
                src="/logo/void-logo-chrome.png"
                alt="VOID SOCIETY"
                className="h-9 sm:h-11 md:h-12 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)] transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <img
                src="/logo/void-logo-black.png"
                alt="VOID SOCIETY"
                className="h-8 sm:h-10 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            )}
          </Link>
        </div>

        {/* RIGHT ACTIONS: Search (desktop), Account, Wishlist, Bag */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Desktop Search Trigger */}
          <button
            onClick={openSearch}
            aria-label="Search"
            onMouseEnter={() => setCursorMode('star')}
            onMouseLeave={() => setCursorMode('default')}
            className="hidden md:flex p-2 text-current hover:opacity-70 transition-opacity"
          >
            <Search strokeWidth={1.5} size={20} />
          </button>

          {/* Account Icon */}
          <Link
            to="/account"
            aria-label="Account"
            onMouseEnter={() => setCursorMode('star')}
            onMouseLeave={() => setCursorMode('default')}
            className="p-1.5 sm:p-2 text-current hover:opacity-70 transition-opacity active:scale-95"
          >
            <User strokeWidth={1.5} size={20} />
          </Link>

          {/* Desktop Wishlist Icon */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            onMouseEnter={() => setCursorMode('star')}
            onMouseLeave={() => setCursorMode('default')}
            className="hidden md:flex relative p-2 text-current hover:opacity-70 transition-opacity active:scale-95"
          >
            <Heart strokeWidth={1.5} size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-void-sale ring-2 ring-white" />
            )}
          </Link>

          {/* Shopping Bag Button */}
          <button
            onClick={openCart}
            aria-label="Shopping Bag"
            onMouseEnter={() => setCursorMode('star')}
            onMouseLeave={() => setCursorMode('default')}
            className="relative p-1.5 sm:p-2 text-current hover:opacity-70 transition-transform active:scale-90"
          >
            <ShoppingBag strokeWidth={1.5} size={21} />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold font-mono flex items-center justify-center ${
                  isTransparent ? 'bg-white text-black' : 'bg-[#0A0A0A] text-white'
                }`}
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>

      </div>
    </motion.header>
  );
}

