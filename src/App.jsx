import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Hooks
import { useLenis } from './hooks/useLenis';

// Global Components
import IntroLoader from './components/IntroLoader';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import BottomTabBar from './components/BottomTabBar';
import CustomCursor from './components/CustomCursor';
import CartDrawer from './components/CartDrawer';
import QuickAddSheet from './components/QuickAddSheet';
import SearchOverlay from './components/SearchOverlay';
import MenuDrawer from './components/MenuDrawer';
import ChatSheet from './components/ChatSheet';
import ScrollToTop from './components/ScrollToTop';
import SizeGuideModal from './components/SizeGuideModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  // Initialize Lenis for smooth scrolling on desktop
  useLenis();

  const location = useLocation();
  const [introCompleted, setIntroCompleted] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F5F5F3] text-[#0A0A0A] font-sans selection:bg-black selection:text-white">
      {/* Cinematic First-Visit Intro */}
      <IntroLoader onComplete={() => setIntroCompleted(true)} />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Top Announcement Bar (infinite marquee) */}
      <AnnouncementBar />

      {/* Global Responsive Header */}
      <Header />

      {/* Mobile App Bottom Tab Bar */}
      <BottomTabBar />

      {/* Floating Buttons: Chat & Scroll to Top */}
      <ChatSheet />
      <ScrollToTop />

      {/* Global Overlays & Modals */}
      <CartDrawer />
      <QuickAddSheet />
      <SearchOverlay />
      <MenuDrawer />
      <SizeGuideModal />
      <Toast />

      {/* Main Content with Route Transitions */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Global Dark Footer */}
      <Footer />
    </div>
  );
}

