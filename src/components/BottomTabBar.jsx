import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useUIStore } from '../store/uiStore';

export default function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollDirection, isScrolled } = useScrollDirection(10);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { openSearch } = useUIStore();

  const isHidden = isScrolled && scrollDirection === 'down';

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'shop', label: 'Shop', icon: Compass, path: '/shop' },
    { id: 'search', label: 'Search', icon: Search, action: openSearch },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/wishlist', badge: wishlistCount },
    { id: 'bag', label: 'Bag', icon: ShoppingBag, action: openCart, badge: totalItems },
  ];

  const handleTabClick = (tab) => {
    if (tab.action) {
      tab.action();
    } else if (tab.path) {
      navigate(tab.path);
    }
  };

  const isTabActive = (tab) => {
    if (tab.id === 'home') return location.pathname === '/';
    if (tab.id === 'shop') return location.pathname.startsWith('/shop') || location.pathname.startsWith('/product');
    if (tab.id === 'wishlist') return location.pathname === '/wishlist';
    return false;
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{
        y: isHidden ? '120%' : '0%',
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
      }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-[#E2E2E0] pb-safe px-3 py-2 shadow-lg"
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const active = isTabActive(tab);
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className="relative flex flex-col items-center justify-center flex-1 py-1 text-xs select-none active:scale-90 transition-transform"
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon
                  size={21}
                  strokeWidth={active ? 2 : 1.5}
                  className={`transition-colors ${active ? 'text-[#0A0A0A]' : 'text-[#6B6B6B]'}`}
                />

                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] px-1 bg-[#0A0A0A] text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] mt-1 tracking-wider uppercase font-medium ${
                  active ? 'text-[#0A0A0A] font-semibold' : 'text-[#6B6B6B]'
                }`}
              >
                {tab.label}
              </span>

              {/* Active spring dot indicator */}
              {active && (
                <motion.div
                  layoutId="bottomTabDot"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-1 h-1 bg-[#0A0A0A] rounded-full mt-0.5"
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

